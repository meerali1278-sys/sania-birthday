// ===== EDIT EVERYTHING HERE =====
window.CONFIG = (() => {
  const wife = "Sania", husband = "Muhammad Ali";
  const pad = n => String(n).padStart(2, "0");

  // Optional per-photo details. Keys are photo numbers 1–70.
  // Example: 7: { caption: "Our favorite evening", date: "June 2023", chapter: "A" }
  const details = {
  };

  return {
    wife, husband,
    birthday: "November 4, 2026",
    slideSeconds: 5,
    photoDir: "photos/",
    extensions: ["jpg", "webp", "jpeg", "png"],   // file types the site will look for
    music: { file: "music/song.mp3", volume: 0.4 },   // put your mp3 in /music, or set file: ""

    opening: [
      "Someone Special Was Born...",
      "And Someone Very Special Became My World. ❤️",
      `Happy Birthday, ${wife} 👑`,
      "I created something beautiful for you, filled with memories, feelings, and a little piece of my heart.",
      "Begin Your Surprise ❤️"
    ],

    cake: {
      title: "Happy Birthday, My Queen",
      text: `Today is your day, ${wife}. A day to celebrate your beautiful existence and all the happiness you deserve.`,
      wishBtn: "Make a Wish ✨",
      wish: "May every beautiful dream in your heart find its way into reality.",
      next: "Continue Our Story"
    },

    letter: {
      title: "A Little Letter, Written Just for You 💌",
      btn: "Open My Heart",
      next: "Continue",
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
      title: "70 Memories. One Beautiful Story. ❤️",
      subtitle: "Every picture holds a moment. Every moment holds a feeling.",
      start: "Begin the Story",
      continue: "Continue"
    },
    chapters: {
      A: { title: "Every Picture Has a Story ❤️", after: "And these are only the beginning of our beautiful memories..." },
      B: { title: "Little Moments, Beautiful Memories 🌹", after: "Some moments become memories. Some memories become priceless." },
      C: { title: "70 Memories, One Special Person 👑", after: "Seventy pictures, but not enough to describe how special you are. ❤️" }
    },
    // photo-01.jpg ... photo-70.jpg (chapter A: 1–24, B: 25–47, C: 48–70 unless overridden)
    photos: Array.from({ length: 70 }, (_, i) =>
      Object.assign({ file: `photo-${pad(i + 1)}.jpg`, caption: "", date: "", chapter: "" }, details[i + 1])),

    cardsTitle: "Ten Things That Make You Special",
    cardsNext: "Continue",
    cards: [
      "Your beautiful smile.", "Your kind heart.", "The happiness you deserve.", "Your unique personality.",
      "Your strength and courage.", "The dreams you carry.", "The little things that make you special.",
      "The beautiful memories we share.", "The person you continue to become.", `Simply being you, ${wife}. ❤️`
    ],

    wishesTitle: "Wishes for Your Future",
    wishesBtn: "Reveal a wish ✨", wishesMore: "Next wish ✨", wishesDone: "Continue",
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
      replay: "Replay Our Story"
    }
  };
})();
