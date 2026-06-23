/* ============================================================
   SOUTH POINT VILLAS — Main JS
   GSAP + ScrollTrigger animations + UI interactions
   ============================================================ */

/* ── GSAP INIT ── */
gsap.registerPlugin(ScrollTrigger);
if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

/* ── NAV SCROLL BEHAVIOUR ── */
const nav = document.querySelector('.nav');

if (nav) {
  ScrollTrigger.create({
    start: 80,
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled')
  });
}

/* ── HAMBURGER MENU ── */
const hamburger = document.querySelector('.nav__hamburger');
const mobileNav = document.querySelector('.nav__mobile');
const mobileClose = document.querySelector('.nav__mobile-close');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
  });
}

if (mobileClose && mobileNav) {
  mobileClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
}

/* ── HERO ENTRANCE ── */
const heroContent = document.querySelector('.hero__content');
if (heroContent) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero__eyebrow',  { opacity: 0, y: 20, duration: 0.7, delay: 0.2 })
    .from('.hero__title',    { opacity: 0, y: 30, duration: 0.9 }, '-=0.3')
    .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
    .from('.hero__actions',  { opacity: 0, y: 20, duration: 0.7 }, '-=0.4');
}

/* ── STATS BAR COUNTER ── */
document.querySelectorAll('.stats-bar__num[data-count]').forEach(el => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.fromTo({ val: 0 },
        { val: target },
        {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = prefix + Math.round(this.targets()[0].val) + suffix;
          }
        }
      );
    }
  });
});

/* ── POOL VIDEO — PARALLAX SCROLL ── */
const poolVideo = document.querySelector('.pool-video-section__media');
if (poolVideo) {
  gsap.to(poolVideo, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.pool-video-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* ── SECTION FADE-UP (global) ── */
gsap.utils.toArray('[data-fade]').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 82%',
      once: true
    },
    delay: el.getAttribute('data-delay') ? parseFloat(el.getAttribute('data-delay')) : 0
  });
});

/* ── STAGGERED GRID CHILDREN ── */
gsap.utils.toArray('[data-stagger]').forEach(container => {
  const children = container.children;
  gsap.from(children, {
    opacity: 0,
    y: 32,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true
    }
  });
});

/* ── VILLA CARD FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const villaCards = document.querySelectorAll('.villa-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    villaCards.forEach(card => {
      const type = card.getAttribute('data-type');
      const show = filter === 'all' || type === filter;
      card.setAttribute('data-hidden', show ? 'false' : 'true');

      if (show) {
        gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      }
    });
  });
});

/* ── EXPAND MAP WIDGET ── */
document.querySelectorAll('.expand-map-wrap').forEach(function(wrap) {
  var card = wrap.querySelector('.expand-map');
  if (!card) return;

  wrap.addEventListener('mousemove', function(e) {
    var rect = wrap.getBoundingClientRect();
    var dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    var dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    card.style.transform = 'rotateX(' + (-dy * 7) + 'deg) rotateY(' + (dx * 7) + 'deg)';
  });

  wrap.addEventListener('mouseleave', function() {
    card.style.transform = '';
  });

  function toggle() {
    var expanded = card.classList.toggle('is-expanded');
    wrap.classList.toggle('map-expanded', expanded);
    wrap.setAttribute('aria-expanded', String(expanded));
  }

  wrap.addEventListener('click', toggle);
  wrap.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});

/* ── HORIZONTAL PARALLAX on story images ── */
gsap.utils.toArray('.story-img').forEach(img => {
  gsap.from(img, {
    xPercent: -4,
    ease: 'none',
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    }
  });
});

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  });
});

/* ── ROOM GALLERY (tab-based bedroom viewer) ── */
document.querySelectorAll('.room-gallery').forEach(gallery => {
  const tabs = gallery.querySelectorAll('.room-gallery__tab');
  const panels = gallery.querySelectorAll('.room-gallery__panel');
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      panels[i].classList.add('active');
    });
  });
});

/* ── CAPSULE GALLERY (Component5 — Capsule Slider) ── */
document.querySelectorAll('.capsule-gallery').forEach(gallery => {
  const slidesTrack = gallery.querySelector('.capsule-gallery__slides');
  const slides = Array.from(gallery.querySelectorAll('.capsule-gallery__slide'));
  const dotsContainer = gallery.querySelector('.capsule-gallery__dots');
  const curEl = gallery.querySelector('.capsule-gallery__cur');
  const totEl = gallery.querySelector('.capsule-gallery__tot');
  const prevBtn = gallery.querySelector('.capsule-gallery__btn--prev');
  const nextBtn = gallery.querySelector('.capsule-gallery__btn--next');
  if (!slides.length || !slidesTrack) return;

  let current = 0;
  let autoTimer;

  // Build dot indicators
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'capsule-gallery__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Image ' + (i + 1));
    dot.addEventListener('click', () => go(i));
    dotsContainer.appendChild(dot);
  });

  if (totEl) totEl.textContent = String(slides.length).padStart(2, '0');

  function go(n) {
    const dots = gallery.querySelectorAll('.capsule-gallery__dot');
    dots[current].classList.remove('active');
    current = ((n % slides.length) + slides.length) % slides.length;
    dots[current].classList.add('active');
    slidesTrack.style.transform = 'translateX(-' + (current * 100) + '%)';
    if (curEl) curEl.textContent = String(current + 1).padStart(2, '0');
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => go(current + 1), 4500);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => go(current + 1));

  // Touch swipe
  let touchStartX = 0;
  slidesTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slidesTrack.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // Pause auto on hover
  gallery.addEventListener('mouseenter', () => clearInterval(autoTimer));
  gallery.addEventListener('mouseleave', resetAuto);

  // Keyboard nav
  gallery.setAttribute('tabindex', '0');
  gallery.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  });

  resetAuto();
});

/* ── REDUCED MOTION ── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(0);
  ScrollTrigger.getAll().forEach(t => t.kill());
}
