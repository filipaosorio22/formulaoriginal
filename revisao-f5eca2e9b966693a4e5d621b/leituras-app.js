'use strict';
const readingAssetBase=new URL('.',document.currentScript.src).href;
(()=>{const button=document.getElementById('freqToggle'),audio=document.getElementById('freqAudio');if(!button||!audio)return;const en=document.documentElement.lang.startsWith('en'),labels=en?['🔊 Tune into the frequency','🔊 Back to silence']:['🔊 Entrar na frequência','🔊 Sentir em silêncio'];const paint=()=>{button.textContent=audio.paused?labels[0]:labels[1];button.setAttribute('aria-pressed',String(!audio.paused));};button.addEventListener('click',()=>{if(audio.paused){audio.play().then(paint).catch(()=>{button.textContent=labels[0];button.setAttribute('aria-pressed','false');});}else{audio.pause();paint();}});audio.addEventListener('ended',paint);paint();})();
if(window.TAROT_CONFIG&&window.TAROT_CONFIG.preview===false)document.querySelectorAll('.preview').forEach(el=>el.hidden=true);
const archetypes={
 enamorados:{title:'Os Enamorados',kicker:'Escolha · valores · relação',image:'assets/enamorados-rws-original.jpg?v=20261027rws',caption:'Os Enamorados · Ilustração original inspirada no Rider–Waite–Smith.',intro:'O nome pode fazer pensar imediatamente no amor. Mas esta carta também pode abrir uma reflexão sobre escolhas, sobre o que valorizas e sobre como concilias diferentes desejos.',
 relacoes:['Numa pergunta sobre uma relação, pode ser um convite a olhar para a forma como te ligas a alguém e para aquilo que escolhes cultivar nesse vínculo.','«O que desejo viver nesta relação ,  e o que preciso de respeitar em mim?»','Também podemos explorar uma tensão: estou a escolher por vontade própria, por medo de perder ou para corresponder ao que esperam de mim?'],
 trabalho:['Numa escolha profissional, o mesmo símbolo pode trazer a relação entre o que valorizas e os caminhos que estás a considerar.','«O que está realmente em jogo nesta escolha: segurança, liberdade, pertença ou outra coisa?»','Podemos olhar para o que cada opção representa para ti, sem transformar a carta numa ordem para ficar ou sair.'],
 pessoal:['Quando o tema é a tua relação contigo, a escolha pode ser interior: conciliar desejos diferentes ou reconhecer uma vontade que tens deixado de lado.','«Onde estou a dizer que sim para ser aceite, quando sinto que preciso de outra coisa?»','Outra perspetiva pode ser a dificuldade em escolher, não por falta de opções, mas porque cada caminho implica deixar algo para trás.']},
 louco:{title:'O Louco',kicker:'Começo · abertura · primeiro passo',image:'assets/louco-rws-original.jpg?v=20261027rws',caption:'O Louco · Ilustração original inspirada no Rider–Waite–Smith.',intro:'Uma imagem de partida e de abertura ao que ainda não conheces. Pode convidar a experimentar um caminho novo ou a olhar com cuidado para a diferença entre confiança e precipitação.',
 relacoes:['Num tema sobre relações, esta carta pode abrir perguntas sobre a disponibilidade para conhecer alguém de uma forma nova ou para experimentar outra maneira de estar num vínculo.','«O que posso descobrir se deixar de tentar controlar antecipadamente como tudo vai acontecer?»','A mesma imagem também permite perguntar: estou disponível para o encontro ou procuro apenas fugir ao que me custa? Não é uma afirmação sobre as intenções da outra pessoa.'],
 trabalho:['Numa mudança profissional, pode ajudar a explorar o que te chama num começo e o que precisas de conhecer antes de dar um passo.','«Qual seria uma forma pequena e possível de experimentar esta ideia?»','A abertura a algo novo não garante o resultado. Podemos perguntar se estás a avançar por curiosidade e vontade ou por urgência em sair de onde estás.'],
 pessoal:['Num tema pessoal, a imagem de um começo pode convidar-te a recuperar curiosidade ou a reconhecer onde precisas de saber tudo antes de experimentar.','«O que me permitiria começar sem exigir de mim que já soubesse o caminho inteiro?»','Noutra perspetiva, podemos olhar para algo que pedes constantemente aos outros: de que forma a procura de aprovação influencia o teu primeiro passo?']}
};
let activeCard='enamorados',activeContext='relacoes';
function renderExample(){
 const c=archetypes[activeCard],v=c[activeContext];
 const el=id=>document.getElementById(id);
 if(!el('exampleCard'))return;
 el('exampleCard').src=new URL(c.image,readingAssetBase).href;el('exampleCard').alt=document.documentElement.lang.startsWith('en')?(activeCard==='enamorados'?'The Lovers ,  illustrative card':'The Fool ,  illustrative card'):activeCard==='enamorados'?'Os Enamorados ,  ilustração inspirada no Rider–Waite–Smith':'Ilustração simbólica da carta O Louco';el('cardCaption').textContent=c.caption;
 el('cardTitle').textContent=c.title;el('cardKicker').textContent=c.kicker;el('cardIntro').textContent=c.intro;
 el('contextText').textContent=v[0];el('contextQuestion').textContent=v[1];el('contextNuance').textContent=v[2];
 el('perspective').setAttribute('aria-labelledby','tab-'+activeContext);
 document.querySelectorAll('[data-card]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.card===activeCard)));
 document.querySelectorAll('[data-context]').forEach(b=>{const selected=b.dataset.context===activeContext;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});
}
document.querySelectorAll('[data-card]').forEach(b=>b.addEventListener('click',()=>{activeCard=b.dataset.card;renderExample();}));
const tabs=[...document.querySelectorAll('[data-context]')];
tabs.forEach((b,i)=>{b.addEventListener('click',()=>{activeContext=b.dataset.context;renderExample();});b.addEventListener('keydown',e=>{let j=i;if(e.key==='ArrowRight')j=(i+1)%tabs.length;else if(e.key==='ArrowLeft')j=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')j=0;else if(e.key==='End')j=tabs.length-1;else return;e.preventDefault();activeContext=tabs[j].dataset.context;renderExample();tabs[j].focus();});});
document.querySelectorAll('audio').forEach(a=>a.addEventListener('play',()=>{document.querySelectorAll('audio').forEach(other=>{if(other!==a)other.pause();});}));
const english=document.documentElement.lang.startsWith('en');
const ui=s=>english?({'Enviar e continuar para pagamento':'Send and continue to payment','As tuas respostas são enviadas à Filipa e segues para o pagamento seguro no Stripe.':'Your answers are sent to Filipa, then you continue to secure payment with Stripe.','Confirma o número de telemóvel, incluindo o indicativo.':'Check your mobile number, including the country code.','O pedido online ainda não está disponível. Tenta novamente mais tarde.':'Online requests are not available yet. Please try again later.','A preparar o pagamento…':'Preparing your payment…','Não foi possível enviar o teu pedido. Nenhum pagamento foi iniciado. Podes tentar novamente.':'Your request could not be sent. No payment was initiated. You can try again.'}[s]||s):s;
const form=document.getElementById('tarotForm');
if(form){
 const by=id=>document.getElementById(id),cfg=window.TAROT_CONFIG||{preview:true,price:88};
 let submitting=false,requestRef=null;
 const promotionOption=by('momentoPromo'),promotionConsent=by('momentoPromoConsent');
 const regularPayment=cfg.paymentLink;
 function syncOther(){const o=by('outraPessoa');if(!o)return;const on=o.checked&&!by('segundoTema').hidden;document.querySelectorAll('[data-outra]').forEach(n=>n.hidden=!on);by('outraNome').required=on;const sec=!by('segundoTema').hidden;['tema2','contexto2'].forEach(id=>{const n=by(id);if(!n)return;const w=n.closest('.field');if(w)w.hidden=on;n.required=sec&&!on;});}
 by('outraPessoa')?.addEventListener('change',syncOther);
 function syncPromotion(){
  const promo=cfg.launchActive===true||!!promotionOption?.checked;cfg.price=88;cfg.two=promo;cfg.paymentLink=promo&&cfg.promotionLink?cfg.promotionLink:regularPayment;
  const second=by('segundoTema');if(second){second.hidden=!promo;['tema2','contexto2'].forEach(id=>{const n=by(id);if(n)n.required=promo;});syncOther();}
  if(promotionConsent){promotionConsent.required=promo;if(!promo)promotionConsent.checked=false;}
  const wrapper=by('momentoPromoConsentWrap');if(wrapper)wrapper.hidden=!promo;
  document.querySelectorAll('[data-moment-price]').forEach(n=>n.textContent=(english?'€':'')+cfg.price+(english?'':'€'));
  document.querySelectorAll('.form-price strong').forEach(n=>n.textContent=promo?(english?'2 Now Readings · €88':'2 Leituras de Momento · 88€'):((english?'The Now Reading · €':'Leitura de Momento · ')+cfg.price+(english?'':'€')));
 }
 if(promotionOption){promotionOption.checked=cfg.launchActive===true||new URLSearchParams(location.search).get('miminho')==='1';promotionOption.addEventListener('change',syncPromotion);syncPromotion();}

 if(!cfg.preview){by('submitPedido').textContent=ui('Enviar e continuar para pagamento');by('formNotice').textContent=ui('As tuas respostas são enviadas à Filipa e segues para o pagamento seguro no Stripe.');}
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(submitting)return;const status=by('formStatus');status.textContent='';if(!form.reportValidity())return;
  if(promotionOption?.checked&&!promotionConsent?.checked){status.textContent=english?'Please confirm you will share your testimonial, or deselect the offer.':'Confirma o compromisso de partilhar o teu testemunho ou retira a oferta.';promotionConsent?.focus();return;}
  const labels={nome:'Nome',apelido:'Apelido',email:'E-mail',telefone:'Telemóvel / WhatsApp',nif:'NIF',tema:'Tema ou pergunta',contexto:'Contexto',tema2:'2.º tema ou pergunta',contexto2:'Contexto do 2.º tema',outraNome:'2.ª Leitura para (nome) · essa pessoa preenche o formulário da 2.ª Leitura',outraEmail:'E-mail dessa pessoa',desejo:'O que gostaria de compreender',idioma:'Idioma da leitura'};
  const data={};Object.keys(labels).forEach(id=>data[id]=by(id)?by(id).value.trim():'');
  const other=cfg.two&&by('outraPessoa')?.checked;if(!other){data.outraNome='';data.outraEmail='';}
  if(other){data.tema2='';data.contexto2='';data.outraEmail='';}
  for(const id of ['nome','apelido','email','telefone','tema','contexto'].concat(cfg.two&&!other?['tema2','contexto2']:[]).concat(other?['outraNome']:[])){if(!data[id]){status.textContent=english?'Please complete this field.':'Preenche o campo «'+labels[id]+'».';by(id).focus();return;}}
  if(data.telefone.replace(/\D/g,'').length<7){status.textContent=ui('Confirma o número de telemóvel, incluindo o indicativo.');by('telefone').focus();return;}
  if(!requestRef)requestRef=cfg.preview!==false?'DEMONSTRACAO':('tarot_'+crypto.randomUUID().replace(/-/g,''));
  const promotionNote=promotionOption?.checked?(english?'Return promotion: 2 Now Readings on 2 themes for 88 EUR, limited to the first five people. Testimonial about the experience agreed.\n\n':'Promoção de regresso: 2 Leituras de Momento sobre 2 temas por 88 EUR, limitada às primeiras cinco pessoas. Compromisso de testemunho sobre a experiência aceite.\n\n'):'';
  const message=promotionNote+'Pedido expresso de preparação nas 24 horas após pagamento e dados completos: confirmado. Perda do direito após prestação integral: reconhecida.\n\nReferência do pedido: '+requestRef+'\nEstado: aguarda confirmação do pagamento\n\n'+(cfg.two?'2 Leituras de Momento · 88 €':'Leitura de Momento · '+(cfg.price||88)+' €')+'\nEntrega em áudio · até 5 dias úteis após pagamento e receção do contexto\n\n'+Object.keys(labels).filter(id=>data[id]).map(id=>labels[id]+': '+data[id]).join('\n\n');
  if(cfg.preview!==false){by('resumoTexto').textContent=english?((cfg.two?'2 Now Readings · €88':'The Now Reading · €'+(cfg.price||88))+'\nPersonalised audio · within 5 business days after payment and receipt of your context\n\n'+Object.keys(labels).filter(id=>data[id]).map(id=>({nome:'First name',apelido:'Last name',email:'Email',telefone:'Mobile / WhatsApp',nif:'Tax ID',tema:'Theme or question',contexto:'Context',tema2:'2nd theme or question',contexto2:'Context for the 2nd theme',outraNome:'2nd reading for (name) · they will send their theme and context by message',outraEmail:'Their email',desejo:'What I’d like to understand',idioma:'Reading language'}[id])+': '+data[id]).join('\n\n')):message;by('pedidoResumo').hidden=false;form.hidden=true;by('resumoTitle').focus();by('pedidoResumo').scrollIntoView({block:'center',behavior:'smooth'});return;}
  if(!cfg.paymentLink||!/^https:\/\/buy\.stripe\.com\//.test(cfg.paymentLink)||!cfg.web3formsKey){status.textContent=ui('O pedido online ainda não está disponível. Tenta novamente mais tarde.');return;}
  const submit=by('submitPedido');submitting=true;submit.disabled=true;submit.textContent=ui('A preparar o pagamento…');
  try{
   const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:cfg.web3formsKey,subject:'Pedido Tarot · '+requestRef+' · '+data.nome+' '+data.apelido,from_name:'Site · Leitura de Tarot',replyto:data.email,email:data.email,message})});
   const result=await response.json();if(!response.ok||!result.success)throw new Error('submit_failed');
   const dest=new URL(cfg.paymentLink);dest.searchParams.set('prefilled_email',data.email);dest.searchParams.set('client_reference_id',requestRef);dest.searchParams.set('locale',english?'en':'pt');location.assign(dest.toString());
  }catch(error){status.textContent=ui('Não foi possível enviar o teu pedido. Nenhum pagamento foi iniciado. Podes tentar novamente.');submitting=false;submit.disabled=false;submit.textContent=ui('Enviar e continuar para pagamento');}
 });
 by('voltarForm').addEventListener('click',()=>{by('pedidoResumo').hidden=true;form.hidden=false;by('nome').focus();});
}

renderExample();

