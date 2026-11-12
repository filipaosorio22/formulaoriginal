(()=>{
 const en=document.documentElement.lang.startsWith('en'),fmt=t=>{t=Number.isFinite(t)?Math.max(0,t):0;return Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');};
 document.querySelectorAll('.aud').forEach(card=>{
  const audio=card.querySelector('audio');if(!audio)return;
  // Existing CEEN scripts already operate their burgundy player.
  card.classList.add('has-custom-controls');
  audio.addEventListener('pause',()=>card.classList.remove('playing'));
  if(!card.hasAttribute('data-classic-player'))return;
  const button=card.querySelector('.aud-btn'),bar=card.querySelector('.aud-bar'),fill=card.querySelector('.aud-fill'),time=card.querySelector('.aud-t'),status=card.querySelector('.classic-audio-status');
  if(!button||!bar||!fill||!time)return;
  function paint(){const playing=!audio.paused&&!audio.ended;card.classList.toggle('playing',playing);button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',playing?(en?'Pause audio':'Pausar áudio'):(en?'Play audio':'Ouvir áudio'));const has=Number.isFinite(audio.duration)&&audio.duration>0,p=has?audio.currentTime/audio.duration*100:0;fill.style.width=p+'%';bar.setAttribute('aria-valuenow',String(Math.round(p)));bar.setAttribute('aria-valuetext',fmt(audio.currentTime)+(has?' / '+fmt(audio.duration):''));time.textContent=has?fmt(audio.currentTime)+' / '+fmt(audio.duration):fmt(audio.currentTime);}
  button.addEventListener('click',async()=>{status.textContent='';if(!audio.paused){audio.pause();return;}try{await audio.play();}catch{status.textContent=en?'Please try playing the audio again.':'Tenta reproduzir o áudio novamente.';}paint();});
  audio.addEventListener('play',()=>{document.querySelectorAll('audio,video[data-testimonial-video]').forEach(other=>{if(other!==audio)other.pause();});paint();});
  ['pause','ended','loadedmetadata','timeupdate'].forEach(name=>audio.addEventListener(name,paint));
  function seek(value){if(!Number.isFinite(audio.duration)||audio.duration<=0)return;audio.currentTime=Math.max(0,Math.min(audio.duration,value));paint();}
  bar.addEventListener('click',event=>{const rect=bar.getBoundingClientRect();if(rect.width>0)seek((event.clientX-rect.left)/rect.width*audio.duration);});
  bar.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight'||event.key==='ArrowUp')target=audio.currentTime+5;else if(event.key==='ArrowLeft'||event.key==='ArrowDown')target=audio.currentTime-5;else if(event.key==='Home')target=0;else if(event.key==='End')target=audio.duration;else return;event.preventDefault();seek(target);});
  paint();
 });
})();
