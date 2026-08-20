/* ============================================
   GRUDADO EM VOCÊ — Projetos Personalizados
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     0. ANNOUNCEMENT BAR MOBILE
     ------------------------------------------ */
  const announcementBar = document.querySelector('.announcement-bar');
  const announcementCoupon = document.querySelector('.announcement-bar__coupon');
  const announcementItems = document.querySelectorAll('.announcement-bar__content > .announcement-bar__item');
  const announcementSlides = [
    { element: announcementCoupon, variant: 'coupon' },
    { element: announcementItems[1], variant: 'installments' },
    { element: announcementItems[0], variant: 'shipping' }
  ].filter(slide => slide.element);
  const announcementMq = window.matchMedia('(max-width: 768px)');
  let announcementIndex = 0;
  let announcementTimer;

  function setAnnouncementVariant(variant) {
    announcementBar?.classList.remove('is-coupon', 'is-installments', 'is-shipping');
    announcementBar?.classList.add(`is-${variant}`);
  }

  function showNextAnnouncement() {
    const currentSlide = announcementSlides[announcementIndex];
    const nextIndex = (announcementIndex + 1) % announcementSlides.length;
    const nextSlide = announcementSlides[nextIndex];

    currentSlide.element.classList.remove('is-active');
    currentSlide.element.classList.add('is-leaving');
    currentSlide.element.setAttribute('aria-hidden', 'true');
    nextSlide.element.classList.remove('is-leaving');
    nextSlide.element.classList.add('is-active');
    nextSlide.element.setAttribute('aria-hidden', 'false');
    setAnnouncementVariant(nextSlide.variant);

    window.setTimeout(() => currentSlide.element.classList.remove('is-leaving'), 700);
    announcementIndex = nextIndex;
  }

  function updateMobileAnnouncements() {
    window.clearInterval(announcementTimer);
    if (!announcementSlides.length || !announcementBar) return;

    if (!announcementMq.matches) {
      announcementBar.classList.remove('is-coupon', 'is-installments', 'is-shipping');
      announcementSlides.forEach(({ element }) => {
        element.classList.remove('is-active', 'is-leaving');
        element.removeAttribute('aria-hidden');
      });
      return;
    }

    announcementIndex = 0;
    announcementSlides.forEach(({ element }, index) => {
      element.classList.toggle('is-active', index === announcementIndex);
      element.classList.remove('is-leaving');
      element.setAttribute('aria-hidden', String(index !== announcementIndex));
    });
    setAnnouncementVariant(announcementSlides[announcementIndex].variant);
    announcementTimer = window.setInterval(showNextAnnouncement, 5000);
  }

  updateMobileAnnouncements();
  announcementMq.addEventListener('change', updateMobileAnnouncements);

  /* ------------------------------------------
     1. BANNER RESPONSIVO (troca src por tamanho)
     ------------------------------------------ */
  const bannerImgs   = document.querySelectorAll('.banner-img');
  const bannerVideos = document.querySelectorAll('.banner-video');
  const mq = window.matchMedia('(max-width: 768px)');

  function updateBanners() {
    bannerImgs.forEach(img => {
      img.src = mq.matches ? img.dataset.mobile : img.dataset.desktop;
    });
    bannerVideos.forEach(video => {
      const src = mq.matches ? video.dataset.mobile : video.dataset.desktop;
      const source = video.querySelector('source');
      if (source.src !== new URL(src, location.href).href) {
        source.src = src;
        video.load();
        video.play().catch(() => {});
      }
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
      navToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
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
    navToggle.setAttribute('aria-label', 'Abrir menu');
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
     5. REORDENAÇÃO DA NAV NO MOBILE
     ------------------------------------------ */
  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    const mqNav = window.matchMedia('(max-width: 768px)');
    const originalOrder = Array.from(mainNav.children);

    function reorderNav(isMobile) {
      const items = Array.from(mainNav.children);
      if (isMobile) {
        // Super Rápido primeiro, Toda Loja por último
        const superRapido = items.find(li => li.querySelector('.btn-super-rapido'));
        const todaLoja    = items.find(li => !li.querySelector('.btn-super-rapido') && li === items[0]);
        if (superRapido) mainNav.prepend(superRapido);
        if (todaLoja)    mainNav.append(todaLoja);
      } else {
        // Restaura ordem original
        originalOrder.forEach(li => mainNav.append(li));
      }
    }

    reorderNav(mqNav.matches);
    mqNav.addEventListener('change', e => reorderNav(e.matches));
  }

  /* ------------------------------------------
     6. SMOOTH SCROLL (links âncora internos)
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
