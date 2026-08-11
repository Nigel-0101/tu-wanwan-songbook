import assert from "node:assert/strict";
import {createRequire} from "node:module";
import {existsSync, readFileSync} from "node:fs";
const require = createRequire(import.meta.url);
const songs = require("../data/songs.js");
const {filterSongs,paginate,pageCount,pageWindow,randomSong,formatOrder} = require("../js/songbook.js");

assert.equal(songs.length,362);
assert.deepEqual(songs[0],{id:"001",title:"你",artist:"屠洪刚",language:"中文",genre:"华语流行",type:"免费"});
assert.deepEqual(songs.at(-1),{id:"362",title:"盗墓笔记十年人间",artist:"李常超（Lao乾妈）",language:"中文",genre:"国风 / 古风流行",type:"免费"});
assert.equal(pageCount(songs),37);
assert.equal(paginate(songs,37).items.length,2);
assert.equal(filterSongs(songs,{query:"周深"}).length > 0,true);
assert.ok(filterSongs(songs,{genre:"华语流行"}).every(x=>x.genre==="华语流行"));
assert.equal(randomSong(songs,()=>0).id,"001");
assert.equal(randomSong([],()=>0),null);
assert.equal(formatOrder({title:"赤伶",artist:"HITA"}), "点歌 赤伶（HITA）");
assert.deepEqual(pageWindow(1,37),[1,2,3,"…",37]);
assert.deepEqual(pageWindow(19,37),[1,"…",17,18,19,20,21,"…",37]);
assert.deepEqual(pageWindow(37,37),[1,"…",35,36,37]);

const overview = readFileSync(new URL("../index.html", import.meta.url), "utf8");
assert.match(overview, /url=\.\/blue\//);

const pageJs = readFileSync(new URL("../js/page.js", import.meta.url), "utf8");
assert.match(pageJs, /selection-capsule/);
assert.match(pageJs, /formatOrder\(song\)/);
assert.match(pageJs, /showSelectionCapsule\(order\)/);
assert.match(pageJs, /pageWindow/);
assert.doesNotMatch(pageJs, /\bnotice\b|\bannounce\s*\(/);

const cursorJs = readFileSync(new URL("../js/cursor.js", import.meta.url), "utf8");
assert.match(cursorJs, /translate\(-50%,-20%\)/);
assert.doesNotMatch(cursorJs, /pointerdown|pointerup|cursor-click-(?:core|echo)|pressed/);

const blueHtml = readFileSync(new URL("../blue/index.html", import.meta.url), "utf8");
assert.doesNotMatch(blueHtml, /BLUE BUNNY SONG ROOM|class="topline"/);
assert.match(blueHtml, /avatar-cup\.png/);
assert.match(blueHtml, />♥ 直播间</);
assert.doesNotMatch(blueHtml, /直播间 016854/);
assert.match(blueHtml, /09:00–12:00/);
assert.match(blueHtml, /18:00–22:00/);
assert.match(blueHtml, /class="frame-layer frame-layer-back"/);
assert.match(blueHtml, /class="frame-layer frame-layer-front"/);

for (const asset of ["avatar-cup.png","avatar-medallion.png","layered-frame.png","layered-ornaments.png"]) {
  assert.equal(existsSync(new URL(`../assets/${asset}`, import.meta.url)),true,`${asset} exists`);
  assert.equal(existsSync(new URL(`../dist/client/assets/${asset}`, import.meta.url)),true,`${asset} is mirrored`);
}

const baseCss = readFileSync(new URL("../css/base.css", import.meta.url), "utf8");
const distBaseCss = readFileSync(new URL("../dist/client/css/base.css", import.meta.url), "utf8");
const themesCss = readFileSync(new URL("../css/themes.css", import.meta.url), "utf8");
const layeredCss = readFileSync(new URL("../css/layered.css", import.meta.url), "utf8");
assert.equal(distBaseCss,baseCss);
assert.doesNotMatch(themesCss,/repeating-linear-gradient/);
assert.match(layeredCss,/\.meta\{[^}]*flex-wrap:nowrap/);
assert.match(layeredCss,/avatar-medallion\.png/);
assert.match(layeredCss,/\.frame-layer\{[^}]*pointer-events:none/);
assert.match(layeredCss,/\.catalog\{[^}]*min-height:auto/);
assert.doesNotMatch(baseCss,/cursor-click-(?:core|echo)|cursorCore|cursorEcho|\.chibi-cursor\.pressed/);

for (const [source,dist] of [["data/songs.js","dist/client/data/songs.js"],["js/songbook.js","dist/client/js/songbook.js"],["js/page.js","dist/client/js/page.js"],["blue/index.html","dist/client/blue/index.html"],["css/themes.css","dist/client/css/themes.css"],["css/layered.css","dist/client/css/layered.css"]]) {
  assert.equal(readFileSync(new URL(`../${source}`,import.meta.url),"utf8"),readFileSync(new URL(`../${dist}`,import.meta.url),"utf8"),`${source} mirror matches`);
}

console.log("songbook tests passed");
