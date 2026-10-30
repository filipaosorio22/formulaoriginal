/* One catalogue for Portuguese and English. No private API keys. */
(()=>{const preview=true;
const links={leitura:'https://buy.stripe.com/bJe4gz2wZ9AT5qlcHIfw40Y',rs:'https://buy.stripe.com/8x24gzefH28r3idgXYfw410',sessao:'https://buy.stripe.com/00w3cvc7zdR9bOJ4bcfw413',rssessao:'https://buy.stripe.com/00w5kD6Nf4gz2e97nofw414',sessaosolo:'https://buy.stripe.com/14A5kD1sVfZhdWRcHIfw412',rssolo:'https://buy.stripe.com/fZudR99Zr00j4mhgXYfw40k'};
Object.keys(links).forEach(k=>{links[k+'+hd']=links[k]});
// Essência + Momento a 44€ (primeiras 5): links Stripe por criar, com as chaves leitura+momento, rs+momento, sessao+momento e rssessao+momento
// Só Momento, 2 Leituras por 88€ (primeiras 5): promotionLink por criar no TAROT_CONFIG; o link antigo de 44€ deixou de se aplicar
window.FO_SITE_CONFIG={preview,prices:{natal:197,sessionCombo:297,solarReturn:100,moment:88,alignment:125,sessionAddon:100,sessionAddonMoment:109,sessionDurationMinutes:60},giftLimit:5};
window.FO_PAY={preview,web3formsKey:'b2feccdb-b682-491c-8fb8-a56fb482a4ed',stripe:links};
window.TAROT_CONFIG={preview,launchActive:true,promotionLink:"",price:88,regularPrice:88,paymentLink:'https://buy.stripe.com/eVqcN50oR7sLbOJ9vwfw40H',regularPaymentLink:'https://buy.stripe.com/eVqcN50oR7sLbOJ9vwfw40H',web3formsKey:window.FO_PAY.web3formsKey};
if(preview){window['ga-disable-G-5CX792T8H9']=true;document.documentElement.dataset.foPreview='true';}
document.addEventListener('DOMContentLoaded',()=>{if(preview)document.querySelectorAll('form').forEach(f=>{if(['f','tarotForm','mpForm','form','partnershipForm'].includes(f.id))return;f.addEventListener('submit',e=>{e.preventDefault();e.stopImmediatePropagation();const en=document.documentElement.lang.startsWith('en');let status=f.querySelector('[data-local-status]');if(!status){status=document.createElement('p');status.dataset.localStatus='';status.setAttribute('role','status');f.append(status);}status.textContent=en?'Preview: nothing has been sent.':'Pré-visualização: nenhum dado foi enviado.';},true);});});
})();