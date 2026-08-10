(function(){
  if (!matchMedia("(pointer:fine)").matches || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const c=document.createElement("div"); c.className="chibi-cursor"; c.setAttribute("aria-hidden","true"); document.body.append(c); document.documentElement.classList.add("has-chibi-cursor");
  let x=-200,y=-200,tx=x,ty=y;
  addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY;c.classList.add("seen");},{passive:true});
  addEventListener("pointerdown",e=>{c.classList.add("pressed");for(const name of ["cursor-click-core","cursor-click-echo"]){const layer=document.createElement("div");layer.className=name;layer.style.left=e.clientX+"px";layer.style.top=e.clientY+"px";document.body.append(layer);setTimeout(()=>layer.remove(),700)}}); addEventListener("pointerup",()=>c.classList.remove("pressed"));
  function tick(){x+=(tx-x)*.28;y+=(ty-y)*.28;c.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-20%)`;requestAnimationFrame(tick)} tick();
})();
