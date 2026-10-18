const { reduce, countdown } = window.CA27;

// Cuenta regresiva: solo anima el dígito que cambia.
const units = [...document.querySelectorAll("[data-unit]")];
countdown((next) => {
  units.forEach((node) => {
    const value = next[node.dataset.unit];
    if (node.textContent === value) return;
    node.textContent = value;
    if (reduce) return;
    node.classList.remove("tick");
    void node.offsetWidth;
    node.classList.add("tick");
  });
});

// Carrusel genérico con flechas, puntos y avance automático que se pausa con el mouse.
function carousel({ count, dots, onShow, interval, root }) {
  let index = 0;
  let timer = 0;
  const buttons = [];
  for (let i = 0; i < count; i += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Ir a " + (i + 1));
    button.addEventListener("click", () => { show(i); restart(); });
    dots.append(button);
    buttons.push(button);
  }
  function show(i) {
    index = (i + count) % count;
    buttons.forEach((b, j) => {
      b.classList.toggle("is-on", j === index);
      b.setAttribute("aria-current", j === index ? "true" : "false");
    });
    onShow(index);
  }
  function restart() {
    window.clearInterval(timer);
    if (!reduce && interval) timer = window.setInterval(() => show(index + 1), interval);
  }
  if (root) {
    root.addEventListener("mouseenter", () => window.clearInterval(timer));
    root.addEventListener("mouseleave", restart);
  }
  show(0);
  restart();
  return { step: (d) => { show(index + d); restart(); } };
}

const slides = [...document.querySelectorAll(".slides img")];
const slider = carousel({
  count: slides.length,
  dots: document.querySelector("#dots"),
  interval: 4500,
  root: document.querySelector("#slider"),
  onShow: (i) => slides.forEach((img, j) => img.classList.toggle("is-on", j === i)),
});
document.querySelectorAll("#slider [data-step]").forEach((btn) => btn.addEventListener("click", () => slider.step(Number(btn.dataset.step))));

const track = document.querySelector("#quoteTrack");
const quotes = carousel({
  count: track.children.length,
  dots: document.querySelector("#qdots"),
  interval: 5000,
  root: document.querySelector(".quotes"),
  onShow: (i) => { track.style.transform = "translateX(" + (-i * 100) + "%)"; },
});
document.querySelector("#prevQ").addEventListener("click", () => quotes.step(-1));
document.querySelector("#nextQ").addEventListener("click", () => quotes.step(1));

// Menú en mobile.
const burger = document.querySelector("#burger");
const links = document.querySelector("#links");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  links.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
}));

// Sección activa en la nav.
const navLinks = [...links.querySelectorAll("a")];
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + entry.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
navLinks.forEach((a) => {
  const target = document.querySelector(a.getAttribute("href"));
  if (target) io.observe(target);
});
