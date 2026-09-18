/* ══════════════════════════════════════════════════════════════
   Sven Erxleben — interactions
   Subtle, professional, no library dependencies.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── current year ───────────────────────────────────────── */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── scroll progress + condensed nav ────────────────────── */
  var bar = document.getElementById('scrollBar');
  var nav = document.getElementById('nav');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('is-stuck', y > 24);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── mobile menu ────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.classList.remove('in');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('lock');
    window.setTimeout(function () { menu.hidden = true; }, 380);
  }

  function openMenu() {
    menu.hidden = false;
    void menu.offsetWidth;                 // flush layout so the transition runs
    menu.classList.add('in');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Menü schließen');
    document.body.classList.add('lock');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      if (burger.getAttribute('aria-expanded') === 'true') closeMenu(); else openMenu();
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── reveal on scroll ───────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal, .reveal-img, .ai__panel');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ── number count-up ────────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');

  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }

    var dur = 1500;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(counters, runCount);
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  /* ── AI section: rotating query line ────────────────────── */
  var q = document.getElementById('aiQuery');
  if (q && !reduced) {
    var queries = [
      'Wer ist der beste Anbieter für Briefkastenanlagen?',
      'Welche Marketing-Agentur passt zu meinem Mittelstand?',
      'Wer berät zu SEO und KI-Suche in Leipzig?',
      'Welches Unternehmen empfiehlst du für B2B-Industrie?'
    ];
    var qi = 0, ci = 0, deleting = false, live = false;

    var qio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !live) { live = true; q.textContent = ''; type(); }
      });
    }, { threshold: 0.4 });
    qio.observe(q);

    function type() {
      var full = queries[qi];
      if (!deleting) {
        ci++;
        q.textContent = full.slice(0, ci);
        if (ci === full.length) {
          deleting = true;
          return window.setTimeout(type, 2400);
        }
        return window.setTimeout(type, 34);
      }
      ci--;
      q.textContent = full.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        qi = (qi + 1) % queries.length;
        return window.setTimeout(type, 420);
      }
      window.setTimeout(type, 16);
    }
  }

  /* ── hero portrait: gentle parallax ─────────────────────── */
  var portrait = document.querySelector('.portrait img');
  if (portrait && !reduced && window.matchMedia('(min-width: 1025px)').matches) {
    var pTicking = false;
    window.addEventListener('scroll', function () {
      if (pTicking) return;
      pTicking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY || 0;
        if (y < window.innerHeight * 1.2) {
          portrait.style.transform = 'scale(1.035) translate3d(0,' + (y * -0.028) + 'px,0)';
        }
        pTicking = false;
      });
    }, { passive: true });
  }

  /* ── FAQ: single-open accordion ─────────────────────────── */
  var faqs = document.querySelectorAll('.faq__item');
  Array.prototype.forEach.call(faqs, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqs, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ── smooth anchor offset for sticky nav ────────────────── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 0);
    window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
  });

})();
