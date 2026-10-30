const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#site-nav");

menuBtn.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    header.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

const form = document.querySelector("#estimate-form");
const note = document.querySelector("#form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    "Free estimate request",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Town: ${data.get("town")}`,
    `Need: ${data.get("need")}`,
    `When: ${data.get("when")}`,
    `Notes: ${data.get("notes") || ""}`,
  ];
  note.textContent = "Opening an email to Bellemare with what you wrote. For a storm, call 203-723-1199.";
  window.location.href =
    "mailto:bellemaretreeservicellc@gmail.com?subject=" +
    encodeURIComponent("Free estimate request") +
    "&body=" +
    encodeURIComponent(lines.join("\n"));
});
