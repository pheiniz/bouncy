const face = document.querySelector(".face");
const stars = document.querySelector(".stars");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const maxStars = 100;

function positionStar(star, size) {
  star.style.left = `${Math.random() * Math.max(0, window.innerWidth - size)}px`;
  star.style.top = `${Math.random() * Math.max(0, window.innerHeight - size)}px`;
}

function createStar() {
  if (stars.childElementCount >= maxStars) {
    return;
  }

  const star = document.createElement("span");
  const size = Math.floor(Math.random() * 3) + 1;
  const duration = Math.random() * 9000 + 7000;
  const elapsed = Math.random() * duration;

  star.className = reducedMotion.matches ? "star star--still" : "star";
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  positionStar(star, size);

  if (!reducedMotion.matches) {
    star.style.setProperty("--duration", `${duration}ms`);
    star.style.setProperty("--peak", `${Math.random() * 0.5 + 0.5}`);
    star.style.animationDelay = `-${elapsed}ms`;
    star.addEventListener(
      "animationend",
      () => {
        star.remove();
        createStar();
      },
      { once: true },
    );
  }

  stars.append(star);
}

for (let i = 0; i < maxStars; i += 1) {
  createStar();
}

window.addEventListener("resize", () => {
  for (const star of stars.children) {
    positionStar(star, star.offsetWidth);
  }
});

if (!reducedMotion.matches) {
  let x = window.innerWidth * 0.28;
  let y = window.innerHeight * 0.35;
  let vx = 145;
  let vy = 115;
  let previousTime = 0;

  function animate(time) {
    const width = face.offsetWidth;
    const height = face.offsetHeight;
    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(0, window.innerHeight - height);

    if (previousTime) {
      const elapsed = Math.min((time - previousTime) / 1000, 0.05);
      x += vx * elapsed;
      y += vy * elapsed;
      let bounced = false;

      if (x <= 0 || x >= maxX) {
        x = Math.max(0, Math.min(x, maxX));
        vx *= -1;
        bounced = true;
      }
      if (y <= 0 || y >= maxY) {
        y = Math.max(0, Math.min(y, maxY));
        vy *= -1;
        bounced = true;
      }
      if (bounced) {
        face.style.filter = `grayscale(1) sepia(1) saturate(6) hue-rotate(${Math.random() * 360}deg)`;
      }
    }

    face.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    previousTime = time;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
