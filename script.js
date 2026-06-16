
document.getElementById('yr').textContent = new Date().getFullYear();

// Particles
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
function Particle(){
  this.x = Math.random()*W; this.y = Math.random()*H;
  this.r = Math.random()*1.5+.5;
  this.vx = (Math.random()-.5)*.25; this.vy = (Math.random()-.5)*.25;
  this.alpha = Math.random()*.5+.1;
  this.color = Math.random()>.5 ? '0,168,107' : '212,175,55';
}
for(let i=0;i<90;i++) particles.push(new Particle());
function draw(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

// Scroll reveal
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }});
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Skill bar animation
const barObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.bar-fill').forEach(b=>{
        const w = b.style.getPropertyValue('--w');
        b.style.width = (parseFloat(w)*100)+'%';
        b.classList.add('animate');
      });
      barObserver.unobserve(e.target);
    }
  });
},{threshold:0.2});
document.querySelectorAll('.skill-group').forEach(g=>barObserver.observe(g));

// Mobile nav
document.getElementById('hamburger').addEventListener('click',()=>{
  const links = document.querySelector('.nav-links');
  if(links.style.display==='flex'){ links.style.display=''; }
  else { links.style.cssText='display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:#1A1A1A;padding:16px 24px 24px;border-bottom:1px solid rgba(255,255,255,.08);z-index:200'; }
});