/* ============================================================
   SOUTH POINT VILLAS — Main JS
   GSAP + ScrollTrigger animations + UI interactions
   ============================================================ */

/* ── GSAP INIT ── */
gsap.registerPlugin(ScrollTrigger);

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
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}

if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
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

/* ── REDUCED MOTION ── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(0);
  ScrollTrigger.getAll().forEach(t => t.kill());
}
