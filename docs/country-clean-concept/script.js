const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    'Hi Ainslee! I would like to request a cleaning quote.',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Service: ${data.get('service')}`,
    `Details: ${data.get('details') || 'Not provided'}`
  ].join('\n');
  window.location.href = 'sms:+19123877978?&body=' + encodeURIComponent(message);
});
