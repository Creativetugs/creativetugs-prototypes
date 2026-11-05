const PRODUCTS = [
  {
    id: "one-only",
    name: "One & Only",
    price: 69.99,
    priceMax: 129.99,
    img: "images/one-only.jpg",
    alt: "Pink and white rose bouquet with greenery",
    cat: "everyday",
    tag: "Signature",
    blurb: "A designer rose bouquet. Size and exact stems are confirmed when the shop builds it."
  },
  {
    id: "harvest",
    name: "Harvest Blessings",
    price: 99.99,
    img: "images/harvest.jpg",
    alt: "Autumn floral arrangement",
    cat: "everyday",
    tag: "Seasonal",
    blurb: "Warm fall flowers, ready for a table, a porch, or a thank-you."
  },
  {
    id: "bloom",
    name: "Autumn Bloom",
    price: 99.99,
    img: "images/bloom.jpg",
    alt: "Autumn bloom arrangement",
    cat: "everyday",
    tag: "Seasonal",
    blurb: "A full seasonal bouquet in harvest colors."
  },
  {
    id: "star",
    name: "Star Struck",
    price: 89.99,
    img: "images/star.jpg",
    alt: "Star Struck floral arrangement",
    cat: "everyday",
    tag: "Everyday",
    blurb: "A bright arrangement for birthdays, just-because, and doorsteps."
  },
  {
    id: "adore",
    name: "I Adore You",
    price: 89.99,
    img: "images/adore.jpg",
    alt: "Rose bouquet titled I Adore You",
    cat: "everyday",
    tag: "Roses",
    blurb: "Roses for the note you want to say out loud."
  },
  {
    id: "lighten",
    name: "Lighten the Mood",
    price: 79.99,
    img: "images/lighten.jpg",
    alt: "Lighten the Mood bouquet",
    cat: "everyday",
    tag: "Everyday",
    blurb: "A lighter, cheerful bunch from the design bench."
  },
  {
    id: "cozy",
    name: "Cozy Vibes",
    price: 69.99,
    img: "images/cozy.jpg",
    alt: "Cozy Vibes seasonal arrangement",
    cat: "everyday",
    tag: "Seasonal",
    blurb: "Autumn tones for a kitchen counter or a gift."
  },
  {
    id: "rustic",
    name: "Rustic Elegance",
    price: 69.99,
    img: "images/rustic.jpg",
    alt: "Rustic Elegance arrangement",
    cat: "everyday",
    tag: "Everyday",
    blurb: "Garden-style flowers with a relaxed, gathered look."
  },
  {
    id: "euro",
    name: "Eurogarden",
    price: 59.99,
    priceMax: 99.99,
    img: "images/euro.jpg",
    alt: "Planted basket of green and blooming plants",
    cat: "plants",
    tag: "Plants",
    blurb: "A planted basket of lush green and blooming plants. Each one follows the season, and substitutions stay with the theme."
  },
  {
    id: "green-plant",
    name: "Green Plant",
    price: 49.99,
    priceMax: 99.99,
    img: "images/green-plant.jpg",
    alt: "Green plant gift",
    cat: "plants",
    tag: "Plants",
    blurb: "A foliage gift that keeps growing after the flowers fade. Size is chosen at the shop."
  },
  {
    id: "grace",
    name: "Autumn Grace",
    price: 250,
    img: "images/grace.jpg",
    alt: "Autumn Grace sympathy arrangement",
    cat: "sympathy",
    tag: "Sympathy",
    blurb: "A standing sympathy design. Share the service date in your note."
  },
  {
    id: "peace",
    name: "Harvest of Peace",
    price: 250,
    img: "images/peace.jpg",
    alt: "Harvest of Peace sympathy arrangement",
    cat: "sympathy",
    tag: "Sympathy",
    blurb: "A generous sympathy piece in seasonal flowers."
  },
  {
    id: "woodland",
    name: "Woodland Remembrance",
    price: 300,
    img: "images/woodland.jpg",
    alt: "Woodland Remembrance sympathy arrangement",
    cat: "sympathy",
    tag: "Sympathy",
    blurb: "The largest sympathy design on the bench, built for a service or the home."
  },
  {
    id: "warm",
    name: "Warm Thoughts",
    price: 200,
    img: "images/warm.jpg",
    alt: "Warm Thoughts sympathy arrangement",
    cat: "sympathy",
    tag: "Sympathy",
    blurb: "A softer sympathy arrangement for a family or a service."
  },
  {
    id: "serenity",
    name: "Evening Serenity",
    price: 200,
    img: "images/serenity.jpg",
    alt: "Evening Serenity sympathy arrangement",
    cat: "sympathy",
    tag: "Sympathy",
    blurb: "Quiet flowers for remembrance."
  },
  {
    id: "subscription",
    name: "Designer's Choice Subscription",
    price: 165,
    priceMax: 550,
    img: "images/hero-floral.jpg",
    alt: "Seasonal designer flowers with kale and hydrangea",
    cat: "everyday",
    tag: "Subscription",
    blurb: "A recurring arrangement chosen fresh by the designers. The shop confirms the plan and the schedule."
  }
];

