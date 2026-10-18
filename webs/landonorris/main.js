const { reduce, countdown } = window.CA27;
const nav = document.querySelector("#nav");
const bar = document.querySelector("#bar");
const menu = document.querySelector("#menu");
const ham = document.querySelector("#ham");
const menuImg = document.querySelector("#menuImg");
const pin = document.querySelector("#piezas");
const track = document.querySelector("#track");
const pinBar = document.querySelector("#pinBar");
const floaters = document.querySelector("#floaters");

countdown(({ days }) => { document.querySelector("#days").textContent = days; });

// Manifiesto: cada párrafo se parte en palabras y se ilumina mientras cruza la pantalla.
const paragraphs = [...document.querySelectorAll("#readText p")].map((p) => {
  p.innerHTML = p.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  return { el: p, words: [...p.querySelectorAll(".w")] };
});

// Tira de piezas: fijada solo si hay lugar y movimiento; si no, carrusel nativo.
const pinQuery = window.matchMedia("(min-width: 861px) and (min-height: 560px)");
let travel = 0;
function layoutPin() {
  const pinned = pinQuery.matches && !reduce;
  pin.classList.toggle("is-native", !pinned);
  if (!pinned) {
    pin.style.height = "";
    track.style.transform = "";
    travel = 0;
    return;
  }
  travel = Math.max(0, track.scrollWidth - window.innerWidth);
  pin.style.height = window.innerHeight + travel + "px";
}

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
  if (reduce) return;

  const vh = window.innerHeight;
  paragraphs.forEach(({ el, words }) => {
    const r = el.getBoundingClientRect();
    // 0 cuando el párrafo asoma abajo, 1 cuando su base llega a 40% de la pantalla.
    const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.5)));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < lit));
  });

  if (travel > 0) {
    const passed = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), travel);
    const p = passed / travel;
    track.style.transform = "translate3d(" + (-passed) + "px,0,0)";
    pinBar.style.transform = "scaleX(" + p + ")";
  }
}

let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; onScroll(); });
}, { passive: true });
function relayout() { layoutPin(); onScroll(); }
addEventListener("resize", relayout);
addEventListener("load", relayout);
pinQuery.addEventListener("change", relayout);
track.querySelectorAll("img").forEach((img) => img.addEventListener("load", relayout, { once: true }));
if (reduce) paragraphs.forEach(({ words }) => words.forEach((w) => w.classList.add("on")));
relayout();

// La nav toma el color del campo que tiene detrás.
const watch = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting && menu.hidden) nav.dataset.theme = entry.target.dataset.nav; });
}, { rootMargin: "0px 0px -92% 0px" });
document.querySelectorAll("[data-nav]").forEach((node) => watch.observe(node));

// Puertas del hero: se corren apenas con el mouse.
if (!reduce && floaters) {
  addEventListener("mousemove", (event) => {
    const dx = (event.clientX / innerWidth - 0.5) * 2;
    const dy = (event.clientY / innerHeight - 0.5) * 2;
    floaters.querySelectorAll("img").forEach((img, i) => {
      const depth = 6 + (i % 4) * 5;
      img.style.setProperty("--px", (-dx * depth).toFixed(1) + "px");
      img.style.setProperty("--py", (-dy * depth).toFixed(1) + "px");
    });
  });
}

let themeBeforeMenu = nav.dataset.theme;
function setMenu(open) {
  if (open) themeBeforeMenu = nav.dataset.theme;
  menu.hidden = !open;
  ham.setAttribute("aria-expanded", String(open));
  ham.querySelector("span").textContent = open ? "Cerrar" : "Menú";
  nav.dataset.theme = open ? "cream" : themeBeforeMenu;
  document.body.style.overflow = open ? "hidden" : "";
}
ham.addEventListener("click", () => setMenu(menu.hidden));
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
  link.addEventListener("mouseenter", () => { menuImg.src = link.dataset.art; });
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !menu.hidden) setMenu(false); });
