(() => {
const C = CONFIG, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
const app = $("#app"), pad = n => String(n).padStart(2, "0");

/* ---------- paper artwork ---------- */
const ink = "#3A332D";
const gift = `<svg class="gift" viewBox="0 0 120 120" aria-hidden="true">
<g class="lid"><rect x="16" y="38" width="88" height="18" rx="3" fill="#F3E5D2" stroke="${ink}" stroke-width="2.2"/>
<ellipse cx="44" cy="29" rx="14" ry="8" transform="rotate(-18 44 29)" fill="none" stroke="${ink}" stroke-width="2.2"/>
<ellipse cx="76" cy="29" rx="14" ry="8" transform="rotate(18 76 29)" fill="none" stroke="${ink}" stroke-width="2.2"/>
<circle cx="60" cy="33" r="4.5" fill="#BE7381" stroke="${ink}" stroke-width="2.2"/></g>
<rect x="22" y="56" width="76" height="48" rx="3" fill="#FFFDF8" stroke="${ink}" stroke-width="2.2"/>
<rect x="55" y="56" width="10" height="48" fill="#BE7381" opacity=".75"/>
<path d="M22 76h76" stroke="${ink}" stroke-width="1.2" stroke-dasharray="3 6" opacity=".5"/></svg>`;

const cake = `<svg class="cake" viewBox="0 0 240 210" aria-hidden="true">
${[88, 120, 152].map((x, i) => `<g class="fl" style="--d:${i * .18}s"><path d="M${x} 26c7 9 9 14 3.5 19-2.6 2.6-7.4 2.6-10 0-5.5-5-3.5-10 3.5-19z" fill="#BE7381"/><line x1="${x}" y1="45" x2="${x}" y2="54" stroke="${ink}" stroke-width="2.2"/></g>
<rect x="${x - 2}" y="54" width="4" height="34" fill="#FFFDF8" stroke="${ink}" stroke-width="1.6"/>`).join("")}
<rect x="86" y="88" width="68" height="32" rx="3" fill="#FFFDF8" stroke="${ink}" stroke-width="2.2"/>
<path d="M86 96c5 0 5 8 10 8s5-8 10-8 5 8 10 8 5-8 10-8 5 8 10 8 5-8 10-8 5 8 8 8" fill="none" stroke="#BE7381" stroke-width="2.2" opacity=".8"/>
<rect x="64" y="120" width="112" height="34" rx="3" fill="#FBF3E6" stroke="${ink}" stroke-width="2.2"/>
<path d="M64 128c6 0 6 9 12 9s6-9 12-9 6 9 12 9 6-9 12-9 6 9 12 9 6-9 12-9 6 9 12 9 6-9 12-9 6 9 12 9" fill="none" stroke="#8F9E84" stroke-width="2.2" opacity=".85"/>
<rect x="42" y="154" width="156" height="34" rx="3" fill="#FFFDF8" stroke="${ink}" stroke-width="2.2"/>
<path d="M42 162c7 0 7 9 14 9s7-9 14-9 7 9 14 9 7-9 14-9 7 9 14 9 7-9 14-9 7 9 14 9 7-9 14-9 7 9 14 9" fill="none" stroke="#BC9558" stroke-width="2.2" opacity=".8"/>
<line x1="26" y1="192" x2="214" y2="192" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/></svg>`;

/* ---------- soft paper confetti ---------- */
const cv = $("#fx"), g = cv.getContext("2d");
let W, H, parts = [];
const PAL = ["#C98A95", "#C4A166", "#9BAB8F", "#D8A9B2"];
const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
size(); addEventListener("resize", size);
const mk = t => ({
  t, x: Math.random() * W, y: Math.random() * H,
  r: t === "p" ? 4 + Math.random() * 5 : 1.4 + Math.random() * 2.6,
  vx: (Math.random() - .5) * .35, vy: t === "p" ? .3 + Math.random() * .5 : .12 + Math.random() * .3,
  a: Math.random() * 6.28, va: (Math.random() - .5) * .02, tw: Math.random() * 6,
  c: PAL[Math.floor(Math.random() * PAL.length)]
});
function amb(m) {
  const n = { dust: [40, 0, 10], stars: [10, 40, 0], petals: [20, 0, 24] }[m] || [30, 0, 10];
  parts = [];
  for (let i = 0; i < n[0]; i++) parts.push(mk("d"));
  for (let i = 0; i < n[1]; i++) parts.push(mk("s"));
  for (let i = 0; i < n[2]; i++) parts.push(mk("p"));
}
function burst(n = 120) {
  for (let i = 0; i < n; i++) {
    const t = i % 2 ? "p" : "d";
    parts.push({
      t, x: W / 2 + (Math.random() - .5) * 90, y: H * .5, r: t === "p" ? 4 + Math.random() * 5 : 2 + Math.random() * 3,
      vx: (Math.random() - .5) * 12, vy: -4 - Math.random() * 11, a: Math.random() * 6.28,
      va: (Math.random() - .5) * .22, tw: 0, life: 150 + Math.random() * 70,
      c: PAL[Math.floor(Math.random() * PAL.length)]
    });
  }
}
(function loop() {
  g.clearRect(0, 0, W, H);
  const k = RM ? 0 : 1;
  parts = parts.filter(p => p.life === undefined || p.life > 0);
  for (const p of parts) {
    const b = p.life !== undefined;
    if (b) { p.vy += .17 * k; p.life -= k || 1; }
    p.x += p.vx * k; p.y += p.vy * k; p.a += p.va * k; p.tw += .025 * k;
    if (!b) {
      if (p.y > H + 24) { p.y = -24; p.x = Math.random() * W; }
      if (p.x < -24) p.x = W + 24; if (p.x > W + 24) p.x = -24;
    }
    g.globalAlpha = Math.max(0, b ? Math.min(1, p.life / 45) : .34 + .22 * Math.sin(p.tw));
    g.fillStyle = p.c;
    if (p.t === "p") {
      g.save(); g.translate(p.x, p.y); g.rotate(p.a);
      g.beginPath(); g.ellipse(0, 0, p.r, p.r * .5, 0, 0, 6.28); g.fill(); g.restore();
    } else if (p.t === "d") {
      g.save(); g.translate(p.x, p.y); g.rotate(p.a);
      g.fillRect(-p.r / 2, -p.r / 3, p.r, p.r * .66); g.restore();
    } else {
      g.beginPath(); g.arc(p.x, p.y, p.r * .55, 0, 6.28); g.fill();
    }
  }
  g.globalAlpha = 1; requestAnimationFrame(loop);
})();

/* ---------- navigation ---------- */
let idx = 0, playing = false, timer, pre, cdTimer = null;
function go(id) {
  clearTimeout(timer); playing = false;
  $$(".ch").forEach(s => s.classList.toggle("on", s.id === id));
  const s = $("#" + id); amb(s.dataset.m); s.scrollTop = 0;
  if (id === "s-show") initShow();
}

/* ---------- countdown ---------- */
const bday = new Date(C.birthdayISO);
function tickCountdown() {
  const box = $("#cd");
  if (!box) return;
  const left = bday - Date.now();
  if (left <= 0) {
    box.innerHTML = `<p class="cd-today">${C.countdown.today}</p>`;
    clearInterval(cdTimer);
    return;
  }
  const s = Math.floor(left / 1000);
  const v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
  box.innerHTML = v.map((n, i) => `<span class="cd-u"><b>${pad(n)}</b><i>${C.countdown.labels[i]}</i></span>`).join("");
}

/* ---------- slideshow ---------- */
const N = C.photos.length;
const TILTS = ["-1.3deg", "-0.5deg", "1.1deg", "0.4deg", "-0.9deg", "1.4deg"];
const TAPES = ["rgba(190,115,129,.34)", "rgba(143,158,132,.36)", "rgba(188,149,88,.34)"];
const chOf = i => C.photos[i].chapter || (i < Math.ceil(N / 3) ? "A" : i < Math.ceil(2 * N / 3) ? "B" : "C");
const sched = () => { clearTimeout(timer); if (playing) timer = setTimeout(next, C.slideSeconds * 1000); };
const src = (p, e) => C.photoDir + p.file.replace(/\.\w+$/, "") + "." + C.extensions[e];

function show(i) {
  idx = i; const p = C.photos[i], pic = $("#pic"), ph = $("#ph"), pol = $("#pol");
  pol.style.setProperty("--tilt", TILTS[i % TILTS.length]);
  pol.style.setProperty("--tape", TAPES[i % TAPES.length]);
  pic.classList.remove("in"); ph.hidden = true; pic.hidden = false;
  pic.onload = () => requestAnimationFrame(() => pic.classList.add("in"));
  let e = 0;  // tries each extension before showing the placeholder
  pic.onerror = () => {
    if (++e < C.extensions.length) { pic.src = src(p, e); return; }
    pic.hidden = true; ph.hidden = false;
    ph.innerHTML = `<b>❤</b><p>Memory ${pad(i + 1)}<br><small>Add ${src(p, 0)}</small></p>`;
  };
  pic.alt = p.caption || `Memory ${i + 1}`;
  pic.src = src(p, 0);
  if (i + 1 < N) { pre = new Image(); pre.src = src(C.photos[i + 1], 0); }  // only one image preloaded
  const fallback = C.captionFallbacks[i % C.captionFallbacks.length];
  $("#cap").innerHTML = (p.caption || fallback) + (p.date ? `<small>${p.date}</small>` : "");
  $("#cnt").textContent = `${pad(i + 1)} / ${N}`;
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
  const H_ = C.hero, F = C.final;
  app.innerHTML = `
<section class="ch" id="s-open" data-m="petals"><div class="w">
  <p class="kicker fade" style="--d:.3s">${H_.kicker}</p>
  <h2 class="script fade" style="--d:.55s">${H_.script}</h2>
  <h1 class="fade" style="--d:.85s">${H_.name}</h1>
  <p class="datestamp fade" style="--d:1.15s">${H_.date}</p>
  <p class="lead fade" style="--d:1.35s">${H_.line}</p>
  <div class="fade" style="--d:1.6s"><button class="btn" data-go="s-cake">${H_.btn}</button></div>
  <div id="cd" class="cd fade" style="--d:1.85s" aria-live="polite"></div>
</div></section>

<section class="ch" id="s-cake" data-m="dust"><div class="w">
  <p class="kicker fade" style="--d:.2s">chapter one</p>
  <div class="art fade" style="--d:.35s">${cake}</div>
  <h1 class="fade" style="--d:.6s">${C.cake.title}</h1>
  <p class="lead fade" style="--d:.8s">${C.cake.text}</p>
  <p class="datestamp fade" style="--d:1s">${C.birthday}</p>
  <div id="cw" class="wish-slip fade" style="--d:.35s" hidden>${C.cake.wish}</div>
  <div class="fade" style="--d:1.2s">
    <button class="btn" id="wishBtn">${C.cake.wishBtn}</button>
    <button class="btn ghost" id="cakeNext" data-go="s-letter" hidden>${C.cake.next}</button>
  </div>
</div></section>

<section class="ch" id="s-letter" data-m="dust"><div class="w">
  <div id="envBox">
    <p class="kicker">a letter for you</p>
    <h1 class="fade" style="--d:.2s">${C.letter.title}</h1>
    <div class="env-wrap"><div class="env" id="env"><div class="flap"></div><span class="seal" aria-hidden="true">❤</span></div></div>
    <button class="btn" id="openEnv">${C.letter.btn}</button>
  </div>
  <div hidden id="paperBox"><div class="paper">${C.letter.body}</div><button class="btn ghost" data-go="s-show">${C.letter.next}</button></div>
</div></section>

<section class="ch" id="s-show" data-m="dust"><div class="w">
  <div id="intro"><p class="kicker">the album</p><h1>${C.show.title}</h1><p class="lead">${C.show.subtitle}</p><button class="btn" id="start">${C.show.start}</button></div>
  <div id="inter" hidden><h2 id="it"></h2><button class="btn" id="ib">${C.show.continue}</button></div>
  <div id="player" hidden>
    <p id="chl"></p>
    <div id="stage"><div class="polaroid" id="pol"><span class="tape" aria-hidden="true"></span>
      <img id="pic" alt="" decoding="async">
      <div id="ph" class="pola-ph" hidden></div>
      <div class="pola-cap"><p id="cap"></p><p id="cnt"></p></div>
    </div></div>
    <div id="bar"><i id="fill"></i></div>
    <div class="controls">
      <button class="btn ghost" id="pv">◀ Back</button><button class="btn" id="pp">▶ Play</button><button class="btn ghost" id="nx">Next ▶</button>
      <button class="btn ghost" id="fs">⛶ Full screen</button><button class="btn ghost" id="rs">↺ Start over</button>
    </div>
  </div>
</div></section>

<section class="ch" id="s-cards" data-m="dust"><div class="w">
  <p class="kicker">a little list</p>
  <h1>${C.cardsTitle}</h1>
  <div class="cards">${C.cards.map((t, i) => `<div class="card" style="--i:${i}">${t}</div>`).join("")}</div>
  <button class="btn ghost" data-go="s-wishes">${C.cardsNext}</button>
</div></section>

<section class="ch" id="s-wishes" data-m="stars"><div class="w">
  <p class="kicker">six wishes</p>
  <h2>${C.wishesTitle}</h2><div id="wt" aria-live="polite"></div>
  <button class="btn" id="wb">${C.wishesBtn}</button>
</div></section>

<section class="ch" id="s-final" data-m="petals"><div class="w" id="scene">
  <p class="kicker">one last thing</p>
  <h2>${F.intro}</h2><div class="art" style="width:min(160px,42vw)">${gift}</div>
  <button class="btn" id="og">${F.btn}</button>
</div>
<div id="fin"><div class="w"><div class="sheet">
  ${F.lines.map((t, i) => `<p class="l fade" style="--d:${.4 + i * 2.6}s">${t}</p>`).join("")}
  <div class="heart fade" style="--d:${.6 + F.lines.length * 2.6}s" aria-hidden="true">❤</div>
  <h1 class="fade" style="--d:${1 + F.lines.length * 2.6}s">${F.title}</h1>
  <h2 class="fade" style="--d:${2.4 + F.lines.length * 2.6}s">${F.end}</h2>
  <button class="btn ghost fade" id="rp" style="--d:${3.6 + F.lines.length * 2.6}s">${F.replay}</button>
</div></div></div></section>`;

  /* candles */
  $("#wishBtn").onclick = () => {
    $("#s-cake").classList.add("out"); $("#cw").hidden = false; $("#cakeNext").hidden = false; $("#wishBtn").hidden = true;
    if (!RM) burst(80); $("#cakeNext").focus();
  };
  /* envelope */
  $("#openEnv").onclick = () => {
    $("#env").classList.add("open"); $("#openEnv").hidden = true; if (!RM) burst(30);
    setTimeout(() => { $("#envBox").hidden = true; $("#paperBox").hidden = false; }, RM ? 0 : 1300);
  };
  /* album */
  $("#start").onclick = () => { $("#intro").hidden = true; $("#player").hidden = false; show(0); };
  $("#nx").onclick = next; $("#pv").onclick = prev; $("#pp").onclick = () => play(!playing);
  $("#rs").onclick = () => { play(false); show(0); };
  $("#fs").onclick = () => document.fullscreenElement ? document.exitFullscreen() : ($("#stage").requestFullscreen || (() => {})).call($("#stage"));
  /* wishes */
  let wi = 0;
  $("#wb").onclick = () => {
    if (wi >= C.wishes.length) return go("s-final");
    const slip = document.createElement("div");
    slip.className = "wish-slip fade";
    slip.style.setProperty("--d", "0s");
    slip.textContent = C.wishes[wi++];
    $("#wt").replaceChildren(slip);
    $("#wb").textContent = wi >= C.wishes.length ? C.wishesDone : C.wishesMore;
  };
  /* final gift */
  $("#og").onclick = () => {
    $("#scene").classList.add("open"); $("#og").hidden = true; if (!RM) burst(160);
    setTimeout(() => { $("#fin").classList.add("on"); $("#fin").scrollTop = 0; }, RM ? 0 : 1500);
  };
  $("#rp").onclick = () => { build(); go("s-open"); };

  clearInterval(cdTimer); tickCountdown(); cdTimer = setInterval(tickCountdown, 1000);
}

/* ---------- music (only on explicit click) ---------- */
const au = new Audio(); au.loop = true; au.preload = "none"; au.volume = C.music.volume; if (C.music.file) au.src = C.music.file;
const mb = $("#mus"), label = (on, t) => {
  mb.textContent = t || (on ? "♪ Music on" : "♪ Music off");
  mb.setAttribute("aria-pressed", on);
};
mb.onclick = () => {
  if (!au.paused) { au.pause(); return label(false); }
  if (!C.music.file) return label(false, "♪ No song yet");
  au.play().then(() => label(true)).catch(() => { label(false, "♪ Music not found"); setTimeout(() => label(false), 3000); });
};

app.onclick = e => { const b = e.target.closest("[data-go]"); if (b) go(b.dataset.go); };
build(); go("s-open");
})();
