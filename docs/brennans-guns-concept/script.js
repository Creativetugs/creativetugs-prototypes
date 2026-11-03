const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('inquiry-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('form-note').textContent =
      'Thanks! This is a front-end concept form. Connect it to Brennan’s Guns email or CRM to receive inquiries.';
    document.getElementById('form-note').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
}
