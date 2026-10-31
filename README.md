# 70 Memories, One Love — Sania ❤️

A cinematic birthday website: plain HTML, CSS and JavaScript. No backend, no build step, works on GitHub Pages.

```
index.html  style.css  script.js  config.js  README.md
photos/   <- your 70 images
music/    <- optional song
```

## 1. Add the 70 photographs
1. Name them `1.jpg`, `2.jpg` … `70.jpg`. (JPG, WebP, JPEG and PNG all work. Just keep the same name pattern — `1.webp` is fine too.)
2. Put them in the `photos/` folder.
3. Phone photos are often 3–8 MB, which is slow. Resize them first (about 1600 px on the long side, under 500 KB each). Free tool: https://squoosh.app (keep JPG, or choose WebP).

Missing photos show a placeholder, so you can add them gradually. Only the current and next photo are loaded at any time.
Chapters: A = 1–24, B = 25–47, C = 48–70.

Captions, dates and chapters are optional. In `config.js`, fill in `details`:
```js
const details = {
  7: { caption: "Your own words here", date: "Your date here" },
};
```
Nothing is invented. Anything you leave empty is simply not shown.

## 2. Edit the messages
Open `config.js`. Names, birthday, the letter, the ten cards, the wishes and the final message are all there. Save and refresh.

## 3. Add background music (optional)
Copy a song you have the right to use to `music/song.mp3` (or change `music.file` in `config.js` to whatever you named it). Music never starts by itself: the visitor taps the **♪ Music** button.

## 4. The J.A.R.V.I.S. touch (optional)
The site has a quiet assistant flavour: a small `J.A.R.V.I.S. online — one very important message` line above the
opening, and a faint status label in the bottom-left corner that reads `mission complete` at the very end.
No audio, nothing sci-fi, it uses the same gold and rose colours as the rest.

Edit or switch it off in `config.js`:
```js
jarvis: { enabled: false, boot: "...", hud: "...", hudFinal: "..." }
```

## 5. Test locally
Double-click `index.html`, or for the most accurate test run this in the project folder and open http://localhost:8000
```
python3 -m http.server 8000
```
Keys in the slideshow: ← → move, Space plays/pauses, F is full screen.

## 6. Upload to GitHub
1. Create a free account at github.com and click **New repository** (name it e.g. `sania-birthday`, Public).
2. Click **uploading an existing file**, drag in everything in this folder (including `photos` and `music`), then **Commit changes**.
   For 70 images in a browser upload, add them in a few batches (GitHub limits ~100 files per upload).

## 7. Enable GitHub Pages
This repo ships a workflow at `.github/workflows/main.yml` that publishes the site every time `main` changes.
Repository **Settings → Pages → Build and deployment → Source: GitHub Actions** (not "Deploy from a branch"), then push to `main`.
Watch it under the **Actions** tab; when the *Deploy site to GitHub Pages* run goes green your site is at `https://YOUR-USERNAME.github.io/sania-birthday/`.
Prefer the classic setup instead? Choose **Source: Deploy from a branch → Branch: `main`, folder `/ (root)`** and the workflow is simply not needed.

## 8. Test on a phone
Open that link on your phone (or scan it as a QR code). Check: opening animation, music button, each chapter, swiping through photos with the buttons, full screen, and the final gift. If an update doesn't appear, refresh twice.
