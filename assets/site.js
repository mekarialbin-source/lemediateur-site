document.documentElement.classList.add('js');
(function(){
  var esc=function(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  /* Menu */
  var burger=document.querySelector('.burger'),links=document.getElementById('navlinks');
  function closeMenu(){links.classList.remove('open');document.body.classList.remove('menu-open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Ouvrir le menu');}
  if(burger){burger.addEventListener('click',function(){var o=!links.classList.contains('open');links.classList.toggle('open',o);document.body.classList.toggle('menu-open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&links.classList.contains('open')){closeMenu();burger.focus();}});}
  /* Thème */
  var tbtn=document.querySelector('[data-theme-toggle]');
  function label(){var d=document.documentElement.getAttribute('data-theme')==='dark';tbtn.setAttribute('aria-label',d?'Passer en mode clair':'Passer en mode sombre');tbtn.title=d?'Mode clair':'Mode sombre';}
  if(tbtn){tbtn.addEventListener('click',function(){var n=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem('lm-theme',n)}catch(e){}label();});label();}
  /* Filtres du blog */
  var f=document.querySelector('[data-filters]');
  if(f){f.addEventListener('click',function(e){var b=e.target.closest('[data-cat]');if(!b)return;var c=b.getAttribute('data-cat');
    f.querySelectorAll('[data-cat]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    document.querySelectorAll('[data-bloglist] li').forEach(function(li){li.hidden=!(c==='Tous'||li.getAttribute('data-cat')===c)});});}
  /* Texte qui s'allume (accueil) */
  var lit=document.querySelector('[data-lit]');
  if(lit){var t=lit.textContent.trim();lit.setAttribute('aria-label',t);
    lit.innerHTML=t.split(/\s+/).map(function(w){return '<span class="w" aria-hidden="true">'+esc(w)+'</span>'}).join(' ');
    var ws=[].slice.call(lit.querySelectorAll('.w'));var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
    function on(){if(reduce)return;var r=lit.getBoundingClientRect(),vh=innerHeight;var p=Math.min(1,Math.max(0,(vh*.85-r.top)/(vh*.5+r.height*.5)));var k=Math.round(p*ws.length);ws.forEach(function(w,i){w.classList.toggle('on',i<k)});}
    if(reduce)ws.forEach(function(w){w.classList.add('on')});
    addEventListener('scroll',on,{passive:true});addEventListener('resize',on);on();}
})();