const money = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const priceLabel = (p) => (p.priceMax && p.priceMax !== p.price ? `${money(p.price)} – ${money(p.priceMax)}` : money(p.price));
const byId = (id) => PRODUCTS.find((p) => p.id === id);

const cartKey = "asgc-cart";
const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(cartKey)) || []; }
  catch { return []; }
};
let cart = loadCart();
const saveCart = () => localStorage.setItem(cartKey, JSON.stringify(cart));

function toast(message) {
  const el = document.querySelector(".toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-on");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("is-on"), 2200);
}

function addToCart(id, qty = 1) {
  const item = cart.find((line) => line.id === id);
  if (item) item.qty += qty;
  else cart.push({ id, qty });
  saveCart();
  renderCart();
  toast("Added to your order");
}

function setQty(id, qty) {
  cart = cart.map((line) => (line.id === id ? { ...line, qty } : line)).filter((line) => line.qty > 0);
  saveCart();
  renderCart();
}

function cartCount() {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, line) => {
    const product = byId(line.id);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);
}

function renderCart() {
  document.querySelectorAll(".cart-count").forEach((el) => { el.textContent = String(cartCount()); });
  const body = document.querySelector("[data-cart-body]");
  if (!body) return;
  if (!cart.length) {
    body.innerHTML = `<p class="empty">Your basket is empty. Seasonal bouquets start at $49.99.</p>`;
  } else {
    body.innerHTML = cart.map((line) => {
      const product = byId(line.id);
      if (!product) return "";
      const ranged = product.priceMax && product.priceMax !== product.price;
      return `<article class="line">
        <img src="${product.img}" alt="">
        <div>
          <strong>${product.name}</strong>
          <div class="price">${ranged ? `From ${money(product.price)}` : money(product.price)}</div>
          <div class="qty">
            <button type="button" data-qty="${product.id}" data-delta="-1" aria-label="Fewer ${product.name}">–</button>
            <span>${line.qty}</span>
            <button type="button" data-qty="${product.id}" data-delta="1" aria-label="More ${product.name}">+</button>
          </div>
        </div>
      </article>`;
    }).join("");
  }
  const total = document.querySelector("[data-cart-total]");
  if (total) total.textContent = money(cartTotal());
  const note = document.querySelector("[data-cart-note]");
  if (note) {
    note.hidden = !cart.length;
  }
}

function orderSummary(extra) {
  const lines = cart.map((line) => {
    const product = byId(line.id);
    return `${line.qty} × ${product.name} (from ${money(product.price)})`;
  });
  lines.push(`Estimated from ${money(cartTotal())}`);
  if (extra.name) lines.push(`Name: ${extra.name}`);
  if (extra.phone) lines.push(`Phone: ${extra.phone}`);
  if (extra.when) lines.push(`Needed: ${extra.when}`);
  if (extra.method) lines.push(`Fulfillment: ${extra.method}`);
  if (extra.note) lines.push(`Note: ${extra.note}`);
  lines.push("Please confirm availability, the final price, and delivery.");
  return lines.join("\n");
}

