/**
 * Main JavaScript - Interactions & Animations
 * - Scroll reveal (IntersectionObserver)
 * - Header scroll state
 * - Smooth scroll for anchor links
 * - Mobile navigation toggle
 */

(function () {
  'use strict';

  // ============================================================
  // SCROLL REVEAL
  // ============================================================

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all elements
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ============================================================
  // HEADER SCROLL STATE
  // ============================================================

  const header = document.getElementById('siteHeader');
  let lastScrollY = 0;

  function updateHeader() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ============================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Close mobile nav if open
      closeMobileNav();

      const headerHeight = header.offsetHeight;
      const targetPosition =
        targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  // ============================================================
  // MOBILE NAVIGATION
  // ============================================================

  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  function closeMobileNav() {
    if (!hamburger || !navMobile) return;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navMobile.classList.remove('open');
    navMobile.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    if (!hamburger || !navMobile) return;
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navMobile.classList.add('open');
    navMobile.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = this.classList.contains('active');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Close mobile nav on link click
  if (navMobile) {
    navMobile.querySelectorAll('.nav-mobile-link').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // Close mobile nav on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileNav();
    }
  });

  // ============================================================
  // ACTIVE NAV LINK TRACKING
  // ============================================================

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle(
                'nav-link--active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px',
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ============================================================
  // BACK TO TOP
  // ============================================================

  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
