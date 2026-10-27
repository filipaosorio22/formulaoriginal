(()=>{'use strict';
const menus=[...document.querySelectorAll('nav .nav-links,header.nav .nav-links,.mobile-menu')];
menus.forEach(menu=>{
 const link=[...menu.querySelectorAll('a[href]')].find(a=>/(?:^|\/)leituras\.html(?:[?#]|$)/.test(a.getAttribute('href')));
 if(!link||link.closest('.site-readings-group'))return;
 const group=document.createElement('span');group.className='site-readings-group';link.before(group);group.append(link);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='site-readings-toggle';toggle.setAttribute('aria-label','Escolher uma leitura');toggle.setAttribute('aria-expanded','false');
 toggle.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>';group.append(toggle);
 const panel=document.createElement('span');panel.className='site-readings-panel';
 [['Leitura do Mapa Natal','leitura-intuitiva.html'],['Leitura do Momento','tarot.html']].forEach(([label,url])=>{const a=document.createElement('a');a.href=url;a.textContent=label;if(location.pathname.endsWith('/'+url))a.setAttribute('aria-current','page');panel.append(a);});
 group.append(panel);
 const open=value=>{group.classList.toggle('is-open',value);toggle.setAttribute('aria-expanded',String(value));};
 group.addEventListener('pointerenter',()=>{if(matchMedia('(hover:hover)').matches)open(true);});
 group.addEventListener('pointerleave',()=>{if(!group.contains(document.activeElement))open(false);});
 group.addEventListener('focusin',e=>{if(e.target!==toggle)open(true);});group.addEventListener('focusout',()=>setTimeout(()=>{if(!group.contains(document.activeElement))open(false);},0));
 toggle.addEventListener('click',e=>{e.stopPropagation();open(toggle.getAttribute('aria-expanded')!=='true');});
 group.addEventListener('keydown',e=>{if(e.key==='Escape'){open(false);toggle.focus();}if(e.key==='ArrowDown'&&e.target===toggle){e.preventDefault();open(true);panel.querySelector('a').focus();}});
 document.addEventListener('click',e=>{if(!group.contains(e.target))open(false);});
 if(![...menu.querySelectorAll('a[href]')].some(a=>/sessao-alinhamento\.html/.test(a.getAttribute('href')))){
  const a=document.createElement('a');a.href='sessao-alinhamento.html';a.className='l site-session-link';a.textContent='Sessão de Alinhamento';if(location.pathname.endsWith('/sessao-alinhamento.html'))a.setAttribute('aria-current','page');group.after(a);
 }
});
})();