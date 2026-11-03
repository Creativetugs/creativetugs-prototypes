function esc(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
}

const INDUSTRIES = {
  healthcare: { label: "Healthcare", capacity: "Licensed beds", unit: "bed" },
  hotel: { label: "Hotel", capacity: "Guest rooms", unit: "room" },
  restaurant: { label: "Restaurant", capacity: "Seats", unit: "seat" },
  senior: { label: "Senior care", capacity: "Resident beds", unit: "bed" },
  fitness: { label: "Fitness", capacity: "Average daily visitors", unit: "visitor" },
  other: { label: "Other", capacity: "Operating units", unit: "unit" }
};

const PRODUCTS = {
  "bed-linens": "Bed linens",
  towels: "Towels",
  uniforms: "Uniforms",
  "patient-apparel": "Patient apparel",
  napery: "Napery",
  "kitchen-textiles": "Kitchen textiles"
};

const FREQUENCIES = {
  daily: "Daily",
  "3x": "3 times per week",
  weekly: "Weekly",
  custom: "Custom schedule"
};

const TEXTILES = {
  healthcare: {
    "bed-linens": [4, 7, "changes per bed each week"],
    towels: [5, 10, "towels per bed each week"],
    "patient-apparel": [3, 6, "patient garments per bed each week"],
    napery: [0.5, 1.5, "dietary napery pieces per bed each week, where the facility serves meals"],
    "kitchen-textiles": [0.4, 1.2, "kitchen textiles per bed each week, tied to dietary volume"]
  },
  hotel: {
    "bed-linens": [3, 5, "linen changes per room each week, before occupancy is applied"],
    towels: [6, 10, "towels per room each week, before occupancy is applied"],
    napery: [1, 3, "napery pieces per room each week where the property runs food service"],
    "kitchen-textiles": [0.4, 1.2, "kitchen textiles per room each week where the property runs a kitchen"]
  },
  restaurant: {
    napery: [7, 21, "table linens per seat each week, across turns"],
    "kitchen-textiles": [2, 5, "kitchen textiles per seat each week"],
    towels: [1, 3, "towels per seat each week"]
  },
  senior: {
    "bed-linens": [3, 6, "changes per resident bed each week"],
    towels: [4, 8, "towels per resident bed each week"],
    "patient-apparel": [2, 4, "resident garments per bed each week"],
    napery: [1, 3, "dining napery per resident bed each week"],
    "kitchen-textiles": [0.5, 1.5, "kitchen textiles per resident bed each week"]
  },
  fitness: {
    towels: [7, 14, "towels per average daily visitor each week, about one to two per visit"]
  },
  other: {
    "bed-linens": [1, 3, "pieces per unit each week — a sketch only"],
    towels: [1, 4, "pieces per unit each week — a sketch only"],
    "patient-apparel": [0.5, 2, "pieces per unit each week — a sketch only"],
    napery: [0.5, 2, "pieces per unit each week — a sketch only"],
    "kitchen-textiles": [0.3, 1.5, "pieces per unit each week — a sketch only"]
  }
};

