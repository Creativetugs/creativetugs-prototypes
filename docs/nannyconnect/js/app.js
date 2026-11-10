const STORAGE_KEY = "nannyconnect-prototype-v1";

const TIMES = {
  morning: ["08:00", "09:00"],
  afternoon: ["12:00", "13:00", "15:00"],
  evening: ["17:00", "18:00"],
};

const SLOT_ORDER = ["morning", "afternoon", "evening"];
const QUALS = ["CPR & First Aid", "Newborn care", "Montessori", "Special needs", "Bilingual", "Homework help"];
const SERVICES = ["Infants", "Toddlers", "School age", "Homework", "School pickup", "Light meals", "Bedtime", "Overnights", "Special needs", "Bilingual"];
const HOURS = [2, 4, 6, 8];
const PAYMENTS = [
  { id: "card", name: "Card", detail: "Visa ···· 4242 · demo" },
  { id: "apple", name: "Apple Pay", detail: "Demo wallet" },
  { id: "later", name: "Pay at visit", detail: "No charge now" },
];
const SLIDES = [
  {
    kicker: "Discover",
    title: "Find trusted childcare professionals.",
    text: "Compare experience, qualifications, and reviews before you book.",
    art: "search",
  },
  {
    kicker: "Schedule",
    title: "Flexible childcare that fits your family's schedule.",
    text: "Full-time, part-time, or occasional care, booked by the hour.",
    art: "calendar",
  },
  {
    kicker: "Join",
    title: "Join as a Parent or Nanny.",
    text: "Families find care. Nannies manage requests, bookings, and pay.",
    art: "join",
  },
];

const SEED_NANNIES = [
  {
    id: "elena",
    name: "Elena Vargas",
    title: "Infant and toddler specialist",
    years: 8,
    rate: 28,
    overnight: 36,
    extraChild: 6,
    rating: 4.9,
    reviews: 86,
    zip: "11215",
    neighborhood: "Park Slope",
    distance: "0.4 mi",
    types: ["full-time", "part-time"],
    quals: ["CPR & First Aid", "Newborn care", "Early childhood education"],
    services: ["Infants", "Toddlers", "School pickup", "Light meals", "Bedtime"],
    languages: ["English", "Spanish"],
    bio: "I care for infants and toddlers with calm routines, outdoor time, and plenty of songs. Families usually book me for full days and school pickups.",
    quotes: [
      { name: "Lauren P.", text: "Calm with our newborn, and she left clear notes at pickup." },
      { name: "Chris M.", text: "Reliable school run. Our son asks for her on Thursdays." },
    ],
    look: { bg: "#F0D2C2", shirt: "#C45C45", hair: "#3A2A26", skin: "#F0C2A0", style: "bun" },
    week: { 0: [], 1: ["morning", "afternoon"], 2: ["morning", "afternoon"], 3: ["morning", "afternoon", "evening"], 4: ["morning", "afternoon"], 5: ["morning", "afternoon"], 6: ["morning", "afternoon"] },
  },
  {
    id: "james",
    name: "James Okonkwo",
    title: "School-age and Montessori care",
    years: 6,
    rate: 32,
    overnight: 40,
    extraChild: 6,
    rating: 4.8,
    reviews: 54,
    zip: "11201",
    neighborhood: "Brooklyn Heights",
    distance: "1.2 mi",
    types: ["part-time"],
    quals: ["CPR & First Aid", "Montessori", "Homework help"],
    services: ["School age", "Homework", "School pickup", "Light meals"],
    languages: ["English"],
    bio: "Montessori-trained. Homework first, then the park. I take weekday afternoons and evenings for ages 5 to 12.",
    quotes: [
      { name: "Dana K.", text: "Homework actually gets finished. Kind and consistent." },
    ],
    look: { bg: "#D5E4DA", shirt: "#1F4A38", hair: "#1A1A1A", skin: "#8D5524", style: "short" },
    week: { 0: [], 1: ["afternoon", "evening"], 2: ["afternoon", "evening"], 3: ["afternoon", "evening"], 4: ["afternoon"], 5: [], 6: ["morning"] },
  },
  {
    id: "priya",
    name: "Priya Shah",
    title: "Newborn specialist",
    years: 11,
    rate: 38,
    overnight: 48,
    extraChild: 8,
    rating: 5,
    reviews: 120,
    zip: "10011",
    neighborhood: "West Village",
    distance: "3.1 mi",
    types: ["full-time"],
    quals: ["Newborn care", "CPR & First Aid", "Infant sleep"],
    services: ["Infants", "Light meals", "Overnights", "Bedtime"],
    languages: ["English", "Gujarati"],
    bio: "I support the first year with feeding schedules, sleep, and a written note for parents at the end of every visit.",
    quotes: [
      { name: "The Alvarez family", text: "Priya helped us survive the first eight weeks." },
    ],
    look: { bg: "#F3E2B8", shirt: "#C4841E", hair: "#2A211C", skin: "#C68642", style: "long" },
    week: { 0: [], 1: ["morning"], 2: ["morning"], 3: ["morning"], 4: ["morning"], 5: ["morning"], 6: [] },
  },
  {
    id: "sofia",
    name: "Sofia Alvarez",
    title: "After-school and date-night care",
    years: 4,
    rate: 22,
    overnight: 30,
    extraChild: 5,
    rating: 4.7,
    reviews: 31,
    zip: "11217",
    neighborhood: "Boerum Hill",
    distance: "0.8 mi",
    types: ["occasional", "part-time"],
    quals: ["Bilingual", "Homework help"],
    services: ["School age", "Homework", "Bilingual", "Bedtime"],
    languages: ["English", "Spanish"],
    bio: "Bilingual Spanish and English. After-school care, homework, and occasional evenings when you need a night out.",
    quotes: [
      { name: "Maya Chen", text: "Nora speaks more Spanish after Sofia's afternoons." },
    ],
    look: { bg: "#F6D6CF", shirt: "#A33B32", hair: "#4A2E28", skin: "#E0AA7A", style: "waves" },
    week: { 0: ["morning"], 1: [], 2: ["afternoon"], 3: [], 4: ["afternoon"], 5: ["evening"], 6: ["evening"] },
  },
  {
    id: "hannah",
    name: "Hannah Berg",
    title: "Patient support for neurodivergent kids",
    years: 9,
    rate: 34,
    overnight: 42,
    extraChild: 7,
    rating: 4.9,
    reviews: 77,
    zip: "10003",
    neighborhood: "East Village",
    distance: "2.4 mi",
    types: ["part-time"],
    quals: ["Special needs", "CPR & First Aid"],
    services: ["School age", "Homework", "Special needs", "School pickup"],
    languages: ["English"],
    bio: "Experienced with ADHD and sensory needs. I use visual schedules, quiet transitions, and a calm house.",
    quotes: [
      { name: "Jon R.", text: "Hannah is the first sitter our daughter asks to come back." },
    ],
    look: { bg: "#D9E4F2", shirt: "#243044", hair: "#C6A15B", skin: "#F3D2B5", style: "bob" },
    week: { 0: [], 1: ["afternoon"], 2: ["afternoon"], 3: ["afternoon", "evening"], 4: ["afternoon"], 5: ["afternoon"], 6: ["morning"] },
  },
  {
    id: "amir",
    name: "Amir Haddad",
    title: "Active weekend care",
    years: 5,
    rate: 26,
    overnight: 34,
    extraChild: 5,
    rating: 4.6,
    reviews: 28,
    zip: "11231",
    neighborhood: "Carroll Gardens",
    distance: "1.6 mi",
    types: ["occasional"],
    quals: ["Homework help", "CPR & First Aid"],
    services: ["School age", "Homework", "School pickup"],
    languages: ["English", "Arabic"],
    bio: "Active care for ages 4 to 10. Bikes, sports, and homework. Weekends and school breaks are my usual bookings.",
    quotes: [
      { name: "Elena S.", text: "High energy, and he still got the reading log done." },
    ],
    look: { bg: "#D5E3E1", shirt: "#1F6A6A", hair: "#2C2420", skin: "#A86B45", style: "crop" },
    week: { 0: ["morning", "afternoon"], 1: [], 2: [], 3: ["evening"], 4: [], 5: [], 6: ["morning", "afternoon"] },
  },
];

const BARS = [42, 70, 36, 88, 64, 96, 18];
const BAR_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TABS = {
  parent: [
    ["parent-home", "Home", "home"],
    ["find", "Find", "search"],
    ["bookings", "Bookings", "cal"],
    ["inbox", "Messages", "chat"],
  ],
  nanny: [
    ["nanny-home", "Home", "home"],
    ["nanny-requests", "Requests", "inbox"],
    ["nanny-schedule", "Schedule", "cal"],
    ["nanny-earnings", "Earnings", "coin"],
  ],
};

