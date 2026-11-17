const pieces = [
  {
    id: "teacher",
    collection: "school",
    tag: "School",
    name: "Teacher apple earrings",
    image: "assets/teacher.jpg",
    alt: "Red enamel apple earrings with a pencil that reads Teacher.",
    text: "Her caption: “Earrings for school!” A red apple, a green leaf, a tiny heart, and a pencil across the middle.",
    note: "Hi! I love the Teacher apple earrings. Are they still available, and what is the price?"
  },
  {
    id: "wagon",
    collection: "fall",
    tag: "Thanksgiving",
    name: "Thanksgiving wagon earrings",
    image: "assets/thanksgiving.jpg",
    alt: "Enamel earrings shaped like a wagon of pumpkins, a gourd, and a maple leaf, with rhinestone wheels.",
    text: "Her caption: “A couple Thanksgiving drops!” Pumpkin, gourd, maple leaf, and rhinestone wheels.",
    note: "Hi! I love the Thanksgiving wagon earrings. Are they still available, and what is the price?"
  },
  {
    id: "hat",
    collection: "fall",
    tag: "Fall 2026",
    name: "Fall hat earrings",
    image: "assets/fall-hat.jpg",
    alt: "Mustard enamel hat earrings with an orange brim, a maple leaf, and a row of clear stones.",
    text: "Part of Fall Collection 2026. A mustard hat, an orange brim, one maple leaf, and a line of stones on the band.",
    note: "Hi! I love the fall hat earrings. Are they still available, and what is the price?"
  },
  {
    id: "blush",
    collection: "butterflies",
    tag: "Butterflies",
    name: "Blush butterfly earrings",
    image: "assets/butterfly-stones.jpg",
    alt: "Blush and cream enamel butterfly earrings with a row of clear stones down the body.",
    text: "Her caption: “Beautiful Butterflies!” Blush wings, a cream lower wing, and rhinestones down the body.",
    note: "Hi! I love the blush butterfly earrings. Are they still available, and what is the price?"
  },
  {
    id: "multi",
    collection: "butterflies",
    tag: "Butterflies",
    name: "Multicolor butterfly earrings",
    image: "assets/butterfly-multi.jpg",
    alt: "Orange, turquoise, and green enamel butterfly earrings.",
    text: "Her caption: “Multicolor Butterfly!” Orange, turquoise, and green on gold hooks.",
    note: "Hi! I love the multicolor butterfly earrings. Are they still available, and what is the price?"
  },
  {
    id: "blue",
    collection: "butterflies",
    tag: "Butterflies",
    name: "Blue butterfly earrings",
    image: "assets/butterfly-blue.jpg",
    alt: "Sky-blue enamel butterfly earrings with a dotted gold edge.",
    text: "From the Butterfly Collection. Sky-blue enamel with a dotted gold edge.",
    note: "Hi! I love the blue butterfly earrings. Are they still available, and what is the price?"
  },
  {
    id: "silver",
    collection: "bracelets",
    tag: "Bracelet",
    name: "Silverstone bracelet",
    image: "assets/silverstone.jpg",
    alt: "Silver paperclip bracelet with a sun, a cloud, a crescent moon, and star charms.",
    text: "Her name for it: “Silverstone Sun, Moon and Stars bracelet with extender.”",
    note: "Hi! I love the Silverstone Sun, Moon and Stars bracelet. Is it still available, and what is the price?"
  },
  {
    id: "christmas",
    collection: "bracelets",
    tag: "Christmas",
    name: "Christmas charm bracelet",
    image: "assets/christmas.jpg",
    alt: "Gold charm bracelet with a reindeer, Santa, a Christmas tree, a stocking, and jingle bells.",
    text: "Her caption: “New Christmas bracelet!” Tree, stocking, reindeer, Santa, and little bells on a gold chain.",
    note: "Hi! I love the new Christmas bracelet. Is it still available, and what is the price?"
  }
];

const grid = document.querySelector("#grid");
const status = document.querySelector("#filter-status");
const filters = document.querySelectorAll(".filters button");
const sheet = document.querySelector("#sheet");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");

function render(filter) {
  const shown = pieces.filter((piece) => filter === "all" || piece.collection === filter);
  grid.innerHTML = shown.map((piece) => `
    <article class="card" data-id="${piece.id}">
      <img src="${piece.image}" alt="${piece.alt}">
      <div class="card-body">
        <span class="tag">${piece.tag}</span>
        <h3>${piece.name}</h3>
        <p>${piece.text}</p>
        <button class="btn btn-red" type="button" data-open="${piece.id}">Message about this</button>
      </div>
    </article>
  `).join("");
  const names = { school: "school", fall: "fall", butterflies: "butterfly", bracelets: "bracelet" };
  const word = shown.length === 1 ? "piece" : "pieces";
  status.textContent = filter === "all"
    ? `Showing all ${shown.length} ${word}.`
    : `Showing ${shown.length} ${names[filter]} ${word}.`;
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => {
      const on = item === button;
      item.classList.toggle("is-on", on);
      item.setAttribute("aria-selected", on ? "true" : "false");
    });
    render(button.dataset.filter);
  });
});

function openSheet(id) {
  const piece = pieces.find((item) => item.id === id);
  if (!piece) return;
  document.querySelector("#sheet-photo").src = piece.image;
  document.querySelector("#sheet-photo").alt = piece.alt;
  document.querySelector("#sheet-kicker").textContent = piece.tag;
  document.querySelector("#sheet-title").textContent = piece.name;
  document.querySelector("#sheet-copy").textContent = piece.text;
  document.querySelector("#sheet-note").value = piece.note;
  document.querySelector("#sheet-hint").textContent = "Copy the note, then paste it into a message to Laura.";
  sheet.hidden = false;
  document.querySelector("#sheet-close").focus();
}

function closeSheet() {
  sheet.hidden = true;
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open]");
  if (button) openSheet(button.dataset.open);
});

document.querySelector("#sheet-close").addEventListener("click", closeSheet);
sheet.addEventListener("click", (event) => {
  if (event.target === sheet) closeSheet();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !sheet.hidden) closeSheet();
});

document.querySelector("#copy-note").addEventListener("click", async () => {
  const note = document.querySelector("#sheet-note");
  note.focus();
  note.select();
  try {
    await navigator.clipboard.writeText(note.value);
    document.querySelector("#sheet-hint").textContent = "Copied. Paste it into Instagram.";
  } catch {
    document.querySelector("#sheet-hint").textContent = "The note is selected. Press Ctrl+C, then paste it into Instagram.";
  }
});

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle.textContent = open ? "Close" : "Menu";
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "Menu";
  }
});

render("all");
