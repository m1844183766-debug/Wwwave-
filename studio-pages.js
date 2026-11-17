(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(window.Lenis&&!reduced.matches)new Lenis({autoRaf:true,lerp:.1,smoothWheel:true,syncTouch:false,anchors:true});
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.studio-nav');
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'CLOSE':'MENU';});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.textContent='MENU';}});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.fonts.ready.then(()=>document.querySelectorAll('.reveal').forEach(element=>observer.observe(element)));
  document.documentElement.classList.add('studio-js');
  function wave(){const el=document.createElement('div');el.className='page-wave';el.setAttribute('aria-hidden','true');for(let i=0;i<4;i++)el.append(document.createElement('div'));document.body.append(el);return el;}
  let navigating=false;
  document.querySelectorAll('a[data-route]').forEach(link=>link.addEventListener('click',async event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||reduced.matches)return;
    const target=new URL(link.href);if(target.pathname===location.pathname&&target.hash)return;
    event.preventDefault();if(navigating)return;navigating=true;
    const el=wave();await Promise.all([...el.children].map((band,index)=>band.animate([{transform:'translateX(-103%)'},{transform:'translateX(0)'}],{duration:280,delay:index*38,easing:'cubic-bezier(.65,0,.25,1)',fill:'both'}).finished));
    try{sessionStorage.setItem('wwwaveStudioArrival','true');}catch{}
    location.href=link.href;
  }));
  try{if(sessionStorage.getItem('wwwaveStudioArrival')&&!reduced.matches){sessionStorage.removeItem('wwwaveStudioArrival');const el=wave();Promise.all([...el.children].map((band,index)=>band.animate([{transform:'translateX(0)'},{transform:'translateX(103%)'}],{duration:470,delay:index*34,easing:'cubic-bezier(.65,0,.25,1)',fill:'both'}).finished)).then(()=>el.remove());}}catch{}
})();