const TITLES = {
  welcome: "Welcome",
  "parent-home": "Parent Dashboard",
  find: "Find a Nanny",
  profile: "Nanny Profile",
  booking: "Booking & Payment",
  bookings: "My Bookings",
  inbox: "Messages",
  thread: "Messages",
  "nanny-home": "Nanny Dashboard",
  "nanny-requests": "Nanny Dashboard",
  "nanny-schedule": "Nanny Dashboard",
  "nanny-earnings": "Nanny Dashboard",
};

const HASH_FOR = {
  welcome: "welcome",
  "parent-home": "parent",
  find: "find",
  profile: "profile",
  booking: "booking",
  bookings: "bookings",
  inbox: "messages",
  thread: "messages",
  "nanny-home": "nanny",
  "nanny-requests": "nanny",
  "nanny-schedule": "nanny",
  "nanny-earnings": "nanny",
};

const HASH_SCREEN = {
  welcome: "welcome",
  parent: "parent-home",
  find: "find",
  profile: "profile",
  booking: "booking",
  bookings: "bookings",
  messages: "inbox",
  nanny: "nanny-home",
};

let avatarSeq = 0;
let toastTimer = 0;
let lastScreen = "";
let state;

function defaultFilters() {
  return { zip: "", rateMax: 45, types: [], experience: 0, quals: [], availability: [], rating: 0 };
}

function emptyDraft() {
  return { date: "", time: "", hours: 0, payment: "card", note: "" };
}

function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(offset) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return toISO(date);
}

function timesFor(slots) {
  return SLOT_ORDER.flatMap((slot) => (slots.includes(slot) ? TIMES[slot] : []));
}

function firstOpen(nanny, minOffset, used) {
  for (let i = minOffset; i < 28; i += 1) {
    const iso = addDays(i);
    if (used.has(iso)) continue;
    const slots = nanny.week[parseISO(iso).getDay()] || [];
    if (slots.length) return { iso, slots };
  }
  return { iso: addDays(minOffset), slots: ["morning"] };
}

function seedBookings() {
  const elena = SEED_NANNIES[0];
  const priya = SEED_NANNIES[2];
  const james = SEED_NANNIES[1];
  const used = new Set();
  const kim = firstOpen(elena, 1, used);
  used.add(kim.iso);
  const rossi = firstOpen(elena, 1, used);
  const priyaDay = firstOpen(priya, 1, new Set());
  const kimTime = timesFor(kim.slots).includes("08:00") ? "08:00" : timesFor(kim.slots)[0];
  const rossiTime = timesFor(rossi.slots).includes("15:00") ? "15:00" : timesFor(rossi.slots)[0];
  const priyaTime = timesFor(priyaDay.slots)[0];
  return [
    booking("seed-kim", "elena", "The Kim family", kim.iso, kimTime, 6, 28, "confirmed", "card", "School drop-off for Mia, then the park."),
    booking("seed-rossi", "elena", "The Rossi family", rossi.iso, rossiTime, 4, 28, "pending", "later", "After-school pickup from PS 321."),
    booking("seed-priya", "priya", "Maya Chen", priyaDay.iso, priyaTime, 4, 38, "confirmed", "card", "Leo naps at 1. Nora has a peanut allergy."),
    booking("seed-james", "james", "Maya Chen", addDays(-14), "15:00", 3, 32, "completed", "apple", ""),
  ];
}

function booking(id, nannyId, parentName, date, time, hours, rate, status, payment, note) {
  return { id, nannyId, parentName, date, time, hours, rate, total: rate * hours, status, payment, note, reviewed: false };
}

function seedMessages() {
  return {
    "priya|Maya Chen": [
      { from: "nanny", text: "I can do the morning we booked. Does Leo still nap after lunch?", at: "Yesterday" },
      { from: "parent", text: "Yes, around 1 PM. Nora is allergic to peanuts.", at: "Yesterday" },
    ],
    "elena|Maya Chen": [
      { from: "nanny", text: "Hi Maya. I have weekday mornings open this month.", at: "Mon" },
    ],
  };
}

function defaultState() {
  return {
    screen: "welcome",
    stack: ["welcome"],
    role: null,
    slide: 0,
    filters: defaultFilters(),
    nannyId: "elena",
    draft: emptyDraft(),
    editingId: null,
    bookings: seedBookings(),
    messages: seedMessages(),
    elenaWeek: structuredClone(SEED_NANNIES[0].week),
    profileOverrides: {},
    thread: null,
    sheet: null,
    confirmId: null,
    toast: "",
    banner: null,
    needRole: false,
    editBuffer: null,
    editError: "",
    msgDraft: "",
    scrollThread: false,
  };
}

function loadState() {
  const fresh = defaultState();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return fresh;
    const saved = JSON.parse(raw);
    saved.filters = { ...fresh.filters, ...(saved.filters || {}) };
    saved.draft = { ...fresh.draft, ...(saved.draft || {}) };
    return {
      ...fresh,
      ...saved,
      sheet: null,
      confirmId: null,
      toast: "",
      needRole: false,
      editBuffer: null,
      editError: "",
      msgDraft: "",
      scrollThread: false,
    };
  } catch (error) {
    return fresh;
  }
}

function save() {
  const data = {
    screen: state.screen,
    stack: state.stack,
    role: state.role,
    slide: state.slide,
    filters: state.filters,
    nannyId: state.nannyId,
    draft: state.draft,
    editingId: state.editingId,
    bookings: state.bookings,
    messages: state.messages,
    elenaWeek: state.elenaWeek,
    profileOverrides: state.profileOverrides,
    thread: state.thread,
    banner: state.banner,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    /* Private mode can block storage. The prototype still runs. */
  }
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function usd(amount) {
  return `$${Math.round(amount)}`;
}

function clock() {
  const now = new Date();
  let hour = now.getHours();
  const minute = String(now.getMinutes()).padStart(2, "0");
  hour = hour % 12 || 12;
  return `${hour}:${minute}`;
}

function formatDate(iso) {
  const date = parseISO(iso);
  return `${DAY_NAMES[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

function formatTime(value) {
  const [rawHour, minute] = value.split(":").map(Number);
  const suffix = rawHour >= 12 ? "PM" : "AM";
  const hour = rawHour % 12 || 12;
  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function endLabel(time, hours) {
  let [hour, minute] = time.split(":").map(Number);
  hour += hours;
  const nextDay = hour >= 24;
  hour %= 24;
  return `${formatTime(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)}${nextDay ? " +1" : ""}`;
}

function icon(name) {
  const paths = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16.5L20.5 21"/>',
    home: '<path d="M4 11.5L12 4l8 7.5"/><path d="M7 10.5V20h10v-9.5"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3.5V7M16 3.5V7M4 10h16"/>',
    chat: '<path d="M5 16.5l-1 3.5 3.8-1.6A8.5 8.5 0 1 0 5 16.5z"/>',
    inbox: '<path d="M4 13l2.2-7h11.6L20 13"/><path d="M4 13v6h16v-6"/><path d="M4 13h4l1.2 2h5.6L16 13h4"/>',
    coin: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
    pin: '<path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"/><circle cx="12" cy="11" r="2"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z"/><path d="M10 18a2 2 0 0 0 4 0"/>',
    back: '<path d="M15 5L8 12l7 7"/>',
    star: '<path d="M12 3.8l1.9 4.7 5.1.4-3.9 3.3 1.2 5-4.3-2.7L7.7 17l1.2-5L5 8.9l5.1-.4L12 3.8z"/>',
    check: '<path d="M5 12.5l4.2 4.2L19 7.5"/>',
    close: '<path d="M7 7l10 10M17 7L7 17"/>',
  };
  return `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || ""}</svg>`;
}

function hairPath(look) {
  const hair = look.hair;
  const styles = {
    bun: `<path d="M25 38c1-14 8-22 15-22s14 8 15 22c-2-8-8-12-15-12s-13 4-15 12z" fill="${hair}"/><circle cx="40" cy="16" r="6" fill="${hair}"/>`,
    short: `<path d="M24 36c1-14 7-20 16-20s15 6 16 18c-3-7-8-10-16-10s-13 3-16 12z" fill="${hair}"/>`,
    long: `<path d="M25 42c0-16 6-24 15-24s15 8 15 24v18h-7V44c0-7-3-11-8-11s-8 4-8 11v16h-7V42z" fill="${hair}"/>`,
    waves: `<path d="M22 40c2-16 8-22 18-22s16 6 18 22c-1 4-3 8-5 10-1-6-4-8-13-8s-12 2-13 8c-2-2-4-6-5-10z" fill="${hair}"/>`,
    bob: `<path d="M23 48c1-18 7-26 17-26s16 8 17 26c-2-9-7-13-17-13s-15 4-17 13z" fill="${hair}"/>`,
    crop: `<path d="M26 34c1-12 6-16 14-16s13 4 14 16c-4-6-8-8-14-8s-10 2-14 8z" fill="${hair}"/>`,
  };
  return styles[look.style] || styles.short;
}

function avatar(person, size, decorative) {
  avatarSeq += 1;
  const id = `av${avatarSeq}`;
  const look = person.look;
  const access = decorative
    ? 'aria-hidden="true"'
    : `role="img" aria-label="${esc(person.name)}, profile photo"`;
  return `<svg class="avatar" width="${size}" height="${size}" viewBox="0 0 80 80" ${access}><defs><clipPath id="${id}"><circle cx="40" cy="40" r="40"/></clipPath></defs><g clip-path="url(#${id})"><circle cx="40" cy="40" r="40" fill="${look.bg}"/><ellipse cx="40" cy="78" rx="30" ry="22" fill="${look.shirt}"/><rect x="33" y="46" width="14" height="16" fill="${look.skin}"/><circle cx="40" cy="36" r="15" fill="${look.skin}"/>${hairPath(look)}<circle cx="34.5" cy="36.5" r="1.35" fill="#2a211c"/><circle cx="45.5" cy="36.5" r="1.35" fill="#2a211c"/><path d="M35.2 42c1.6 1.6 8 1.6 9.6 0" fill="none" stroke="#2a211c" stroke-width="1.15" stroke-linecap="round"/></g></svg>`;
}

function nannyById(id) {
  const base = SEED_NANNIES.find((item) => item.id === id) || SEED_NANNIES[0];
  if (id !== "elena") return base;
  return { ...base, ...state.profileOverrides };
}

function allNannies() {
  return SEED_NANNIES.map((item) => nannyById(item.id));
}

function weekOf(person) {
  if (person.id === "elena" && state.elenaWeek) return state.elenaWeek;
  return person.week;
}

function slotsOn(person, iso) {
  const week = weekOf(person);
  const day = parseISO(iso).getDay();
  return week[day] || week[String(day)] || [];
}

function flagsFor(person) {
  const week = weekOf(person);
  const flags = { weekday: false, weekend: false, evening: false };
  for (let day = 0; day < 7; day += 1) {
    const slots = week[day] || week[String(day)] || [];
    if (!slots.length) continue;
    if (day === 0 || day === 6) flags.weekend = true;
    else flags.weekday = true;
    if (slots.includes("evening")) flags.evening = true;
  }
  return flags;
}

function priced(person) {
  const base = SEED_NANNIES.find((item) => item.id === person.id);
  const delta = person.rate - base.rate;
  return { standard: person.rate, overnight: base.overnight + delta, extra: base.extraChild };
}

function filteredNannies() {
  const filters = state.filters;
  const query = filters.zip.trim().toLowerCase();
  return allNannies().filter((person) => {
    if (query) {
      const haystack = `${person.zip} ${person.neighborhood} ${person.name}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (person.rate > filters.rateMax) return false;
    if (filters.types.length && !filters.types.some((type) => person.types.includes(type))) return false;
    if (person.years < filters.experience) return false;
    if (filters.quals.length && !filters.quals.some((qual) => person.quals.includes(qual))) return false;
    const flags = flagsFor(person);
    if (filters.availability.length && !filters.availability.every((flag) => flags[flag])) return false;
    if (person.rating < filters.rating) return false;
    return true;
  }).sort((a, b) => b.rating - a.rating || a.rate - b.rate);
}

