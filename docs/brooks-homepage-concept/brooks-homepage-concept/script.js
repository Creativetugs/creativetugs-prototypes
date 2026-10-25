const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}));

const projectForm = document.querySelector('#project-form');
const result = document.querySelector('#tool-result');
projectForm?.addEventListener('submit', event => {
  event.preventDefault();
  const type = document.querySelector('#project-type').value;
  const industry = document.querySelector('#industry').value;
  const volume = new FormData(projectForm).get('volume');
  if (!type || !industry || !volume) return;
  result.hidden = false;
  result.innerHTML = `<h4>Your project brief is ready to start</h4><p><strong>Need:</strong> ${escapeText(type)}<br><strong>Industry:</strong> ${escapeText(industry)}<br><strong>Estimated volume:</strong> ${escapeText(volume)}</p><p>For a more useful first review, gather any available drawings or CAD files, material and finish requirements, tolerances, target dates, and annual quantity.</p><div class="result-links"><a href="mailto:eric@brooks-machine.com?subject=${encodeURIComponent('Project inquiry — ' + type)}&body=${encodeURIComponent('Hello Brooks team,\n\nI would like to discuss a project.\n\nCapability: ' + type + '\nIndustry: ' + industry + '\nEstimated quantity: ' + volume + '\n\nI can share specifications and drawings as needed.\n\nThank you.')}" >Start an email ↗</a><a href="tel:+19782567477">Call Brooks ↗</a></div>`;
  result.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest'});
});
function escapeText(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
