export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  blurb: string;
  image: string;
  rotate: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: "kage",
    index: "01",
    title: "Kage",
    category: "Concept Website",
    blurb: "A full concept site for Kage, an anime-style co-op action roguelite, designed and built entirely on spec and sent directly to the studio behind the game — unsolicited, not commissioned. They haven't picked it up yet, but the site is live and built to be explored in full, not just screenshotted.",
    image: "/images/projects/KageOG.jpg",
    rotate: "rotate-1",
    link: "https://kage-liart.vercel.app/",
  },
  {
    id: "goku",
    index: "02",
    title: "The Challenger",
    category: "Character Art / Poster",
    blurb: "Fan art built around Goku, the hero of Akira Toriyama's Dragon Ball. Layered type, traditional pattern work, and a bold color palette turn the character into a full poster composition. Goku and the Dragon Ball universe belong to Akira Toriyama — this piece is a tribute, not an original character.",
    image: "/images/projects/DragonBallGFX.webp",
    rotate: "-rotate-3",
  },
  {
    id: "eye-heart",
    index: "03",
    title: "Love At First Sight",
    category: "Digital Illustration",
    blurb: "An original halftone study, built from scratch — a single eye rendered in stark black and white, with a heart standing in for the pupil. Minimal and graphic, with the concept doing most of the talking.",
    image: "/images/projects/EyeHeartGFX.png",
    rotate: "rotate-2",
  },
  {
    id: "falling-into-eye",
    index: "04",
    title: "Losing Focus",
    category: "Digital Illustration",
    blurb: "An original piece — a portrait pushed through halftone and noise until it starts to break apart. Grain and a blown-out red spark in the pupil give it a glitchy, off-balance feel, like the moment right before you look away.",
    image: "/images/projects/FallingintoEyeGFX.png",
    rotate: "-rotate-2",
  },
  {
    id: "gatsu",
    index: "05",
    title: "The Black Swordsman",
    category: "Poster Design",
    blurb: "An editorial-style poster built around Guts, the Black Swordsman from Kentaro Miura's Berserk. Manga panels, bold masthead type, and a pulled quote come together in a layout meant to feel like a magazine spread. Guts and the Berserk universe are the creation of Kentaro Miura — this piece is fan art made in tribute to the series.",
    image: "/images/projects/GATSUUv2.webp",
    rotate: "rotate-3",
  },
  {
    id: "veil",
    index: "06",
    title: "Veil",
    category: "Brand Identity / App",
    blurb: "An original brand identity for Veil, a reminder app concept — mark, name, color, and tone all designed from scratch to feel friendly rather than naggy. The bell mascot does double duty as a logo and as the personality for the whole product.",
    image: "/images/projects/ReminderBot.webp",
    rotate: "-rotate-1",
  },
];