function filtersActive() {
  const filters = state.filters;
  return Boolean(
    filters.zip.trim()
    || filters.rateMax < 45
    || filters.types.length
    || filters.experience
    || filters.quals.length
    || filters.availability.length
    || filters.rating
  );
}

function rateLabel() {
  return state.filters.rateMax >= 45 ? "Any hourly rate" : `Up to $${state.filters.rateMax}/hr`;
}

function parentBookings() {
  return state.bookings.filter((item) => item.parentName === "Maya Chen");
}

function nannyBookings() {
  return state.bookings.filter((item) => item.nannyId === "elena");
}

function byDate(list) {
  return [...list].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

function threadKey(nannyId, parentName) {
  return `${nannyId}|${parentName}`;
}

function art(kind) {
  if (kind === "search") {
    return `<svg viewBox="0 0 220 140" aria-hidden="true"><rect x="18" y="28" width="78" height="92" rx="16" fill="#fffdf9"/><rect x="78" y="18" width="78" height="92" rx="16" fill="#1f4a38"/><circle cx="117" cy="52" r="14" fill="#f0d2c2"/><rect x="96" y="74" width="42" height="6" rx="3" fill="#e7a23a"/><rect x="100" y="86" width="34" height="5" rx="2.5" fill="#d5e4da"/><circle cx="168" cy="96" r="28" fill="#fffdf9" stroke="#1f4a38" stroke-width="6"/><path d="M188 116l16 16" stroke="#1f4a38" stroke-width="8" stroke-linecap="round"/></svg>`;
  }
  if (kind === "calendar") {
    return `<svg viewBox="0 0 220 140" aria-hidden="true"><rect x="36" y="22" width="148" height="104" rx="18" fill="#fffdf9"/><rect x="36" y="22" width="148" height="28" rx="18" fill="#1f4a38"/><rect x="36" y="40" width="148" height="10" fill="#1f4a38"/><rect x="58" y="68" width="28" height="18" rx="6" fill="#e7a23a"/><rect x="96" y="68" width="28" height="18" rx="6" fill="#e4efe7"/><rect x="134" y="68" width="28" height="18" rx="6" fill="#e4efe7"/><rect x="58" y="94" width="28" height="18" rx="6" fill="#e4efe7"/><rect x="96" y="94" width="28" height="18" rx="6" fill="#1f4a38"/></svg>`;
  }
  return `<svg viewBox="0 0 220 140" aria-hidden="true"><rect x="24" y="36" width="80" height="78" rx="18" fill="#1f4a38"/><rect x="116" y="36" width="80" height="78" rx="18" fill="#fffdf9" stroke="#e4dccf"/><circle cx="64" cy="68" r="12" fill="#f4efe6"/><circle cx="156" cy="68" r="12" fill="#e7a23a"/><rect x="46" y="88" width="36" height="6" rx="3" fill="#d5e4da"/><rect x="138" y="88" width="36" height="6" rx="3" fill="#e4dccf"/></svg>`;
}

function typeLabel(types) {
  const names = { "full-time": "Full-time", "part-time": "Part-time", occasional: "Occasional" };
  return types.map((type) => names[type] || type).join(" · ");
}

function resultCards() {
  const people = filteredNannies();
  if (!people.length) {
    return `<div class="empty"><p>No nannies match these filters.</p><button type="button" class="btn ghost" data-action="clear-filters">Clear filters</button></div>`;
  }
  return people.map((person) => `
    <button type="button" class="nanny-row" data-action="open-nanny" data-id="${person.id}">
      ${avatar(person, 56, true)}
      <span class="nanny-copy">
        <strong>${esc(person.name)}${person.id === "elena" ? '<em class="badge-live">Live demo</em>' : ""}</strong>
        <span>${esc(person.neighborhood)} · ${person.years} yrs · ★ ${person.rating.toFixed(1)}</span>
        <span>${esc(typeLabel(person.types))}</span>
      </span>
      <b class="rate">${usd(person.rate)}/hr</b>
    </button>`).join("");
}

function countLabel() {
  const count = filteredNannies().length;
  return `${count} professional${count === 1 ? "" : "s"}`;
}

function chip(action, value, label, on) {
  return `<button type="button" class="chip${on ? " is-on" : ""}" data-action="${action}" data-value="${esc(value)}" aria-pressed="${on ? "true" : "false"}">${esc(label)}</button>`;
}

function screenWelcome() {
  const slide = SLIDES[state.slide];
  const hint = state.needRole && !state.role
    ? "Choose Parent or Nanny to continue."
    : state.role === "parent"
      ? "Continuing to the parent dashboard."
      : state.role === "nanny"
        ? "Continuing to the nanny dashboard."
        : "Choose how you will use NannyConnect.";
  return `<div class="pad welcome">
    <p class="eyebrow">${esc(slide.kicker)}</p>
    <div class="art">${art(slide.art)}</div>
    <h1 class="screen-title">${esc(slide.title)}</h1>
    <p class="lede">${esc(slide.text)}</p>
    <div class="dots" role="tablist" aria-label="Introduction">
      ${SLIDES.map((_, index) => `<button type="button" role="tab" aria-label="Slide ${index + 1}" data-action="dot" data-index="${index}" class="${index === state.slide ? "is-on" : ""}"></button>`).join("")}
    </div>
    <div class="roles${state.needRole && !state.role ? " shake" : ""}">
      <button type="button" class="role${state.role === "parent" ? " is-on" : ""}" data-action="role" data-role="parent" aria-pressed="${state.role === "parent"}"><strong>Parent</strong><span>Find and book care</span></button>
      <button type="button" class="role${state.role === "nanny" ? " is-on" : ""}" data-action="role" data-role="nanny" aria-pressed="${state.role === "nanny"}"><strong>Nanny</strong><span>Manage requests</span></button>
    </div>
    <p class="${state.needRole && !state.role ? "warn" : "hint"}">${hint}</p>
    <div class="welcome-actions">
      <button type="button" class="btn honey" data-action="start">Get Started</button>
      <button type="button" class="btn ghost" data-action="sheet" data-sheet="signin">Sign In</button>
    </div>
  </div>`;
}

function screenParent() {
  const ranked = [...allNannies()].sort((a, b) => b.rating - a.rating || a.rate - b.rate);
  const featured = ranked.slice(0, 3);
  const recommended = ranked.slice(3);
  const next = byDate(parentBookings().filter((item) => item.status === "confirmed"))[0];
  return `<div class="pad">
    <div class="topbar">
      <button type="button" class="who" data-action="sheet" data-sheet="account">
        ${avatar({ name: "Maya Chen", look: { bg: "#F6D6CF", shirt: "#1F4A38", hair: "#3A2A26", skin: "#E0AA7A", style: "waves" } }, 42, true)}
        <span><strong>Maya Chen</strong><span>Parent · Park Slope</span></span>
      </button>
      <button type="button" class="icon-btn" data-action="sheet" data-sheet="alerts" aria-label="Alerts">${icon("bell")}</button>
    </div>
    <p class="eyebrow">Parent dashboard</p>
    <h1 class="screen-title">Good morning, welcome back!</h1>
    <p class="lede">Find a nanny for your family.</p>
    <div class="search">
      ${icon("pin")}
      <input id="loc" aria-label="Search by location" placeholder="Search by location" value="${esc(state.filters.zip)}" autocomplete="off" maxlength="40">
      <button type="button" class="go" data-action="search-location" aria-label="Search">${icon("search")}</button>
    </div>
    <p class="hint">Care for Leo, 3, and Nora, 6.</p>
    <div class="quick">
      <button type="button" data-action="quick" data-kind="weekend">Weekend</button>
      <button type="button" data-action="quick" data-kind="after">After school</button>
      <button type="button" data-action="quick" data-kind="full">Full-time</button>
    </div>
    <button type="button" class="text-btn" data-action="browse" style="margin-top:12px">Browse available nannies</button>
    ${next ? `<div class="section-title"><h2>Next visit</h2><button type="button" class="linkish" data-action="tab" data-screen="bookings">My Bookings</button></div>
      <button type="button" class="person" data-action="open-nanny" data-id="${next.nannyId}">
        ${avatar(nannyById(next.nannyId), 48, true)}
        <span class="nanny-copy"><strong>${esc(nannyById(next.nannyId).name)}</strong><span>${esc(formatDate(next.date))} · ${esc(formatTime(next.time))}</span></span>
        <b class="pill confirmed">Confirmed</b>
      </button>` : ""}
    <div class="section-title"><h2>Featured</h2><button type="button" class="linkish" data-action="browse">See all</button></div>
    <div class="row-scroll">
      ${featured.map((person) => `<button type="button" class="feature" data-action="open-nanny" data-id="${person.id}">
        ${avatar(person, 64, true)}
        <strong style="margin-top:10px">${esc(person.name)}</strong>
        <span class="meta">${esc(person.neighborhood)} · ★ ${person.rating.toFixed(1)}</span>
        <span class="meta">${usd(person.rate)}/hr · ${person.years} yrs</span>
      </button>`).join("")}
    </div>
    <div class="section-title"><h2>Recommended</h2></div>
    ${recommended.map((person) => `<button type="button" class="person" data-action="open-nanny" data-id="${person.id}">
      ${avatar(person, 48, true)}
      <span class="nanny-copy"><strong>${esc(person.name)}</strong><span>${esc(person.title)}</span></span>
      <b class="rate">${usd(person.rate)}/hr</b>
    </button>`).join("")}
  </div>`;
}

function screenFind() {
  const filters = state.filters;
  return `<div class="pad">
    <p class="eyebrow">Find a nanny</p>
    <h1 class="screen-title">Search care near you</h1>
    <div class="search">
      ${icon("search")}
      <input id="zip" aria-label="Search by ZIP code" placeholder="Search by ZIP code" value="${esc(filters.zip)}" autocomplete="off" maxlength="40">
    </div>
    <p class="hint">Also matches a neighborhood or a nanny's name.</p>
    <div class="field-label"><span>Hourly rate</span><span id="rate-label">${rateLabel()}</span></div>
    <input id="rate" type="range" min="20" max="45" step="1" value="${filters.rateMax}" aria-label="Filter by hourly rate">
    <div class="field-label"><span>Care type</span></div>
    <div class="chips">
      ${chip("toggle-type", "full-time", "Full-time", filters.types.includes("full-time"))}
      ${chip("toggle-type", "part-time", "Part-time", filters.types.includes("part-time"))}
      ${chip("toggle-type", "occasional", "Occasional", filters.types.includes("occasional"))}
    </div>
    <div class="field-label"><span>Experience</span></div>
    <div class="chips">
      ${chip("set-exp", "0", "Any", filters.experience === 0)}
      ${chip("set-exp", "5", "5+ years", filters.experience === 5)}
      ${chip("set-exp", "8", "8+ years", filters.experience === 8)}
    </div>
    <div class="field-label"><span>Qualifications</span></div>
    <div class="chips">
      ${QUALS.map((qual) => chip("toggle-qual", qual, qual, filters.quals.includes(qual))).join("")}
    </div>
    <div class="field-label"><span>Availability</span></div>
    <div class="chips">
      ${chip("toggle-avail", "weekday", "Weekdays", filters.availability.includes("weekday"))}
      ${chip("toggle-avail", "weekend", "Weekends", filters.availability.includes("weekend"))}
      ${chip("toggle-avail", "evening", "Evenings", filters.availability.includes("evening"))}
    </div>
    <div class="field-label"><span>Rating</span>${filtersActive() ? '<button type="button" class="linkish" data-action="clear-filters">Clear</button>' : ""}</div>
    <div class="chips">
      ${chip("set-rating", "0", "Any", filters.rating === 0)}
      ${chip("set-rating", "4.5", "4.5+", filters.rating === 4.5)}
      ${chip("set-rating", "4.8", "4.8+", filters.rating === 4.8)}
    </div>
    <div class="section-title"><h2 id="result-count">${countLabel()}</h2></div>
    <div id="result-list">${resultCards()}</div>
  </div>`;
}

function dayStrip(person, action) {
  const days = [];
  for (let i = 0; i < 14; i += 1) {
    const iso = addDays(i);
    const date = parseISO(iso);
    const open = slotsOn(person, iso).length > 0;
    const selected = state.draft.date === iso;
    days.push(`<button type="button" class="day${selected ? " is-on" : ""}" ${open ? "" : "disabled"} data-action="${action}" data-date="${iso}">
      <small>${DAY_NAMES[date.getDay()]}</small><strong>${date.getDate()}</strong>
    </button>`);
  }
  return `<div class="row-scroll">${days.join("")}</div>`;
}

function screenProfile() {
  const person = nannyById(state.nannyId);
  const price = priced(person);
  return `<div class="flow"><div class="hero-profile" style="background:${person.look.bg}">
      <button type="button" class="back" data-action="back" aria-label="Back">${icon("back")}</button>
      <div class="profile-id">
        ${avatar(person, 96, false)}
        <div>
          <h1>${esc(person.name)}</h1>
          <p class="lede" style="margin:4px 0">${esc(person.title)}</p>
          <p class="stars">★ ${person.rating.toFixed(1)} · ${person.reviews} reviews</p>
          <p class="hint" style="margin:0">${esc(person.distance)} · ${esc(person.neighborhood)} ${esc(person.zip)}</p>
        </div>
      </div>
    </div>
    <div class="pad">
      <p class="intro">${esc(person.bio)}</p>
      <p class="hint">Languages: ${esc(person.languages.join(", "))}</p>
      <h2 class="block-title" style="margin-top:18px">Experience and qualifications</h2>
      <p class="hint">${person.years} years of childcare experience</p>
      <div class="chips" style="margin-top:8px">${person.quals.map((qual) => `<span class="chip">${esc(qual)}</span>`).join("")}</div>
      <h2 class="block-title" style="margin-top:18px">Services offered</h2>
      <div class="chips" style="margin-top:8px">${person.services.map((service) => `<span class="chip">${esc(service)}</span>`).join("")}</div>
      <h2 class="block-title" style="margin-top:18px">Hourly rates</h2>
      <table class="rate-table">
        <tr><td>Standard care</td><td>${usd(price.standard)}/hr</td></tr>
        <tr><td>Overnight</td><td>${usd(price.overnight)}/hr</td></tr>
        <tr><td>Each extra child</td><td>+${usd(price.extra)}/hr</td></tr>
      </table>
      <h2 class="block-title" style="margin-top:18px">Availability calendar</h2>
      <p class="hint">Open days for the next two weeks. Closed days stay quiet.</p>
      ${dayStrip(person, "book-date")}
      <h2 class="block-title" style="margin-top:18px">Reviews</h2>
      ${person.quotes.map((quote) => `<p class="quote">“${esc(quote.text)}”<span>${esc(quote.name)}</span></p>`).join("")}
    </div></div>
    <div class="dock">
      <div><span>From</span><strong>${usd(price.standard)}/hr</strong></div>
      <button type="button" class="btn honey" data-action="book">Request a Booking</button>
    </div>`;
}

function screenBooking() {
  const person = nannyById(state.nannyId);
  const draft = state.draft;
  if (draft.date && draft.time && !timesFor(slotsOn(person, draft.date)).includes(draft.time)) draft.time = "";
  const ready = Boolean(draft.date && draft.time && draft.hours);
  const total = person.rate * (draft.hours || 0);
  const times = draft.date ? timesFor(slotsOn(person, draft.date)) : [];
  return `<div class="flow"><div class="pad">
    <button type="button" class="back" data-action="back" aria-label="Back">${icon("back")}</button>
    <p class="eyebrow">${state.editingId ? "Reschedule" : "Booking & payment"}</p>
    <h1 class="screen-title">${esc(person.name)}</h1>
    <p class="lede">${usd(person.rate)}/hr · ${esc(person.neighborhood)}</p>
    <h2 class="block-title">Select a date</h2>
    ${dayStrip(person, "pick-date")}
    <h2 class="block-title" style="margin-top:16px">Select a time</h2>
    ${draft.date && !times.length ? `<p class="hint">No open times that day. Choose another date.</p>` : ""}
    ${!draft.date ? `<p class="hint">Choose an open day to see times.</p>` : `<div class="chips">${times.map((time) => `<button type="button" class="choice${draft.time === time ? " is-on" : ""}" data-action="pick-time" data-value="${time}">${formatTime(time)}</button>`).join("")}</div>`}
    <h2 class="block-title" style="margin-top:16px">Choose childcare duration</h2>
    <div class="chips">
      ${HOURS.map((hours) => `<button type="button" class="choice${draft.hours === hours ? " is-on" : ""}" data-action="pick-hours" data-value="${hours}">${hours} hours</button>`).join("")}
    </div>
    <h2 class="block-title" style="margin-top:16px">Booking summary</h2>
    <table class="summary">
      <tr><td>Date</td><td>${draft.date ? esc(formatDate(draft.date)) : "Select a date"}</td></tr>
      <tr><td>Time</td><td>${draft.time && draft.hours ? `${esc(formatTime(draft.time))} – ${esc(endLabel(draft.time, draft.hours))}` : draft.time ? esc(formatTime(draft.time)) : "Select a time"}</td></tr>
      <tr><td>Duration</td><td>${draft.hours ? `${draft.hours} hours` : "Choose hours"}</td></tr>
      <tr><td>Care</td><td>${draft.hours ? `${draft.hours} × ${usd(person.rate)}` : "—"}</td></tr>
      <tr><td>Service fee</td><td>$0</td></tr>
      <tr class="total"><td>Total</td><td>${ready ? usd(total) : "—"}</td></tr>
    </table>
    <label class="field-label" for="note"><span>Note for the nanny</span></label>
    <textarea id="note" maxlength="180" placeholder="Allergies, routines, pickup notes">${esc(draft.note)}</textarea>
    <h2 class="block-title" style="margin-top:16px">Payment options</h2>
    <p class="hint">Demo only. Card numbers are not collected, and nothing is charged.</p>
    ${PAYMENTS.map((payment) => `<button type="button" class="pay${draft.payment === payment.id ? " is-on" : ""}" data-action="pay" data-value="${payment.id}" aria-pressed="${draft.payment === payment.id}"><span><strong>${esc(payment.name)}</strong><small>${esc(payment.detail)}</small></span><span class="check">${draft.payment === payment.id ? icon("check") : ""}</span></button>`).join("")}
  </div></div>
  <div class="dock">
    <div><span>Total</span><strong>${ready ? usd(total) : "—"}</strong></div>
    <button type="button" class="btn" data-action="confirm" ${ready ? "" : "disabled"}>Confirm booking</button>
  </div>`;
}

function bookingCard(item, mode) {
  const person = nannyById(item.nannyId);
  const open = state.confirmId === item.id;
  const live = item.nannyId === "elena" && item.parentName === "Maya Chen";
  const actions = [];
  if (mode === "parent" && (item.status === "pending" || item.status === "confirmed")) {
    actions.push(`<button type="button" class="btn slim" data-action="reschedule" data-id="${item.id}">Reschedule</button>`);
    actions.push(`<button type="button" class="btn slim danger" data-action="cancel-ask" data-id="${item.id}">Cancel</button>`);
    actions.push(`<button type="button" class="btn slim" data-action="message" data-nanny="${item.nannyId}" data-parent="${esc(item.parentName)}">Message nanny</button>`);
  }
  if (mode === "parent" && item.status === "pending" && !live) {
    actions.push(`<button type="button" class="btn slim" data-action="simulate-accept" data-id="${item.id}">Simulate reply</button>`);
  }
  if (mode === "parent" && item.status === "completed" && !item.reviewed) {
    actions.push(`<button type="button" class="btn slim" data-action="review" data-id="${item.id}">Leave a review</button>`);
  }
  if (mode === "nanny" && item.status === "pending") {
    actions.push(`<button type="button" class="btn slim" data-action="accept" data-id="${item.id}">Accept</button>`);
    actions.push(`<button type="button" class="btn slim danger" data-action="decline" data-id="${item.id}">Decline</button>`);
  }
  if (mode === "nanny" && (item.status === "pending" || item.status === "confirmed")) {
    actions.push(`<button type="button" class="btn slim" data-action="message" data-nanny="${item.nannyId}" data-parent="${esc(item.parentName)}">Message family</button>`);
  }
  return `<article class="booking">
    <header>
      <h3>${mode === "nanny" ? esc(item.parentName) : esc(person.name)}</h3>
      <span class="pill ${esc(item.status)}">${esc(item.status)}</span>
    </header>
    <p class="hint" style="margin:0">${esc(formatDate(item.date))} · ${esc(formatTime(item.time))} – ${esc(endLabel(item.time, item.hours))}</p>
    <p class="hint" style="margin:0">${item.hours} hours · ${usd(item.total)}${item.note ? ` · ${esc(item.note)}` : ""}</p>
    ${actions.length ? `<div class="actions">${actions.join("")}</div>` : ""}
    ${open ? `<div class="confirm-box"><p>Cancel this booking? It moves to history.</p><div class="btn-row"><button type="button" class="btn ghost slim" data-action="cancel-no">Keep</button><button type="button" class="btn coral slim" data-action="cancel-yes" data-id="${item.id}">Cancel booking</button></div></div>` : ""}
  </article>`;
}

function screenBookings() {
  const mine = parentBookings();
  const pending = byDate(mine.filter((item) => item.status === "pending"));
  const upcoming = byDate(mine.filter((item) => item.status === "confirmed"));
  const history = byDate(mine.filter((item) => ["completed", "cancelled", "declined"].includes(item.status))).reverse();
  const banner = state.banner ? `<div class="banner"><p>${esc(state.banner.text)}</p>${state.banner.action ? `<button type="button" class="btn" data-action="${state.banner.action}">${esc(state.banner.label)}</button>` : ""}</div>` : "";
  const block = (title, list, empty) => `
    <div class="section-title"><h2>${title}</h2></div>
    ${list.length ? `<div class="stack">${list.map((item) => bookingCard(item, "parent")).join("")}</div>` : `<p class="hint">${empty}</p>`}`;
  return `<div class="pad">
    <p class="eyebrow">My Bookings</p>
    <h1 class="screen-title">Your care schedule</h1>
    ${banner}
    ${block("Pending requests", pending, "No requests waiting on a nanny.")}
    ${block("Upcoming bookings", upcoming, "Confirmed visits will show here.")}
    ${block("Booking history", history, "Completed and cancelled visits land here.")}
  </div>`;
}

function screenInbox() {
  const keys = Object.keys(state.messages).filter((key) => key.endsWith("|Maya Chen"));
  const rows = keys.map((key) => {
    const [nannyId] = key.split("|");
    const person = nannyById(nannyId);
    const last = state.messages[key][state.messages[key].length - 1];
    return `<button type="button" class="person" data-action="message" data-nanny="${nannyId}" data-parent="Maya Chen">
      ${avatar(person, 48, true)}
      <span class="nanny-copy"><strong>${esc(person.name)}</strong><span>${esc(last.text)}</span></span>
    </button>`;
  }).join("");
  return `<div class="pad">
    <p class="eyebrow">Messages</p>
    <h1 class="screen-title">Conversations</h1>
    ${rows || `<div class="empty"><p>Message a nanny from a booking.</p></div>`}
  </div>`;
}

function screenThread() {
  const thread = state.thread || { nannyId: "elena", parentName: "Maya Chen" };
  const person = nannyById(thread.nannyId);
  const key = threadKey(thread.nannyId, thread.parentName);
  const messages = state.messages[key] || [];
  const title = state.role === "nanny" ? thread.parentName : person.name;
  return `<div class="flow"><div class="pad">
    <div class="topbar">
      <button type="button" class="back" data-action="back" aria-label="Back">${icon("back")}</button>
      <strong>${esc(title)}</strong>
      <span></span>
    </div>
    <div id="thread-log">
      ${messages.length ? messages.map((message) => {
        const mine = (state.role === "nanny" && message.from === "nanny") || (state.role !== "nanny" && message.from === "parent");
        return `<div class="bubble ${mine ? "me" : "them"}">${esc(message.text)}<small>${esc(message.at)}</small></div>`;
      }).join("") : `<p class="hint">No messages yet. Say hello.</p>`}
    </div>
  </div></div>
    <form class="composer" data-action="send">
      <input id="msg-input" aria-label="Message" placeholder="Write a message" maxlength="240" value="${esc(state.msgDraft)}">
      <button type="submit" class="btn" aria-label="Send">${icon("check")}</button>
    </form>`;
}

function miniWeek() {
  return `<div class="week">${DAY_NAMES.map((name, day) => {
    const slots = state.elenaWeek[day] || state.elenaWeek[String(day)] || [];
    return `<i class="${slots.length ? "on" : ""}">${name.slice(0, 1)}<b></b></i>`;
  }).join("")}</div>`;
}

function screenNanny() {
  const person = nannyById("elena");
  const pending = byDate(nannyBookings().filter((item) => item.status === "pending"));
  const upcoming = byDate(nannyBookings().filter((item) => item.status === "confirmed"));
  const acceptedNow = nannyBookings().filter((item) => item.acceptedInSession).reduce((sum, item) => sum + item.total, 0);
  return `<div class="pad">
    <div class="topbar">
      <button type="button" class="who" data-action="sheet" data-sheet="account">
        ${avatar(person, 42, true)}
        <span><strong>${esc(person.name)}</strong><span>Nanny · ${usd(person.rate)}/hr</span></span>
      </button>
      <button type="button" class="icon-btn" data-action="tab" data-screen="nanny-requests" aria-label="Open requests">${icon("bell")}</button>
    </div>
    <p class="eyebrow">Nanny dashboard</p>
    <h1 class="screen-title">Good morning, Elena</h1>
    <p class="lede">${pending.length} open request${pending.length === 1 ? "" : "s"} · profile visible to families</p>
    <article class="panel">
      <header><h3>Manage profile</h3></header>
      <p class="hint">${esc(person.bio)}</p>
      <button type="button" class="btn ghost slim" data-action="sheet" data-sheet="profile">Manage profile</button>
    </article>
    <article class="panel">
      <header><h3>Set availability</h3><button type="button" class="linkish" data-action="tab" data-screen="nanny-schedule">Edit</button></header>
      ${miniWeek()}
    </article>
    <div class="section-title"><h2>Accept or decline requests</h2></div>
    ${pending.length ? `<div class="stack">${pending.slice(0, 2).map((item) => bookingCard(item, "nanny")).join("")}</div>` : `<p class="hint">New family requests show up here.</p>`}
    ${pending.length > 2 ? `<button type="button" class="text-btn" data-action="tab" data-screen="nanny-requests">See all requests</button>` : ""}
    <div class="section-title"><h2>Manage bookings</h2></div>
    ${upcoming.length ? `<div class="stack">${upcoming.map((item) => bookingCard(item, "nanny")).join("")}</div>` : `<p class="hint">Accepted visits show here.</p>`}
    <article class="panel">
      <header><h3>Track earnings</h3><button type="button" class="linkish" data-action="tab" data-screen="nanny-earnings">Details</button></header>
      <p class="money">${usd(1840)}</p>
      <p class="hint" style="margin:0">Sample earnings this month. Accepted in this demo: ${usd(acceptedNow)}.</p>
    </article>
  </div>`;
}

function screenRequests() {
  const groups = [
    ["Open requests", nannyBookings().filter((item) => item.status === "pending")],
    ["Accepted", nannyBookings().filter((item) => item.status === "confirmed")],
    ["Closed", nannyBookings().filter((item) => item.status === "declined" || item.status === "cancelled")],
  ];
  return `<div class="pad">
    <p class="eyebrow">Requests</p>
    <h1 class="screen-title">Accept or decline</h1>
    ${groups.map(([title, list]) => `<div class="section-title"><h2>${title}</h2></div>${list.length ? `<div class="stack">${byDate(list).map((item) => bookingCard(item, "nanny")).join("")}</div>` : `<p class="hint">None in this list.</p>`}`).join("")}
  </div>`;
}

function screenSchedule() {
  const labels = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" };
  return `<div class="pad">
    <p class="eyebrow">Availability</p>
    <h1 class="screen-title">Set your week</h1>
    <p class="lede">Morning is 8–12, afternoon is 12–5, evening is 5–8. Families only see open days.</p>
    ${DAY_NAMES.map((name, day) => {
      const slots = state.elenaWeek[day] || [];
      return `<div class="schedule-day"><strong>${name}</strong><div class="slot-row">${SLOT_ORDER.map((slot) => `<button type="button" class="slot${slots.includes(slot) ? " is-on" : ""}" data-action="toggle-slot" data-day="${day}" data-slot="${slot}">${labels[slot]}</button>`).join("")}</div></div>`;
    }).join("")}
  </div>`;
}

function screenEarnings() {
  const upcoming = nannyBookings().filter((item) => item.status === "confirmed").reduce((sum, item) => sum + item.total, 0);
  const acceptedNow = nannyBookings().filter((item) => item.acceptedInSession).reduce((sum, item) => sum + item.total, 0);
  return `<div class="pad">
    <p class="eyebrow">Earnings</p>
    <h1 class="screen-title">This month</h1>
    <p class="money">${usd(1840)}</p>
    <p class="lede">Sample earnings already paid. The chart is a sample week, not a live bank feed.</p>
    <div class="bars">${BARS.map((height, index) => `<div><span style="height:${height}%"></span><small>${BAR_DAYS[index]}</small></div>`).join("")}</div>
    <table class="summary" style="margin-top:16px">
      <tr><td>Sample received</td><td>${usd(1840)}</td></tr>
      <tr><td>Accepted in this demo</td><td>${usd(acceptedNow)}</td></tr>
      <tr class="total"><td>Upcoming confirmed</td><td>${usd(upcoming)}</td></tr>
    </table>
  </div>`;
}

function screenTemplate() {
  const screens = {
    welcome: screenWelcome,
    "parent-home": screenParent,
    find: screenFind,
    profile: screenProfile,
    booking: screenBooking,
    bookings: screenBookings,
    inbox: screenInbox,
    thread: screenThread,
    "nanny-home": screenNanny,
    "nanny-requests": screenRequests,
    "nanny-schedule": screenSchedule,
    "nanny-earnings": screenEarnings,
  };
  return (screens[state.screen] || screenWelcome)();
}

function tabTemplate() {
  const group = state.role === "nanny" ? "nanny" : state.screen.startsWith("nanny") ? "nanny" : "parent";
  const show = ["parent-home", "find", "bookings", "inbox", "nanny-home", "nanny-requests", "nanny-schedule", "nanny-earnings"].includes(state.screen);
  if (!show || state.screen === "welcome") return "";
  const pending = group === "nanny"
    ? nannyBookings().filter((item) => item.status === "pending").length
    : parentBookings().filter((item) => item.status === "pending").length;
  return TABS[group].map(([screen, label, glyph]) => {
    const badgeScreen = group === "nanny" ? "nanny-requests" : "bookings";
    const badge = screen === badgeScreen && pending ? `<i class="tab-badge">${pending}</i>` : "";
    return `<button type="button" data-action="tab" data-screen="${screen}" class="${state.screen === screen ? "is-on" : ""}">${icon(glyph)}${badge}${label}</button>`;
  }).join("");
}

function overlayTemplate() {
  const toast = state.toast ? `<div class="toast" id="toast" role="status">${esc(state.toast)}</div>` : "";
  if (!state.sheet) return toast;
  let body = "";
  if (state.sheet === "signin") {
    body = `<h2>Sign In</h2><p class="lede">Prototype accounts. No password.</p>
      <button type="button" class="sheet-link" data-action="sign-in" data-role="parent"><strong>Maya Chen</strong><span>Parent · Park Slope · Leo and Nora</span></button>
      <button type="button" class="sheet-link" data-action="sign-in" data-role="nanny"><strong>Elena Vargas</strong><span>Nanny · 8 years · $28/hr</span></button>`;
  } else if (state.sheet === "account") {
    const nanny = state.role === "nanny";
    body = `<h2>${nanny ? "Elena Vargas" : "Maya Chen"}</h2><p class="lede">${nanny ? "Nanny dashboard" : "Parent · Leo, 3 and Nora, 6"}</p>
      <button type="button" class="btn" data-action="switch-role">Switch to ${nanny ? "parent" : "nanny"} view</button>
      <button type="button" class="btn ghost" data-action="sign-out" style="margin-top:8px">Sign out</button>
      <button type="button" class="text-btn" data-action="reset" style="margin-top:14px">Reset demo</button>`;
  } else if (state.sheet === "screens") {
    const items = [
      ["welcome", "1 · Welcome / Onboarding"],
      ["parent-home", "2 · Parent Dashboard"],
      ["find", "3 · Find a Nanny"],
      ["profile", "4 · Nanny Profile"],
      ["booking", "5 · Booking & Payment"],
      ["bookings", "6 · My Bookings"],
      ["nanny-home", "7 · Nanny Dashboard"],
    ];
    body = `<h2>Screens</h2><p class="lede">Jump through the prototype. Elena Vargas is the live booking loop.</p>
      ${items.map(([screen, label]) => `<button type="button" class="sheet-link" data-action="jump" data-screen="${screen}"><strong>${label}</strong></button>`).join("")}
      <button type="button" class="text-btn" data-action="reset">Reset demo</button>`;
  } else if (state.sheet === "alerts") {
    const items = parentBookings().filter((item) => item.status === "pending" || item.status === "confirmed");
    body = `<h2>Alerts</h2>${items.length ? items.map((item) => `<button type="button" class="sheet-link" data-action="tab" data-screen="bookings"><strong>${esc(nannyById(item.nannyId).name)}</strong><span>${esc(item.status)} · ${esc(formatDate(item.date))}</span></button>`).join("") : `<p class="lede">You're all caught up.</p>`}`;
  } else if (state.sheet === "profile") {
    const buffer = state.editBuffer || { bio: "", rate: 28, services: [] };
    body = `<h2>Manage profile</h2>
      <label class="field-label" for="edit-bio">Introduction</label>
      <textarea id="edit-bio" maxlength="280">${esc(buffer.bio)}</textarea>
      <label class="field-label" for="edit-rate">Hourly rate</label>
      <input class="num" id="edit-rate" type="number" min="15" max="80" value="${Number(buffer.rate) || ""}">
      <div class="field-label"><span>Services offered</span></div>
      <div class="chips">${SERVICES.map((service) => chip("toggle-service", service, service, buffer.services.includes(service))).join("")}</div>
      ${state.editError ? `<p class="warn">${esc(state.editError)}</p>` : ""}
      <button type="button" class="btn" data-action="save-profile" style="margin-top:14px">Save profile</button>`;
  }
  return `<div class="scrim" data-action="close-sheet"></div><div class="sheet" role="dialog" aria-modal="true"><div class="handle"></div>${body}<button type="button" class="text-btn" data-action="close-sheet" style="margin-top:12px">Close</button></div>${toast}`;
}

function railScreen() {
  if (String(state.screen).startsWith("nanny")) return "nanny-home";
  if (state.screen === "inbox" || state.screen === "thread") return "bookings";
  return state.screen;
}

function render() {
  avatarSeq = 0;
  const app = document.getElementById("app");
  const focus = document.activeElement;
  const focusId = focus && focus.id ? focus.id : "";
  const selectionStart = focus && typeof focus.selectionStart === "number" ? focus.selectionStart : null;
  const selectionEnd = focus && typeof focus.selectionEnd === "number" ? focus.selectionEnd : null;
  const previousScroller = app.querySelector(".flow") || app;
  const scrollTop = previousScroller ? previousScroller.scrollTop : 0;
  const screenChanged = lastScreen !== state.screen;
  lastScreen = state.screen;
  app.innerHTML = screenTemplate();
  app.classList.remove("is-enter");
  if (screenChanged) {
    void app.offsetWidth;
    app.classList.add("is-enter");
  }
  document.getElementById("tabbar").innerHTML = tabTemplate();
  document.getElementById("overlay").innerHTML = overlayTemplate();
  document.getElementById("clock").textContent = clock();
  document.title = `NannyConnect — ${TITLES[state.screen] || "Prototype"}`;
  document.querySelectorAll(".screen-index button").forEach((button) => {
    button.classList.toggle("is-current", button.dataset.screen === railScreen());
  });
  const hash = HASH_FOR[state.screen] || "welcome";
  try {
    if (location.hash !== `#${hash}`) history.replaceState(null, "", `#${hash}`);
  } catch (error) {
    /* file:// can refuse history updates */
  }
  const scroller = app.querySelector(".flow") || app;
  if (state.scrollThread) {
    scroller.scrollTop = scroller.scrollHeight;
    state.scrollThread = false;
  } else if (screenChanged) {
    scroller.scrollTop = 0;
  } else {
    scroller.scrollTop = scrollTop;
  }
  if (focusId) {
    const next = document.getElementById(focusId);
    if (next) {
      next.focus();
      if (selectionStart != null && next.setSelectionRange) {
        try { next.setSelectionRange(selectionStart, selectionEnd); } catch (error) { /* number inputs */ }
      }
    }
  }
  save();
}

function armToast() {
  clearTimeout(toastTimer);
  if (!state.toast) return;
  toastTimer = setTimeout(() => {
    state.toast = "";
    const toast = document.getElementById("toast");
    if (toast) toast.remove();
  }, 2600);
}

function flash(text) {
  state.toast = text;
  render();
  armToast();
}

function navigate(screen, stack) {
  state.screen = screen;
  state.stack = stack;
  state.sheet = null;
  state.confirmId = null;
  render();
}

function go(screen) {
  state.stack.push(screen);
  state.screen = screen;
  state.sheet = null;
  state.confirmId = null;
  render();
}

function back() {
  if (state.sheet) {
    state.sheet = null;
    render();
    return;
  }
  if (state.stack.length <= 1) return;
  state.stack.pop();
  state.screen = state.stack[state.stack.length - 1];
  state.confirmId = null;
  render();
}

function enterRole(role, toast) {
  state.role = role;
  state.needRole = false;
  const dest = role === "nanny" ? "nanny-home" : "parent-home";
  if (toast) state.toast = toast;
  navigate(dest, [dest]);
  if (toast) armToast();
}

function openBooking(date) {
  state.editingId = null;
  state.draft = emptyDraft();
  if (date) state.draft.date = date;
  go("booking");
}

function jump(screen) {
  if (screen.startsWith("nanny")) state.role = "nanny";
  else if (screen !== "welcome") state.role = "parent";
  state.nannyId = state.nannyId || "elena";
  state.banner = null;
  if (screen === "profile") {
    state.editingId = null;
    navigate("profile", ["find", "profile"]);
    return;
  }
  if (screen === "booking") {
    state.editingId = null;
    state.draft = emptyDraft();
    navigate("booking", ["find", "profile", "booking"]);
    return;
  }
  navigate(screen, [screen]);
}

function toggleIn(list, value) {
  const index = list.indexOf(value);
  if (index >= 0) list.splice(index, 1);
  else list.push(value);
}

function patchResults() {
  const list = document.getElementById("result-list");
  const count = document.getElementById("result-count");
  const label = document.getElementById("rate-label");
  if (label) label.textContent = rateLabel();
  if (count) count.textContent = countLabel();
  if (list) {
    avatarSeq = 100;
    list.innerHTML = resultCards();
  }
}

function readNote() {
  const note = document.getElementById("note");
  if (note) state.draft.note = note.value;
}

function confirmBooking() {
  readNote();
  const draft = state.draft;
  if (!draft.date || !draft.time || !draft.hours) return;
  const person = nannyById(state.nannyId);
  const total = person.rate * draft.hours;
  let record = state.bookings.find((item) => item.id === state.editingId);
  const wasEdit = Boolean(record);
  if (!record) {
    record = { id: `b${Date.now()}`, parentName: "Maya Chen" };
    state.bookings.unshift(record);
  }
  Object.assign(record, {
    nannyId: person.id,
    parentName: record.parentName || "Maya Chen",
    date: draft.date,
    time: draft.time,
    hours: draft.hours,
    payment: draft.payment,
    note: draft.note.trim(),
    rate: person.rate,
    total,
    status: "pending",
    reviewed: false,
  });
  state.editingId = null;
  state.draft = emptyDraft();
  state.role = "parent";
  const live = person.id === "elena";
  state.banner = {
    text: wasEdit
      ? `Updated request sent to ${person.name}.`
      : live
        ? `Request sent to ${person.name}. It stays pending until she accepts.`
        : `Request sent to ${person.name}. Use Simulate reply, or book Elena to try the live nanny inbox.`,
    action: live ? "view-nanny" : "",
    label: live ? "Open nanny dashboard" : "",
  };
  state.toast = wasEdit ? "Request updated" : "Request sent";
  navigate("bookings", ["bookings"]);
  armToast();
}

function setBookingStatus(id, status) {
  const record = state.bookings.find((item) => item.id === id);
  if (!record) return;
  record.status = status;
  if (status === "confirmed") record.acceptedInSession = true;
  const name = status === "confirmed" ? "Request accepted" : status === "declined" ? "Request declined" : "Booking cancelled";
  flash(name);
}

function sendMessage() {
  const input = document.getElementById("msg-input");
  const text = (input ? input.value : state.msgDraft).trim();
  if (!text || !state.thread) return;
  const key = threadKey(state.thread.nannyId, state.thread.parentName);
  if (!state.messages[key]) state.messages[key] = [];
  state.messages[key].push({
    from: state.role === "nanny" ? "nanny" : "parent",
    text,
    at: "Now",
  });
  state.msgDraft = "";
  state.scrollThread = true;
  render();
}

function openThread(nannyId, parentName) {
  state.thread = { nannyId, parentName };
  state.msgDraft = "";
  state.scrollThread = true;
  if (state.screen === "thread") render();
  else go("thread");
}

function saveProfile() {
  const bioField = document.getElementById("edit-bio");
  const rateField = document.getElementById("edit-rate");
  const buffer = state.editBuffer || { bio: "", rate: 28, services: [] };
  if (bioField) buffer.bio = bioField.value;
  if (rateField) buffer.rate = rateField.value;
  const rate = Number(buffer.rate);
  if (!String(buffer.bio).trim()) {
    state.editError = "Add a short introduction.";
    render();
    return;
  }
  if (!rate || rate < 15 || rate > 80) {
    state.editError = "Use an hourly rate between $15 and $80.";
    render();
    return;
  }
  state.profileOverrides = {
    bio: String(buffer.bio).trim(),
    rate,
    services: [...buffer.services],
  };
  state.sheet = null;
  flash("Profile updated");
}

function onClick(event) {
  const node = event.target.closest("[data-action]");
  if (!node) return;
  const action = node.dataset.action;
  if (action === "send") return;
  if (node.disabled) return;
  const value = node.dataset.value;
  if (action === "dot") state.slide = Number(node.dataset.index);
  else if (action === "role") {
    state.role = node.dataset.role;
    state.needRole = false;
  } else if (action === "start") {
    if (!state.role) {
      state.needRole = true;
      render();
      const roles = document.querySelector(".roles");
      if (roles) {
        roles.classList.remove("shake");
        void roles.offsetWidth;
        roles.classList.add("shake");
      }
      return;
    }
    enterRole(state.role);
    return;
  } else if (action === "sheet") {
    if (node.dataset.sheet === "profile") {
      const person = nannyById("elena");
      state.editBuffer = { bio: person.bio, rate: person.rate, services: [...person.services] };
      state.editError = "";
    }
    state.sheet = node.dataset.sheet;
  } else if (action === "close-sheet") state.sheet = null;
  else if (action === "sign-in") {
    enterRole(node.dataset.role, node.dataset.role === "nanny" ? "Signed in as Elena Vargas" : "Signed in as Maya Chen");
    return;
  } else if (action === "sign-out") {
    state.role = null;
    state.banner = null;
    navigate("welcome", ["welcome"]);
    return;
  } else if (action === "reset") {
    sessionStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    flash("Prototype reset");
    return;
  } else if (action === "jump") {
    jump(node.dataset.screen);
    return;
  } else if (action === "switch-role") {
    enterRole(state.role === "nanny" ? "parent" : "nanny", state.role === "nanny" ? "Viewing as Maya Chen" : "Viewing as Elena Vargas");
    return;
  } else if (action === "search-location") {
    state.role = "parent";
    navigate("find", ["find"]);
    return;
  } else if (action === "browse") {
    state.filters = defaultFilters();
    state.role = "parent";
    navigate("find", ["find"]);
    return;
  } else if (action === "quick") {
    state.filters = defaultFilters();
    if (node.dataset.kind === "weekend") state.filters.availability = ["weekend"];
    if (node.dataset.kind === "after") {
      state.filters.types = ["part-time"];
      state.filters.availability = ["weekday"];
    }
    if (node.dataset.kind === "full") state.filters.types = ["full-time"];
    state.role = "parent";
    navigate("find", ["find"]);
    return;
  } else if (action === "open-nanny") {
    state.nannyId = node.dataset.id;
    go("profile");
    return;
  } else if (action === "clear-filters") state.filters = defaultFilters();
  else if (action === "toggle-type") toggleIn(state.filters.types, value);
  else if (action === "toggle-qual") toggleIn(state.filters.quals, value);
  else if (action === "toggle-avail") toggleIn(state.filters.availability, value);
  else if (action === "set-exp") state.filters.experience = Number(value);
  else if (action === "set-rating") state.filters.rating = Number(value);
  else if (action === "back") {
    back();
    return;
  } else if (action === "book") {
    openBooking("");
    return;
  } else if (action === "book-date") {
    openBooking(node.dataset.date);
    return;
  } else if (action === "pick-date") {
    state.draft.date = node.dataset.date;
    state.draft.time = "";
  } else if (action === "pick-time") state.draft.time = value;
  else if (action === "pick-hours") state.draft.hours = Number(value);
  else if (action === "pay") state.draft.payment = value;
  else if (action === "confirm") {
    confirmBooking();
    return;
  } else if (action === "tab") {
    state.banner = null;
    navigate(node.dataset.screen, [node.dataset.screen]);
    return;
  } else if (action === "view-nanny") {
    state.banner = null;
    enterRole("nanny");
    return;
  } else if (action === "accept") {
    setBookingStatus(node.dataset.id, "confirmed");
    return;
  } else if (action === "decline") {
    setBookingStatus(node.dataset.id, "declined");
    return;
  } else if (action === "simulate-accept") {
    setBookingStatus(node.dataset.id, "confirmed");
    return;
  } else if (action === "cancel-ask") state.confirmId = node.dataset.id;
  else if (action === "cancel-no") state.confirmId = null;
  else if (action === "cancel-yes") {
    state.confirmId = null;
    setBookingStatus(node.dataset.id, "cancelled");
    return;
  } else if (action === "reschedule") {
    const record = state.bookings.find((item) => item.id === node.dataset.id);
    state.nannyId = record.nannyId;
    state.editingId = record.id;
    state.draft = {
      date: record.date,
      time: record.time,
      hours: record.hours,
      payment: record.payment,
      note: record.note || "",
    };
    go("booking");
    return;
  } else if (action === "message") {
    openThread(node.dataset.nanny, node.dataset.parent);
    return;
  } else if (action === "review") {
    const record = state.bookings.find((item) => item.id === node.dataset.id);
    if (record) record.reviewed = true;
    flash("Review saved in this prototype");
    return;
  } else if (action === "toggle-slot") {
    const day = Number(node.dataset.day);
    const slot = node.dataset.slot;
    const current = new Set(state.elenaWeek[day] || []);
    if (current.has(slot)) current.delete(slot);
    else current.add(slot);
    state.elenaWeek[day] = SLOT_ORDER.filter((item) => current.has(item));
    flash("Availability updated");
    return;
  } else if (action === "toggle-service") {
    if (!state.editBuffer) return;
    toggleIn(state.editBuffer.services, value);
  } else if (action === "save-profile") {
    saveProfile();
    return;
  }
  render();
}

function onInput(event) {
  const target = event.target;
  if (target.id === "loc") state.filters.zip = target.value;
  if (target.id === "zip") {
    state.filters.zip = target.value;
    if (event.type === "input") patchResults();
    else render();
  }
  if (target.id === "rate") {
    state.filters.rateMax = Number(target.value);
    if (event.type === "input") patchResults();
    else render();
  }
  if (target.id === "note") state.draft.note = target.value;
  if (target.id === "msg-input") state.msgDraft = target.value;
  if (target.id === "edit-bio" && state.editBuffer) state.editBuffer.bio = target.value;
  if (target.id === "edit-rate" && state.editBuffer) state.editBuffer.rate = target.value;
}

function onKeydown(event) {
  if (event.key === "Enter" && event.target.id === "loc") {
    event.preventDefault();
    state.role = "parent";
    navigate("find", ["find"]);
  }
  if (event.key === "Enter" && event.target.id === "msg-input") {
    event.preventDefault();
    sendMessage();
  }
  if (state.screen === "welcome" && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
    const direction = event.key === "ArrowRight" ? 1 : SLIDES.length - 1;
    state.slide = (state.slide + direction) % SLIDES.length;
    render();
  }
}

let touchX = null;
document.body.addEventListener("click", onClick);
document.body.addEventListener("input", onInput);
document.body.addEventListener("change", onInput);
document.body.addEventListener("keydown", onKeydown);
document.body.addEventListener("submit", (event) => {
  if (event.target.matches(".composer")) {
    event.preventDefault();
    sendMessage();
  }
});
document.body.addEventListener("touchstart", (event) => {
  touchX = event.changedTouches[0].clientX;
}, { passive: true });
document.body.addEventListener("touchend", (event) => {
  if (state.screen !== "welcome" || touchX == null) return;
  const delta = event.changedTouches[0].clientX - touchX;
  if (Math.abs(delta) < 40) return;
  const direction = delta < 0 ? 1 : SLIDES.length - 1;
  state.slide = (state.slide + direction) % SLIDES.length;
  render();
}, { passive: true });

state = loadState();
const hashed = HASH_SCREEN[(location.hash || "").replace("#", "")];
if (hashed) jump(hashed);
else render();
setInterval(() => {
  const clockNode = document.getElementById("clock");
  if (clockNode) clockNode.textContent = clock();
}, 30000);
