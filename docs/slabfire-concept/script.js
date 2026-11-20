const catalog = {
  sanders: {
    img: "Group 45.png",
    title: "2020 Panini Award Winners Barry Sanders Auto",
    price: "$100",
    note: "SGC 10 / 9.5. One copy. Ship it, or pick it up at the shop.",
  },
  chubb: {
    img: "Group 46.png",
    title: "2019 Panini Contenders Nick Chubb Auto",
    price: "$100",
    note: "SGC 10 / 10. One copy. Ship it, or pick it up at the shop.",
  },
  judge: {
    img: "Group 48.png",
    title: "2017 Topps Chrome Aaron Judge",
    price: "$100",
    note: "SGC 9.5. One copy. Ship it, or pick it up at the shop.",
  },
  kobe: {
    img: "Group 46 (1).png",
    title: "2004 Finest Kobe Bryant X-Fractor",
    price: "$100",
    note: "PSA 9. One copy. Ship it, or pick it up at the shop.",
  },
  brown: {
    img: "Group 48 (1).png",
    title: "2016-17 Panini Prizm Jaylen Brown Auto",
    price: "$100",
    note: "SGC 10 / 9.5. One copy. Ship it, or pick it up at the shop.",
  },
};

const productImage = document.getElementById("product-image");
if (productImage) {
  const id = new URLSearchParams(location.search).get("id");
  const item = catalog[id] || catalog.judge;
  productImage.src = item.img;
  productImage.alt = item.title;
  document.getElementById("product-title").textContent = item.title;
  document.getElementById("product-price").textContent = item.price;
  document.getElementById("product-note").textContent = item.note;
  document.title = "Slabfire · " + item.title;
}

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
}

const toast = document.getElementById("toast");
function showToast(text) {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll(".team[data-team]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".team").forEach((team) => team.classList.remove("is-picked"));
    button.classList.add("is-picked");
    const bar = document.getElementById("pick-bar");
    const name = document.getElementById("pick-name");
    if (name) name.textContent = button.dataset.team;
    if (bar) bar.hidden = false;
  });
});

const addTeam = document.getElementById("add-team");
if (addTeam) {
  addTeam.addEventListener("click", () => {
    const name = document.getElementById("pick-name").textContent;
    showToast(name + " added. In Shopify this is add to cart for that team.");
  });
}

const buyForm = document.getElementById("buy-form");
if (buyForm) {
  buyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const how = buyForm.querySelector("input[name=get]:checked").value;
    const where = how === "pickup" ? "shop pickup" : "shipping";
    showToast("Added with " + where + ". Shopify checkout is the next step.");
  });
}
