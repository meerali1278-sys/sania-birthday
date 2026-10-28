# 70 Memories, One Love — Sania ❤️

A cinematic birthday website: plain HTML, CSS and JavaScript. No backend, no build step, works on GitHub Pages.

```
index.html  style.css  script.js  config.js  README.md
photos/   <- your 70 images
music/    <- optional song
```

## 1. Add the 70 photographs
1. Name them `photos-01.jpg`, `photos-02.jpg` … `photos-70.jpg` (two-digit numbers, zero-padded). JPG, WebP, JPEG and PNG all work — just keep the same name pattern, so `photos-01.webp` is fine too.
2. Put them in the `photos/` folder.
3. Phone photos are often 3–8 MB, which is slow. Resize them first (about 1600 px on the long side, under 500 KB each). Free tool: https://squoosh.app (keep JPG, or choose WebP).

Missing photos show a placeholder, so you can add them gradually. Only the current and next photo are loaded at any time.
The site builds each filename from the photo number in `config.js` (`photos-01.jpg`, `photos-02.jpg`, …), so the names and the numbering must match exactly.
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

## 4. Test locally
Double-click `index.html`, or for the most accurate test run this in the project folder and open http://localhost:8000
```
python3 -m http.server 8000
```
Keys in the slideshow: ← → move, Space plays/pauses, F is full screen. On phones use the buttons or the story rail on the left edge.

## 4b. The motion style (reel-style upgrade)
The site is animated like a short cinematic reel, all in CSS + canvas, no libraries:
- **Story rail** on the left: 7 dots, one per chapter. Tap any dot to jump there.
- **Curtain wipe** between chapters: a rose-to-black panel sweeps up while the next chapter swaps underneath, so pages never just pop in.
- **Kinetic type**: headings and captions are split into words by `script.js` (any element marked `data-k`) and rise out of a mask one word at a time.
- **Cross-dissolve slideshow**: two stacked `<img>` layers (`#pic`, `#pic2`) fade into each other while a three-way Ken Burns move (zoom-in, zoom-out, diagonal pan) plays differently on every photo.
- **Reel progress**: 70 hairline segments across the top of the stage, like Instagram story bars, with the gold fill bar underneath.
- **Atmosphere**: drifting aurora blobs (hue shifts per chapter via the `--hue` variable in `script.js`), film-grain overlay, vignette, ambient dust/petals/stars on the canvas, floating gift and cake.
- **Micro-interactions**: sheen sweep across buttons, 3D card tilt on hover, parallax on the photo stage, letter unfolding from the envelope, soft 1.6 s volume fade on the music.

Everything above is switched off automatically for visitors with *reduce motion* enabled in their OS, and every animation is CSS-transform/opacity based so it stays smooth on phones.
Timings live in `style.css` (the `--sp` spring and `--ci` cinematic easing), chapter colours in the `HUE` map in `script.js`.

## 5. Upload to GitHub
1. Create a free account at github.com and click **New repository** (name it e.g. `sania-birthday`, Public).
2. Click **uploading an existing file**, drag in everything in this folder (including `photos` and `music`), then **Commit changes**.
   For 70 images in a browser upload, add them in a few batches (GitHub limits ~100 files per upload).

## 6. Enable GitHub Pages
This repo ships a workflow at `.github/workflows/main.yml` that publishes the site every time `main` changes.
Repository **Settings → Pages → Build and deployment → Source: GitHub Actions** (not "Deploy from a branch"), then push to `main`.
Watch it under the **Actions** tab; when the *Deploy site to GitHub Pages* run goes green your site is at `https://YOUR-USERNAME.github.io/sania-birthday/`.
Prefer the classic setup instead? Choose **Source: Deploy from a branch → Branch: `main`, folder `/ (root)`** and the workflow is simply not needed.

## 7. Test on a phone
Open that link on your phone (or scan it as a QR code). Check: opening animation, music button, each chapter, swiping through photos with the buttons, full screen, and the final gift. If an update doesn't appear, refresh twice.
