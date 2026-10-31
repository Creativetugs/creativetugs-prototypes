const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.textContent = "☰";
  }));
}
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("quoteForm");
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const fields = [
    ["Name", data.get("name")], ["Company", data.get("company")],
    ["Email", data.get("email")], ["Phone", data.get("phone")],
    ["Request type", data.get("request")], ["Preferred timing", data.get("timing")],
    ["Project details", data.get("details")]
  ];
  const body = fields.map(([label, value]) => `${label}: ${value || "Not provided"}`).join("\n\n");
  const subject = encodeURIComponent(`Quote request from ${data.get("name")} – ${data.get("request")}`);
  const mailto = `mailto:info.sales@markhammetals.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  document.getElementById("formStatus").textContent = "Your email app should open with the request ready. Review it and press Send to contact Markham Metals.";
  window.location.href = mailto;
});