function cardHTML(product) {
  return `<article class="card">
    <button class="card-media" type="button" data-open-product="${product.id}">
      ${product.tag ? `<span class="tag">${product.tag}</span>` : ""}
      <img src="${product.img}" alt="${product.alt}">
    </button>
    <div class="card-body">
      <h3>${product.name}</h3>
      <div class="price">${priceLabel(product)}</div>
      <p>${product.blurb}</p>
      <button class="btn small" type="button" data-add="${product.id}">Add to order</button>
    </div>
  </article>`;
}

function renderGrids() {
  document.querySelectorAll("[data-product-grid]").forEach((grid) => {
    const ids = grid.dataset.ids;
    const filter = grid.dataset.filter || "all";
    let list = PRODUCTS;
    if (ids) list = ids.split(",").map(byId).filter(Boolean);
    else if (filter !== "all") list = PRODUCTS.filter((p) => p.cat === filter);
    grid.innerHTML = list.map(cardHTML).join("");
  });
}

function openProduct(id) {
  const product = byId(id);
  const modal = document.querySelector(".modal");
  const back = document.querySelector(".modal-back");
  if (!product || !modal) return;
  modal.querySelector("[data-modal-img]").src = product.img;
  modal.querySelector("[data-modal-img]").alt = product.alt;
  modal.querySelector("[data-modal-tag]").textContent = product.tag || "";
  modal.querySelector("[data-modal-title]").textContent = product.name;
  modal.querySelector("[data-modal-price]").textContent = priceLabel(product);
  modal.querySelector("[data-modal-copy]").textContent = product.blurb;
  modal.querySelector("[data-modal-add]").dataset.add = product.id;
  modal.classList.add("is-on");
  back.classList.add("is-on");
  modal.querySelector("[data-close-modal]").focus();
}

function closeProduct() {
  document.querySelector(".modal")?.classList.remove("is-on");
  document.querySelector(".modal-back")?.classList.remove("is-on");
}

function openCart() {
  document.querySelector(".drawer")?.classList.add("is-on");
  document.querySelector(".drawer-back")?.classList.add("is-on");
  document.querySelector("[data-close-cart]")?.focus();
}
function closeCart() {
  document.querySelector(".drawer")?.classList.remove("is-on");
  document.querySelector(".drawer-back")?.classList.remove("is-on");
}

function setupSlider() {
  const root = document.querySelector("[data-slider]");
  if (!root) return;
  const slides = [...root.querySelectorAll("img")];
  const dots = document.querySelector("[data-dots]");
  let index = 0;
  const show = (n) => {
    index = (n + slides.length) % slides.length;
    slides.forEach((img, i) => img.classList.toggle("is-on", i === index));
    dots?.querySelectorAll("button").forEach((btn, i) => btn.classList.toggle("is-on", i === index));
  };
  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `Photo ${i + 1}`);
    btn.addEventListener("click", () => show(i));
    dots?.append(btn);
  });
  show(0);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && slides.length > 1) {
    setInterval(() => show(index + 1), 5000);
  }
}

