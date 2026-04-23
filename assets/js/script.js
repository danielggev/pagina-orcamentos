/* ============================================
   GRUDADO EM VOCÊ — Projetos Personalizados
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     0. ANNOUNCEMENT BAR MARQUEE
     ------------------------------------------ */

  /* ------------------------------------------
     1. BANNER RESPONSIVO (troca src por tamanho)
     ------------------------------------------ */
  const bannerImgs = document.querySelectorAll('.banner-img');
  const mq = window.matchMedia('(max-width: 768px)');

  function updateBanners() {
    bannerImgs.forEach(img => {
      img.src = mq.matches ? img.dataset.mobile : img.dataset.desktop;
    });
  }

  updateBanners();
  mq.addEventListener('change', updateBanners);

  /* ------------------------------------------
     2. BANNER SLIDER
     ------------------------------------------ */
  const slides  = document.getElementById('hero-slides');
  const dots    = document.querySelectorAll('.hero__dot');
  const total   = dots.length;
  let current   = 0;
  let sliderTimer;

  function goTo(index) {
    current = index;
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo((current + 1) % total); }

  function startAuto() {
    sliderTimer = setInterval(next, 5000);
  }

  if (slides && dots.length) {
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(sliderTimer);
        goTo(parseInt(dot.dataset.index));
        startAuto();
      });
    });
    startAuto();
  }

  /* ------------------------------------------
     3. STICKY HEADER
     ------------------------------------------ */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ------------------------------------------
     2. MOBILE NAV
     ------------------------------------------ */
  const navToggle = document.getElementById('nav-toggle');
  const headerNav = document.querySelector('.header-nav');

  if (navToggle && headerNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      headerNav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('nav-is-open', !isOpen);
    });

    // Fecha ao clicar em qualquer link do menu
    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Fecha ao clicar no overlay (fundo escuro)
    document.addEventListener('click', (e) => {
      if (
        document.body.classList.contains('nav-is-open') &&
        !headerNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeNav();
      }
    });

    // Fecha com tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  function closeNav() {
    if (!navToggle || !headerNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    headerNav.classList.remove('is-open');
    document.body.classList.remove('nav-is-open');
  }

  /* ------------------------------------------
     3. SCROLL ANIMATIONS (IntersectionObserver)
     ------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const animatedEls = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    animatedEls.forEach(el => {
      const delay = el.dataset.delay || 0;
      if (delay > 0) {
        el.style.transitionDelay = `${delay}ms`;
      }
      observer.observe(el);
    });
  } else {
    // Sem animação — mostra tudo imediatamente
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------
     4. CONTROLE DE SOM — VÍDEO TUTORIAL
     ------------------------------------------ */
  const tutorialVideo = document.getElementById('tutorial-video');
  const soundToggle   = document.getElementById('sound-toggle');

  if (tutorialVideo && soundToggle) {
    const iconMute  = soundToggle.querySelector('.icon-mute');
    const iconSound = soundToggle.querySelector('.icon-sound');

    soundToggle.addEventListener('click', () => {
      tutorialVideo.muted = !tutorialVideo.muted;
      iconMute.style.display  = tutorialVideo.muted ? '' : 'none';
      iconSound.style.display = tutorialVideo.muted ? 'none' : '';
      soundToggle.setAttribute('aria-label', tutorialVideo.muted ? 'Ativar som' : 'Desativar som');
    });
  }

  /* ------------------------------------------
     5. SMOOTH SCROLL (links âncora internos)
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

});
