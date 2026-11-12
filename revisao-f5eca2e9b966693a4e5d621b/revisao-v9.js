(()=>{
 const en=document.documentElement.lang.startsWith('en'),say=(pt,english)=>en?english:pt;
 const nav=document.querySelector('.site-main-nav'),toggle=nav?.querySelector('.mobile-menu-toggle');
 if(toggle){
  const links=nav.querySelector('.nav-links');
  const setOpen=(open,focus=false)=>{nav.classList.toggle('mobile-menu-open',open);toggle.setAttribute('aria-expanded',String(open));if(focus)toggle.focus();};
  toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
  links.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')setOpen(false,true);});
  document.addEventListener('click',e=>{if(!nav.contains(e.target))setOpen(false);});
  matchMedia('(max-width: 900px)').addEventListener('change',()=>setOpen(false));
  document.documentElement.classList.add('fo-mobile-nav-ready');
 }
 // Native dialog keeps keyboard focus inside the enlarged image and supports Escape.
 const images=[...document.querySelectorAll('#testemunhos .car-slide img,.delivery-preview img[data-delivery-image]')];
 if(images.length){
  const dialog=document.createElement('dialog');dialog.className='fo-image-dialog';dialog.setAttribute('aria-label',say('Imagem ampliada','Enlarged image'));
  const close=document.createElement('button');close.type='button';close.className='fo-image-close';close.textContent='×';close.setAttribute('aria-label',say('Fechar imagem','Close image'));
  const viewport=document.createElement('div');viewport.className='fo-image-viewport';
  const full=document.createElement('img');viewport.append(full);dialog.append(close,viewport);document.body.append(dialog);
  let trigger;
  function hide(){dialog.close();}
  close.addEventListener('click',hide);dialog.addEventListener('click',e=>{if(e.target===dialog)hide();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('fo-image-open');trigger?.focus();});
  images.forEach(img=>{
   const button=document.createElement('button');button.type='button';button.className='fo-image-trigger';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label',say('Ampliar: ','Enlarge: ')+(img.alt||say('pré-visualização','preview')));
   // Keep picture source selection and theme-aware preview updates intact.
   const content=img.closest('picture')||img;content.before(button);button.append(content);
   button.addEventListener('click',()=>{trigger=button;full.src=img.currentSrc||img.src;full.alt=img.alt;dialog.showModal();document.body.classList.add('fo-image-open');viewport.scrollTo(0,0);});
  });
 }
 // Silent looping videos start by themselves. If a phone blocks autoplay (low-power mode, data saver), they retry silently on the first touch or scroll instead of showing a play button.
 const videos=[...document.querySelectorAll('video:not([data-testimonial-video])')];
 videos.forEach(video=>{
  video.muted=true;video.defaultMuted=true;video.setAttribute('muted','');video.playsInline=true;video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');video.loop=true;video.autoplay=true;video.controls=false;video.removeAttribute('controls');video.disablePictureInPicture=true;video.disableRemotePlayback=true;video.preload='auto';
  const host=video.parentElement;if(host)host.classList.add('fo-video-host');
  const play=()=>{if(!video.paused&&!video.ended)return;video.muted=true;try{const result=video.play();if(result&&result.catch)result.catch(()=>{});}catch(e){}};
  video.addEventListener('loadeddata',play);video.addEventListener('canplay',play);video.addEventListener('pause',()=>{if(!document.hidden&&!video.ended&&video.__wantPlay)setTimeout(play,150);});
  video.addEventListener('playing',()=>{video.__wantPlay=true;});
  if('IntersectionObserver' in window){new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)play();}),{threshold:.1}).observe(video);}
  window.addEventListener('pageshow',play);document.addEventListener('visibilitychange',()=>{if(!document.hidden)play();});
  ['touchstart','pointerdown','click','scroll','keydown'].forEach(ev=>window.addEventListener(ev,play,{passive:true,once:ev!=='scroll'}));
  play();
 });
})();
