const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
toggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
const finder = document.querySelector("#finder");
const cards = [...document.querySelectorAll("[data-service]")];
finder?.addEventListener("input", () => {
  const query = finder.value.trim().toLowerCase();
  for (const card of cards) card.hidden = query.length > 0 && !card.dataset.service.includes(query);
});
const form = document.querySelector("#quote-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const process = document.querySelector("#process");
  const material = document.querySelector("#material");
  const quantity = document.querySelector("#quantity");
  const notes = document.querySelector("#notes");
  const summary = document.querySelector("#summary");
  if (!summary) return;
  const note = notes && "value" in notes ? String(notes.value).trim() : "";
  summary.textContent = [
    "Quote request",
    "Process: " + (process && "value" in process ? process.value : ""),
    "Detail: " + (material && "value" in material ? material.value : ""),
    "Quantity: " + (quantity && "value" in quantity ? quantity.value : ""),
    note ? "Notes: " + note : "Notes: none",
    "This stays on the page. It is not a binding quote and it is not sent."
  ].join("\n");
});
