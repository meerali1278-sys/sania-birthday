# Letters & Polaroids — for Sania ❤️

A birthday website styled like a handmade scrapbook: cream paper, washi tape, tilted
polaroids and handwritten notes. Plain HTML, CSS and JavaScript — no backend, no build
step, works on GitHub Pages.

The album runs in seven pages: **cover → cake → letter → 70 polaroids → ten things I love →
wishes → final letter**.

```
index.html  style.css  script.js  config.js  README.md
photos/         <- your 70 images
music/          <- optional song
favicon.svg     <- heart icon in the browser tab
og-image.jpg    <- the preview card shown when the link is shared
```

The cover also shows a **live countdown** to her birthday (from `birthdayISO` in
`config.js`), which turns into a "Today is the day" message once it arrives.

**The look** lives entirely in `style.css`, at the top in `:root` — five colours control
the whole album:

| Variable | Used for |
| --- | --- |
| `--paper` / `--paper-2` | cream page background |
| `--ink` / `--ink-soft` | body text and quiet text |
| `--rose` / `--rose-deep` | buttons, seals, captions |
| `--sage`, `--gold` | tape and card accents |

Fonts are Playfair Display (headings), Caveat (handwriting) and Karla (small text),
loaded from Google Fonts.

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
Open `config.js`. Everything is there: the cover wording (`hero`), the cake, the letter,
the ten cards, the wishes and the final message. Save and refresh.

Two optional extras:
- `captionFallbacks` — the short handwritten lines shown under a photo when you haven't
  written a real caption for it. Replace them with your own if you like.
- `details` — per-photo captions, e.g. `7: { caption: "The evening we laughed till we cried", date: "June 2023" }`.
  Real captions always beat the fallback lines.

## 3. Add background music (optional)
Copy a song you have the right to use to `music/song.mp3` (or change `music.file` in `config.js` to whatever you named it). Music never starts by itself: the visitor taps the **♪ Music** button.

## 4. Test locally
Double-click `index.html`, or for the most accurate test run this in the project folder and open http://localhost:8000
```
python3 -m http.server 8000
```
Keys in the album: ← → move, Space plays/pauses, F is full screen.

## 5. Upload to GitHub
1. Create a free account at github.com and click **New repository** (name it e.g. `sania-birthday`, Public).
2. Click **uploading an existing file**, drag in everything in this folder (including `photos` and `music`), then **Commit changes**.
   For 70 images in a browser upload, add them in a few batches (GitHub limits ~100 files per upload).

## 6. Enable GitHub Pages
This repo ships a workflow at `.github/workflows/main.yml` that publishes the site every time `main` changes.
Repository **Settings → Pages → Build and deployment → Source: GitHub Actions** (not "Deploy from a branch"), then push to `main`.
Watch it under the **Actions** tab; when the *Deploy site to GitHub Pages* run goes green your site is at `https://YOUR-USERNAME.github.io/sania-birthday/`.
Prefer the classic setup instead? Choose **Source: Deploy from a branch → Branch: `main`, folder `/ (root)`** and the workflow is simply not needed.

## 7. The link preview she will see
When you send the link on WhatsApp or iMessage, a card appears with `og-image.jpg`.

The full address is already filled in inside `index.html`:
```html
<meta property="og:image" content="https://meerali1278-sys.github.io/sania-birthday/og-image.jpg">
```
If the site ever moves to a new address, update that line (and the `twitter:image` one below it).
If a preview looks out of date after an edit, WhatsApp caches it for a while — add `?v=2` to the link when you resend.

## 8. Test on a phone
Open that link on your phone (or scan it as a QR code). Check: opening animation, music button, each chapter, swiping through photos with the buttons, full screen, and the final gift. If an update doesn't appear, refresh twice.
