(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  let current = 0, timer;
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }
  function restart() { clearInterval(timer); timer = setInterval(() => showSlide(current + 1), 6000); }
  document.querySelector('.slide-prev').addEventListener('click', () => { showSlide(current - 1); restart(); });
  document.querySelector('.slide-next').addEventListener('click', () => { showSlide(current + 1); restart(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); restart(); }));
  restart();
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '☰';
  }));
  const fileInput = document.getElementById('cadFiles');
  const fileNames = document.getElementById('fileNames');
  fileInput.addEventListener('change', () => {
    fileNames.textContent = fileInput.files.length ? [...fileInput.files].map(file => file.name).join(', ') : 'No files selected';
  });
  document.getElementById('rfqForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`RFQ enquiry – ${form.get('company') || form.get('name')}`);
    const body = encodeURIComponent([
      `Name: ${form.get('name')}`, `Company: ${form.get('company') || 'Not provided'}`,
      `Email: ${form.get('email')}`, `Phone: ${form.get('phone') || 'Not provided'}`,
      `Service: ${form.get('service')}`, '', 'Project details:', form.get('details') || 'Not provided', '',
      `Files to attach: ${[...fileInput.files].map(file => file.name).join(', ') || 'None selected'}`,
      '', 'Please attach the selected drawings/CAD files before sending this email.'
    ].join('\n'));
    document.getElementById('formStatus').textContent = 'Your email app is opening. Please attach the selected CAD/drawing files before sending.';
    window.location.href = `mailto:sales@whitmantool.com?subject=${subject}&body=${body}`;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