function initPlanner(form) {
  const steps = Array.from(form.querySelectorAll(".step"));
  const result = document.getElementById("planner-result");
  const error = document.getElementById("planner-error");
  let index = 0;
  const params = new URLSearchParams(window.location.search);
  const preset = params.get("industry");
  if (preset && INDUSTRIES[preset]) {
    const input = form.querySelector('input[name="industry"][value="' + preset + '"]');
    if (input) input.checked = true;
  }

  function show(next) {
    index = next;
    steps.forEach(function (step, i) {
      step.hidden = i !== index;
    });
    result.hidden = true;
    form.querySelector(".steps").hidden = false;
    form.querySelector(".planner-nav").hidden = false;
    form.querySelector("[data-prev]").hidden = index === 0;
    form.querySelector("[data-next]").hidden = index === steps.length - 1;
    form.querySelector("[type='submit']").hidden = index !== steps.length - 1;
    const industry = selected("industry")[0];
    const capacityLabel = form.querySelector("[data-capacity-label]");
    if (capacityLabel && industry) capacityLabel.textContent = INDUSTRIES[industry].capacity;
    form.querySelectorAll(".steps button").forEach(function (button, i) {
      if (i === index) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    error.textContent = "";
  }

  function value(name) {
    const field = form.elements[name];
    return field ? String(field.value || "").trim() : "";
  }

  function selected(name) {
    return Array.from(form.querySelectorAll('input[name="' + name + '"]:checked')).map(function (input) {
      return input.value;
    });
  }

  function validate(through) {
    const industry = selected("industry")[0];
    if (through >= 0 && !industry) return { step: 0, message: "Select a facility type." };
    if (through >= 1) {
      const locations = Number(value("locations"));
      const capacity = Number(value("capacity"));
      if (!locations || locations < 1) return { step: 1, message: "Enter the number of locations." };
      if (!capacity || capacity < 1) return { step: 1, message: "Enter the facility size." };
    }
    if (through >= 2 && selected("product").length === 0) {
      return { step: 2, message: "Choose at least one product." };
    }
    if (through >= 3) {
      const frequency = selected("frequency")[0];
      if (!frequency) return { step: 3, message: "Choose a service frequency." };
      if (frequency === "custom" && !value("customFrequency")) {
        return { step: 3, message: "Describe the custom schedule." };
      }
    }
    if (through >= 4) {
      if (!value("contactName") || !value("company") || !value("email")) {
        return { step: 4, message: "Add a name, organization, and email so the enquiry is usable." };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) {
        return { step: 4, message: "Enter a valid email address." };
      }
    }
    return null;
  }

  form.addEventListener("click", function (event) {
    const next = event.target.closest("[data-next]");
    const prev = event.target.closest("[data-prev]");
    const jump = event.target.closest(".steps button");
    if (next) {
      const problem = validate(index);
      if (problem) {
        error.textContent = problem.message;
        return;
      }
      show(index + 1);
    }
    if (prev) show(index - 1);
    if (jump) {
      const target = Number(jump.dataset.step);
      if (target <= index) show(target);
      else {
        const problem = validate(target - 1);
        if (problem) {
          error.textContent = problem.message;
          show(problem.step);
          return;
        }
        show(target);
      }
    }
  });

  form.querySelectorAll('input[name="frequency"]').forEach(function (input) {
    input.addEventListener("change", function () {
      const custom = document.getElementById("custom-frequency");
      custom.hidden = selected("frequency")[0] !== "custom";
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const problem = validate(4);
    if (problem) {
      show(problem.step);
      error.textContent = problem.message;
      return;
    }
    const profile = buildProfile(form);
    sessionStorage.setItem("morganServiceProfile", JSON.stringify(profile));
    result.hidden = false;
    steps.forEach(function (step) { step.hidden = true; });
    form.querySelector(".steps").hidden = true;
    form.querySelector(".planner-nav").hidden = true;
    result.innerHTML = renderSummary(profile);
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  result.addEventListener("click", function (event) {
    if (event.target.closest("[data-edit]")) {
      show(4);
    }
    if (event.target.closest("[data-copy]")) {
      const saved = sessionStorage.getItem("morganServiceProfile");
      const text = saved ? JSON.parse(saved).summaryText : "";
      navigator.clipboard.writeText(text).then(function () {
        event.target.textContent = "Copied";
      });
    }
    if (event.target.closest("[data-print]")) window.print();
  });

  show(preset && INDUSTRIES[preset] ? 1 : 0);
}

function buildProfile(form) {
  const industryKey = form.querySelector('input[name="industry"]:checked').value;
  const industry = INDUSTRIES[industryKey];
  const locations = Number(form.elements.locations.value);
  const capacity = Number(form.elements.capacity.value);
  const employees = Number(form.elements.employees.value || 0);
  const stated = Number(form.elements.knownVolume.value || 0);
  const products = Array.from(form.querySelectorAll('input[name="product"]:checked')).map(function (input) {
    return input.value;
  });
  const frequencyKey = form.querySelector('input[name="frequency"]:checked').value;
  const frequency = frequencyKey === "custom"
    ? form.elements.customFrequency.value.trim()
    : FREQUENCIES[frequencyKey];
  const handling = Array.from(form.querySelectorAll('input[name="handling"]:checked')).map(function (input) {
    return input.value;
  });
  const notes = form.elements.notes.value.trim();
  const rates = TEXTILES[industryKey] || {};
  const bands = [];
  const omitted = [];

  products.forEach(function (key) {
    if (key === "uniforms") return;
    const rate = rates[key];
    if (!rate) {
      omitted.push(PRODUCTS[key]);
      return;
    }
    bands.push({
      name: PRODUCTS[key],
      low: Math.round(rate[0] * capacity),
      high: Math.round(rate[1] * capacity),
      note: rate[2] + " × " + capacity.toLocaleString("en-US") + " " + industry.unit + (capacity === 1 ? "" : "s")
    });
  });

  let uniformNote = "";
  if (products.indexOf("uniforms") !== -1) {
    if (employees > 0) {
      uniformNote = (employees * 3).toLocaleString("en-US") + "–" + (employees * 5).toLocaleString("en-US")
        + " garments in rotation (" + employees.toLocaleString("en-US") + " uniformed employees × 3–5).";
    } else {
      uniformNote = "Uniforms are selected. Add uniformed headcount to size the garment rotation.";
    }
  }

  const focus = [];
  if (industryKey === "healthcare" || industryKey === "senior") {
    focus.push("Hygiene standards, inventory visibility, and consistent availability.");
  }
  if (industryKey === "hotel") {
    focus.push("Guest presentation, par levels, and the hotel linen rental model, including RFID-enabled tracking where that program applies.");
  }
  if (industryKey === "restaurant") {
    focus.push("Scheduled napery and kitchen textile service, with room for event surge.");
  }
  if (industryKey === "fitness") {
    focus.push("High-turn towel service and staff uniforms.");
  }
  if (locations > 1) focus.push("Coordinated service across " + locations + " locations.");
  if (handling.length) focus.push(handling.join("; ") + ".");

  const contact = {
    name: form.elements.contactName.value.trim(),
    role: form.elements.role.value.trim(),
    company: form.elements.company.value.trim(),
    email: form.elements.email.value.trim(),
    phone: form.elements.phone.value.trim()
  };

  const profile = {
    industryKey: industryKey,
    industryLabel: industry.label,
    locations: locations,
    capacity: capacity,
    capacityLabel: industry.capacity,
    unit: industry.unit,
    employees: employees,
    products: products.map(function (key) { return PRODUCTS[key]; }),
    frequency: frequency,
    handling: handling,
    notes: notes,
    bands: bands,
    omitted: omitted,
    uniformNote: uniformNote,
    statedVolume: stated > 0 ? stated : null,
    focus: focus,
    contact: contact
  };
  profile.summaryText = plainSummary(profile);
  return profile;
}

function plainSummary(profile) {
  const lines = [
    "Morgan Services — service profile (concept demonstration)",
    "Organization: " + profile.contact.company,
    "Contact: " + profile.contact.name + (profile.contact.role ? ", " + profile.contact.role : ""),
    "Email: " + profile.contact.email,
    profile.contact.phone ? "Phone: " + profile.contact.phone : "",
    "Facility type: " + profile.industryLabel,
    "Locations: " + profile.locations,
    profile.capacityLabel + ": " + profile.capacity.toLocaleString("en-US"),
    profile.employees ? "Uniformed employees: " + profile.employees.toLocaleString("en-US") : "",
    "Products: " + profile.products.join(", "),
    "Service frequency: " + profile.frequency,
    profile.handling.length ? "Handling: " + profile.handling.join("; ") : "",
    profile.statedVolume ? "Customer-stated weekly volume: " + profile.statedVolume.toLocaleString("en-US") + " pieces" : "",
    profile.uniformNote ? "Uniforms: " + profile.uniformNote : "",
    profile.notes ? "Notes: " + profile.notes : "",
    "",
    "Illustrative weekly piece bands (not a quote):"
  ];
  profile.bands.forEach(function (band) {
    lines.push("- " + band.name + ": " + band.low.toLocaleString("en-US") + "–" + band.high.toLocaleString("en-US") + " (" + band.note + ")");
  });
  if (profile.omitted.length) lines.push("Not estimated here: " + profile.omitted.join(", "));
  lines.push("These ranges are concept planning math. They are not Morgan-approved consumption rates, prices, or a service commitment.");
  return lines.filter(Boolean).join("\n");
}

function renderSummary(profile) {
  const rows = [
    ["Organization", profile.contact.company],
    ["Contact", profile.contact.name + (profile.contact.role ? ", " + profile.contact.role : "")],
    ["Email", profile.contact.email],
    ["Phone", profile.contact.phone || "—"],
    ["Facility type", profile.industryLabel],
    ["Locations", profile.locations.toLocaleString("en-US")],
    [profile.capacityLabel, profile.capacity.toLocaleString("en-US")],
    ["Products", profile.products.join(", ")],
    ["Frequency", profile.frequency]
  ];
  if (profile.employees) rows.push(["Uniformed employees", profile.employees.toLocaleString("en-US")]);
  if (profile.handling.length) rows.push(["Handling", profile.handling.join("; ")]);
  if (profile.notes) rows.push(["Notes", profile.notes]);

  const bands = profile.bands.map(function (band) {
    return "<div class=\"band\"><strong>" + esc(band.name) + " · " + band.low.toLocaleString("en-US") + "–" + band.high.toLocaleString("en-US") + " pieces / week</strong><span>" + esc(band.note) + "</span></div>";
  }).join("");

  const stated = profile.statedVolume
    ? "<p><strong>Volume you provided:</strong> " + profile.statedVolume.toLocaleString("en-US") + " pieces per week. The bands below are a separate concept comparison.</p>"
    : "";

  return ""
    + "<div class=\"summary\">"
    + "<div><p class=\"kicker\">Requirements summary</p><h3>Service profile for " + esc(profile.contact.company) + "</h3>"
    + stated
    + "<div class=\"sheet\"><dl>"
    + rows.map(function (row) { return "<dt>" + esc(row[0]) + "</dt><dd>" + esc(row[1]) + "</dd>"; }).join("")
    + "</dl></div>"
    + (profile.focus.length ? "<h3>What this tells the Morgan team</h3><ul class=\"plain-list\">" + profile.focus.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ul>" : "")
    + "</div>"
    + "<div class=\"sheet\"><h3>Illustrative volume</h3>"
    + (bands || "<p>No textile volume was estimated from the products selected.</p>")
    + (profile.uniformNote ? "<p>" + esc(profile.uniformNote) + "</p>" : "")
    + (profile.omitted.length ? "<p>Selected, and left for a facility survey: " + esc(profile.omitted.join(", ")) + ".</p>" : "")
    + "<p class=\"disclaimer\">Concept demonstration only. A production version would use Morgan-approved consumption assumptions and send this profile into the sales workflow. These figures are not a quotation.</p>"
    + "<div class=\"summary-actions\">"
    + "<a class=\"btn btn-primary\" href=\"contact.html\">Continue to enquiry</a>"
    + "<button class=\"btn btn-line\" type=\"button\" data-copy>Copy summary</button>"
    + "<button class=\"btn btn-line\" type=\"button\" data-print>Print</button>"
    + "<button class=\"btn btn-line\" type=\"button\" data-edit>Edit profile</button>"
    + "</div></div></div>";
}

function renderSavedProfile(mount) {
  const raw = sessionStorage.getItem("morganServiceProfile");
  if (!raw) {
    mount.innerHTML = "<p>No service profile yet. <a href=\"index.html#planner\">Build your service program</a> and the enquiry will carry those details.</p>";
    return;
  }
  const profile = JSON.parse(raw);
  mount.innerHTML = "<div class=\"profile-card\"><p class=\"kicker\">From the planner</p><h2>Enquiry for " + esc(profile.contact.company) + "</h2><pre style=\"white-space:pre-wrap;font-family:inherit\">" + esc(profile.summaryText) + "</pre></div>";
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.elements.name.value = profile.contact.name || "";
  form.elements.role.value = profile.contact.role || "";
  form.elements.company.value = profile.contact.company || "";
  form.elements.email.value = profile.contact.email || "";
  form.elements.phone.value = profile.contact.phone || "";
}

function initContact(form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const success = document.getElementById("contact-success");
    form.hidden = true;
    success.hidden = false;
  });
}

(function () {
  const home = document.body.classList.contains("home");
  const chrome = document.getElementById("chrome");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const logo = document.querySelector(".logo img");

  function headerIsSolid() {
    if (!home) return true;
    return window.scrollY > 12 || (chrome && chrome.classList.contains("menu-open"));
  }

  function paintHeader() {
    if (!chrome) return;
    const solid = headerIsSolid();
    chrome.classList.toggle("is-stuck", home && solid);
    if (logo && logo.dataset.white && logo.dataset.color) {
      const next = solid ? logo.dataset.color : logo.dataset.white;
      if (logo.getAttribute("src") !== next) logo.setAttribute("src", next);
    }
  }

  paintHeader();
  window.addEventListener("scroll", paintHeader, { passive: true });

  if (toggle && nav && chrome) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      chrome.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
      paintHeader();
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        chrome.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        paintHeader();
      });
    });
  }

  const form = document.getElementById("planner-form");
  if (form) initPlanner(form);
  const profile = document.getElementById("enquiry-profile");
  if (profile) renderSavedProfile(profile);
  const contact = document.getElementById("contact-form");
  if (contact) initContact(contact);
})();
