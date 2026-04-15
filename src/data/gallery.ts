export type GalleryMedia = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
  objectPosition?: string;
};

export type Sketch = {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  note: string;
  image: string;
  tech: string[];
  codeUsed: string[];
  uiux: string[];
  buildSummary: string;
  visualIntent: string;
  detailLayout?: "default" | "museum_frame";
  heroMedia?: GalleryMedia;
  sideMedia?: GalleryMedia;
};

export const sketches: Sketch[] = [
  {
    id: "glass-blocks",
    title: "Glass Blocks",
    artist: "Marcus Mdluli",
    year: "2025",
    medium: "Three.js / WebGL / Motion",
    note: "Atmosphere, glass density, reflected light, and subtle red tension.",
    image: "/images/gallery/sketch-1.jpg",
    tech: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "Framer Motion",
      "Tailwind CSS",
    ],
    codeUsed: [
      "Custom 3D scene composition",
      "Animated transforms and lighting control",
      "Motion-driven reveal timing",
      "Responsive stage sizing",
    ],
    uiux: [
      "Built to feel cinematic and controlled",
      "Negative space used to increase focus",
      "Motion used to support hierarchy, not distract",
      "Red accent reserved for emphasis and interaction",
    ],
    buildSummary:
      "This piece explores atmosphere through structure. The code focused on depth, layering, and restrained motion so the visual could feel premium rather than overloaded.",
    visualIntent:
      "The goal was to create a piece that feels architectural, technical, and calm at the same time.",
  },
  {
    id: "museum-frame",
    title: "Museum Frame",
    artist: "Marcus Mdluli",
    year: "2025",
    medium: "Editorial Layout / Motion",
    note: "A framing study built around negative space and cinematic pacing.",
    image: "/images/gallery/image.png",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    codeUsed: [
      "Editorial grid system",
      "Layered reveal choreography",
      "Mask-based image framing",
      "Responsive type and composition logic",
    ],
    uiux: [
      "Structured like an exhibition surface",
      "Typography carries navigation weight",
      "Spacing designed to feel curated, not generic",
      "Interaction kept subtle to preserve calm",
    ],
    buildSummary:
      "This concept was built as a digital exhibition layout. The structure, spacing, and motion were treated like part of the storytelling rather than decoration added afterwards.",
    visualIntent:
      "The page is meant to feel like an art plate translated into code: quiet, refined, and full of controlled detail.",
    detailLayout: "museum_frame",
    heroMedia: {
      kind: "image",
      src: "/images/gallery/sketch-2.jpg",
      alt: "Museum Frame hero view",
      objectPosition: "center center",
    },
    sideMedia: {
      kind: "image",
      src: "/images/gallery/sketch-2.jpg",
      alt: "Museum Frame detail view",
      objectPosition: "72% center",
    },
  },
  {
    id: "red-wall",
    title: "Red Wall",
    artist: "Marcus Mdluli",
    year: "2025",
    medium: "Creative Direction / Frontend",
    note: "A dense gallery composition focused on richness, curation, and rhythm.",
    image: "/images/gallery/sketch-3.jpg",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    codeUsed: [
      "Compositional layering",
      "Visual rhythm through repeated frames",
      "Accent-led focal hierarchy",
      "Responsive image balance",
    ],
    uiux: [
      "Designed to feel rich without becoming cluttered",
      "The eye is guided by contrast and repetition",
      "Visual density used as a storytelling tool",
      "The interface still remains readable and ordered",
    ],
    buildSummary:
      "This sketch tests how much visual richness a layout can hold while still feeling intentional. It is a study in curation and restraint.",
    visualIntent:
      "The aim was to make the work feel expressive and memorable, but still structurally clear.",
  },
  {
    id: "portrait-study",
    title: "Portrait Study",
    artist: "Marcus Mdluli",
    year: "2024",
    medium: "Image Rhythm / UI System",
    note: "A study in crop, spacing, and collectible visual tension.",
    image: "/images/gallery/sketch-6.jpg",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    codeUsed: [
      "Portrait crop system",
      "Card rhythm and spacing logic",
      "Responsive layout behavior",
      "Micro-interaction layering",
    ],
    uiux: [
      "Portrait crops used to increase personality",
      "Spacing used as much as image itself",
      "Every image is treated like an object in a collection",
      "Small movements create life without noise",
    ],
    buildSummary:
      "This was built as a visual rhythm exercise, focusing on how layout can create value before motion or copy even appears.",
    visualIntent:
      "The piece is intended to feel collectible and refined rather than simply functional.",
  },
  {
    id: "motion-study",
    title: "Motion Study",
    artist: "Marcus Mdluli",
    year: "2024",
    medium: "Framer Motion / Scroll",
    note: "A quiet movement study focused on detail rather than spectacle.",
    image: "/images/gallery/sketch-4.jpg",
    tech: ["Next.js", "TypeScript", "Framer Motion"],
    codeUsed: [
      "Scroll-linked transitions",
      "Directional state changes",
      "Animated counters",
      "Staged image transitions",
    ],
    uiux: [
      "Motion used to confirm state change",
      "Animation timing aligned with interaction rhythm",
      "Reduced clutter keeps attention on transition quality",
      "Every change is meant to feel intentional",
    ],
    buildSummary:
      "This study focused on transition behavior. Instead of flashy animation, the goal was cohesion, timing, and emotional polish.",
    visualIntent:
      "The visual result is meant to feel composed, restrained, and crafted with attention to detail.",
  },
];

export function getSketchById(id: string) {
  return sketches.find((item) => item.id === id);
}
