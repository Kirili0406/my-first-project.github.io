// years
document.querySelectorAll('[id^="year"]').forEach(el=>el.textContent = new Date().getFullYear());

// HERO animation: fluid gradient + particles + subtle parallax
(function(){
  const canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h;
  let blobs = [], particles=[];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = Math.max(420, window.innerHeight*0.45);
    blobs = [];
    for(let i=0;i<6;i++){
      blobs.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 140 + Math.random()*260,
        dx: (Math.random()-0.5)*0.12,
        dy: (Math.random()-0.5)*0.12,
        hue: 200 + Math.random()*60,
        a: 0.08 + Math.random()*0.08
      });
    }
    particles = [];
    for(let i=0;i<50;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 0.8 + Math.random()*2.2,
        vx: (Math.random()-0.5)*0.2,
        vy: (Math.random()-0.5)*0.2,
        a: 0.15 + Math.random()*0.6
      });
    }
  }
  window.addEventListener('resize', resize);
  resize();

  function draw(){
    ctx.clearRect(0,0,w,h);
    // dark base
    ctx.fillStyle = '#060607';
    ctx.fillRect(0,0,w,h);

    // blobs
    ctx.globalCompositeOperation = 'lighter';
    blobs.forEach(b=>{
      const g = ctx.createRadialGradient(b.x,b.y,b.r*0.1,b.x,b.y,b.r);
      g.addColorStop(0, `hsla(${b.hue},60%,70%,${b.a})`);
      g.addColorStop(1, `hsla(${b.hue},50%,8%,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.fill();
      b.x += b.dx; b.y += b.dy;
      if(b.x - b.r > w) b.x = -b.r;
      if(b.x + b.r < 0) b.x = w + b.r;
      if(b.y - b.r > h) b.y = -b.r;
      if(b.y + b.r < 0) b.y = h + b.r;
    });

    // particles
    ctx.globalCompositeOperation = 'screen';
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=w; if(p.x>w) p.x=0;
      if(p.y<0) p.y=h; if(p.y>h) p.y=0;
      p.a += (Math.random()-0.5)*0.02;
      p.a = Math.max(0.12, Math.min(0.9, p.a));
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // parallax: move angel/bg slightly on mouse
  const angel = document.querySelector('.angel-bg');
  document.addEventListener('mousemove', e=>{
    const nx = (e.clientX/window.innerWidth - 0.5) * 12;
    const ny = (e.clientY/window.innerHeight - 0.5) * 8;
    angel.style.transform = `translate(${nx}px, ${ny}px) scale(1.02)`;
  });
})();

// memorial track ensure length
(function(){
  const track = document.querySelector('.memorial-track');
  if(!track) return;
  while(track.children.length < 12){
    const clone = track.children[0].cloneNode(true);
    track.appendChild(clone);
  }
})();

// simple forms (alert placeholders)
(function(){
  const cf = document.getElementById('callForm');
  if(cf) cf.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Заявка принята. Мы свяжемся с вами в ближайшее время.');
    cf.reset();
  });

  const cons = document.getElementById('consultForm');
  if(cons) cons.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Спасибо! Консультация запрошена.');
    cons.reset();
  });
})();
