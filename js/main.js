/* ========================================
   MADHAV TECHNO CAST – MAIN JAVASCRIPT
   EmailJS Integrated
   ======================================== */

(function () {
  'use strict';

  /* ─── EMAILJS CONFIG ────────────────────── */
  const EMAILJS = {
    publicKey:  'RtQeMea15YcXsSjWo',
    serviceId:  'service_i9qym0h',
    templateId: 'template_zm8rzk9'
  };

  /* ─── INITIALISE EMAILJS ────────────────── */
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS.publicKey });
  }

  /* ─── DOM ELEMENTS ──────────────────────── */
  const navbar        = document.getElementById('navbar');
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const scrollTopBtn  = document.getElementById('scroll-top');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const contactForm   = document.getElementById('contact-form');
  const formSuccess   = document.getElementById('form-success');

  /* ─── NAVBAR SCROLL EFFECT ──────────────── */
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── SCROLL TO TOP ─────────────────────── */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* ─── HAMBURGER MENU ────────────────────── */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    mobileMenu.querySelectorAll('.navbar__mobile-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ─── MEGA MENU (Desktop) ───────────────── */
  document.querySelectorAll('.navbar__item--dropdown').forEach(item => {
    const megaMenu = item.querySelector('.mega-menu');
    if (!megaMenu) return;
    let closeTimer;

    item.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      megaMenu.style.opacity = '1';
      megaMenu.style.pointerEvents = 'auto';
      megaMenu.style.transform = 'translateX(-50%) translateY(0)';
    });

    item.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => {
        megaMenu.style.opacity = '0';
        megaMenu.style.pointerEvents = 'none';
        megaMenu.style.transform = 'translateX(-50%) translateY(8px)';
      }, 120);
    });

    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    megaMenu.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => {
        megaMenu.style.opacity = '0';
        megaMenu.style.pointerEvents = 'none';
        megaMenu.style.transform = 'translateX(-50%) translateY(8px)';
      }, 120);
    });
  });

  /* ─── ACTIVE NAV LINK (Multi-page) ─────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();
    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage.includes('product') && href.includes('products'))
    ) {
      link.classList.add('active');
    }
  });

  /* ─── HERO SLIDER (Homepage only) ──────── */
  const slides = document.querySelectorAll('.hero__slide');
  const dots   = document.querySelectorAll('.hero__dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('hero__slide--active');
    slides[currentSlide].setAttribute('aria-hidden', 'true');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('hero__dot--active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('hero__slide--active');
    slides[currentSlide].setAttribute('aria-hidden', 'false');
    if (dots[currentSlide]) dots[currentSlide].classList.add('hero__dot--active');
  }

  if (slides.length && dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        goToSlide(i);
        sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
      });
    });
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  /* ─── SMOOTH SCROLLING ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (navbar ? navbar.offsetHeight : 72) + 8;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ─── SCROLL FADE-UP ANIMATIONS ────────── */
  const fadeSelectors = [
    '.product-card', '.why-card', '.process__step', '.quality__list-item',
    '.applications__item', '.stats__item', '.gallery__item',
    '.infra-card', '.instrument-card', '.contact-card'
  ];
  const fadeElements = document.querySelectorAll(fadeSelectors.join(', '));
  fadeElements.forEach(el => el.classList.add('fade-up'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'),
          (entry.target.dataset.delay || 0) * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  fadeElements.forEach((el, i) => {
    el.dataset.delay = i % 4;
    fadeObserver.observe(el);
  });

  /* ─── GALLERY LIGHTBOX ──────────────────── */
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      const imgEl = item.querySelector('img');
      if (imgEl && lightbox && lightboxImg) {
        lightboxImg.src = imgEl.src;
        lightboxImg.alt = imgEl.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* ─── CLIENTS MARQUEE ───────────────────── */
  const track = document.querySelector('.clients-strip__track');
  if (track) track.innerHTML += track.innerHTML;

  /* ─── INFRA CARD EXPAND (mobile ≤480px) ── */
  document.querySelectorAll('.infra-card').forEach(card => {
    // Add toggle hint span if not present
    if (!card.querySelector('.infra-card__desc-toggle')) {
      const toggle = document.createElement('span');
      toggle.className = 'infra-card__desc-toggle';
      toggle.textContent = '▾ Tap to expand';
      card.appendChild(toggle);
    }
    card.addEventListener('click', () => {
      const isExpanded = card.classList.toggle('expanded');
      const toggle = card.querySelector('.infra-card__desc-toggle');
      if (toggle) toggle.textContent = isExpanded ? '▴ Collapse' : '▾ Tap to expand';
    });
  });

  /* ============================================================
     EMAILJS HELPERS
  ============================================================ */

  /** Show inline status message */
  function setStatus(el, html, isError = false) {
    if (!el) return;
    el.innerHTML = html;
    el.style.color = isError ? '#c0392b' : '#1a7a44';
    el.style.fontWeight = '600';
  }

  /** Reset a button to its original state */
  function resetBtn(btn, originalHTML) {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHTML;
    }
  }

  /** Send email via EmailJS and return a Promise */
  function sendEmail(params) {
    if (typeof emailjs === 'undefined') {
      return Promise.reject(new Error('EmailJS not loaded'));
    }
    return emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params);
  }

  /* ============================================================
     MAIN CONTACT FORM  (contact.html)
  ============================================================ */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* ── Grab fields ── */
      const nameEl    = document.getElementById('contact-name');
      const phoneEl   = document.getElementById('contact-phone');
      const emailEl   = document.getElementById('contact-email');
      const companyEl = document.getElementById('contact-company');
      const countryEl = document.getElementById('contact-country');
      const productEl = document.getElementById('contact-product');
      const weightEl  = document.getElementById('contact-weight');
      const qtyEl     = document.getElementById('contact-qty');
      const msgEl     = document.getElementById('contact-message');

      const errName  = document.getElementById('error-name');
      const errPhone = document.getElementById('error-phone');
      const errEmail = document.getElementById('error-email');
      const errMsg   = document.getElementById('error-message');

      /* ── Clear previous errors ── */
      [nameEl, phoneEl, emailEl, msgEl].forEach(f => { if (f) f.classList.remove('invalid'); });
      [errName, errPhone, errEmail, errMsg].forEach(el => { if (el) el.textContent = ''; });
      if (formSuccess) formSuccess.innerHTML = '';

      /* ── Validate ── */
      let valid = true;

      if (nameEl && !nameEl.value.trim()) {
        nameEl.classList.add('invalid');
        if (errName) errName.textContent = 'Please enter your full name.';
        valid = false;
      }

      if (emailEl) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailEl.value.trim() || !emailRegex.test(emailEl.value.trim())) {
          emailEl.classList.add('invalid');
          if (errEmail) errEmail.textContent = 'Please enter a valid email address.';
          valid = false;
        }
      }

      if (phoneEl && phoneEl.value.trim() !== '') {
        const ph = phoneEl.value.trim().replace(/[\s\-\(\)+]/g, '');
        if (!ph || !/^\d{7,15}$/.test(ph)) {
          phoneEl.classList.add('invalid');
          if (errPhone) errPhone.textContent = 'Please enter a valid phone number, or leave blank.';
          valid = false;
        }
      }

      if (msgEl && msgEl.value.trim().length < 10) {
        msgEl.classList.add('invalid');
        if (errMsg) errMsg.textContent = 'Please enter a message (min. 10 characters).';
        valid = false;
      }

      if (!valid) return;

      /* ── Send via EmailJS ── */
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ph ph-spinner"></i> Sending…';
      }

      const templateParams = {
        from_name : nameEl  ? nameEl.value.trim()   : '',
        company   : companyEl ? companyEl.value.trim() : 'Not provided',
        country   : countryEl ? countryEl.value.trim() : 'Not provided',
        phone     : phoneEl ? phoneEl.value.trim()   : '',
        email     : emailEl ? emailEl.value.trim()   : 'Not provided',
        product   : productEl ? (productEl.value || 'Not specified') : 'Not specified',
        weight    : weightEl  ? (weightEl.value.trim() || 'Not specified') : 'Not specified',
        quantity  : qtyEl     ? (qtyEl.value.trim()    || 'Not specified') : 'Not specified',
        message   : msgEl     ? msgEl.value.trim()    : ''
      };

      sendEmail(templateParams)
        .then(() => {
          contactForm.reset();
          setStatus(
            formSuccess,
            '✅ Enquiry sent successfully! We will contact you within one business day.',
            false
          );
          resetBtn(submitBtn, originalBtnHTML);
          setTimeout(() => { if (formSuccess) formSuccess.innerHTML = ''; }, 8000);
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          setStatus(
            formSuccess,
            '❌ Something went wrong. Please call us at <a href="tel:+919898440909" style="color:#0f4c81;">+91 98984 40909</a> or WhatsApp us.',
            true
          );
          resetBtn(submitBtn, originalBtnHTML);
        });
    });

    /* Live validation clear */
    ['contact-name', 'contact-phone', 'contact-email', 'contact-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => {
        el.classList.remove('invalid');
        const err = document.getElementById(id.replace('contact-', 'error-'));
        if (err) err.textContent = '';
      });
    });
  }

  /* ============================================================
     SIDEBAR ENQUIRY FORM  (all product detail pages)
  ============================================================ */
  const sidebarForm = document.getElementById('sidebar-enquiry-form');
  const sidebarSuccess = document.getElementById('sidebar-form-success');

  if (sidebarForm) {
    /* Auto-detect product name from page banner heading */
    const productName = (
      document.querySelector('.page-banner__title') ||
      document.querySelector('h1')
    )?.textContent.trim() || 'Product Enquiry';

    sidebarForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameEl  = document.getElementById('sb-name');
      const phoneEl = document.getElementById('sb-phone');
      const qtyEl   = document.getElementById('sb-qty');
      const msgEl   = document.getElementById('sb-msg');

      /* Basic validation */
      if (!nameEl || !nameEl.value.trim()) {
        if (nameEl) nameEl.classList.add('invalid');
        if (sidebarSuccess) setStatus(sidebarSuccess, '⚠️ Please enter your name.', true);
        return;
      }
      if (!phoneEl || !phoneEl.value.trim()) {
        if (phoneEl) phoneEl.classList.add('invalid');
        if (sidebarSuccess) setStatus(sidebarSuccess, '⚠️ Please enter your phone number.', true);
        return;
      }

      [nameEl, phoneEl].forEach(f => f && f.classList.remove('invalid'));
      if (sidebarSuccess) sidebarSuccess.innerHTML = '';

      const btn = sidebarForm.querySelector('[type="submit"]');
      const originalBtnText = btn ? btn.textContent : 'Send Enquiry';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      const templateParams = {
        from_name : nameEl.value.trim(),
        company   : 'Via Product Page',
        country   : 'Not provided',
        phone     : phoneEl.value.trim(),
        email     : 'Not provided',
        product   : productName,
        weight    : qtyEl ? (qtyEl.value.trim() || 'Not specified') : 'Not specified',
        quantity  : 'See message',
        message   : msgEl ? (msgEl.value.trim() || 'Quick enquiry from product page') : 'Quick enquiry from product page'
      };

      sendEmail(templateParams)
        .then(() => {
          sidebarForm.reset();
          setStatus(
            sidebarSuccess,
            '✅ Enquiry sent! We will call you shortly.',
            false
          );
          resetBtn(btn, originalBtnText);
          setTimeout(() => { if (sidebarSuccess) sidebarSuccess.innerHTML = ''; }, 6000);
        })
        .catch(err => {
          console.error('EmailJS sidebar error:', err);
          setStatus(
            sidebarSuccess,
            '❌ Failed to send. Please WhatsApp us directly.',
            true
          );
          resetBtn(btn, originalBtnText);
        });
    });
  }

})();
