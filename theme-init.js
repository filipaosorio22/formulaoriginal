/* Light on a first visit; preserve an explicit visitor choice across pages. */
(()=>{
 let theme='light';
 try{if(localStorage.getItem('fo_theme')==='dark')theme='dark';}catch{}
 const query=new URLSearchParams(location.search);
 if(query.has('preview')&&['light','dark'].includes(query.get('theme')))theme=query.get('theme');
 document.documentElement.setAttribute('data-theme',theme);
})();
