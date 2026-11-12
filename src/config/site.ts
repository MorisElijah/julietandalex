export type MediaItem = {
  type: "image" | "video";
  path: string;
  alt: string;
  /** Short label (not shown on the page; kept for reference). */
  caption: string;
  /** Natural pixel size. Frames use w/h as their shape so the photo fits exactly — no cropping, no padding. */
  w: number;
  h: number;
  /** Wide/landscape shot: gets a full-width slot in galleries. */
  wide?: boolean;
};

/** Width ÷ height, used as a CSS aspect-ratio so each frame matches its photo. */
export const ratio = (m: MediaItem) => m.w / m.h;

export const site = {
  people: {
    juliet: {
      name: "Juliet",
      fullName: "Juliet Njambi Muthee",
      birthday: "November 10",
      age: 23,
      theme: "coral",
      traits: ["Radiant", "Fearless", "Warm-hearted", "Unforgettable"],
      headline: "A whole world of light, laughter & love.",
      note: "For every room you brighten, every laugh you start, and every little moment you make memorable — this chapter is yours."
    },
    alex: {
      name: "Alex",
      fullName: "Alex Maina Mugo",
      birthday: "November 13",
      age: 23,
      theme: "blue",
      traits: ["Bold", "Loyal", "Limitless", "Always laughing"],
      headline: "Built for big dreams, brave moves & the biggest laughs.",
      note: "Nobody loves a good laugh more than you — and that big, contagious laugh makes every room better. Keep laughing loud, keep chasing the things that make your eyes light up. The best parts of your story are still ahead."
    }
  },
  together: {
    headline: "Two birthdays. One unforgettable story.",
    caption: "Different energy. Same family magic."
  },
  beatrice: {
    name: "Aunt Beatrice",
    arrival: "Arriving today · 12 November",
    from: { code: "UK", city: "United Kingdom" },
    to: { code: "KE", city: "Kenya" },
    greeting: "Karibu nyumbani",
    note: "All the way from the UK to Kenya — and straight into the middle of birthday week! The house is warmer, the table is fuller and the stories are about to get so much better. We have missed your laugh, your hugs and that fearless, adventurous spirit. Karibu sana — we are so happy you are here.",
    pass: [
      { label: "Passenger", value: "Beatrice Wanjiru" },
      { label: "Class", value: "Family First" },
      { label: "Seat", value: "Right next to us" },
      { label: "Gate", value: "Home" }
    ],
    chips: ["The chai is ready", "Your seat is saved", "Hugs at arrivals", "Let the stories begin"],
    media: [
      { type: "image", path: "/media/beatrice/beatrice-02.jpeg", alt: "Aunt Beatrice laughing while climbing a bright yellow wall", caption: "Fearless enough to climb any wall.", w: 1125, h: 1455 },
      { type: "image", path: "/media/beatrice/beatrice-01.jpeg", alt: "Aunt Beatrice sharing a warm cuddle on a gold sofa", caption: "The warmest hugs are coming home.", w: 1125, h: 1381 },
      { type: "image", path: "/media/beatrice/beatrice-03.jpeg", alt: "Aunt Beatrice and the family laughing in front of a waterfall", caption: "Adventures with the whole crew.", w: 1125, h: 1442 }
    ] as MediaItem[]
  },
  lydia: {
    name: "Aunt Lydia",
    badge: "Coming soon",
    kicker: "Another birthday is on the way",
    note: "The celebrations aren't over yet! Aunt Lydia's birthday is just around the corner — so keep the cake ready, the songs warm and the hugs even warmer. Thank you for your faith, your kindness and the love you pour into all of us. We can't wait to celebrate you, Aunt Lydia.",
    chips: ["Cake loading…", "Songs warming up", "Hugs on standby"],
    media: [
      { type: "image", path: "/media/lydia/lydia-01.jpeg", alt: "Aunt Lydia in her blue Woman's Guild uniform holding a bouquet of roses", caption: "Blooming, always.", w: 1125, h: 1564 },
      { type: "image", path: "/media/lydia/lydia-02.jpeg", alt: "Aunt Lydia standing with family by a blue gate", caption: "Surrounded by family.", w: 1125, h: 826 },
      { type: "image", path: "/media/lydia/lydia-03.jpeg", alt: "Aunt Lydia with family in front of a stone wall", caption: "Love at every gate.", w: 1125, h: 1432 }
    ] as MediaItem[]
  },
  wishes: {
    title: "A little love",
    note: "Happy birthday, Juliet and Alex. I hope this next year brings you deep joy, ridiculous laughter, beautiful surprises, and the courage to keep becoming exactly who you are meant to be. I’m grateful for every memory, every argument we survived, every laugh, and every ordinary day that became a good story. Here’s to another year of life, love and becoming even more iconic.",
    wall: [
      "More laughter than you can count.",
      "Big dreams with even bigger memories.",
      "Good health, good people, good energy.",
      "May your next chapter surprise you beautifully.",
      "Keep being wonderfully, unmistakably you."
    ]
  },
  palette: {
    juliet: { coral: "#ff4f68", magenta: "#d81b86", cream: "#fff5f1" },
    alex: { blue: "#2166ff", teal: "#00c7b7", ice: "#eef9ff" },
    together: { gold: "#ffc857", sunset: "#ff7a59", violet: "#7b4dff" },
    ink: "#101018"
  },
  marquee: "HAPPY BIRTHDAY JULIET NJAMBI MUTHEE • HAPPY BIRTHDAY ALEX MAINA MUGO • ",
  music: {
    path: "/media/music/ndikhokhele.mp3",
    title: "Ndikhokhele",
    autoplay: true
  },
  media: [
    { type: "image", path: "/media/juliet/juliet-01.jpeg", alt: "Juliet smiling outdoors in a red outfit", caption: "Juliet — main character energy.", w: 508, h: 960 },
    { type: "image", path: "/media/juliet/juliet-04.jpeg", alt: "Juliet with red locs leaning on a wooden staircase railing", caption: "Lost in thought.", w: 1125, h: 1458 },
    { type: "image", path: "/media/juliet/juliet-02.jpeg", alt: "Juliet posing playfully in an Afro Sayari photo frame", caption: "A moment worth keeping.", w: 1125, h: 1387 },
    { type: "image", path: "/media/juliet/juliet-05.jpeg", alt: "Juliet walking a dirt road at sunset", caption: "Golden-hour Juliet.", w: 1125, h: 1465 },
    { type: "video", path: "/media/juliet/juliet-02.mp4", alt: "Juliet video", caption: "Juliet in motion.", w: 576, h: 1024 },

    { type: "image", path: "/media/alex/alex-01.jpeg", alt: "Alex standing outdoors beside a vehicle", caption: "Alex — made for the spotlight.", w: 932, h: 1600 },
    { type: "image", path: "/media/alex/alex-02.jpeg", alt: "Alex seated at a formal event wearing a suit and red tie", caption: "Another frame of the story.", w: 1125, h: 1145 },
    { type: "image", path: "/media/alex/alex-03.jpeg", alt: "Alex wearing a formal suit and tie", caption: "Good energy, always.", w: 1125, h: 1228 },
    { type: "video", path: "/media/alex/alex-01.mp4", alt: "Alex video", caption: "Alex in motion.", w: 480, h: 912 },

    { type: "image", path: "/media/together/together-02.jpeg", alt: "The family together at a graduation celebration", caption: "The two of you — and the whole crew.", w: 1125, h: 481, wide: true },
    { type: "image", path: "/media/together/together-03.jpeg", alt: "Black and white selfie of the siblings", caption: "Same family magic.", w: 1125, h: 1102 },
    { type: "image", path: "/media/together/together-04.jpeg", alt: "Laughing together on a walk with peace signs up", caption: "A memory in the making.", w: 730, h: 1600 },
    { type: "image", path: "/media/together/together-05.jpeg", alt: "The siblings in pyjamas and face masks outside a shop", caption: "Pyjama-squad era.", w: 1000, h: 1600 },
    { type: "image", path: "/media/together/together-06.jpeg", alt: "Doing each other's hair at home in the evening", caption: "Hair-braiding nights.", w: 1125, h: 1517 },
    { type: "video", path: "/media/together/together-07.mp4", alt: "The siblings walking together in pyjamas", caption: "Still the best crew.", w: 544, h: 1024 }
  ] as MediaItem[]
} as const;
