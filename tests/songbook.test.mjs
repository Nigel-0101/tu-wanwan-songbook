import assert from "node:assert/strict";
import {createRequire} from "node:module";
import {readFileSync} from "node:fs";
const require = createRequire(import.meta.url);
const songs = require("../data/songs.js");
const {filterSongs,paginate,pageCount,randomSong,formatOrder} = require("../js/songbook.js");
assert.equal(songs.length,50);
assert.equal(pageCount(songs),5);
assert.equal(paginate(songs,5).items.length,10);
assert.equal(filterSongs(songs,{query:"周深"}).length,3);
assert.ok(filterSongs(songs,{genre:"古风 / 戏腔"}).every(x=>x.genre==="古风 / 戏腔"));
assert.equal(randomSong(songs,()=>0).id,"001");
assert.equal(randomSong([],()=>0),null);
assert.equal(formatOrder({title:"赤伶",artist:"HITA"}), "点歌 赤伶（HITA）");

const overview = readFileSync(new URL("../index.html", import.meta.url), "utf8");
assert.match(overview, /url=\.\/blue\//, "homepage enters the single blue songbook theme");

for (const theme of ["blue", "warm", "dual"]) {
  const html = readFileSync(new URL(`../${theme}/index.html`, import.meta.url), "utf8");
  assert.match(html, /class="side-art side-art-left(?:\s|")/, `${theme} has left character art`);
  assert.match(html, /class="side-art side-art-right(?:\s|")/, `${theme} has right character art`);
}

const pageJs = readFileSync(new URL("../js/page.js", import.meta.url), "utf8");
assert.match(pageJs, /selection-capsule/, "random song uses the capsule component");
assert.match(pageJs, /formatOrder\(song\)/, "random song uses the exact order format");
assert.match(pageJs, /showSelectionCapsule\(order\)/, "copying a song triggers the shared capsule animation");
assert.doesNotMatch(pageJs, /announce\(`已复制/, "copying a song no longer shows the left copied notice");

const cursorJs = readFileSync(new URL("../js/cursor.js", import.meta.url), "utf8");
assert.match(cursorJs, /translate\(-50%,-20%\)/, "cursor hotspot sits between the rabbit ears");
assert.doesNotMatch(cursorJs, /pointerdown|pointerup|cursor-click-(?:core|echo)|pressed/, "mouse clicks have no animation or pressed state");

const baseCss = readFileSync(new URL("../css/base.css", import.meta.url), "utf8");
assert.doesNotMatch(baseCss, /\.hero-copy:before/, "hero decoration is removed");
assert.doesNotMatch(baseCss, /\.catalog:before/, "catalog decoration is removed");
assert.doesNotMatch(baseCss, /\.theme-ornaments/, "background ornament layer styles are removed");
assert.match(baseCss, /background:rgba\(255,255,255,\.98\)/, "selection capsule has a high-contrast surface");
assert.match(baseCss, /18%,82%\{[^}]*opacity:1/, "selection capsule stays fully opaque while its text is visible");
assert.match(baseCss, /\.side-art\{[^}]*top:414px[^}]*width:clamp\(220px,14vw,300px\)[^}]*object-fit:contain/, "standee art occupies about two-thirds of each side gutter");
assert.doesNotMatch(baseCss, /cursor-click-(?:core|echo)|cursorCore|cursorEcho|\.chibi-cursor\.pressed/, "click animation styles are completely removed");
assert.match(baseCss, /brand-logo/, "the supplied logo is positioned in the hero copy area");
assert.match(baseCss, /\.brand-logo\{[^}]*width:clamp\(280px,24vw,380px\)/, "brand logo is enlarged in the hero");
assert.match(baseCss, /\.hero\{[^}]*grid-template-columns:300px 1fr[^}]*hero-content-bg\.png/, "wide hero reserves enough horizontal space for the title and enlarged logo");
assert.match(baseCss, /\.hero h1\{[^}]*font-size:clamp\(45px,4\.5vw,66px\)[^}]*white-space:nowrap/, "the streamer name and OvO stay on one line at wide desktop sizes");
assert.match(baseCss, /hero-content-bg\.png/, "hero content uses the generated blue motif background");
assert.match(baseCss, /catalog-bg\.png/, "catalog uses the generated blue motif background");
assert.match(baseCss, /page-bg\.png/, "the full page uses the new matching background artwork");
assert.match(baseCss, /\.hero-art\{[^}]*background:transparent/, "hero art and copy share one continuous background");
assert.match(baseCss, /\.hero-art:before,\.hero-art:after\{display:none\}/, "the separate blue circle decoration is removed");
assert.match(baseCss, /@media\(max-width:1500px\)\{\.site\{padding:20px 18px 48px\}/, "medium screens reclaim the side gutters before the hero becomes cramped");
assert.match(baseCss, /\.rabbit-mark:before,\.rabbit-mark:after\{[^}]*z-index:0/, "rabbit ears stay behind the face");
assert.match(baseCss, /\.rabbit-mark i\{[^}]*z-index:1/, "rabbit face stays in front of the ears");

assert.doesNotMatch(pageJs, /\bnotice\b|\bannounce\s*\(/, "left-side status notice is removed from the interaction flow");
const blueHtml = readFileSync(new URL("../blue/index.html", import.meta.url), "utf8");
assert.doesNotMatch(blueHtml, /class="onair"|id="notice"/, "ON AIR badge and upper-left notice are removed");
assert.equal((blueHtml.match(/standee-transparent\.png/g) || []).length, 2, "blue page uses the transparent standee asset on both sides");
console.log("songbook tests passed");
