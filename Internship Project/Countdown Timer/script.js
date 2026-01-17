const list = document.getElementById("countdownList");
const countdowns = [];

document.getElementById("createBtn").addEventListener("click", () => {
  const name = eventName.value.trim();
  const desc = eventDesc.value.trim();
  const date = targetDate.value;

  if (!date) return alert("Select date & time");

  countdowns.push({
    id: Date.now(),
    name: name || "My Event",
    desc: desc || "Event description",
    date: new Date(date).getTime(),
  });

  eventName.value = "";
  eventDesc.value = "";
  targetDate.value = "";

  render();
});

function render() {
  list.innerHTML = "";

  countdowns.forEach((c) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-12";

    col.innerHTML = `
      <div class="timer-card" id="timer-${c.id}">
        <div class="event-name">${c.name}</div>
        <p class="event-desc" id="desc-${c.id}">${c.desc}</p>
        ${c.desc.length > 60 ? `<button class="view-btn" onclick="toggleDesc(${c.id})">View More</button>` : ""}
        <div class="time-grid">
          <div class="time-pill"><span>0</span><small>Days</small></div>
          <div class="time-pill"><span>0</span><small>Hours</small></div>
          <div class="time-pill"><span>0</span><small>Min</small></div>
          <div class="time-pill"><span>0</span><small>Sec</small></div>
        </div>
      </div>
    `;
    list.appendChild(col);
  });
}

function toggleDesc(id) {
  const p = document.getElementById(`desc-${id}`);
  const btn = p.nextElementSibling;
  p.classList.toggle("expanded");
  btn.innerText = p.classList.contains("expanded") ? "View Less" : "View More";
}

/* Countdown */
setInterval(() => {
  const now = Date.now();

  countdowns.forEach((c) => {
    const diff = c.date - now;
    const card = document.getElementById(`timer-${c.id}`);
    if (!card) return;

    if (diff <= 0) {
      card.innerHTML = `⏰ ${c.name} Completed`;
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const spans = card.querySelectorAll("span");
    spans[0].innerText = d;
    spans[1].innerText = h;
    spans[2].innerText = m;
    spans[3].innerText = s;
  });
}, 1000);

/* Theme */
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
};

/* Cursor glow + stars (stable) */
const glow = document.querySelector(".cursor-glow");
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let stars = [];
let mx = 0,
  my = 0,
  lx = 0,
  ly = 0;

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.onresize = resize;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  glow.style.left = mx + "px";
  glow.style.top = my + "px";

  const dx = mx - lx;
  const dy = my - ly;
  if (Math.sqrt(dx * dx + dy * dy) > 12) {
    stars.push({
      x: mx,
      y: my,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      l: 1,
    });
    lx = mx;
    ly = my;
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s, i) => {
    s.x += s.vx;
    s.y += s.vy;
    s.l -= 0.01;
    const op = s.l;
    ctx.fillStyle = `rgba(255,215,0,${op})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
    ctx.fill();
    if (s.l <= 0) stars.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();
