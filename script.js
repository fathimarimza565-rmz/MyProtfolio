// ============================================================
// Rimza Rauff — Portfolio interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavToggle();
  initSmoothScrollClose();
  initScrollReveal();
  initContactForm();
  initActiveNav();
});

/* ---------- Footer year ---------- */
function initYear(){
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav ---------- */
function initNavToggle(){
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });
}

function initSmoothScrollClose(){
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('navBurger');
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      links?.classList.remove('is-open');
      burger?.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll(
    '.about, .timeline__item, .skill-card, .project-card, .strength-card, .testimonial-card, .contact-grid, .info-card'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');

      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ---------- Contact form (client-side only demo) ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message){
      note.textContent = 'Please fill in every field before sending.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      note.textContent = 'That email address doesn\'t look right — please check it.';
      return;
    }

    // No backend is wired up in this template, so this falls back to a
    // mailto link that opens the visitor's email client with the message
    // pre-filled, addressed straight to Rimza's inbox.
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:rimzarauff@gmail.com?subject=${subject}&body=${body}`;

    note.textContent = 'Opening your email client to send this message…';
    form.reset();
  });
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNav(){
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length) return;

  const map = new Map();
  navLinks.forEach(link => map.set(link.getAttribute('href').replace('#',''), link));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting){
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--ink)';
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(sec => observer.observe(sec));
}
