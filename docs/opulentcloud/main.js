(function () {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  const progress = document.getElementById("progress");
  const glow = document.getElementById("glow");
  const hero = document.querySelector(".hero");
  const bar = document.getElementById("infraBar");
  const rows = Array.from(document.querySelectorAll(".infra-row"));
  const steps = document.getElementById("steps");
  const sections = Array.from(document.querySelectorAll("[data-section]"));
  const spies = Array.from(document.querySelectorAll("[data-spy]"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onScroll() {
    nav.classList.toggle("is-stuck", window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    progress.style.setProperty("--p", p.toFixed(4));

    const mark = window.scrollY + 140;
    let current = sections[0].dataset.section;
    sections.forEach(function (section) {
      if (section.offsetTop <= mark) current = section.dataset.section;
    });
    spies.forEach(function (link) {
      const on = link.dataset.spy === current;
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function placeBar() {
    const active = document.querySelector(".infra-row.is-active");
    if (!active || !bar) return;
    bar.style.transform = "translateY(" + active.offsetTop + "px)";
    bar.style.height = active.offsetHeight + "px";
  }

  function activate(row) {
    rows.forEach(function (item) {
      item.classList.toggle("is-active", item === row);
    });
    placeBar();
  }

  rows.forEach(function (row) {
    row.addEventListener("mouseenter", function () { activate(row); });
    row.addEventListener("focus", function () { activate(row); });
  });

  document.querySelectorAll(".spot").forEach(function (el) {
    el.addEventListener("pointermove", function (event) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", event.clientX - rect.left + "px");
      el.style.setProperty("--my", event.clientY - rect.top + "px");
    });
  });

  if (hero && glow && !reduce) {
    hero.addEventListener("pointermove", function (event) {
      if (event.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      glow.style.left = event.clientX - rect.left + "px";
      glow.style.top = event.clientY - rect.top + "px";
    });
  }

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  if ("IntersectionObserver" in window && steps) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) steps.classList.add("is-in");
      });
    }, { threshold: 0.45 });
    observer.observe(steps);
  } else if (steps) {
    steps.classList.add("is-in");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", placeBar);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(placeBar);
  }
  placeBar();
  onScroll();
})();
