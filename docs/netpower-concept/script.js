const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  });
});

const video = document.querySelector(".hero-media video");
const filmToggle = document.querySelector(".film-toggle");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && video) {
  video.removeAttribute("autoplay");
  video.pause();
  if (filmToggle) {
    filmToggle.textContent = "Play film";
    filmToggle.setAttribute("aria-pressed", "true");
  }
}

filmToggle?.addEventListener("click", () => {
  if (!video) return;
  if (video.paused) {
    video.play();
    filmToggle.textContent = "Pause film";
    filmToggle.setAttribute("aria-pressed", "false");
  } else {
    video.pause();
    filmToggle.textContent = "Play film";
    filmToggle.setAttribute("aria-pressed", "true");
  }
});

const tabs = [...document.querySelectorAll(".rail-tab")];
const panels = [...document.querySelectorAll(".panel")];

function showPanel(id) {
  tabs.forEach((tab) => {
    const on = tab.dataset.panel === id;
    tab.classList.toggle("is-on", on);
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
  });
  panels.forEach((panel) => {
    const on = panel.id === `panel-${id}`;
    panel.classList.toggle("is-on", on);
    panel.hidden = !on;
  });
}

tabs.forEach((tab, index) => {
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener("click", () => showPanel(tab.dataset.panel));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    next.focus();
    showPanel(next.dataset.panel);
  });
});

document.querySelectorAll("[data-open]").forEach((link) => {
  link.addEventListener("click", () => showPanel(link.dataset.open));
});

const captureLink = document.querySelector('.resource[href="#panel-technology"]');
captureLink?.addEventListener("click", (event) => {
  event.preventDefault();
  showPanel("technology");
});

document.getElementById("enquiry-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const name = String(values.get("name") || "").trim();
  const company = String(values.get("company") || "").trim();
  const email = String(values.get("email") || "").trim();
  const interest = String(values.get("interest") || "").trim();
  form.querySelector(".form-success").textContent =
    `Preview ready for ${name} at ${company} (${email}), about ${interest.toLowerCase()}. Nothing was sent or saved. On the live site this would reach the Net Power development team.`;
});
