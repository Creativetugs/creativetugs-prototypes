const slides = [...document.querySelectorAll(".hero-slide")];
const current = document.getElementById("slide-current");
let activeSlide = 0;
let slideTimer;
function showSlide(index){
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle("active",i===activeSlide));
  current.textContent = String(activeSlide+1).padStart(2,"0");
}
function restartTimer(){ clearInterval(slideTimer); slideTimer=setInterval(()=>showSlide(activeSlide+1),6500); }
document.getElementById("prev-slide").addEventListener("click",()=>{showSlide(activeSlide-1);restartTimer();});
document.getElementById("next-slide").addEventListener("click",()=>{showSlide(activeSlide+1);restartTimer();});
restartTimer();

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
toggle.addEventListener("click",()=>{
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded",String(open));
  toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");
}));

// Prototype behavior: prepares a message in the visitor's email application.
// Replace with a secure server-side form handler before production launch.
document.getElementById("quote-form").addEventListener("submit",event=>{
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const fields = ["name","company","email","phone","service","message"];
  const body = fields.map(key=>`${key.charAt(0).toUpperCase()+key.slice(1)}: ${data.get(key)||"Not provided"}`).join("\n");
  const subject = encodeURIComponent("Quote Request — DV Die Cutting Website");
  const mailBody = encodeURIComponent(body);
  document.getElementById("form-status").textContent = "Your email application will open with your project details.";
  window.location.href = `mailto:sales@dvdie.com?subject=${subject}&body=${mailBody}`;
});
