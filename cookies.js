/* Aviso de cookies comum a todas as páginas: a escolha fica guardada para o site todo (fo_cookie_consent). */
window.__loadClarity = window.__loadClarity || function(){
  try { if (localStorage.getItem('fo_owner') === '1') return; } catch(e){}
  if (window.__clarityLoaded) return;
  window.__clarityLoaded = true;
  (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "z295fnhz4t");
  window.clarity('consentv2', {ad_Storage: 'denied', analytics_Storage: 'granted'});
};
(function(){
  var KEY = 'fo_cookie_consent', MAX = 1000*60*60*24*180;
  var T = {
    pt: { txt: 'Uso cookies para estatísticas (Google Analytics e leitura de como a página é usada) e para o calendário de marcações (Cal.com) funcionar aqui na página e melhorar a tua experiência no site.', more: 'Saber mais', no: 'Recusar', man: 'Gerir preferências', yes: 'Aceitar', title: 'As tuas preferências de cookies', nec: 'Necessários', necd: 'O site em si, sempre ativos, não guardam identificadores.', st: 'Estatísticas', std: 'Ajuda-me a perceber quantas pessoas visitam o site e como o percorrem (mapas de calor e gravações anónimas).', cal: 'Calendário de marcações', cald: 'Permite marcares sessões diretamente aqui na página.', back: 'Voltar', save: 'Guardar preferências', priv: '/revisao-f5eca2e9b966693a4e5d621b/p-privacidade.html' },
    en: { txt: 'I use cookies for statistics (Google Analytics and how the page is used) and so the booking calendar (Cal.com) works on this page and improves your experience on the site.', more: 'Learn more', no: 'Decline', man: 'Manage preferences', yes: 'Accept', title: 'Your cookie preferences', nec: 'Necessary', necd: 'The site itself, always on, they do not store identifiers.', st: 'Statistics', std: 'Helps me understand how many people visit the site and how they move through it (heatmaps and anonymous recordings).', cal: 'Booking calendar', cald: 'Lets you book sessions directly on this page.', back: 'Back', save: 'Save preferences', priv: '/revisao-f5eca2e9b966693a4e5d621b/p-privacidade.html' }
  };
  var t = T[(document.documentElement.lang || 'pt').indexOf('en') === 0 ? 'en' : 'pt'];
  function get(){ try { var raw = localStorage.getItem(KEY); if (!raw) return null; var o = JSON.parse(raw); if (!o.ts || Date.now() - o.ts > MAX) return null; return o; } catch(e){ return null; } }
  function set(a, c){ try { localStorage.setItem(KEY, JSON.stringify({ analytics: !!a, calendly: !!c, ts: Date.now() })); } catch(e){} if (!a && window.clarity) { try { window.clarity('consentv2', {ad_Storage: 'denied', analytics_Storage: 'denied'}); } catch(e){} } }
  function loadGA(){ if (window.__gaLoaded) return; window.__gaLoaded = true; var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-5CX792T8H9'; document.head.appendChild(s); window.dataLayer = window.dataLayer || []; window.gtag = function(){ dataLayer.push(arguments); }; gtag('js', new Date()); gtag('config', 'G-5CX792T8H9'); }
  function loadCal(){ if (window.__calLoaded || window.__calReq) return; window.__calReq = true; if (window.__loadCalEmbed) window.__loadCalEmbed(); }
  function apply(c){ if (c.analytics) { loadGA(); if (window.__loadClarity) window.__loadClarity(); } if (c.calendly) loadCal(); }
  var F = "font-family:'DM Sans',sans-serif;";
  var BTN = F + 'font-size:12px; font-weight:300; letter-spacing:0.06em; text-transform:uppercase; border-radius:30px; padding:10px 18px; cursor:pointer;';
  var html = '<div id="cookieVeil" style="display:none; position:fixed; inset:0; background:transparent; pointer-events:none; z-index:998;"></div>' +
    '<div id="cookieBanner" style="display:none; position:fixed; left:0; right:0; bottom:0; z-index:999; background:#faf6ef; border-top:0.5px solid rgba(201,168,108,0.5); padding:1.25rem 1.5rem calc(1.25rem + env(safe-area-inset-bottom, 0px)); box-shadow:0 -4px 24px rgba(26,20,16,0.12); max-height:85vh; overflow-y:auto;">' +
    '<div id="cookieSimple" style="max-width:760px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; gap:1rem; justify-content:space-between;">' +
    '<p style="' + F + 'font-size:13px; font-weight:300; color:#1a1410; line-height:1.6; flex:1; min-width:220px; margin:0; text-align:left;">' + t.txt + ' <a href="' + t.priv + '" style="color:#7a2535; text-decoration:underline;">' + t.more + '</a></p>' +
    '<div style="display:flex; gap:0.6rem; flex-shrink:0; flex-wrap:wrap;"><button id="cookieReject" style="' + BTN + 'background:transparent; border:1px solid #7a2535; color:#7a2535;">' + t.no + '</button><button id="cookieManage" style="' + BTN + 'background:transparent; border:1px solid #9a7e52; color:#9a7e52;">' + t.man + '</button><button id="cookieAcceptAll" style="' + BTN + 'background:#7a2535; border:1px solid #7a2535; color:#f7f3ee;">' + t.yes + '</button></div></div>' +
    '<div id="cookiePrefs" style="display:none; max-width:520px; margin:0 auto;"><p style="font-family:\'Spectral\',serif; font-style:italic; font-size:17px; color:#1a1410; margin:0 0 1rem;">' + t.title + '</p>' +
    '<label style="display:flex; align-items:flex-start; gap:0.6rem; margin-bottom:0.9rem; ' + F + 'font-size:13px; color:#1a1410; line-height:1.5;"><input type="checkbox" checked disabled style="margin-top:3px;"><span><strong>' + t.nec + '</strong><br><span style="color:#6b5040; font-weight:300;">' + t.necd + '</span></span></label>' +
    '<label style="display:flex; align-items:flex-start; gap:0.6rem; margin-bottom:0.9rem; ' + F + 'font-size:13px; color:#1a1410; line-height:1.5;"><input type="checkbox" id="prefAnalytics" style="margin-top:3px;"><span><strong>' + t.st + '</strong>, Google Analytics + Microsoft Clarity<br><span style="color:#6b5040; font-weight:300;">' + t.std + '</span></span></label>' +
    '<label style="display:flex; align-items:flex-start; gap:0.6rem; margin-bottom:1.2rem; ' + F + 'font-size:13px; color:#1a1410; line-height:1.5;"><input type="checkbox" id="prefCalendly" style="margin-top:3px;"><span><strong>' + t.cal + '</strong>, Cal.com<br><span style="color:#6b5040; font-weight:300;">' + t.cald + '</span></span></label>' +
    '<div style="display:flex; gap:0.6rem; justify-content:flex-end;"><button id="cookieBack" style="' + F + 'font-size:12px; font-weight:300; letter-spacing:0.06em; text-transform:uppercase; background:transparent; border:none; color:#9a7e52; cursor:pointer; text-decoration:underline;">' + t.back + '</button><button id="cookieSavePrefs" style="' + BTN + 'background:#7a2535; border:1px solid #7a2535; color:#f7f3ee;">' + t.save + '</button></div></div></div>';
  document.body.insertAdjacentHTML('beforeend', html);
  function $(id){ return document.getElementById(id); }
  function hide(){ $('cookieVeil').style.display = 'none'; $('cookieBanner').style.display = 'none'; }
  function show(prefs){
    $('cookieVeil').style.display = 'block'; $('cookieBanner').style.display = 'block';
    var ex = get(); $('prefAnalytics').checked = ex ? !!ex.analytics : false; $('prefCalendly').checked = ex ? !!ex.calendly : false;
    $('cookieSimple').style.display = prefs ? 'none' : 'flex'; $('cookiePrefs').style.display = prefs ? 'block' : 'none';
  }
  window.fowReopenCookiePrefs = function(){ show(true); };
  $('cookieReject').addEventListener('click', function(){ set(false, false); hide(); });
  $('cookieAcceptAll').addEventListener('click', function(){ set(true, true); apply({ analytics: true, calendly: true }); hide(); });
  $('cookieManage').addEventListener('click', function(){ show(true); });
  $('cookieBack').addEventListener('click', function(){ show(false); });
  $('cookieSavePrefs').addEventListener('click', function(){ var a = $('prefAnalytics').checked, c = $('prefCalendly').checked; set(a, c); apply({ analytics: a, calendly: c }); hide(); });
  if (!get()) { setTimeout(function(){ show(false); }, 900); }
})();
