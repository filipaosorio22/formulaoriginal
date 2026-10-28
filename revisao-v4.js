(()=>{
 const root=document.documentElement, en=root.lang.startsWith('en');
 const path=location.pathname.split('/').pop();
 if(/^(leituras|tarot|pedir-tarot)(-en)?\.html$/.test(path))document.body.classList.add('fo-reading-page');
 function syncDelivery(){const dark=root.getAttribute('data-theme')==='dark';document.querySelectorAll('[data-delivery-image]').forEach(img=>{img.src=dark?'assets/exemplo-entrega-essencia-dark.svg':'assets/exemplo-entrega-essencia.svg';const source=img.parentElement.querySelector('source');if(source)source.media=dark?'all':'not all';});}
 new MutationObserver(syncDelivery).observe(root,{attributes:true,attributeFilter:['data-theme']});syncDelivery();
 const fmt=t=>{t=Number.isFinite(t)?Math.max(0,t):0;return Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');};
 document.querySelectorAll('.audio-block audio').forEach((audio,index)=>{
  const box=document.createElement('div');box.className='fo-audio';audio.before(box);box.append(audio);
  const ui=document.createElement('div');ui.className='fo-audio-ui';
  const play=document.createElement('button');play.type='button';play.className='fo-audio-play';play.textContent='▶';play.setAttribute('aria-label',en?'Play audio':'Ouvir áudio');play.setAttribute('aria-pressed','false');
  const seek=document.createElement('input');seek.type='range';seek.min='0';seek.max='100';seek.step='0.1';seek.value='0';seek.className='fo-audio-seek';seek.setAttribute('aria-label',en?'Audio position':'Posição no áudio');
  const time=document.createElement('span');time.className='fo-audio-time';time.textContent='0:00';
  const status=document.createElement('p');status.className='fo-audio-status';status.setAttribute('role','status');
  ui.append(play,seek,time,status);box.append(ui);box.classList.add('is-enhanced');
  function paint(){play.textContent=audio.paused?'▶':'Ⅱ';play.setAttribute('aria-pressed',String(!audio.paused));play.setAttribute('aria-label',audio.paused?(en?'Play audio':'Ouvir áudio'):(en?'Pause audio':'Pausar áudio'));if(Number.isFinite(audio.duration)){time.textContent=fmt(audio.currentTime)+' / '+fmt(audio.duration);seek.value=String(audio.currentTime/audio.duration*100);}else time.textContent=fmt(audio.currentTime);}
  play.addEventListener('click',async()=>{status.textContent='';if(!audio.paused){audio.pause();return;}try{await audio.play();}catch{status.textContent=en?'Audio could not be played. Please try again.':'Não foi possível reproduzir o áudio. Tenta novamente.';}paint();});
  audio.addEventListener('play',()=>{document.querySelectorAll('audio,video[data-testimonial-video]').forEach(other=>{if(other!==audio)other.pause();});paint();});
  ['pause','ended','timeupdate','loadedmetadata'].forEach(e=>audio.addEventListener(e,paint));
  seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration)&&audio.duration>0){audio.currentTime=+seek.value/100*audio.duration;paint();}});
  audio.addEventListener('error',()=>{status.textContent=en?'Audio is unavailable.':'O áudio está indisponível.';});
 });
 // A combined result has one shared invitation below both drawings.
 if(new URLSearchParams(location.search).get('tambem')==='hd'){
  document.body.classList.add('fo-both-maps');
  const candidates=[...document.querySelectorAll('p')].filter(p=>p.textContent.trim().startsWith('Na Leitura, recebes perguntas e práticas'));
  if(candidates[0]){const p=candidates[0];p.classList.add('map-benefit-shared');const duo=document.getElementById('mapDuo');if(duo)duo.after(p);candidates.slice(1).forEach(el=>el.remove());}
 }
})();
