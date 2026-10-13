/* Subscrição de novidades (MailerLite, grupo de novidades). Abre com qualquer ligação para #novidades. */
(function(){
  var ML_URL = window.FO_NL_URL || '';
  var css = '.nl-pop{position:fixed;inset:0;z-index:300;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(26,20,16,.45);backdrop-filter:blur(3px)}' +
    '.nl-pop.open{display:flex}' +
    '.nl-box{position:relative;width:100%;max-width:420px;max-height:calc(100vh - 32px);overflow:auto;background:var(--card,#fdfaf5);border:.5px solid var(--gold,#c9a86c);border-radius:18px;padding:1.8rem 1.5rem 1.4rem;box-shadow:0 18px 50px rgba(26,20,16,.25);text-align:center;font-family:Lora,serif;color:var(--ink,#1a1410)}' +
    '.nl-x{position:absolute;top:.5rem;right:.8rem;background:none;border:0;font-size:22px;line-height:1;color:var(--gold-deep,#9a7e52);cursor:pointer;padding:6px}' +
    '.nl-box h3{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:clamp(23px,5.5vw,28px);line-height:1.2;margin:0 0 .4rem;color:var(--ink,#1a1410)}' +
    '.nl-box .nl-sub{text-align:center;font-style:italic;color:var(--ink-soft,#5f4a3c);font-size:14.5px;line-height:1.6;margin:0 0 1rem}' +
    '.nl-box label.nl-l{display:block;text-align:left;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#9a8a7a);margin:0 0 4px}' +
    '.nl-box input[type=text],.nl-box input[type=email]{width:100%;box-sizing:border-box;font:inherit;font-size:16px;line-height:1.3;color:var(--ink,#1a1410);background:var(--bg,#faf6ef);border:1px solid rgba(201,168,108,.45);border-radius:10px;padding:10px 11px;min-height:44px;margin-bottom:10px}' +
    '.nl-box input:focus{outline:none;border-color:var(--gold,#c9a86c);box-shadow:0 0 0 3px rgba(201,168,108,.18)}' +
    '.nl-chk{display:flex;gap:9px;align-items:flex-start;text-align:left;font-size:12.5px;line-height:1.5;color:var(--ink-soft,#5f4a3c);margin:.4rem 0 0}' +
    '.nl-chk input{width:17px;height:17px;margin:2px 0 0;flex:none;accent-color:#9a7e52}.nl-chk a{color:var(--gold-deep,#9a7e52)}' +
    '.nl-err{color:var(--wine,#7a2535);font-size:13.5px;margin:.6rem 0 0}.nl-err:empty{display:none}' +
    '.nl-btn{display:block;width:100%;margin-top:1rem;border:0;border-radius:999px;padding:13px 18px;cursor:pointer;font-family:"DM Sans",sans-serif;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#3d2814;background:linear-gradient(135deg,#ecd6a4,#d6b26f 55%,#efdcae)}' +
    '.nl-ok{font-family:"Cormorant Garamond",serif;font-size:21px;line-height:1.4;color:var(--ink,#1a1410);margin:.4rem 0 0}';
  // enquanto o formulário não estiver ligado, a opção do menu fica escondida
  if (!ML_URL){ Array.prototype.forEach.call(document.querySelectorAll('a[href="#novidades"]'), function(a){ a.style.display = 'none'; }); return; }
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var box = document.createElement('div');
  box.className = 'nl-pop'; box.id = 'nlPop'; box.hidden = true;
  box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'nlTitle');
  box.innerHTML = '<div class="nl-box"><button class="nl-x" type="button" aria-label="Fechar" data-nl-close>×</button>' +
    '<form id="nlForm" novalidate><h3 id="nlTitle">Recebe as minhas novidades</h3>' +
    '<p class="nl-sub">Reflexões, novidades e convites sobre negócio, astrologia e autoconhecimento, diretamente no teu email.</p>' +
    '<label class="nl-l" for="nlNome">Nome</label><input type="text" id="nlNome" maxlength="60" autocomplete="given-name">' +
    '<label class="nl-l" for="nlEmail">Email</label><input type="email" id="nlEmail" maxlength="120" autocomplete="email" inputmode="email">' +
    '<label class="nl-chk"><input type="checkbox" id="nlOk"><span>Quero receber os emails da Filipa Osório sobre negócio, astrologia, Human Design e autoconhecimento, e as novidades do seu trabalho. <em>Posso cancelar a subscrição quando quiser.</em> <a href="privacidade.html#emails" target="_blank" rel="noopener">Política de privacidade</a></span></label>' +
    '<p class="nl-err" id="nlErr" role="alert"></p><button class="nl-btn" type="submit" id="nlBtn">✦ Subscrever</button></form></div>';
  document.body.appendChild(box);
  function $(id){ return document.getElementById(id); }
  function open(e){
    if (e) e.preventDefault();
    var mm = $('mobileMenu'); if (mm) mm.style.display = 'none';
    box.hidden = false; box.classList.add('open');
    setTimeout(function(){ var n = $('nlNome'); if (n) n.focus(); }, 50);
  }
  function close(){ box.classList.remove('open'); box.hidden = true; }
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href="#novidades"]'); if (a) open(e);
  });
  if (location.hash === '#novidades') setTimeout(open, 400);
  Array.prototype.forEach.call(box.querySelectorAll('[data-nl-close]'), function(b){ b.addEventListener('click', close); });
  box.addEventListener('click', function(e){ if (e.target === box) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && box.classList.contains('open')) close(); });
  $('nlForm').addEventListener('submit', function(e){
    e.preventDefault();
    var nome = $('nlNome').value.trim(), email = $('nlEmail').value.trim(), err = $('nlErr');
    if (!nome){ err.textContent = 'Escreve o teu nome.'; $('nlNome').focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ err.textContent = 'Confirma o teu email.'; $('nlEmail').focus(); return; }
    if (!$('nlOk').checked){ err.textContent = 'Para continuares, aceita receber os emails.'; return; }
    if (!ML_URL){ err.textContent = 'A subscrição ainda não está disponível. Tenta mais tarde.'; return; }
    err.textContent = '';
    var b = new URLSearchParams();
    b.append('fields[name]', nome); b.append('fields[email]', email); b.append('ml-submit', '1'); b.append('anticsrf', 'true');
    var btn = $('nlBtn'); btn.disabled = true; btn.textContent = 'A enviar…';
    fetch(ML_URL, { method: 'POST', mode: 'no-cors', body: b }).then(function(){
      $('nlForm').innerHTML = '<p class="nl-ok">Obrigada, ' + nome.split(' ')[0].replace(/[<>&"]/g, '') + '! Vais receber um email para confirmares a subscrição.</p>';
    }, function(){
      btn.disabled = false; btn.textContent = '✦ Subscrever';
      err.textContent = 'Não consegui enviar. Verifica a ligação e tenta de novo.';
    });
  });
})();
