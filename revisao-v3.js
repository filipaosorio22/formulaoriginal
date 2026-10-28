(()=>{
 const root=document.documentElement;
 if(new URLSearchParams(location.search).get('embed')==='1')root.classList.add('is-map-embed');
 const toggle=document.querySelector('[data-site-theme]');
 const current=()=>root.getAttribute('data-theme')||'light';
 function paint(){if(toggle){toggle.dataset.current=current();toggle.setAttribute('aria-pressed',String(current()==='dark'));}}
 function syncFrames(){document.querySelectorAll('iframe').forEach(f=>{try{if(f.contentDocument?.documentElement)f.contentDocument.documentElement.setAttribute('data-theme',current());}catch(e){}});}
 try{const saved=localStorage.getItem('fo_theme');if(saved==='dark'||saved==='light')root.setAttribute('data-theme',saved);}catch(e){}
 const reviewQuery=new URLSearchParams(location.search),reviewTheme=reviewQuery.get('theme');
 if(reviewQuery.has('preview')&&['light','dark'].includes(reviewTheme))root.setAttribute('data-theme',reviewTheme);
 root.setAttribute('data-theme',current());
 toggle?.addEventListener('click',()=>{const next=current()==='dark'?'light':'dark';root.setAttribute('data-theme',next);try{localStorage.setItem('fo_theme',next);}catch(e){}paint();syncFrames();});
 new MutationObserver(()=>{paint();syncFrames();}).observe(root,{attributes:true,attributeFilter:['data-theme']});paint();
 document.addEventListener('load',e=>{if(e.target.tagName==='IFRAME')syncFrames();},true);
 addEventListener('storage',e=>{if(e.key==='fo_theme'&&(e.newValue==='dark'||e.newValue==='light'))root.setAttribute('data-theme',e.newValue);});
 // A single cancellable animation owns the hub's internal links.
 let scrolling=0;
 document.addEventListener('click',e=>{
  const a=e.target.closest('.readings-hub main a[href^="#"]');if(!a||a.hash.length<2)return;
  const target=document.getElementById(a.hash.slice(1));if(!target)return;
  e.preventDefault();e.stopImmediatePropagation();cancelAnimationFrame(scrolling);
  const top=Math.max(0,scrollY+target.getBoundingClientRect().top-(document.querySelector('.site-header')?.offsetHeight||0)-22);
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const start=scrollY,time=performance.now(),old=root.style.scrollBehavior;root.style.scrollBehavior='auto';
  function frame(now){const p=reduced?1:Math.min(1,(now-time)/1000);const ease=p;scrollTo(0,start+(top-start)*ease);if(p<1)scrolling=requestAnimationFrame(frame);else{root.style.scrollBehavior=old;history.replaceState(null,'',a.hash);}}
  scrolling=requestAnimationFrame(frame);
 },true);
 document.querySelectorAll('.readings-menu').forEach(menu=>{menu.addEventListener('mouseleave',()=>{menu.classList.remove('is-open');menu.querySelector('button')?.setAttribute('aria-expanded','false');});});
 document.querySelectorAll('video[data-testimonial-video]').forEach(v=>{v.controls=true;v.autoplay=false;v.loop=false;v.muted=false;v.removeAttribute('autoplay');v.addEventListener('play',()=>document.querySelectorAll('audio,video[data-testimonial-video]').forEach(other=>{if(other!==v)other.pause();}));});
})();
