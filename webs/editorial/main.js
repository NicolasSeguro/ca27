const { reduce } = window.CA27;
const hero = document.querySelector(".hero");
const menu = document.querySelector("#menu");
const openMenuBtn = document.querySelector("#openMenu");
const panel = document.querySelector("#panel");

// El monograma sube y la firma entra en dos partes: Casa desde la izquierda, Abierta desde la derecha.
requestAnimationFrame(() => window.setTimeout(() => hero.classList.add("is-on"), reduce ? 0 : 200));

function setMenu(open) {
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("is-open"));
  } else {
    menu.classList.remove("is-open");
    menu.hidden = true;
  }
  openMenuBtn.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}
function setPanel(open) {
  panel.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
  if (open) panel.querySelector("#closePanel").focus();
}

openMenuBtn.addEventListener("click", () => setMenu(true));
document.querySelector("#closeMenu").addEventListener("click", () => setMenu(false));
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.querySelectorAll("#openPanel, [data-open-panel]").forEach((btn) => btn.addEventListener("click", () => setPanel(true)));
document.querySelector("#closePanel").addEventListener("click", () => setPanel(false));
document.querySelector("#panelBg").addEventListener("click", () => setPanel(false));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setMenu(false);
  setPanel(false);
});

// El header cambia a crema cuando pasa sobre campos oscuros.
const header = document.querySelector(".header");
const dark = [...document.querySelectorAll(".field--ink, .field--blue")];
function paintHeader() {
  const over = dark.some((node) => {
    const r = node.getBoundingClientRect();
    return r.top <= 40 && r.bottom >= 40;
  });
  header.classList.toggle("on-dark", over);
}
addEventListener("scroll", paintHeader, { passive: true });
paintHeader();
