(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");
  var filterStatus = document.getElementById("filter-status");
  var filters = document.querySelectorAll("[data-filter]");
  var photos = document.querySelectorAll(".gallery-grid figure");
  var dialog = document.getElementById("lightbox");
  var dialogImg = document.getElementById("lightbox-img");
  var dialogCap = document.getElementById("lightbox-cap");
  var year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  function closeNav() {
    if (!toggle || !nav) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var kind = button.getAttribute("data-filter");
      var shown = 0;
      filters.forEach(function (other) {
        var on = other === button;
        other.classList.toggle("is-on", on);
        other.setAttribute("aria-selected", on ? "true" : "false");
      });
      photos.forEach(function (photo) {
        var match = kind === "all" || photo.getAttribute("data-kind") === kind;
        photo.hidden = !match;
        if (match) shown += 1;
      });
      if (filterStatus) {
        var label = button.textContent.trim().toLowerCase();
        filterStatus.textContent = kind === "all"
          ? "Showing all " + shown + " photos."
          : "Showing " + shown + " " + label + " photo" + (shown === 1 ? "" : "s") + ".";
      }
    });
  });

  if (dialog && dialogImg) {
    photos.forEach(function (photo) {
      var trigger = photo.querySelector(".shot");
      if (!trigger) return;
      trigger.addEventListener("click", function () {
        var img = photo.querySelector("img");
        if (!img) return;
        dialogImg.src = img.src;
        dialogImg.alt = img.alt;
        dialogCap.textContent = photo.querySelector("figcaption")
          ? photo.querySelector("figcaption").textContent
          : "";
        dialog.showModal();
      });
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      dialogImg.removeAttribute("src");
    });
  }

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var phone = String(data.get("phone") || "").trim();
    var email = String(data.get("email") || "").trim();
    var signType = String(data.get("sign-type") || "").trim();
    var city = String(data.get("city") || "").trim();
    var message = String(data.get("message") || "").trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var phoneOk = phone.replace(/\D/g, "").length >= 10;

    form.querySelectorAll("[aria-invalid]").forEach(function (field) {
      field.removeAttribute("aria-invalid");
    });

    if (!name || !phoneOk || !emailOk || !signType || !message) {
      if (!name) form.elements.name.setAttribute("aria-invalid", "true");
      if (!phoneOk) form.elements.phone.setAttribute("aria-invalid", "true");
      if (!emailOk) form.elements.email.setAttribute("aria-invalid", "true");
      if (!signType) form.elements["sign-type"].setAttribute("aria-invalid", "true");
      if (!message) form.elements.message.setAttribute("aria-invalid", "true");
      if (status) {
        status.textContent = "Add your name, a 10-digit phone number, a valid email, the sign type, and a short note about the job.";
      }
      return;
    }

    var body = [
      "Name: " + name,
      "Phone: " + phone,
      "Email: " + email,
      "Sign type: " + signType,
      "City: " + (city || "Not given"),
      "",
      message
    ].join("\n");

    window.location.href = "mailto:signsplus2@aol.com?subject="
      + encodeURIComponent("Quote request from " + name)
      + "&body=" + encodeURIComponent(body);

    if (status) {
      status.textContent = "Your email app should open with this request addressed to the shop. If it does not, call (866) 453-7446.";
    }
  });
})();
