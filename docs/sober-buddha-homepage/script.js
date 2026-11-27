const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const tabs = document.querySelectorAll('.molecule-tab');
const title = document.getElementById('molecule-title');
const subtitle = document.getElementById('molecule-subtitle');
const copy = document.getElementById('molecule-copy');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');
  });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  title.textContent = tab.dataset.title;
  subtitle.textContent = tab.dataset.subtitle;
  copy.textContent = tab.dataset.copy;
}));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.intro-grid, .manifesto-inner, .method-heading, .molecule-explorer, .intervention-card, .difference-copy, .about-content, .resource-card, .faq-list').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
