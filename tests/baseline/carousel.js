(()=>{
 const cards=[...document.querySelectorAll('[data-carousel-index]')],dots=[...document.querySelectorAll('[data-carousel-go]')];
 const entries=[{name:'DataAutomated',category:'CUSTOMER INTELLIGENCE PLATFORM',key:'data'},{name:'Automated Structure',category:'GROUNDED OUTREACH & AUTOMATION',key:'outreach'},{name:'Customer Support Agent',category:'CONNECTED SUPPORT INFRASTRUCTURE',key:'support'},{name:'SentinelAI',category:'LOCAL AI / SECURITY MONITORING',key:'sentinel'}];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),stage=document.getElementById('carousel-stage'),region=document.querySelector('.hero-showcase'),pause=document.getElementById('carousel-pause');
 const TAU=Math.PI*2,step=TAU/cards.length;let angle=0,target=null,index=-1,paused=reduce.matches,hovered=false,focused=false,visible=true,last=0,frame=0,drag=null,suppressClick=false,width=stage.clientWidth;
 function render(){
  let nearest=0,depth=-Infinity;
  cards.forEach((card,i)=>{const a=angle+i*step,s=Math.sin(a),c=Math.cos(a);const x=s*width*.34,z=(c-1)*105,y=-c*7;card.style.transform=`translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) rotateY(${-s*48}deg)`;card.style.zIndex=String(Math.round((c+1)*100));card.style.filter=`brightness(${.85+(c+1)*.075})`;if(c>depth){depth=c;nearest=i}});
  if(nearest!==index){index=nearest;cards.forEach((card,i)=>{card.setAttribute('aria-current',String(i===index));card.setAttribute('aria-label',(i===index?'Explore ':'Rotate to ')+entries[i].name)});dots.forEach((d,i)=>d.setAttribute('aria-pressed',String(i===index)));document.getElementById('carousel-name').textContent=entries[index].name;document.getElementById('carousel-category').textContent=entries[index].category;document.getElementById('rotating-role').textContent=['Systems builder.','Software engineer.','Problem solver.'][index%3]}
 }
 function select(i){const selected=(i+cards.length)%cards.length;let delta=(-selected*step-angle)%TAU;if(delta>Math.PI)delta-=TAU;if(delta<-Math.PI)delta+=TAU;target=angle+delta;if(reduce.matches){angle=target;target=null;render()}else start()}
 function syncPause(){pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Resume carousel motion':'Pause carousel motion');pause.textContent=paused?'▷':'Ⅱ'}
 function tick(now){frame=0;const dt=last?Math.min(now-last,40):0;last=now;
  if(target!==null){angle+=(target-angle)*(1-Math.exp(-dt/140));if(Math.abs(target-angle)<.001){angle=target;target=null}render()}
  else if(!paused&&!hovered&&!focused&&!drag&&!reduce.matches){angle-=dt*TAU/32000;render()}
  if(visible&&!document.hidden&&(target!==null||(!paused&&!hovered&&!focused&&!drag&&!reduce.matches)))frame=requestAnimationFrame(tick);
 }
 function start(){if(!frame&&visible&&!document.hidden){last=0;frame=requestAnimationFrame(tick)}}
 document.getElementById('carousel-prev').addEventListener('click',()=>select(index-1));document.getElementById('carousel-next').addEventListener('click',()=>select(index+1));dots.forEach((d,i)=>d.addEventListener('click',()=>select(i)));cards.forEach((c,i)=>c.addEventListener('click',e=>{if(suppressClick){e.preventDefault();return}if(i===index)openCase(entries[i].key);else select(i)}));
 pause.addEventListener('click',()=>{paused=!paused;syncPause();start()});
 region.addEventListener('mouseenter',()=>hovered=true);region.addEventListener('mouseleave',()=>{hovered=false;start()});region.addEventListener('focusin',()=>focused=true);region.addEventListener('focusout',e=>{focused=region.contains(e.relatedTarget);start()});
 region.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(index+(e.key==='ArrowLeft'?-1:1))}});
 stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,angle,id:e.pointerId};target=null;suppressClick=false});
 stage.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>7){suppressClick=true;stage.setPointerCapture(e.pointerId);stage.classList.add('is-dragging');angle=drag.angle+dx/Math.max(width,1)*TAU;render()}});
 function endDrag(){if(!drag)return;drag=null;stage.classList.remove('is-dragging');if(suppressClick){select(index);setTimeout(()=>suppressClick=false,150)}start()}
 stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);stage.addEventListener('lostpointercapture',endDrag);
 if('ResizeObserver'in window)new ResizeObserver(()=>{width=stage.clientWidth;render()}).observe(stage);
 if('IntersectionObserver'in window)new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible)start()},{threshold:.1}).observe(region);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});reduce.addEventListener('change',()=>{paused=reduce.matches;if(paused)select(index);syncPause();start()});
 const menu=document.getElementById('menu-toggle'),header=document.querySelector('.reference-header');menu.addEventListener('click',()=>{const open=header.classList.toggle('nav-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'✕':'☰'});header.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰'}));
 render();syncPause();start();
})();
