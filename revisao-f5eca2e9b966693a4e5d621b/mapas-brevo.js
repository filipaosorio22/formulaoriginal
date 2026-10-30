/* Envia o contacto de quem desenha um mapa para o formulário do Brevo (sem chaves privadas; o e-mail nunca vai no URL).
   Colar aqui o endereço «action» de cada formulário do Brevo. Vazio = não envia. */
window.FO_BREVO_MAPS={astral:'',hd:''};
window.foSendMap=function(kind,email,info,extra){
 const url=(window.FO_BREVO_MAPS||{})[kind];if(!url||!email)return;
 const pad=n=>String(n).padStart(2,'0'),other=new URLSearchParams(location.search).get('outra')==='1';
 const f={EMAIL:email,OPT_IN:'1',email_address_check:'',locale:'pt'};
 // mapa de outra pessoa: só o e-mail de quem pede; os dados de nascimento não ficam na ficha
 if(!other){
  const parts=(info.name||'').trim().split(/\s+/);f.FIRSTNAME=parts.shift()||'';f.LASTNAME=parts.join(' ');
  f.DATA_NASCIMENTO=pad(info.d)+'-'+pad(info.mo)+'-'+info.y;f.HORA_NASCIMENTO=pad(info.hh)+':'+pad(info.mi);f.LOCAL_NASCIMENTO=info.place.name+(info.place.country?', '+info.place.country:'');
  Object.assign(f,extra||{});
 }
 const key='fo_brevo_'+kind+'_'+email+'_'+(other?'outra':f.DATA_NASCIMENTO+f.HORA_NASCIMENTO);
 try{if(localStorage.getItem(key))return;localStorage.setItem(key,'1');}catch(e){}
 const body=new URLSearchParams();Object.keys(f).forEach(k=>{if(f[k]!=='')body.append(k,f[k]);});if(!body.has('email_address_check'))body.append('email_address_check','');
 // sendBeacon: a prévia bloqueia fetch POST nos outros formulários; os mapas têm de chegar ao Brevo
 try{if(!(navigator.sendBeacon&&navigator.sendBeacon(url,body)))fetch(url,{method:'POST',mode:'no-cors',body,keepalive:true}).catch(()=>{});}catch(e){}
};
