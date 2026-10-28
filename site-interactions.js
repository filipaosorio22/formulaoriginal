(()=>{
 const en=document.documentElement.lang.startsWith('en'),say=(pt,eng)=>en?eng:pt;
 const partnership=document.getElementById('convites-dialog'),gift=document.getElementById('miminho-dialog');
 function open(dialog,trigger){if(!dialog||dialog.open)return;document.querySelectorAll('.site-dialog[open]').forEach(d=>d.close());dialog.__trigger=trigger||document.activeElement;dialog.showModal();}
 function close(dialog){if(!dialog)return;dialog.close();dialog.__trigger?.focus();if(dialog===gift){try{sessionStorage.setItem('fo_gift_seen_20261028','1');}catch(e){}}}
 document.querySelectorAll('[data-partnerships-open]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();open(partnership,a);}));
 document.querySelectorAll('[data-gift-open]').forEach(a=>a.addEventListener('click',()=>open(gift,a)));
 document.querySelectorAll('.gift-launcher').forEach(l=>{
  try{if(sessionStorage.getItem('fo_gift_launcher_closed')==='1')l.classList.add('is-dismissed');}catch(e){}
  l.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===l){e.preventDefault();open(gift,l);}});
  const x=l.querySelector('.gift-launcher-close');
  if(x)x.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();l.classList.add('is-dismissed');try{sessionStorage.setItem('fo_gift_launcher_closed','1');}catch(err){}});
 });
 document.querySelectorAll('.site-dialog').forEach(d=>{
  d.querySelectorAll('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>close(d)));
  d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))close(d);});
  d.addEventListener('cancel',()=>{if(d===gift){try{sessionStorage.setItem('fo_gift_seen_20261028','1');}catch(e){}}});
 });
 
 if(location.hash==='#convites-dialog')open(partnership);
 document.querySelectorAll('.readings-submenu-toggle').forEach(button=>{const menu=button.closest('.readings-menu');button.addEventListener('click',()=>{const isOpen=menu.classList.toggle('is-open');button.setAttribute('aria-expanded',String(isOpen));});menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.focus();}});});
 // Swipe carousels of text cards (session testimonials).
 document.querySelectorAll('[data-text-carousel]').forEach(c=>{
  const track=c.querySelector('.tc-track'),dotsBox=c.querySelector('.tc-dots'),slides=[...track.children],dots=[];
  slides.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',(i+1)+' / '+slides.length);b.addEventListener('click',()=>track.scrollTo({left:s.offsetLeft-track.offsetLeft-(track.clientWidth-s.clientWidth)/2,behavior:'smooth'}));dotsBox.append(b);dots.push(b);});
  function active(){const mid=track.scrollLeft+track.clientWidth/2;let best=0,bd=1e9;slides.forEach((s,i)=>{const d=Math.abs(s.offsetLeft-track.offsetLeft+s.clientWidth/2-mid);if(d<bd){bd=d;best=i;}});dots.forEach((d,i)=>d.setAttribute('aria-current',String(i===best)));}
  track.addEventListener('scroll',active,{passive:true});window.addEventListener('resize',active);active();
  const step=()=>(slides[0]?slides[0].getBoundingClientRect().width:track.clientWidth)+18;
  c.querySelector('.tc-prev').addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
  c.querySelector('.tc-next').addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
 });
 // Smooth scroll that recomputes its destination every frame, so late layout shifts on mobile (images, accordions) cannot make it land in the wrong place.
 function offsetTop(){const h=document.querySelector('.site-header'),pos=h?getComputedStyle(h).position:'';return h&&(pos==='sticky'||pos==='fixed')?h.offsetHeight+16:24;}
 function glideTo(getTarget,duration){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dest=()=>Math.max(0,getTarget().getBoundingClientRect().top+scrollY-offsetTop());
  if(reduce){scrollTo(0,dest());return;}
  const root=document.documentElement,old=root.style.scrollBehavior;root.style.scrollBehavior='auto';
  const start=scrollY,t0=performance.now();
  function frame(t){const p=Math.min(1,(t-t0)/duration),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;scrollTo(0,start+(dest()-start)*e);if(p<1)requestAnimationFrame(frame);else{scrollTo(0,dest());setTimeout(()=>{scrollTo(0,dest());root.style.scrollBehavior=old;},350);}}
  requestAnimationFrame(frame);
 }
 document.querySelectorAll('[data-bio-start]').forEach(a=>a.addEventListener('click',e=>{
  const section=document.getElementById('quem-te-acompanha');if(!section)return;e.preventDefault();e.stopImmediatePropagation();
  glideTo(()=>section.querySelector('h2')||section,1500);
 }),true);
 document.querySelectorAll('[data-bio-back]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector('.pause-fm')||document.querySelector('[data-bio-start]');if(!target)return;e.preventDefault();e.stopImmediatePropagation();
  glideTo(()=>target,1500);
 }),true);
 // Entering from the gift popup selects only the optional gift; consent stays unchecked.
 if(new URLSearchParams(location.search).get('miminho')==='1'){
  const option=document.getElementById('ofertaTarot');if(option&&!option.checked){option.checked=true;option.dispatchEvent(new Event('change',{bubbles:true}));}
 }
 const form=document.getElementById('partnershipForm');
 if(!form)return;
 const format=form.elements.formato,local=form.querySelector('[data-partnership-location]');
 format.addEventListener('change',()=>{local.hidden=format.value!=='Presencial';});
 const preview=window.FO_SITE_CONFIG?.preview!==false,button=form.querySelector('[type=submit]'),status=form.querySelector('[role=status]'),review=partnership.querySelector('.partnership-review');
 button.textContent=preview?say('Rever o meu convite','Review my invitation'):say('Enviar o meu convite','Send my invitation');
 partnership.querySelector('[data-edit-partnership]').addEventListener('click',()=>{review.hidden=true;form.hidden=false;button.focus();});
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(button.disabled||!form.reportValidity())return;status.textContent='';
  const data=Object.fromEntries(new FormData(form));
  if(['nome','email','telemovel','organizacao','ideia'].some(k=>!String(data[k]||'').trim())){status.textContent=say('Preenche os campos obrigatórios.','Please complete all required fields.');return;}
  if(String(data.telemovel).replace(/\D/g,'').length<7){status.textContent=say('Confirma o telemóvel, incluindo o indicativo.','Please check your mobile number, including the country code.');form.elements.telemovel.focus();return;}
  const labels={nome:say('Nome','Name'),email:'Email',telemovel:say('Telemóvel','Mobile'),organizacao:say('Comunidade ou empresa','Community or company'),sobre:say('Sobre e papel','Context and role'),ideia:say('Ideia para o encontro','Gathering idea'),formato:say('Formato','Format'),localidade:say('Localidade','Location'),pessoas:say('Pessoas','People'),data:say('Data','Date')};
  const message=Object.keys(labels).filter(k=>data[k]&&(k!=='localidade'||format.value==='Presencial')).map(k=>labels[k]+': '+data[k]).join('\n\n')+'\n\n'+say('Privacidade: consentimento para resposta confirmado.','Privacy: consent to receive a reply confirmed.');
  if(preview){review.querySelector('pre').textContent=message;form.hidden=true;review.hidden=false;review.focus();return;}
  const key=window.FO_PAY?.web3formsKey;if(!key){status.textContent=say('O envio ainda não está disponível.','Sending is not available yet.');return;}
  button.disabled=true;button.textContent=say('A enviar…','Sending…');
  try{const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:key,subject:'Convite · '+data.organizacao,from_name:'Site · Convites e parcerias',replyto:data.email,email:data.email,message})});const result=await response.json();if(!response.ok||!result.success)throw Error('send_failed');form.hidden=true;review.hidden=false;review.querySelector('h3').textContent=say('Obrigada pelo teu convite!','Thank you for your invitation!');review.querySelector('p').textContent=say('Recebi a tua mensagem e respondo-te em breve.','Your message has been received. I will reply soon.');review.querySelector('pre').textContent='';review.focus();}
  catch(error){status.textContent=say('Não foi possível enviar. Podes tentar novamente.','Your invitation could not be sent. Please try again.');}
  finally{button.disabled=false;button.textContent=say('Enviar o meu convite','Send my invitation');}
 });
})();
