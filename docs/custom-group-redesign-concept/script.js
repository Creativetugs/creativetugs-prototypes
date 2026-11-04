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
document.getElementById('year').textContent = new Date().getFullYear();

const fileInput = document.getElementById('files');
const fileNames = document.getElementById('fileNames');
fileInput?.addEventListener('change', () => {
  const files = Array.from(fileInput.files || []);
  fileNames.textContent = files.length ? files.map(f => f.name).join(', ') : 'Choose files to attach';
});

document.getElementById('rfqForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const chosenFiles = Array.from(fileInput.files || []).map(file => file.name);
  const summary = [
    'Your enquiry details are ready for submission.',
    '',
    'Enquiry: ' + data.get('enquiry'),
    'Industry: ' + (data.get('industry') || 'Not specified'),
    'Name: ' + data.get('name'),
    'Company: ' + (data.get('company') || 'Not specified'),
    'Email: ' + data.get('email'),
    'Phone: ' + (data.get('phone') || 'Not specified'),
    'Files selected: ' + (chosenFiles.length ? chosenFiles.join(', ') : 'None'),
    '',
    'This is a front-end concept. Connect a secure form handler and file storage before going live.'
  ].join('\n');
  document.getElementById('formResult').textContent = summary;
});
