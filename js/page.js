(function () {
  const songs = window.TUWANWAN_SONGS || [];
  const {filterSongs,paginate,pageWindow,resolvePageInput,randomSong,formatOrder} = window.Songbook;
  const state = {query:"",language:"",genre:"",type:"",page:1};
  const $ = s => document.querySelector(s);
  const body = $("#songRows"), count = $("#songCount"), pages = $("#pages");
  const genres = [...new Set(songs.map(s=>s.genre))].sort();
  const genreSelect = $("#genreFilter");
  genres.forEach(value => genreSelect.add(new Option(value,value)));

  function closeCustomSelect(root){
    root.classList.remove("open");
    root.querySelector(".custom-select-trigger").setAttribute("aria-expanded","false");
  }
  function initCustomSelect(select){
    const root=select.closest(".custom-select");
    const trigger=root.querySelector(".custom-select-trigger");
    const label=trigger.querySelector("span");
    const menu=root.querySelector(".custom-select-menu");
    const options=[...select.options];
    options.forEach(option=>{
      const item=document.createElement("button");
      item.type="button";
      item.className="custom-select-option";
      item.dataset.value=option.value;
      item.setAttribute("role","option");
      item.textContent=option.textContent;
      menu.append(item);
    });
    function sync(){
      const selected=select.options[select.selectedIndex] || select.options[0];
      label.textContent=selected.textContent;
      [...menu.children].forEach(item=>{
        const active=item.dataset.value===select.value;
        item.classList.toggle("selected",active);
        item.setAttribute("aria-selected",String(active));
      });
    }
    function openMenu(focusSelected=false){
      document.querySelectorAll(".custom-select.open").forEach(other=>{if(other!==root)closeCustomSelect(other);});
      root.classList.add("open");
      trigger.setAttribute("aria-expanded","true");
      if(focusSelected)(menu.querySelector(".selected")||menu.firstElementChild)?.focus();
    }
    trigger.addEventListener("click",()=>root.classList.contains("open")?closeCustomSelect(root):openMenu());
    trigger.addEventListener("keydown",event=>{
      if(event.key==="ArrowDown"||event.key==="ArrowUp"){
        event.preventDefault();
        openMenu(true);
      }
    });
    menu.addEventListener("click",event=>{
      const item=event.target.closest(".custom-select-option");
      if(!item)return;
      select.value=item.dataset.value;
      select.dispatchEvent(new Event("change",{bubbles:true}));
      sync();
      closeCustomSelect(root);
      trigger.focus();
    });
    menu.addEventListener("keydown",event=>{
      const items=[...menu.querySelectorAll(".custom-select-option")];
      const index=items.indexOf(document.activeElement);
      if(event.key==="Escape"){
        event.preventDefault();closeCustomSelect(root);trigger.focus();return;
      }
      if(event.key==="ArrowDown"||event.key==="ArrowUp"){
        event.preventDefault();
        const delta=event.key==="ArrowDown"?1:-1;
        items[(index+delta+items.length)%items.length]?.focus();
      }
    });
    select.addEventListener("change",sync);
    sync();
  }
  document.querySelectorAll(".select-native").forEach(initCustomSelect);
  document.addEventListener("pointerdown",event=>{
    document.querySelectorAll(".custom-select.open").forEach(root=>{if(!root.contains(event.target))closeCustomSelect(root);});
  });

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
    const windowButtons=pageWindow(paged.page,paged.pages).map(value=>value==="…"?'<span class="page-gap" aria-hidden="true">…</span>':`<button class="page ${value===paged.page?'active':''}" data-page="${value}" aria-label="第 ${value} 页" ${value===paged.page?'aria-current="page"':''}>${value}</button>`).join("");
    pages.innerHTML=`<button class="page page-arrow" data-page="${paged.page-1}" aria-label="上一页" ${paged.page===1?'disabled':''}>‹</button>${windowButtons}<button class="page page-arrow" data-page="${paged.page+1}" aria-label="下一页" ${paged.page===paged.pages?'disabled':''}>›</button>`;
    $("#pageMeta").textContent=`找到 ${result.length} 首 · 第 ${paged.page}/${paged.pages} 页`;
    $("#pageJump").value=String(paged.page);
  }
  $("#search").addEventListener("input",e=>{state.query=e.target.value;state.page=1;render();});
  [["#languageFilter","language"],["#genreFilter","genre"],["#typeFilter","type"]].forEach(([id,key])=>$(id).addEventListener("change",e=>{state[key]=e.target.value;state.page=1;render();}));
  pages.addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(!b)return;state.page=Number(b.dataset.page);render();$(".catalog").scrollIntoView({behavior:"smooth",block:"start"});});
  $("#jumpForm").addEventListener("submit",event=>{event.preventDefault();const total=paginate(filtered(),state.page).pages;state.page=resolvePageInput($("#pageJump").value,total,state.page);render();$(".catalog").scrollIntoView({behavior:"smooth",block:"start"});});
  $("#pageJump").addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();$("#jumpForm").requestSubmit();}});
  body.addEventListener("click",async e=>{const b=e.target.closest(".copy");if(!b)return;const song=songs.find(item=>item.id===b.dataset.songId);if(!song)return;const order=formatOrder(song);try{await navigator.clipboard.writeText(order);}catch{}showSelectionCapsule(order);b.textContent="已复制";setTimeout(()=>b.textContent="复制歌名",900);});
  $("#random").addEventListener("click",()=>{const song=randomSong(filtered());if(!song)return;showSelectionCapsule(formatOrder(song));});
  $("#themeToggle")?.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="warm"?"blue":"warm";document.documentElement.dataset.theme=next;localStorage.setItem("tu-theme",next);$("#themeToggle").textContent=next==="warm"?"切换蓝色私皮":"切换暖色国风";});
  if ($("#themeToggle")){const saved=localStorage.getItem("tu-theme")||"blue";document.documentElement.dataset.theme=saved;$("#themeToggle").textContent=saved==="warm"?"切换蓝色私皮":"切换暖色国风";}
  render();
})();
