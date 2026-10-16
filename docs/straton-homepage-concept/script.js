(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const pathfinderForm = document.querySelector('#pathfinder-form');
  const pathfinderResult = document.querySelector('#pathfinder-result');
  if (pathfinderForm && pathfinderResult) {
    pathfinderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(pathfinderForm);
      const industry = data.get('industry');
      const capability = data.get('capability');
      const stage = data.get('stage');

      pathfinderResult.hidden = false;
      pathfinderResult.innerHTML = `
        <strong>Your suggested starting point</strong>
        <p><b>Application:</b> ${escapeHTML(industry)}</p>
        <p><b>Capability:</b> ${escapeHTML(capability)}</p>
        <p><b>Project stage:</b> ${escapeHTML(stage)}</p>
        <p>Next, prepare a drawing or specification (if available), material, estimated quantity, tolerance requirements, and target date. Contact Straton to confirm the appropriate team and submission method.</p>
        <a class="button button-outline" href="#rfq" style="margin-top:8px">Continue to inquiry form ↓</a>`;
      pathfinderResult.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
    });
  }

  const rfqForm = document.querySelector('#rfq-form');
  const rfqResult = document.querySelector('#rfq-result');
  if (rfqForm && rfqResult) {
    rfqForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(rfqForm);
      const summary = [
        'STRATON INDUSTRIES — RFQ INQUIRY DRAFT',
        `Company: ${formData.get('company')}`,
        `Contact: ${formData.get('name')}`,
        `Email: ${formData.get('email')}`,
        `Phone: ${formData.get('phone') || 'Not provided'}`,
        `Industry: ${formData.get('industry') || 'Not specified'}`,
        '',
        'Project overview:',
        formData.get('message')
      ].join('\n');

      rfqResult.hidden = false;
      rfqResult.innerHTML = `<strong>Your inquiry draft is ready.</strong><p>This demo does not send data to Straton. Copy the prepared summary and email it to <a href="mailto:quotes@straton.com">quotes@straton.com</a>, or connect this form to an approved form/CRM endpoint before launch.</p><button class="button button-primary" id="copy-rfq" type="button">Copy inquiry summary</button><textarea class="summary-output" aria-label="Prepared inquiry summary" rows="8" readonly></textarea>`;
      const output = rfqResult.querySelector('.summary-output');
      output.value = summary;
      const copyButton = rfqResult.querySelector('#copy-rfq');
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(summary);
          copyButton.textContent = 'Copied';
        } catch (error) {
          output.focus();
          output.select();
          copyButton.textContent = 'Select and copy text';
        }
      });
      rfqResult.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
  }

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
})();