/* ═══════════════════════════════════════════════════════════
   JORGE LUIS SANTIESTEBAN — CV PORTAFOLIO
   script.js — Canvas, Typewriter, Scroll reveal, Nav, Mobile, Toast
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  const terminalCode = document.getElementById('terminal-code');

  // ═══════════════════════════════════════════════════════
  // 1. CANVAS — particles + connecting lines
  // ═══════════════════════════════════════════════════════
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function initCanvas() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const count = Math.min(Math.floor(W * H / 18000), 55);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .8,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139,92,246,.45)';
        ctx.fill();
      });
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * .15})`;
            ctx.lineWidth = .7;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    initCanvas();
    draw();
    window.addEventListener('resize', initCanvas);
  }

  // ═══════════════════════════════════════════════════════
  // 2. TYPEWRITER TERMINAL
  // ═══════════════════════════════════════════════════════
  if (terminalCode) {
    const lines = [
      `<span class="tc"># jorge@portfolio: ~/about</span>`,
      ``,
      `<span class="tk">class</span> <span class="ts">DataEngineer</span><span class="tf">:</span>`,
      `    <span class="tf">def </span><span class="ts">__init__</span><span class="tf">(self):</span>`,
      `        <span class="tf">self.</span><span class="tk">name</span>     <span class="tf">= </span><span class="ts">"Jorge Santiesteban"</span>`,
      `        <span class="tf">self.</span><span class="tk">role</span>     <span class="tf">= </span><span class="ts">"Senior Data Engineer"</span>`,
      `        <span class="tf">self.</span><span class="tk">location</span> <span class="tf">= </span><span class="ts">"Ciudad de México"</span>`,
      `        <span class="tf">self.</span><span class="tk">records</span>  <span class="tf">= </span><span class="tn">10_000_000</span>  <span class="tc"># diarios</span>`,
      `        <span class="tf">self.</span><span class="tk">clouds</span>   <span class="tf">= [</span><span class="ts">"AWS"</span><span class="tf">, </span><span class="ts">"GCP"</span><span class="tf">, </span><span class="ts">"Azure"</span><span class="tf">]</span>`,
      `        <span class="tf">self.</span><span class="tk">arch</span>     <span class="tf">= </span><span class="ts">"Medallion"</span>`,
      ``,
      `    <span class="tf">def </span><span class="ts">build_pipeline</span><span class="tf">(self, src):</span>`,
      `        <span class="tc">"""Transforma datos en valor."""</span>`,
      `        <span class="tf">clean   = self.</span><span class="tn">validate</span><span class="tf">(src)</span>`,
      `        <span class="tf">modeled = self.</span><span class="tn">medallion</span><span class="tf">(clean)</span>`,
      `        <span class="tf">return   self.</span><span class="tn">deliver</span><span class="tf">(modeled)</span>`,
      ``,
      `<span class="tc"># Instancia activa 🚀</span>`,
      `<span class="tf">jorge = </span><span class="ts">DataEngineer</span><span class="tf">()</span>`,
      `<span class="tf">print(</span><span class="ts">"✓ Listo para nuevos retos"</span><span class="tf">)</span>`,
    ];

    let i = 0;
    function typeLine() {
      if (i >= lines.length) return;
      terminalCode.innerHTML = lines.slice(0, i + 1).join('\n');
      i++;
      setTimeout(typeLine, 50 + Math.random() * 30);
    }
    setTimeout(typeLine, 800);
  }

  // ═══════════════════════════════════════════════════════
  // 3. SCROLL REVEAL — IntersectionObserver
  // ═══════════════════════════════════════════════════════
  const animEls = document.querySelectorAll('.anim');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const delay = parseInt(en.target.dataset.delay || '0', 10);
          setTimeout(() => en.target.classList.add('visible'), delay);
          obs.unobserve(en.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    animEls.forEach(el => io.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  // ═══════════════════════════════════════════════════════
  // 4. ACTIVE NAV LINK + scroll class on pill
  // ═══════════════════════════════════════════════════════
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navPill = document.querySelector('.nav-pill');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Active section
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (y >= top && y < top + sec.offsetHeight) {
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${sec.id}`);
        });
      }
    });

    // Nav pill scroll border
    if (navPill) {
      navPill.classList.toggle('scrolled', y > 40);
    }
  }, { passive: true });

  // ═══════════════════════════════════════════════════════
  // 5. MOBILE MENU
  // ═══════════════════════════════════════════════════════
  function openMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-link').forEach(l =>
    l.addEventListener('click', closeMenu)
  );

  // ═══════════════════════════════════════════════════════
  // 6. COPY EMAIL + TOAST
  // ═══════════════════════════════════════════════════════
  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('santiestebanjorge94@gmail.com')
        .then(() => showToast('¡Correo copiado al portapapeles!'))
        .catch(() => showToast('santiestebanjorge94@gmail.com'));
    });
  }

});