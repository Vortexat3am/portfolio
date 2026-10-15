export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  blurb: string;
  image: string;
  rotate: string;
  link?: string;
  imagePosition?: string;
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
    imagePosition: "8% center",
  },
  {
    id: "eye-heart",
    index: "02",
    title: "Love At First Sight",
    category: "Digital Illustration",
    blurb: "An original halftone study, built from scratch — a single eye rendered in stark black and white, with a heart standing in for the pupil. Minimal and graphic, with the concept doing most of the talking.",
    image: "/images/projects/EyeHeartGFX.png",
    rotate: "rotate-2",
  },
  {
    id: "falling-into-eye",
    index: "03",
    title: "Losing Focus",
    category: "Digital Illustration",
    blurb: "An original piece — a portrait pushed through halftone and noise until it starts to break apart. Grain and a blown-out red spark in the pupil give it a glitchy, off-balance feel, like the moment right before you look away.",
    image: "/images/projects/FallingintoEyeGFX.png",
    rotate: "-rotate-2",
  },
  {
    id: "veil",
    index: "04",
    title: "Veil",
    category: "Brand Identity / App",
    blurb: "An original brand identity for Veil, a reminder app concept — mark, name, color, and tone all designed from scratch to feel friendly rather than naggy. The bell mascot does double duty as a logo and as the personality for the whole product.",
    image: "/images/projects/ReminderBot.webp",
    rotate: "-rotate-1",
    imagePosition: "15% center",
  },
];
