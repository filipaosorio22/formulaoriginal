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
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('video:not([data-testimonial-video])').forEach(video=>{
  video.muted=true;video.defaultMuted=true;video.setAttribute('muted','');video.playsInline=true;video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');video.loop=true;video.controls=false;video.removeAttribute('controls');video.disablePictureInPicture=true;video.disableRemotePlayback=true;video.preload='auto';
  const button=document.createElement('button');button.type='button';button.className='fo-video-play';button.hidden=true;button.textContent=say('▶ Reproduzir vídeo','▶ Play video');button.setAttribute('aria-label',say('Reproduzir vídeo sem som','Play muted video'));
  const host=video.parentElement;host.classList.add('fo-video-host');
  const background=host.classList.contains('tf-bg');
  if(background){button.classList.add('fo-background-play');host.parentElement.append(button);}else host.append(button);
  const play=()=>{if(reduced.matches||document.hidden)return;video.muted=true;video.autoplay=true;try{const result=video.play();if(result?.catch)result.catch(()=>{button.hidden=false;});}catch(e){button.hidden=false;}};
  video.addEventListener('playing',()=>{button.hidden=true;});
  button.addEventListener('click',()=>{video.muted=true;host.classList.add('fo-video-manual-playing');video.play().then(()=>{button.hidden=true;}).catch(()=>{button.hidden=false;});});
  video.addEventListener('loadeddata',play);video.addEventListener('canplay',play);
  window.addEventListener('pageshow',play);document.addEventListener('visibilitychange',play);
  const sync=()=>{if(reduced.matches){video.autoplay=false;video.pause();button.hidden=false;}else play();};
  reduced.addEventListener('change',sync);sync();
 });
})();
