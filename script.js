const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    currentObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

// Gentle background drift, disabled for users who prefer reduced motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const grid = document.querySelector('.grid-bg');
    if (grid) grid.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  }, { passive: true });
}
