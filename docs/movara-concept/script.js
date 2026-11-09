const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Demo behavior: opens a prefilled email. Connect a production form endpoint/CRM before launch.
document.querySelector('#quoteForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Free moving quote request — Movara website');
  const body = encodeURIComponent([
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Email: ${data.get('email') || 'Not provided'}`,
    `Service: ${data.get('service')}`,
    `Move details: ${data.get('details') || 'Not provided'}`
  ].join('\n'));
  window.location.href = `mailto:MovaraFranchise@gmail.com?subject=${subject}&body=${body}`;
});
