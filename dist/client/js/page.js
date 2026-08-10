(function () {
  const songs = window.TUWANWAN_SONGS || [];
  const {filterSongs,paginate,randomSong,formatOrder} = window.Songbook;
  const state = {query:"",language:"",genre:"",type:"",page:1};
  const $ = s => document.querySelector(s);
  const body = $("#songRows"), count = $("#songCount"), pages = $("#pages");
  const genres = [...new Set(songs.map(s=>s.genre))].sort();
  const genreSelect = $("#genreFilter");
  genres.forEach(value => genreSelect.add(new Option(value,value)));

  function filtered(){ return filterSongs(songs,state); }
  const selectionCapsule=document.createElement("div");
  selectionCapsule.className="selection-capsule";
  selectionCapsule.setAttribute("role","status");
  selectionCapsule.setAttribute("aria-live","polite");
  selectionCapsule.innerHTML='<span class="rabbit-mark" aria-hidden="true"><i></i></span><span class="selection-text"></span>';
  document.body.append(selectionCapsule);
  let capsuleTimer;
  function showSelectionCapsule(text){
    clearTimeout(capsuleTimer);
    selectionCapsule.classList.remove("show");
    selectionCapsule.querySelector(".selection-text").textContent=text;
    void selectionCapsule.offsetWidth;
    selectionCapsule.classList.add("show");
    capsuleTimer=setTimeout(()=>selectionCapsule.classList.remove("show"),3600);
  }
  function row(song){
    return `<tr><td class="num">${song.id}</td><td class="song-title">${song.title}</td><td>${song.artist}</td><td>${song.language}</td><td>${song.genre}</td><td><span class="pill">${song.type}</span></td><td><button class="copy" data-song-id="${song.id}">复制歌名</button></td></tr>`;
  }
  function render(){
    const result=filtered(), paged=paginate(result,state.page); state.page=paged.page;
    count.textContent=result.length;
    body.innerHTML=paged.items.length ? paged.items.map(row).join("") : `<tr><td colspan="7" class="empty">没有找到符合条件的歌曲，换个关键词试试吧。</td></tr>`;
    pages.innerHTML=Array.from({length:paged.pages},(_,i)=>`<button class="page ${i+1===paged.page?'active':''}" data-page="${i+1}" aria-label="第 ${i+1} 页">${i+1}</button>`).join("");
    $("#pageMeta").textContent=`第 ${paged.page} / ${paged.pages} 页`;
  }
  $("#search").addEventListener("input",e=>{state.query=e.target.value;state.page=1;render();});
  [["#languageFilter","language"],["#genreFilter","genre"],["#typeFilter","type"]].forEach(([id,key])=>$(id).addEventListener("change",e=>{state[key]=e.target.value;state.page=1;render();}));
  pages.addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(!b)return;state.page=Number(b.dataset.page);render();$(".catalog").scrollIntoView({behavior:"smooth",block:"start"});});
  body.addEventListener("click",async e=>{const b=e.target.closest(".copy");if(!b)return;const song=songs.find(item=>item.id===b.dataset.songId);if(!song)return;const order=formatOrder(song);try{await navigator.clipboard.writeText(order);}catch{}showSelectionCapsule(order);b.textContent="已复制";setTimeout(()=>b.textContent="复制歌名",900);});
  $("#random").addEventListener("click",()=>{const song=randomSong(filtered());if(!song)return;showSelectionCapsule(formatOrder(song));});
  $("#themeToggle")?.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="warm"?"blue":"warm";document.documentElement.dataset.theme=next;localStorage.setItem("tu-theme",next);$("#themeToggle").textContent=next==="warm"?"切换蓝色私皮":"切换暖色国风";});
  if ($("#themeToggle")){const saved=localStorage.getItem("tu-theme")||"blue";document.documentElement.dataset.theme=saved;$("#themeToggle").textContent=saved==="warm"?"切换蓝色私皮":"切换暖色国风";}
  render();
})();
