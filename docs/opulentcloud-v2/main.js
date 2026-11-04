(function () {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  const progress = document.getElementById("progress");
  const bar = document.getElementById("infraBar");
  const fabric = document.getElementById("fabric");
  const nodes = Array.from(document.querySelectorAll(".f-node"));
  const form = document.getElementById("consult");
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
    const index = rows.indexOf(row);
    rows.forEach(function (item) {
      item.classList.toggle("is-active", item === row);
    });
    nodes.forEach(function (node, i) {
      node.classList.toggle("is-on", i === index);
    });
    if (fabric) fabric.dataset.active = String(index);
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

  nodes.forEach(function (node) {
    node.addEventListener("click", function () {
      activate(rows[Number(node.dataset.node)]);
    });
  });

  if (!reduce && rows.length) {
    let cursor = 0;
    setInterval(function () {
      const side = document.querySelector(".infra-side");
      if (side && side.matches(":hover")) return;
      cursor = (cursor + 1) % rows.length;
      activate(rows[cursor]);
    }, 3200);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const body = [
        "Name: " + data.get("first") + " " + data.get("last"),
        "Company: " + (data.get("company") || ""),
        "Email: " + data.get("email"),
        "Topic: " + data.get("topic"),
        "",
        data.get("message") || ""
      ].join("\n");
      window.location.href = "mailto:sales@opulentcloud.co?subject=" +
        encodeURIComponent("Enterprise consultation") +
        "&body=" + encodeURIComponent(body);
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
