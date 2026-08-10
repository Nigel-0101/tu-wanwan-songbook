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
assert.match(cursorJs, /cursor-click-echo/, "mouse clicks create the requested Q-character echo layer");

const baseCss = readFileSync(new URL("../css/base.css", import.meta.url), "utf8");
assert.doesNotMatch(baseCss, /\.hero-copy:before/, "hero decoration is removed");
assert.doesNotMatch(baseCss, /\.catalog:before/, "catalog decoration is removed");
assert.doesNotMatch(baseCss, /\.theme-ornaments/, "background ornament layer styles are removed");
assert.match(baseCss, /background:rgba\(255,255,255,\.98\)/, "selection capsule has a high-contrast surface");
assert.match(baseCss, /18%,82%\{[^}]*opacity:1/, "selection capsule stays fully opaque while its text is visible");
assert.match(baseCss, /\.side-art\{[^}]*top:414px[^}]*width:clamp\(320px,20\.5vw,440px\)[^}]*object-fit:contain/, "standee art starts at the catalog and matches its height");
assert.match(baseCss, /brand-logo/, "the supplied logo is positioned in the hero copy area");
assert.match(baseCss, /hero-content-bg\.png/, "hero content uses the generated blue motif background");
assert.match(baseCss, /catalog-bg\.png/, "catalog uses the generated blue motif background");
console.log("songbook tests passed");
