/* Medição partilhada (marcar-leitura, obrigada-leitura, obrigada-alinhamento).
   - ?eu=filipa desliga o Analytics neste browser; ?eu=visita volta a ligar.
   - Só carrega o Google Analytics se a pessoa já aceitou as estatísticas (mesmo consentimento do resto do site).
   - window.foEv(nome, parametros) envia sempre idioma e pagina, como na CEEN. */
(function(){
  var GA = 'G-5CX792T8H9', KEY = 'fo_cookie_consent', MAX_AGE = 1000*60*60*24*180;
  try {
    var q = location.search;
    if (/[?&]eu=filipa\b/.test(q)) localStorage.setItem('fo_owner', '1');
    if (/[?&]eu=visita\b/.test(q)) localStorage.removeItem('fo_owner');
    if (localStorage.getItem('fo_owner') === '1') window['ga-disable-' + GA] = true;
  } catch (e) {}

  function consent(){
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || 'null');
      return !!(o && o.ts && Date.now() - o.ts <= MAX_AGE && o.analytics);
    } catch (e) { return false; }
  }
  function lang(){
    var l; try { l = sessionStorage.getItem('fo_lang'); } catch (e) {}
    return String(l || document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
  }

  if (consent() && !window.__gaLoaded) {
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA);
  }

  window.foEv = function(nome, p){
    try {
      if (typeof window.gtag !== 'function') return;
      var o = { idioma: lang(), pagina: location.pathname };
      for (var k in (p || {})) if (Object.prototype.hasOwnProperty.call(p, k)) o[k] = p[k];
      window.gtag('event', nome, o);
    } catch (e) {}
  };
})();