function setupCalculator() {
  const form = document.querySelector("[data-calc]");
  if (!form) return;
  const out = form.querySelector("[data-calc-out]");
  const run = () => {
    const length = Number(new FormData(form).get("length"));
    const width = Number(new FormData(form).get("width"));
    const depth = Number(new FormData(form).get("depth"));
    if (!length || !width || !depth) {
      out.innerHTML = "<p>Enter length, width, and depth to see yards and truckloads.</p>";
      return;
    }
    const sqft = length * width;
    const yards = (sqft * (depth / 12)) / 27;
    const rounded = Math.ceil(yards * 2) / 2;
    const material = new FormData(form).get("material");
    const perTruck = material === "rock" ? 6 : 8;
    const trucks = Math.ceil(rounded / perTruck);
    const bagCover = material === "rock" ? 4 : material === "soil" ? null : 15;
    const bags = bagCover ? Math.ceil(sqft / bagCover) : null;
    out.innerHTML = `<p>About <strong>${rounded.toFixed(1)} cubic yards</strong> for ${sqft.toLocaleString()} sq ft at ${depth}" deep.</p>
      <p>${trucks} truckload${trucks > 1 ? "s" : ""} of ${material}. A load holds ${perTruck} yards.</p>
      ${bags ? `<p>Or about ${bags} bags, using the store’s coverage chart.</p>` : ""}
      <p>Call (701) 746-7777 and the yard crew will confirm before they load the truck.</p>`;
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run();
  });
  form.addEventListener("input", run);
  run();
}

function setupForms() {
  document.querySelectorAll("[data-mailto-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = form.dataset.subject || "Message from the website";
      const lines = [];
      for (const [key, value] of data.entries()) {
        if (String(value).trim()) lines.push(`${key}: ${value}`);
      }
      const note = form.querySelector("[data-form-note]");
      if (note) note.textContent = "Your email app should open with this message to the shop.";
      window.location.href = `mailto:info@allseasonsgardencenter.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    });
  });
}

document.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add, 1);
    return;
  }
  const open = event.target.closest("[data-open-product]");
  if (open) openProduct(open.dataset.openProduct);
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]") || event.target.classList.contains("drawer-back")) closeCart();
  if (event.target.closest("[data-close-modal]") || event.target.classList.contains("modal-back")) closeProduct();
  const qty = event.target.closest("[data-qty]");
  if (qty) {
    const line = cart.find((item) => item.id === qty.dataset.qty);
    if (line) setQty(line.id, line.qty + Number(qty.dataset.delta));
  }
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    document.querySelectorAll("[data-filter]").forEach((btn) => btn.classList.toggle("is-on", btn === filter));
    const grid = document.querySelector("[data-product-grid]");
    if (grid && !grid.dataset.ids) {
      grid.dataset.filter = filter.dataset.filter;
      renderGrids();
    }
  }
  const gift = event.target.closest("[data-gift]");
  if (gift) {
    const amount = Number(gift.dataset.gift);
    const custom = PRODUCTS.find((p) => p.id === "gift-card");
    if (!custom) {
      PRODUCTS.push({
        id: "gift-card",
        name: `Gift card ($${amount})`,
        price: amount,
        img: "images/giftcard.jpg",
        alt: "All Seasons gift card with a houseplant",
        cat: "everyday",
        tag: "Gift card",
        blurb: "Any value, any time, no expiration. The shop issues the card after you call."
      });
    } else {
      custom.name = `Gift card ($${amount})`;
      custom.price = amount;
    }
    const existing = cart.find((line) => line.id === "gift-card");
    if (existing) cart = cart.filter((line) => line.id !== "gift-card");
    addToCart("gift-card", 1);
    openCart();
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-order-form]");
  if (!form) return;
  event.preventDefault();
  if (!cart.length) {
    toast("Add a bouquet first");
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  const summary = orderSummary(data);
  const box = document.querySelector("[data-order-ready]");
  if (box) {
    box.hidden = false;
    box.querySelector("pre").textContent = summary;
  }
  window.location.href = `mailto:info@allseasonsgardencenter.com?subject=${encodeURIComponent("Flower order request")}&body=${encodeURIComponent(summary)}`;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeProduct();
  }
});

document.querySelector(".nav-toggle")?.addEventListener("click", () => {
  const menu = document.querySelector(".menu");
  const open = menu.classList.toggle("is-on");
  document.querySelector(".nav-toggle").setAttribute("aria-expanded", String(open));
});

renderGrids();
renderCart();
setupSlider();
setupCalculator();
setupForms();
