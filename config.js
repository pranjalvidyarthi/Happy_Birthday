/**
 * ✨ EDIT THIS FILE to customize the birthday greeting! ✨
 *
 * This is the ONLY file you need to modify.
 * No need to touch HTML, CSS, or any other JavaScript files.
 */

const CONFIG = {
  // ── Recipient Info ────────────────────────────────────────────
  name: "<strong>kavita</strong>",
  // photos: [
  //   "./Photos-1-001/img01.jpg",
  //   "./Photos-1-001/img02.jpg",
  //   "./Photos-1-001/img03.jpg",
  //   "./Photos-1-001/img04.jpg",
  //   "./Photos-1-001/img05.jpg",
  //   "./Photos-1-001/img06.jpg",
  // ],
  music: "./music/hbd01.mp3",

  // ── Theme Colors ──────────────────────────────────────────────
  colors: {
    primary: "#f472b6",
    accent: "#60a5fa",

    dark: {
      background: "#0f172a",
      text: "#f1f5f9",
    },

    light: {
      background: "#fafaf9",
      text: "#1e293b",
    },
  },

  // ── Default Color Mode ────────────────────────────────────────
  defaultMode: "dark",

  // ── Sections ──────────────────────────────────────────────────
  sections: [
    {
      type: "greeting",
      title: "Hi",
      subtitle: "I really like your name btw!",
    },

    {
      type: "countdown",
      from: 3,
      goText: "🎉",
    },

    {
      type: "announcement",
      text: "It's your birthday!! :D",
    },

    {
      type: "chatbox",
      message:
        "Happy birthday to youu!! Wishing you a wonderful year ahead filled with joy, love, and endless happiness!",
      buttonText: "Send",
    },

    {
      type: "ideas",
      lines: [
        "That's what I was going to do.",
        "But then I stopped.",
        "I realised, I wanted to do something <strong>special</strong>.",
        "Because,",
        "You are Special <span>:)</span>",
      ],
      bigLetters: "SO",
    },

    {
      type: "quote",
      text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
      author: "~ Someone Famous",
    },

    {
      type: "stars",
      count: 40,
    },

    {
      type: "balloons",
      count: 25,
    },

    {
      type: "profile",
      wishTitle: "Happy Birthday!",
      wishText: "May the js.prototypes always be with you! ;)",
      wishText: "Keep smiling, keep being your cute self, and please don’t ever change. 🫶🏻",
    },

    {
      type: "fireworks",
      count: 24,
    },

    {
      type: "confetti",
      count: 9,
    },


    {
      type: "announcement",
      count: 5,
      text: "Created with ❣️ by The Creative Coder ~ Pranjal "
    },

    {
      type: "closing",

      // Main closing message
      text: "Okay, now come back and tell me if you liked it.",

      // Replay message
      replayText: "Or click, if you want to watch it again.",

    },
  ],
};