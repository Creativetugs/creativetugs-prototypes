const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('estimate-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const data = new FormData(this);
  const subject = encodeURIComponent('Website enquiry - TX Moon Countertops');
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nProject: ${data.get('project')}\n\nDetails:\n${data.get('message')}`
  );
  document.querySelector('.form-status').textContent = 'Your email app should open with your enquiry. Please review and send it.';
  window.location.href = `mailto:texasmooncountertops@gmail.com?subject=${subject}&body=${body}`;
});