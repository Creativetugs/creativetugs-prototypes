const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  toggle.textContent = open ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  if (toggle) { toggle.textContent = '☰'; toggle.setAttribute('aria-label', 'Open navigation'); }
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Concept form: opens a pre-filled email draft. Replace the placeholder address before launch.
document.getElementById('estimate-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Website estimate request - Connecticut Powerwashing Industries');
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\nDetails: ${data.get('message') || 'Not provided'}`
  );
  window.location.href = `mailto:REPLACE-WITH-BUSINESS-EMAIL@example.com?subject=${subject}&body=${body}`;
});
