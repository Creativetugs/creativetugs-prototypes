const order = ["brief", "work", "capability", "path", "start", "job", "after", "help"];
const panels = order.map((id) => document.getElementById(id));
const steps = [...document.querySelectorAll(".steps button")];
const stage = document.getElementById("stage");
const count = document.getElementById("count");
let index = 0;

const work = {
  construction: {
    title: "Construction",
    body: "Electrical construction from the service feeder to the last outlet or fixture. New builds, expansions, and design-build.",
    tags: ["Amazon Distribution Center, Project Eagle", "Syracuse University Dome", "Design-build"]
  },
  utility: {
    title: "Utility",
    body: "Transmission, distribution, substation construction, and maintenance for utility companies. Storm restoration reaches past the Northeast.",
    tags: ["Silver Springs Station", "National Grid Tower SYR", "Substation"]
  },
  epc: {
    title: "Engineer, procure, construct",
    body: "Planning, engineering, procurement, and construction under one team, so the project stays with one accountable partner.",
    tags: ["Front-end planning", "One team", "Complex projects"]
  },
  service: {
    title: "Service",
    body: "Electrical service and preventive maintenance, so systems keep running after the project is turned over.",
    tags: ["Preventive maintenance", "24/7 emergency line", "1-800-343-2176"]
  },
  vdc: {
    title: "VDC and off-site",
    body: "Level 400 BIM, prefabrication, and material kitting, so more of the job is built before it reaches the site.",
    tags: ["BIM", "Prefabrication", "Material kitting"]
  }
};

const offices = {
  victor: {
    title: "Corporate headquarters",
    body: "830 Phillips Road, Victor, New York 14564. The toll-free line is reviewed and coordinated with the operations lead for the work.",
    tags: ["1-800-343-2176", "(585) 924-2176"]
  },
  rochester: {
    title: "Rochester construction and utility",
    body: "390B Systems Road, Rochester, NY 14623. Construction and utility services for the Rochester region.",
    tags: ["(585) 424-3472"]
  },
  albany: {
    title: "Albany region",
    body: "2360 Maxon Road Ext., Schenectady, NY 12308.",
    tags: ["(518) 346-0077"]
  },
  buffalo: {
    title: "Buffalo region",
    body: "20 Lancaster Parkway, Lancaster, NY 14086.",
    tags: ["(716) 675-9010"]
  },
  syracuse: {
    title: "Syracuse region",
    body: "7001 Performance Drive N., Syracuse, NY 13212.",
    tags: ["(315) 437-1453"]
  }
};

const phases = [
  {
    no: "01",
    title: "Front-end planning",
    body: "Goals, risks, and the plan are set with the client before crews are committed.",
    tags: ["Client receives the plan"]
  },
  {
    no: "02",
    title: "Engineering",
    body: "Power systems and schematics are designed for the project, ready for procurement and the field.",
    tags: ["Client receives the design"]
  },
  {
    no: "03",
    title: "Procurement",
    body: "Materials and equipment are sourced and scheduled so the job is supplied when the field is ready.",
    tags: ["Client receives the schedule"]
  },
  {
    no: "04",
    title: "Construction",
    body: "Crews build it. Safety, sequence, and the site lead stay visible while the work is underway.",
    tags: ["Client receives site updates"]
  },
  {
    no: "05",
    title: "Turnover",
    body: "Testing, commissioning, and handover. The record of what was built stays with the service path.",
    tags: ["Client receives the record"]
  }
];

const routes = {
  construction: {
    title: "Rochester construction and utility",
    body: "New builds and expansions start here, then get coordinated with the operations lead.",
    phone: "(585) 424-3472",
    tel: "tel:15854243472",
    where: "390B Systems Road, Rochester, NY 14623"
  },
  utility: {
    title: "Victor headquarters",
    body: "Utility, substation, and storm work is reviewed on the toll-free line and sent to the utility lead.",
    phone: "1-800-343-2176",
    tel: "tel:18003432176",
    where: "830 Phillips Road, Victor, NY 14564"
  },
  epc: {
    title: "Victor headquarters",
    body: "Engineer, procure, construct starts with one inquiry. Victor coordinates the team across the phases.",
    phone: "1-800-343-2176",
    tel: "tel:18003432176",
    where: "830 Phillips Road, Victor, NY 14564"
  },
  service: {
    title: "Service desk, Victor",
    body: "Service and preventive maintenance stay on the published service line.",
    phone: "1-800-343-2176",
    tel: "tel:18003432176",
    where: "830 Phillips Road, Victor, NY 14564"
  },
  vdc: {
    title: "Victor headquarters",
    body: "Prefabrication, kitting, and virtual design are scoped with the VDC team, then tied to the job.",
    phone: "1-800-343-2176",
    tel: "tel:18003432176",
    where: "830 Phillips Road, Victor, NY 14564"
  }
};

