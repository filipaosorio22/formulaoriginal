/* No private credentials. Email stays out of URLs. Preview never sends contacts. */
(()=>{
 const KEY='fo_map_identity_v4',config=window.FO_MAPS_CONFIG||{},root=document.documentElement;
 const get=id=>document.getElementById(id),preview=window.FO_SITE_CONFIG?.preview!==false;
 let identity=null;
 try{const saved=JSON.parse(sessionStorage.getItem(KEY)||'null');if(saved&&saved.expires>Date.now())identity=saved;}catch{}
 const collectionEnabled=config.collectionEnabled!==false||preview;
 const api=window.FO_MAPS={identity,authorized:!collectionEnabled};
 const safeSet=v=>{api.identity=identity=v;try{sessionStorage.setItem(KEY,JSON.stringify(v));}catch{}};
 const validEmail=s=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
 function otherField(form){return form.id==='mpForm'?get('mpOutra'):get('foOutra');}
 function prepareFields(){
  const form=get('mpForm')||get('form');if(!form||!get('foMapEmail'))return;
  const other=otherField(form),q=new URLSearchParams(location.search);
  if(identity){get('foMapEmail').value=identity.email;get('foMapPrivacy').checked=true;get('foMapMarketing').checked=!!identity.marketing;get('foSubscriberName').value=identity.subscriberName;if(q.get('outra')==='1'&&q.get('nome')===identity.chartName)get('foMapThirdConsent').checked=identity.thirdConsent===true;}
  if(other&&q.get('outra')==='1')other.checked=true;
  function sync(){const on=!!other?.checked;document.querySelector('.fo-map-other-name').hidden=!on;document.querySelector('.fo-third-consent').hidden=!on;get('foSubscriberName').required=on;get('foMapThirdConsent').required=on;}
  other?.addEventListener('change',sync);sync();
 }
 document.addEventListener('DOMContentLoaded',prepareFields);
 document.addEventListener('submit',e=>{
  const form=e.target;if(!['mpForm','form'].includes(form.id)||!get('foMapEmail'))return;
  const embedded=window.parent!==window;
  if(embedded&&identity&&identity.expires>Date.now()){api.authorized=false;return;}
  const email=get('foMapEmail').value.trim(),other=!!otherField(form)?.checked;
  const name=other?get('foSubscriberName').value.trim():(get(form.id==='mpForm'?'mpNome':'nome')?.value.trim()||'');
  let message='';let focus='foMapEmail';
  if(!validEmail(email))message='Escreve um e-mail válido para veres o mapa.';
  else if(!get('foMapPrivacy').checked){message='Confirma o tratamento dos dados e a Política de Privacidade.';focus='foMapPrivacy';}
  else if(!name){message='Escreve o teu nome, como pessoa que pede o mapa.';focus='foSubscriberName';}
  else if(other&&!get('foMapThirdConsent').checked){message='Confirma que tens autorização para usar os dados desta pessoa.';focus='foMapThirdConsent';}
  if(message){e.preventDefault();e.stopImmediatePropagation();const err=get(form.id==='mpForm'?'mpErr':'err');if(err)err.textContent=message;get(focus).focus();return;}
  safeSet({email,subscriberName:name,chartName:[get(form.id==='mpForm'?'mpNome':'nome')?.value.trim(),form.id==='mpForm'?get('mpApelido')?.value.trim():''].filter(Boolean).join(' '),other,privacy:true,thirdConsent:other&&get('foMapThirdConsent').checked,marketing:get('foMapMarketing').checked,consentedAt:new Date().toISOString(),privacyVersion:config.privacyVersion,expires:Date.now()+2*3600000,generationId:crypto.randomUUID()});
  api.authorized=false;
 },true);
 api.onRendered=async function({kind,info,summary},unlock){
  if(!collectionEnabled){api.authorized=true;root.classList.remove('fo-map-failed');unlock();consolidateBenefit();return;}
  const err=get('err');api.authorized=false;root.classList.add('fo-map-saving');
  if(!identity||identity.expires<Date.now()){
   if(err)err.textContent='Preenche o teu e-mail e confirma o tratamento dos dados antes de veres o mapa.';
   root.classList.remove('fo-map-saving');root.classList.add('fo-map-failed');return;
  }
  const record={generationId:identity.generationId,kind,chartName:info.name,birthDate:[info.y,String(info.mo).padStart(2,'0'),String(info.d).padStart(2,'0')].join('-'),birthTime:String(info.hh).padStart(2,'0')+':'+String(info.mi).padStart(2,'0'),birthPlace:info.place.name,timezone:info.place.tz,other:identity.other,summary};
  try{
   if(!preview){
    if(!config.endpoint)throw Error('A recolha dos mapas está temporariamente indisponível. Tenta novamente mais tarde.');
    const response=await fetch(config.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({identity,record}),signal:AbortSignal.timeout(15000)});
    const body=await response.json();if(!response.ok||body.saved!==true)throw Error('Não foi possível guardar o teu pedido. Tenta novamente.');
   }
   api.authorized=true;root.classList.remove('fo-map-failed');unlock();
   if(err)err.textContent=preview?'Pré-visualização: mapa calculado, sem enviar nem guardar dados no Brevo.':'';
   consolidateBenefit();
  }catch(error){root.classList.add('fo-map-failed');if(err){err.textContent=error.message||'Não foi possível guardar o mapa.';err.scrollIntoView({block:'center'});}}
  finally{root.classList.remove('fo-map-saving');}
 };
 function consolidateBenefit(){
  const both=new URLSearchParams(location.search).get('tambem')==='hd';if(!both||window.parent!==window)return;
  document.body.classList.add('fo-both-maps');
  let shared=get('mapBenefitShared');if(!shared){shared=document.createElement('p');shared.id='mapBenefitShared';shared.className='map-benefit-shared';shared.textContent='Na Leitura, recebes perguntas e práticas para o teu dia-a-dia, para começares a transformar as crenças que reconheces em ti. Nas sessões de alinhamento vamos mais longe: com outras ferramentas e o meu método único, para que possas transcender o teu mapa, integrando tudo o que ele te propõe.';}
  const after=get('hdCol')||get('result');after?.after(shared);
 }
})();
