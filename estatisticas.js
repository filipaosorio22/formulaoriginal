/* Estatísticas (Google Analytics) na página inicial, Leitura do Momento, pedido e confirmação. Só carrega depois de a pessoa aceitar.
   As visitas da Filipa: ?eu=filipa deixa de contar neste browser; ?eu=visita volta a contar. */
(function(){
  var ID='G-5CX792T8H9', KEY='fo_stats_consent', CEEN='fo_cookie_consent', MAX=1000*60*60*24*180;
  function ls(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  var q=location.search;
  try{ if(/[?&]eu=filipa\b/.test(q)) localStorage.setItem('fo_owner','1'); if(/[?&]eu=visita\b/.test(q)) localStorage.removeItem('fo_owner'); }catch(e){}
  if(ls('fo_owner')==='1'){ window['ga-disable-'+ID]=true; return; }
  function escolha(k){ try{ var o=JSON.parse(ls(k)); return o&&o.ts&&Date.now()-o.ts<MAX?o:null; }catch(e){ return null; } }
  function carregar(){
    if(window.__gaLoaded) return;
    if(!/^(www\.)?filipaosorio\.com$/.test(location.hostname)||/[?&]preview\b/.test(q)) return;  /* pré-visualizações não contam */
    window.__gaLoaded=true;
    window.dataLayer=window.dataLayer||[]; window.gtag=function(){ dataLayer.push(arguments); };
    /* só o endereço da página e a origem da campanha: nada do que a pessoa escreve */
    var u=new URLSearchParams(q), limpo=new URLSearchParams();
    u.forEach(function(v,k){ if(/^utm_/.test(k)||k==='fbclid') limpo.append(k,v); });
    var s=limpo.toString();
    gtag('js',new Date());
    gtag('config',ID,{page_location:location.origin+location.pathname+(s?'?'+s:''),allow_google_signals:false,allow_ad_personalization_signals:false});
    var el=document.createElement('script'); el.async=true; el.src='https://www.googletagmanager.com/gtag/js?id='+ID; document.head.appendChild(el);
  }
  var c=escolha(KEY), antes=escolha(CEEN);
  if(c){ if(c.analytics) carregar(); return; }
  if(antes){ if(antes.analytics) carregar(); return; }   /* já tinha escolhido na página da CEEN */
  function aviso(){
    var css=document.createElement('style');
    css.textContent='#fo-aviso{position:fixed;left:16px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));margin:0 auto;max-width:720px;z-index:2147483000;box-sizing:border-box;background:#f8f3dd;border:1px solid #b18b55;border-radius:14px;box-shadow:0 8px 30px rgba(42,26,29,.22);padding:16px 18px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px}'+
      '#fo-aviso p{flex:1 1 300px;margin:0!important;font:400 14px/1.55 Futura,"DM Sans",sans-serif!important;color:#2a1a1d!important;text-align:left!important}#fo-aviso a{color:#7a2535;text-decoration:underline}'+
      '#fo-aviso div{display:flex;gap:10px;flex:0 0 auto}#fo-aviso button{min-width:112px;min-height:42px;border-radius:99px;border:1px solid #7a2535;cursor:pointer;font:400 13px/1 Futura,"DM Sans",sans-serif;letter-spacing:.08em;text-transform:uppercase;background:#7a2535;color:#f8f3dd}'+
      '@media(max-width:520px){#fo-aviso{left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px))}#fo-aviso div{flex:1 1 100%}#fo-aviso button{flex:1}}';
    var d=document.createElement('div'); d.id='fo-aviso'; d.setAttribute('role','region'); d.setAttribute('aria-label','Aviso de cookies');
    d.innerHTML='<p>Posso contar a tua visita? Uso cookies do Google Analytics para saber quantas pessoas chegam ao site e que páginas veem, só se aceitares. <a href="privacidade.html#legal-section-7">Saber mais</a></p><div><button type="button" data-v="0">Recusar</button><button type="button" data-v="1">Aceitar</button></div>';
    d.addEventListener('click',function(e){
      var v=e.target.getAttribute&&e.target.getAttribute('data-v'); if(v===null||v===undefined) return;
      try{ localStorage.setItem(KEY,JSON.stringify({analytics:v==='1',ts:Date.now()})); }catch(x){}
      d.remove(); if(v==='1') carregar();
    });
    document.head.appendChild(css); document.body.appendChild(d);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',aviso); else aviso();
})();
