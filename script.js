const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu');
const navLinks=document.querySelector('.nav nav');
const glow=document.querySelector('.cursor-glow');

menu?.addEventListener('click',()=>navLinks?.classList.toggle('open'));
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>navLinks?.classList.remove('open')));

const onScroll=()=>nav?.classList.toggle('scrolled',window.scrollY>12);
onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

window.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});

const revealEls=document.querySelectorAll('section article,.section-head,.about-card,.contact-inner,.future-head,.hero-copy,.hero-panel');
revealEls.forEach((el,i)=>{el.classList.add('reveal'); if(el.parentElement?.classList.contains('stagger')) el.style.setProperty('--i',i%6)});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
revealEls.forEach(el=>io.observe(el));

const filterButtons=document.querySelectorAll('.filter button');
const cards=document.querySelectorAll('.project-card');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter;
  cards.forEach(card=>{
    const show=f==='all'||card.dataset.cat===f;
    card.classList.toggle('is-hidden',!show);
  });
}));

// Subtle parallax on the hero panel.
const panel=document.querySelector('.hero-panel');
window.addEventListener('pointermove',e=>{
  if(!panel || window.innerWidth<900) return;
  const x=(e.clientX/window.innerWidth-.5)*8;
  const y=(e.clientY/window.innerHeight-.5)*-5;
  panel.style.transform=`perspective(1000px) rotateY(${-6+x}deg) translateY(${y}px)`;
});
