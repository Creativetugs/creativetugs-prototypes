const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const inquiryForm = document.querySelector('#inquiry-form');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const name = data.get('name') || '';
    const company = data.get('company') || '';
    const email = data.get('email') || '';
    const phone = data.get('phone') || '';
    const project = data.get('project') || '';
    const details = data.get('details') || '';
    const subject = encodeURIComponent('Project inquiry — ' + project);
    const body = encodeURIComponent(
      'Hello City Welding team,\\n\\nI would like to discuss a fabrication project.\\n\\n' +
      'Name: ' + name + '\\nCompany: ' + company + '\\nEmail: ' + email +
      '\\nPhone: ' + phone + '\\nProject: ' + project + '\\n\\nDetails:\\n' + details +
      '\\n\\nThank you.'
    );
    window.location.href = 'mailto:contact@cityweld.com?subject=' + subject + '&body=' + body;
  });
}
