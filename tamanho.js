/* Tamanho da letra: o padrão é o tamanho normal (igual em todos os browsers). A lupa no menu aumenta a letra; a escolha fica guardada neste browser. */
(function(){
var d=document,h=d.documentElement,en=(h.lang||'pt').indexOf('en')===0,KEY='fo_tam';
try{h.removeAttribute('data-size');}catch(e){}
var st=d.createElement('style');
st.textContent='@media(min-width:641px){html[data-tam=grande] body{zoom:1.12}}'+
'html body .site-size{display:inline-flex!important;align-items:center;justify-content:center;border:1px solid #b79864;background:transparent;border-radius:50%;width:36px;height:36px;padding:0;color:#7a2535;cursor:pointer;flex-shrink:0}'+
'html body .site-size svg{width:17px;height:17px;display:block}html body .site-size .mi{display:none}html[data-tam=grande] body .site-size .mi{display:block}html[data-tam=grande] body .site-size .pl{display:none}'+
'html[data-tam=grande] body .site-size{background:#c9a86c44}html[data-theme=dark] body .site-size{color:#e7afb8}'+
'@media(max-width:640px){html body .site-size{display:none!important}}';
d.head.appendChild(st);
try{if(localStorage.getItem(KEY)==='grande')h.setAttribute('data-tam','grande');}catch(e){}
function add(){
 var t=d.querySelector('.site-tools');if(!t||t.querySelector('.site-size'))return;
 var b=d.createElement('button');b.type='button';b.className='site-size';
 var lab=en?'Make text larger':'Aumentar o tamanho da letra',lab2=en?'Back to normal text size':'Voltar ao tamanho normal da letra';
 function upd(){var g=h.getAttribute('data-tam')==='grande';b.setAttribute('aria-label',g?lab2:lab);b.title=g?lab2:lab;b.setAttribute('aria-pressed',g?'true':'false');}
 b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/><path class="pl" d="M10.5 7.5v6M7.5 10.5h6"/><path class="mi" d="M7.5 10.5h6"/></svg>';
 b.addEventListener('click',function(){var g=h.getAttribute('data-tam')==='grande';if(g)h.removeAttribute('data-tam');else h.setAttribute('data-tam','grande');try{localStorage.setItem(KEY,g?'normal':'grande')}catch(e){}upd();});
 upd();t.insertBefore(b,t.firstChild);
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',add);else add();
})();
