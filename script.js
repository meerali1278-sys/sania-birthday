(() => {
const C = CONFIG, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
const app = $("#app"), pad = n => String(n).padStart(2, "0");

/* ---------- artwork ---------- */
const gift = `<svg class="gift" viewBox="0 0 120 120" aria-hidden="true"><g class="lid"><rect x="18" y="38" width="84" height="20" rx="3" fill="#B76E79"/><rect x="54" y="38" width="12" height="20" fill="#D8B56D"/><path d="M60 38c-18-20-34-8-22 0zM60 38c18-20 34-8 22 0z" fill="none" stroke="#D8B56D" stroke-width="4"/></g><rect x="24" y="58" width="72" height="50" rx="3" fill="#8a2a47"/><rect x="54" y="58" width="12" height="50" fill="#D8B56D"/></svg>`;
const cake = `<svg class="cake" viewBox="0 0 220 200" aria-hidden="true">${[50, 80, 110, 140, 170].map((x, i) => `<g class="fl" style="--d:${i * .17}s"><path d="M${x} 22c8 10 10 16 4 22-3 3-9 3-11 0-4-7 0-12 7-22z" fill="#D8B56D"/></g><rect x="${x - 2}" y="44" width="4" height="30" fill="#FFF5E8"/>`).join("")}<rect x="30" y="74" width="160" height="40" rx="8" fill="#B76E79"/><path d="M30 90q20 14 40 0t40 0 40 0 40 0" fill="none" stroke="#FFF5E8" stroke-width="5"/><rect x="14" y="114" width="192" height="56" rx="10" fill="#4A1024" stroke="#D8B56D" stroke-width="2"/></svg>`;

/* ---------- particles ---------- */
const cv = $("#fx"), g = cv.getContext("2d");
let W, H, parts = [], mode = "dust";
const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
size(); addEventListener("resize", size);
const mk = t => ({ t, x: Math.random() * W, y: Math.random() * H, r: t === "p" ? 6 + Math.random() * 6 : .4 + Math.random() * 1.8,
  vx: (Math.random() - .5) * .3, vy: t === "p" ? .4 + Math.random() * .6 : -.1 - Math.random() * .25,
  a: Math.random() * 6.28, va: (Math.random() - .5) * .03, tw: Math.random() * 6 });
function amb(m) {
  const n = { dust: [70, 0, 12], stars: [0, 130, 0], petals: [60, 0, 28] }[m] || [60, 0, 10];
  parts = [];
  for (let i = 0; i < n[0]; i++) parts.push(mk("d"));
  for (let i = 0; i < n[1]; i++) parts.push(mk("s"));
  for (let i = 0; i < n[2]; i++) parts.push(mk("p"));
}
function burst(n = 150) {
  for (let i = 0; i < n; i++) {
    const t = i % 3 ? "p" : "d";
    parts.push({ t, x: W / 2, y: H * .55, r: t === "p" ? 5 + Math.random() * 6 : 2 + Math.random() * 3, vx: (Math.random() - .5) * 13,
      vy: -3 - Math.random() * 12, a: 0, va: (Math.random() - .5) * .2, tw: 0, life: 170 + Math.random() * 60 });
  }
}
(function loop() {
  g.clearRect(0, 0, W, H);
  const k = RM ? 0 : 1;
  parts = parts.filter(p => p.life === undefined || p.life > 0);
  for (const p of parts) {
    const b = p.life !== undefined;
    if (b) { p.vy += .2 * k; p.life -= k || 1; }
    p.x += p.vx * k; p.y += p.vy * k; p.a += p.va * k; p.tw += .04 * k;
    if (!b) { if (p.y > H + 20) p.y = -20; if (p.y < -20) p.y = H + 20; if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20; }
    g.globalAlpha = Math.max(0, b ? Math.min(1, p.life / 40) : .45 + .4 * Math.sin(p.tw));
    if (p.t === "p") { g.fillStyle = "#B76E79"; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.beginPath(); g.ellipse(0, 0, p.r, p.r * .55, 0, 0, 6.28); g.fill(); g.restore(); }
    else { g.fillStyle = p.t === "s" ? "#FFF5E8" : "#D8B56D"; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.28); g.fill(); }
  }
  g.globalAlpha = 1; requestAnimationFrame(loop);
})();

/* ---------- navigation ---------- */
let idx = 0, playing = false, timer, pre;
function go(id) {
  clearTimeout(timer); playing = false;
  $$(".ch").forEach(s => s.classList.toggle("on", s.id === id));
  const s = $("#" + id); amb(s.dataset.m); s.scrollTop = 0;
  const J = C.jarvis || {}, hud = $("#hud");
  if (J.enabled && hud) hud.querySelector(".jt").textContent = id === "s-final" ? (J.hudFinal || J.hud || "") : (J.hud || "");
  if (id === "s-show") initShow();
}

/* ---------- slideshow ---------- */
const N = C.photos.length;
const chOf = i => C.photos[i].chapter || (i < Math.ceil(N / 3) ? "A" : i < Math.ceil(2 * N / 3) ? "B" : "C");
function sched() { clearTimeout(timer); if (playing) timer = setTimeout(next, C.slideSeconds * 1000); }
const src = (p, e) => C.photoDir + p.file.replace(/\.\w+$/, "") + "." + C.extensions[e];
function show(i) {
  idx = i; const p = C.photos[i], pic = $("#pic"), ph = $("#ph");
  pic.classList.remove("in"); ph.hidden = true; pic.hidden = false;
  pic.onload = () => requestAnimationFrame(() => pic.classList.add("in"));
  let e = 0;  // tries each extension (jpg, webp, jpeg, png) before showing the placeholder
  pic.onerror = () => {
    if (++e < C.extensions.length) { pic.src = src(p, e); return; }
    pic.hidden = true; ph.hidden = false; ph.innerHTML = `<b>❤</b><p>Memory ${pad(i + 1)}<br><small>Add ${src(p, 0)}</small></p>`;
  };
  pic.alt = p.caption || `Memory ${i + 1}`; pic.src = src(p, 0);
  if (i + 1 < N) { pre = new Image(); pre.src = src(C.photos[i + 1], 0); }  // only one image preloaded
  $("#cap").innerHTML = (p.caption || "") + (p.date ? `<small>${p.date}</small>` : "");
  $("#cnt").textContent = `Memory ${pad(i + 1)} / ${N}`;
  $("#fill").style.width = ((i + 1) / N * 100) + "%";
  $("#chl").textContent = C.chapters[chOf(i)].title;
  sched();
}
function inter(ch, cb) {
  clearTimeout(timer); $("#player").hidden = true; $("#inter").hidden = false;
  $("#it").textContent = C.chapters[ch].after;
  $("#ib").onclick = () => { $("#inter").hidden = true; $("#player").hidden = false; cb(); };
  $("#ib").focus();
}
function next() {
  if (idx >= N - 1) return inter(chOf(idx), () => go("s-cards"));
  if (chOf(idx + 1) !== chOf(idx)) return inter(chOf(idx), () => show(idx + 1));
  show(idx + 1);
}
const prev = () => show(Math.max(0, idx - 1));
function play(on) { playing = on; $("#pp").textContent = on ? "❚❚ Pause" : "▶ Play"; $("#pp").setAttribute("aria-label", on ? "Pause" : "Play"); sched(); }
function initShow() {
  $("#intro").hidden = false; $("#player").hidden = true; $("#inter").hidden = true; play(false);
}
addEventListener("keydown", e => {
  if (!$("#s-show").classList.contains("on") || $("#player").hidden) return;
  if (e.key === "ArrowRight") next(); else if (e.key === "ArrowLeft") prev();
  else if (e.key === " " && e.target.tagName !== "BUTTON") { e.preventDefault(); play(!playing); }
  else if (e.key.toLowerCase() === "f") $("#fs").click();
});

/* ---------- build ---------- */
function build() {
  const o = C.opening, F = C.final;
  const J = C.jarvis || {};
  const jarvisBoot = J.enabled
    ? `<p class="jarvis-boot fade" style="--d:.2s"><i class="jd" aria-hidden="true"></i>${J.boot || ""}</p>`
    : "";
  app.innerHTML = `
<section class="ch" id="s-open" data-m="dust"><div class="w">
  ${jarvisBoot}
  <h2 class="fade" style="--d:.8s">${o[0]}</h2>
  <h2 class="fade" style="--d:3.8s">${o[1]}</h2>
  <h1 class="fade" style="--d:7s">${o[2]}</h1>
  <p class="fade" style="--d:9s">${o[3]}</p>
  <div class="fade" style="--d:10.5s">${gift}<br><button class="btn" data-go="s-cake">${o[4]}</button></div>
</div></section>

<section class="ch" id="s-cake" data-m="petals"><div class="w">
  ${cake}<h1 class="big">${C.cake.title}</h1><p>${C.cake.text}</p><p style="color:var(--rg)">${C.birthday}</p>
  <h2 id="cw" hidden>${C.cake.wish}</h2>
  <button class="btn" id="wishBtn">${C.cake.wishBtn}</button>
  <button class="btn g" id="cakeNext" data-go="s-letter" hidden>${C.cake.next}</button>
</div></section>

<section class="ch" id="s-letter" data-m="dust"><div class="w">
  <div id="envBox"><h2>${C.letter.title}</h2>
    <div class="env" id="env"><i></i><div class="flap"></div><span class="seal" aria-hidden="true">❤️</span></div>
    <button class="btn" id="openEnv">${C.letter.btn}</button></div>
  <div hidden id="paperBox"><div class="paper">${C.letter.body}</div><button class="btn" data-go="s-show">${C.letter.next}</button></div>
</div></section>

<section class="ch" id="s-show" data-m="dust"><div class="w">
  <div id="intro"><h1>${C.show.title}</h1><p>${C.show.subtitle}</p><button class="btn" id="start">${C.show.start}</button></div>
  <div id="inter" hidden><h2 id="it"></h2><button class="btn" id="ib">${C.show.continue}</button></div>
  <div id="player" hidden>
    <p id="chl"></p>
    <div id="stage"><div id="px"><img id="pic" alt="" decoding="async"></div><div id="ph" hidden></div></div>
    <p id="cap"></p><p id="cnt"></p><div id="bar"><i id="fill"></i></div>
    <div><button class="btn g" id="pv">◀ Previous</button><button class="btn" id="pp">▶ Play</button><button class="btn g" id="nx">Next ▶</button>
    <button class="btn g" id="fs">⛶ Full screen</button><button class="btn g" id="rs">↺ Restart</button></div>
  </div>
</div></section>

<section class="ch" id="s-cards" data-m="dust"><div class="w">
  <h1>${C.cardsTitle}</h1>
  <div class="cards">${C.cards.map((t, i) => `<div class="card" style="--i:${i}">${t}</div>`).join("")}</div>
  <button class="btn" data-go="s-wishes">${C.cardsNext}</button>
</div></section>

<section class="ch" id="s-wishes" data-m="stars"><div class="w">
  <h2>${C.wishesTitle}</h2><div id="wt" aria-live="polite"></div>
  <button class="btn" id="wb">${C.wishesBtn}</button>
</div></section>

<section class="ch" id="s-final" data-m="petals"><div class="w" id="scene">
  <h2>${F.intro}</h2>${gift}<br><button class="btn" id="og">${F.btn}</button>
</div>
<div id="fin"><div class="w">
  ${F.lines.map((t, i) => `<p class="l fade" style="--d:${1 + i * 3}s">${t}</p>`).join("")}
  <div class="heart fade" style="--d:${1 + F.lines.length * 3}s" aria-hidden="true">❤</div>
  <h1 class="fade" style="--d:${2 + F.lines.length * 3}s">${F.title}</h1>
  <h2 class="fade" style="--d:${4 + F.lines.length * 3}s">${F.end}</h2>
  <button class="btn g fade" id="rp" style="--d:${5 + F.lines.length * 3}s">${F.replay}</button>
</div></div></section>`;

  /* jarvis status label */
  if (J.enabled) {
    let hud = $("#hud");
    if (!hud) {
      hud = document.createElement("div");
      hud.id = "hud"; hud.setAttribute("aria-hidden", "true");
      hud.innerHTML = `<i class="hd"></i><span class="jt"></span>`;
      document.body.appendChild(hud);
    }
    hud.querySelector(".jt").textContent = J.hud || "";
  }

  /* chapter 2 */
  $("#wishBtn").onclick = () => {
    $("#s-cake").classList.add("out"); $("#cw").hidden = false; $("#cakeNext").hidden = false; $("#wishBtn").hidden = true;
    if (!RM) burst(90); $("#cakeNext").focus();
  };
  /* chapter 3 */
  $("#openEnv").onclick = () => {
    $("#env").classList.add("open"); $("#openEnv").hidden = true; if (!RM) burst(40);
    setTimeout(() => { $("#envBox").hidden = true; $("#paperBox").hidden = false; }, RM ? 0 : 1400);
  };
  /* chapter 4 */
  $("#start").onclick = () => { $("#intro").hidden = true; $("#player").hidden = false; show(0); };
  $("#nx").onclick = next; $("#pv").onclick = prev; $("#pp").onclick = () => play(!playing);
  $("#rs").onclick = () => { play(false); show(0); };
  $("#fs").onclick = () => document.fullscreenElement ? document.exitFullscreen() : ($("#stage").requestFullscreen || (() => {})).call($("#stage"));
  $("#stage").onmousemove = e => { if (RM) return; const r = e.currentTarget.getBoundingClientRect();
    $("#px").style.setProperty("--x", ((e.clientX - r.left) / r.width - .5) * -16 + "px"); $("#px").style.setProperty("--y", ((e.clientY - r.top) / r.height - .5) * -10 + "px"); };
  /* chapter 6 */
  let wi = 0;
  $("#wb").onclick = () => {
    if (wi >= C.wishes.length) return go("s-final");
    $("#wt").innerHTML = `<p class="fade" style="--d:0s">${C.wishes[wi++]}</p>`;
    $("#wb").textContent = wi >= C.wishes.length ? C.wishesDone : C.wishesMore;
  };
  /* chapter 7 */
  $("#og").onclick = () => {
    $("#scene").classList.add("open"); $("#og").hidden = true; if (!RM) burst(180);
    setTimeout(() => { $("#fin").classList.add("on"); $("#fin").scrollTop = 0; }, RM ? 0 : 1600);
  };
  $("#rp").onclick = () => { build(); go("s-open"); };
}

/* ---------- music (only on explicit click) ---------- */
const au = new Audio(); au.loop = true; au.preload = "none"; au.volume = C.music.volume; if (C.music.file) au.src = C.music.file;
const mb = $("#mus"), label = (on, t) => { mb.textContent = t || (on ? "♪ Music on" : "♪ Music off"); mb.setAttribute("aria-pressed", on); };
mb.onclick = () => {
  if (!au.paused) { au.pause(); return label(false); }
  if (!C.music.file) return label(false, "♪ Add a music file");
  au.play().then(() => label(true)).catch(() => { label(false, "♪ Music file not found"); setTimeout(() => label(false), 3000); });
};

app.onclick = e => { const b = e.target.closest("[data-go]"); if (b) go(b.dataset.go); };
build(); go("s-open");
})();
