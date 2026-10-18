// CA27 — comportamiento compartido: marquesinas, entradas al scrollear y cuenta regresiva.
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Marquesina que se frena con el mouse y se puede arrastrar.
  function mountMarquee(mq) {
    const track = mq.querySelector(".mq-track");
    if (!track) return;
    const base = track.innerHTML;
    while (track.scrollWidth < mq.offsetWidth * 2 + 1) track.innerHTML += base;
    track.innerHTML += track.innerHTML;
    if (reduce) return;
    const dir = mq.dataset.dir === "right" ? 1 : -1;
    const speed = Number(mq.dataset.speed || 0.6);
    let x = dir > 0 ? -track.scrollWidth / 2 : 0;
    let paused = false;
    let drag = null;
    (function loop() {
      if (!paused && !drag) x += speed * dir;
      const half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = "translate3d(" + x + "px,0,0)";
      requestAnimationFrame(loop);
    })();
    if (mq.hasAttribute("data-hover-pause")) {
      mq.addEventListener("mouseenter", () => { paused = true; });
      mq.addEventListener("mouseleave", () => { paused = false; });
    }
    mq.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      drag = { x: event.clientX, ox: x };
      mq.classList.add("is-drag");
      mq.setPointerCapture(event.pointerId);
    });
    mq.addEventListener("pointermove", (event) => {
      if (drag) x = drag.ox + (event.clientX - drag.x);
    });
    const end = () => { drag = null; mq.classList.remove("is-drag"); };
    mq.addEventListener("pointerup", end);
    mq.addEventListener("pointercancel", end);
  }

  function mountReveal() {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    nodes.forEach((node) => io.observe(node));
  }

  // 25 de febrero de 2027, hora de Buenos Aires.
  const START = new Date("2027-02-25T00:00:00-03:00");

  function countdown(onTick) {
    function tick() {
      const total = Math.max(0, Math.floor((START.getTime() - Date.now()) / 1000));
      onTick({
        days: String(Math.floor(total / 86400)),
        hours: String(Math.floor((total % 86400) / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
        seconds: String(total % 60).padStart(2, "0"),
      });
    }
    tick();
    return window.setInterval(tick, 1000);
  }

  window.CA27 = { reduce, mountMarquee, countdown };
  document.querySelectorAll("[data-marquee]").forEach(mountMarquee);
  mountReveal();
})();
