const { reduce } = window.CA27;
const plus = document.querySelector("#plus");
const menu = document.querySelector("#menu");
const wall = document.querySelector("#wall");
const peel = document.querySelector("#peel");
const cells = [...wall.querySelectorAll(".cell:not(.tape)")];
const cases = [...wall.querySelectorAll(".case")];

function setMenu(open) {
  menu.hidden = !open;
  plus.setAttribute("aria-expanded", String(open));
}
plus.addEventListener("click", () => setMenu(menu.hidden));
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Arrastrar: en desktop el click levanta; en el teléfono hay que mantener ~260 ms (si no, es scroll).
function bindDrag(el, { onTap, onMove } = {}) {
  let drag = null;
  el.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const touch = event.pointerType === "touch";
    el.style.transition = "";
    drag = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      ox: Number(el.dataset.dx || 0), oy: Number(el.dataset.dy || 0),
      armed: !touch, moved: false, trail: [],
    };
    if (touch) {
      drag.timer = window.setTimeout(() => {
        if (!drag) return;
        drag.armed = true;
        el.classList.add("is-lift");
        if (navigator.vibrate) navigator.vibrate(8);
      }, 260);
    }
  });
  el.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.armed) {
      if (Math.hypot(dx, dy) > 10) { window.clearTimeout(drag.timer); drag = null; }
      return;
    }
    if (!drag.moved && Math.hypot(dx, dy) > 4) {
      drag.moved = true;
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-lift");
    }
    if (!drag.moved) return;
    event.preventDefault();
    const x = drag.ox + dx;
    const y = drag.oy + dy;
    drag.trail.push({ x, y, t: performance.now() });
    if (drag.trail.length > 6) drag.trail.shift();
    el.dataset.dx = String(x);
    el.dataset.dy = String(y);
    el.style.translate = x + "px " + y + "px";
    if (onMove) onMove();
  });
  const end = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    window.clearTimeout(drag.timer);
    const { moved, trail } = drag;
    drag = null;
    el.classList.remove("is-lift");
    if (moved && !reduce && trail.length > 1) glide(el, trail);
    if (!moved && onTap && event.type === "pointerup") onTap(event);
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
}

// Soltar con inercia.
function glide(el, trail) {
  const a = trail[0];
  const b = trail[trail.length - 1];
  const dt = Math.max(16, b.t - a.t);
  const x = Number(el.dataset.dx || 0) + ((b.x - a.x) / dt) * 160;
  const y = Number(el.dataset.dy || 0) + ((b.y - a.y) / dt) * 160;
  el.dataset.dx = String(x);
  el.dataset.dy = String(y);
  el.style.transition = "translate .6s cubic-bezier(.15,.8,.2,1)";
  el.style.translate = x + "px " + y + "px";
}

cells.forEach((el) => {
  bindDrag(el, {
    onTap: (event) => {
      if (el.classList.contains("case")) openCase(el);
      if (el.hasAttribute("data-reel")) openReel(event);
    },
  });
  // Con teclado (click sin puntero), los afiches y el disco se abren igual.
  el.addEventListener("click", (event) => {
    if (event.detail !== 0) return;
    if (el.classList.contains("case")) openCase(el);
    if (el.hasAttribute("data-reel")) openReel(event);
  });
});

bindDrag(peel);

// La cinta se frota para los dos lados y sigue un poco al soltar.
const tape = document.querySelector("#tape");
const tapeRow = document.querySelector("#tapeRow");
let tapeX = 0;
let tapeV = 0;
let tapeLast = 0;
tape.addEventListener("pointerdown", (event) => {
  tape.setPointerCapture(event.pointerId);
  tapeLast = event.clientX;
});
tape.addEventListener("pointermove", (event) => {
  if (!tape.hasPointerCapture(event.pointerId)) return;
  tapeV = event.clientX - tapeLast;
  tapeLast = event.clientX;
  tapeX += tapeV;
});
(function tapeLoop() {
  const half = tapeRow.scrollWidth / 2;
  if (!reduce) { tapeX += tapeV; tapeV *= 0.94; }
  if (tapeX > 0) tapeX -= half;
  if (tapeX < -half) tapeX += half;
  tapeRow.style.translate = tapeX + "px 0";
  requestAnimationFrame(tapeLoop);
})();

// Capa de pieza.
const caseEl = document.querySelector("#case");
let caseIndex = 0;
function openCase(el) {
  caseIndex = cases.indexOf(el);
  const img = el.querySelector("img");
  document.querySelector("#caseImg").src = img.src;
  document.querySelector("#caseImg").alt = img.alt;
  document.querySelector("#caseTitle").textContent = el.dataset.title;
  document.querySelector("#caseCopy").textContent = el.dataset.copy;
  caseEl.hidden = false;
  document.body.style.overflow = "hidden";
  document.querySelector("#caseClose").focus();
}
function closeCase() {
  caseEl.hidden = true;
  document.body.style.overflow = "";
}
document.querySelector("#caseClose").addEventListener("click", closeCase);
document.querySelector("#caseNext").addEventListener("click", () => openCase(cases[(caseIndex + 1) % cases.length]));

// Reel: crece desde el botón que lo abrió y pasa las piezas.
const reel = document.querySelector("#reel");
const reelImg = document.querySelector("#reelImg");
const reelCap = document.querySelector("#reelCap");
const frames = [
  ["../shared/piezas/lockup.webp", "Lockup"],
  ["../shared/piezas/institucional.webp", "Institucional"],
  ["../shared/piezas/oradores.webp", "Oradores"],
  ["../shared/piezas/multitud.webp", "En sala"],
  ["../shared/piezas/guitarra.webp", "Música"],
  ["../shared/media/banner.webp", "Lineup"],
  ["../shared/piezas/gracias.webp", "Gracias"],
];
let frame = 0;
let timer = 0;
function showFrame() {
  const [src, cap] = frames[frame % frames.length];
  reelImg.src = src;
  reelImg.alt = cap;
  reelCap.textContent = String((frame % frames.length) + 1).padStart(2, "0") + " / " + cap;
  frame += 1;
}
function openReel(event) {
  const r = event && event.currentTarget && event.currentTarget.getBoundingClientRect ? event.currentTarget.getBoundingClientRect() : null;
  reel.style.setProperty("--ox", r ? r.left + r.width / 2 + "px" : "50%");
  reel.style.setProperty("--oy", r ? r.top + r.height / 2 + "px" : "50%");
  frame = 0;
  showFrame();
  reel.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => requestAnimationFrame(() => reel.classList.add("is-open")));
  window.clearInterval(timer);
  if (!reduce) timer = window.setInterval(showFrame, 1400);
  document.querySelector("#closeReel").focus();
}
function closeReel() {
  reel.classList.remove("is-open");
  window.clearInterval(timer);
  document.body.style.overflow = "";
  window.setTimeout(() => { reel.hidden = true; }, reduce ? 0 : 500);
}
document.querySelectorAll(".nav [data-reel], .hero [data-reel]").forEach((btn) => btn.addEventListener("click", openReel));
document.querySelector("#closeReel").addEventListener("click", closeReel);
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeCase();
  if (!reel.hidden) closeReel();
  setMenu(false);
});

// «Sé parte»: cada letra se puede arrastrar.
const say = document.querySelector("#say");
say.innerHTML = [...say.textContent].map((ch) => `<span aria-hidden="true">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
say.querySelectorAll("span").forEach((span) => bindDrag(span));
