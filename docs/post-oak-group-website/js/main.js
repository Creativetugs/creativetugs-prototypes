const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.primary-nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
const dropButton = document.querySelector('.nav-drop-button');
dropButton?.addEventListener('click', () => {
  const parent = dropButton.closest('.nav-dropdown');
  const open = parent.classList.toggle('open');
  dropButton.setAttribute('aria-expanded', String(open));
});
const heroWords = ['Reimagined.','Asset Management.','Commercial Banking.','Investment Banking.','Investment Research.','Private Banking.','Wealth Management.'];
let wordIndex = 0;
const word = document.getElementById('rotating-word');
if (word && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    word.style.opacity = '0';
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % heroWords.length;
      word.textContent = heroWords[wordIndex];
      word.style.opacity = '1';
    }, 300);
  }, 3600);
}
const recommendations = {
  business: 'Investment Banking · M&A Advisory',
  capital: 'Investment Banking · Capital Markets',
  invest: 'Investment Research · Asset Management',
  wealth: 'Private Banking · Wealth Management',
  banking: 'Commercial Banking'
};
const objective = document.getElementById('objective');
const recommendation = document.getElementById('recommendation');
objective?.addEventListener('change', () => {
  recommendation.textContent = recommendations[objective.value] || 'Explore our capabilities';
});
const finderContact = document.getElementById('finder-contact');
finderContact?.addEventListener('click', () => {
  const visitor = document.getElementById('visitor')?.value || '';
  const interest = objective?.selectedOptions[0]?.textContent || '';
  const subject = encodeURIComponent('Post Oak Group enquiry: ' + interest);
  const body = encodeURIComponent('I am a ' + visitor + ' interested in: ' + interest + '. Please contact me.');
  finderContact.href = 'mailto:info@postoakgroup.co?subject=' + subject + '&body=' + body;
});
