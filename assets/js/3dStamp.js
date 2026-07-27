/* Addapted from https://gist.github.com/KettLovahr/a459e8e9824880f9e038cd424d9c80c1 found at anniesden.dev */

(() => {
  const MAX_TILT_DEG = 30;
  const LIFT_DISTANCE = "3cm";
  const BRIGHTNESS_FALLOFF = 4;

  const stamps = document.getElementsByClassName("stamp");

  for (let i = 0; i < stamps.length; i++) {
    const el = stamps[i];
    const inner = el.querySelector(":scope > .stamp-inner");
    if (!inner) continue;

    el.onmouseenter = function () {
      this.classList.add("hovered");
    };

    el.onmouseleave = function () {
      this.classList.remove("hovered");
      inner.style.transform = "";
      inner.style.filter = "none";
    };

    el.onmousemove = function (e) {
      if (!this.classList.contains("hovered")) return;

      const rect = this.getBoundingClientRect();
      const xoff = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 2;
      const yoff = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 2;
      const strength = Math.sqrt(xoff * xoff + yoff * yoff);
      inner.style.transform = `
        translate3d(0, 0, ${LIFT_DISTANCE})
        rotate3d(${-yoff}, ${xoff}, 0, ${strength * MAX_TILT_DEG}deg)
      `;
      inner.style.filter = `brightness(${1 - yoff / BRIGHTNESS_FALLOFF - xoff / BRIGHTNESS_FALLOFF})`;
    };
  }
})();
