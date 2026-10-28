// ===== EDIT EVERYTHING HERE =====
window.CONFIG = (() => {
  const wife = "Sania", husband = "Muhammad Ali";

  // Optional per-photo details. Keys are photo numbers 1–70.
  // Example: 7: { caption: "The evening we laughed till we cried", date: "June 2023" }
  const details = {
  };

  return {
    wife, husband,
    birthday: "November 4, 2026",
    // Used for the live countdown on the opening page.
    birthdayISO: "2026-11-04T00:00:00",
    countdown: {
      title: "Only a few days until your day",
      today: "Today is the day. Happy Birthday, my love. ❤️",
      labels: ["days", "hours", "minutes", "seconds"]
    },
    slideSeconds: 6,
    // Shown under a photo when you haven't written a caption for it.
    captionFallbacks: [
      "one of my favourites", "just us", "this one makes me smile", "keep this one",
      "look at you", "my favourite person", "a moment I'd live again"
    ],
    photoDir: "photos/",
    extensions: ["jpg", "webp", "jpeg", "png"],   // file types the site will look for
    music: { file: "music/song.mp3", volume: 0.4 },   // put your song in /music, or set file: ""

    // ---- the cover of the album ----
    hero: {
      kicker: "for my beloved wife",
      script: "Happy Birthday,",
      name: wife,
      line: "Someone very special was born on this day — and ever since, the world has been softer, warmer, and so much more beautiful.",
      date: "04 · 11 · 2026",
      btn: "Open Our Album"
    },

    cake: {
      title: "Make a Wish, My Love",
      text: `Today is your day, ${wife}. A day to celebrate your beautiful existence and all the happiness you deserve.`,
      wishBtn: "Blow the candles ✨",
      wish: "May every beautiful dream in your heart find its way into reality.",
      next: "Turn the page"
    },

    letter: {
      title: "A letter I wrote for you",
      btn: "Unfold the letter",
      next: "Turn the page",
      body: `My Dearest ${wife},

Happy Birthday to the woman who holds such a special place in my heart.

Sometimes, the most beautiful feelings are the hardest to explain in words. But today, I want you to know how much happiness you deserve.

Your smile, your personality, and the little things that make you who you are deserve to be celebrated.

I wish you peace in your heart, strength in difficult moments, success in your dreams, and countless beautiful reasons to smile.

May the coming year bring you wonderful experiences, unforgettable memories, and opportunities that make you proud of yourself.

I hope we continue making beautiful memories, supporting one another, laughing together, and discovering all the wonderful things life has waiting for us.

Today, I want you to feel appreciated, celebrated, and truly special.

Happy Birthday, my queen.

With all my heart,
${husband} ❤️`
    },

    show: {
      title: "Seventy photographs, one story",
      subtitle: "Flip through them slowly. Each one is a day I would happily live again.",
      start: "Start flipping",
      continue: "Next page"
    },
    chapters: {
      A: { title: "Chapter One · Where it all began", after: "And this is only the beginning of our beautiful memories..." },
      B: { title: "Chapter Two · The little moments", after: "Some moments become memories. Some memories become priceless." },
      C: { title: "Chapter Three · Still falling for you", after: "Seventy pictures, but not enough to describe how special you are. ❤️" }
    },
    // 1.jpg ... 70.jpg (chapter A: 1–24, B: 25–47, C: 48–70 unless overridden)
    photos: Array.from({ length: 70 }, (_, i) =>
      Object.assign({ file: `${i + 1}.jpg`, caption: "", date: "", chapter: "" }, details[i + 1])),

    cardsTitle: "Ten things I love about you",
    cardsNext: "Turn the page",
    cards: [
      "Your beautiful smile.", "Your kind heart.", "The happiness you deserve.", "Your unique personality.",
      "Your strength and courage.", "The dreams you carry.", "The little things that make you special.",
      "The beautiful memories we share.", "The person you continue to become.", `Simply being you, ${wife}. ❤️`
    ],

    wishesTitle: "Wishes tucked into your card",
    wishesBtn: "Unfold a wish ✨", wishesMore: "Another wish ✨", wishesDone: "Turn the page",
    wishes: [
      "I wish you happiness that stays.",
      "I wish you peace when life gets difficult.",
      "I wish you success in everything you pursue.",
      "I wish your dreams grow bigger and your confidence grows stronger.",
      "I wish you good health, beautiful experiences, and countless reasons to smile.",
      "May the coming year be filled with wonderful surprises and new beginnings."
    ],

    final: {
      intro: `${wife}, I Have One Last Surprise for You... ❤️`,
      btn: "Open Your Final Gift 🎁",
      lines: [
        "If I Could Give You One Thing in This World, It Would Be the Ability to See Yourself Through My Eyes.",
        "Then You Would Understand How Truly Special You Are.",
        "I Hope Your Life Is Filled With Happiness, Beautiful Opportunities, and Memories That Make You Smile for Years to Come.",
        `Happy Birthday, ${wife}.`,
        "You Deserve All the Beautiful Things This World Has to Offer.",
        `With Love,\n${husband} ❤️`
      ],
      title: "70 Memories. Countless Feelings. One Very Special You.",
      end: `Happy Birthday, ${wife}. ❤️`,
      replay: "Read it again"
    }
  };
})();
