const { reduce } = window.CA27;
const nav = document.querySelector("#nav");
const bar = document.querySelector("#bar");
const menu = document.querySelector("#menu");
const ham = document.querySelector("#ham");
const menuImg = document.querySelector("#menuImg");
const pin = document.querySelector("#piezas");
const track = document.querySelector("#track");
const pinBar = document.querySelector("#pinBar");
const sheets = [...document.querySelectorAll(".sheet")];

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

// La nav toma el color del campo que tiene detrás, mirando el punto debajo de ella.
function paintNav() {
  if (!menu.hidden) return;
  const hit = document.elementsFromPoint(window.innerWidth / 2, 36).find((el) => el.closest("[data-nav]") && !el.closest("#nav"));
  const zone = hit && hit.closest("[data-nav]");
  if (zone) nav.dataset.theme = zone.dataset.nav;
}

function onScroll() {
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
  paintNav();
  if (reduce) return;

  // Cada lámina se achica y se oscurece mientras la siguiente le pasa por encima.
  sheets.forEach((sheet, i) => {
    const next = sheets[i + 1];
    if (!next) return;
    const p = Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh));
    sheet.querySelector(".sheet-in").style.transform = "scale(" + (1 - p * 0.08) + ") translateY(" + (-p * 4) + "vh)";
    sheet.style.setProperty("--dim", (p * 0.55).toFixed(3));
  });

  if (travel > 0) {
    const passed = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), travel);
    track.style.transform = "translate3d(" + (-passed) + "px,0,0)";
    pinBar.style.transform = "scaleX(" + passed / travel + ")";
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
relayout();

// Lineup: el orador elegido sube al escenario con su nombre completo.
const stage = document.querySelector("#stage");
const picks = [...document.querySelectorAll(".pick")];
let current = null;
let swapTimer = 0;
function pick(btn) {
  if (btn === current) return;
  current = btn;
  picks.forEach((b) => b.classList.toggle("is-on", b === btn));
  const apply = () => {
    stage.dataset.c = btn.dataset.c;
    document.querySelector("#stageImg").src = btn.dataset.img;
    document.querySelector("#stageImg").alt = btn.dataset.first + " " + btn.dataset.last;
    document.querySelector("#stageFirst").textContent = btn.dataset.first;
    document.querySelector("#stageLast").textContent = btn.dataset.last;
    document.querySelector("#stageRole").textContent = btn.dataset.role;
    stage.classList.remove("is-swap");
  };
  window.clearTimeout(swapTimer);
  if (reduce) { apply(); return; }
  stage.classList.add("is-swap");
  swapTimer = window.setTimeout(apply, 220);
}
picks.forEach((btn) => {
  btn.addEventListener("mouseenter", () => pick(btn));
  btn.addEventListener("focus", () => pick(btn));
  btn.addEventListener("click", () => pick(btn));
});
pick(picks[0]);

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