const channels = {
  update: {
    title: "Latest update",
    body: "Sample, substation project. Crews are on site. Materials for the next sequence are in the yard. The last note is dated with the phase still in construction.",
    tags: ["Phase: Construction", "Audience: the client team"]
  },
  question: {
    title: "Where a question goes",
    body: "A question from the client lands with the project lead, and a copy stays on the job so the next person sees it.",
    tags: ["Owner: project lead", "Record stays on the job"]
  },
  drawing: {
    title: "Current drawings",
    body: "The issued set lives with the job. When a revision is posted, the previous set stays marked so the field is on one issue.",
    tags: ["Issued for construction", "Revision history"]
  }
};

function fill(node, item, extra) {
  const tags = (item.tags || []).map((tag) => `<span>${tag}</span>`).join("");
  node.innerHTML = `<h2>${item.title}</h2><p>${item.body}</p>${extra || ""}<div class="meta">${tags}</div>`;
}

function show(next) {
  index = (next + order.length) % order.length;
  panels.forEach((panel, i) => {
    panel.hidden = i !== index;
  });
  steps.forEach((step, i) => {
    if (i === index) step.setAttribute("aria-current", "step");
    else step.removeAttribute("aria-current");
  });
  count.textContent = String(index).padStart(2, "0");
  const id = order[index];
  if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
  stage.scrollTop = 0;
}

function press(group, attr, value) {
  group.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset[attr] === value ? "true" : "false");
  });
}

document.querySelector(".choices").addEventListener("click", (event) => {
  const button = event.target.closest("[data-work]");
  if (!button) return;
  press(event.currentTarget, "work", button.dataset.work);
  fill(document.getElementById("work-detail"), work[button.dataset.work]);
});

document.querySelector(".offices").addEventListener("click", (event) => {
  const button = event.target.closest("[data-office]");
  if (!button) return;
  press(event.currentTarget, "office", button.dataset.office);
  const office = offices[button.dataset.office];
  fill(document.getElementById("office-detail"), office);
});

document.querySelector(".phases").addEventListener("click", (event) => {
  const button = event.target.closest("[data-phase]");
  if (!button) return;
  press(event.currentTarget, "phase", button.dataset.phase);
  const phase = phases[Number(button.dataset.phase)];
  const node = document.getElementById("phase-detail");
  node.innerHTML = `<div class="phase-no">${phase.no}</div><div><h2>${phase.title}</h2><p>${phase.body}</p><div class="meta">${phase.tags.map((tag) => `<span>${tag}</span>`).join("")}</div></div>`;
});

document.querySelector(".needs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-need]");
  if (!button) return;
  press(event.currentTarget, "need", button.dataset.need);
  const route = routes[button.dataset.need];
  const node = document.getElementById("route-detail");
  node.innerHTML = `<h2>${route.title}</h2><p>${route.body}</p><p class="office-line">${route.where}</p><p class="office-line"><a href="${route.tel}">${route.phone}</a></p>`;
});

document.querySelector(".channels").addEventListener("click", (event) => {
  const button = event.target.closest("[data-channel]");
  if (!button) return;
  press(event.currentTarget, "channel", button.dataset.channel);
  fill(document.getElementById("channel-detail"), channels[button.dataset.channel]);
});

steps.forEach((step, i) => step.addEventListener("click", () => show(i)));
document.getElementById("next").addEventListener("click", () => show(index + 1));
document.getElementById("back").addEventListener("click", () => show(index - 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") show(index + 1);
  if (event.key === "ArrowLeft") show(index - 1);
});

fill(document.getElementById("work-detail"), work.construction);
fill(document.getElementById("office-detail"), {
  title: offices.victor.title,
  body: offices.victor.body,
  tags: offices.victor.tags
});
document.querySelector(".phases button").click();
document.querySelector(".needs button").click();
fill(document.getElementById("channel-detail"), channels.update);

function fromHash() {
  const next = order.indexOf(location.hash.replace("#", ""));
  show(next >= 0 ? next : 0);
}

window.addEventListener("hashchange", fromHash);
fromHash();
