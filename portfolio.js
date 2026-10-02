/* ============================================================
   ZEUS Portfolio — interactions
   ============================================================ */

(function () {
  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scroll effect ---------- */
  const nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
    // close on link click
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      })
    );
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Animate skill bars when visible ---------- */
  const skills = document.querySelectorAll('.skill');
  if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    skills.forEach((s) => sio.observe(s));
  } else {
    skills.forEach((s) => s.classList.add('visible'));
  }

  /* ---------- Smooth scroll for hash links (extra safety) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Subtle parallax on hero card ---------- */
  const heroCard = document.querySelector('.profile-card');
  if (heroCard && window.matchMedia('(min-width: 900px)').matches) {
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX = (e.clientX - cx) / cx;
      mouseY = (e.clientY - cy) / cy;
    });
    function animate() {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;
      heroCard.style.transform = `translate(${currentX * 12}px, ${currentY * 12 - 6}px) rotate(${currentX * 2}deg)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ---------- Live typing effect for hero name ---------- */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const text = heroName.textContent.trim();
    heroName.textContent = '';
    heroName.style.opacity = '1';
    let i = 0;
    function type() {
      if (i <= text.length) {
        heroName.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 60);
      } else {
        // add blinking caret
        const caret = document.createElement('span');
        caret.textContent = '|';
        caret.style.cssText = 'color:#fbbf24;animation:pulse 1s infinite;margin-left:4px;';
        heroName.appendChild(caret);
      }
    }
    // start slightly after page load
    setTimeout(type, 300);
  }
})();
