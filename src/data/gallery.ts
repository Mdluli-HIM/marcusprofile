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
    id: "spotted",
    title: "SPOTTED",
    artist: "Marcus Mdluli",
    year: "2026",
    medium: "Social Discovery / Places Platform / Community UX",
    note: "A place-discovery prototype built around mood, storytelling, shared experiences, and social discovery.",
    image: "/images/work/spotted/image.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
    ],
    codeUsed: [
      "Story-led place discovery layout",
      "Mood-based browsing structure",
      "Place profile composition",
      "Community story and card logic",
    ],
    uiux: [
      "Built to feel warm, social, and local",
      "Discovery is shaped more like a visual story than a directory",
      "Places are presented to feel memorable, not just listed",
      "The interface balances utility with personality",
    ],
    buildSummary:
      "SPOTTED was designed as a social discovery platform for places, where people can find and share restaurants, cafés, nightlife, outdoor spots, and hidden gems through mood and real experiences. This prototype explores how place discovery can feel more human and more alive.",
    visualIntent:
      "The goal was to make city discovery feel youthful, social, and collectible — like finding cool places through people, not through boring listings.",
    detailLayout: "museum_frame",
    heroMedia: {
      kind: "image",
      src: "/images/work/spotted/image.png",
      alt: "SPOTTED hero interface",
      objectPosition: "center center",
    },
    sideMedia: {
      kind: "image",
      src: "/images/work/spotted/image copy 6.png",
      alt: "SPOTTED place profile detail",
      objectPosition: "center center",
    },
  },
  {
    id: "gymflow-admin",
    title: "GymFlow Admin",
    artist: "Marcus Mdluli",
    year: "2026",
    medium: "SaaS Dashboard / Gym Management / Operations UI",
    note: "A system prototype for members, subscriptions, payments, reminders, and check-ins.",
    image: "/images/gym/gymflow-admin.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
    ],
    codeUsed: [
      "Dashboard information hierarchy",
      "Membership state logic",
      "Check-in workflow handling",
      "Reports and reminder system structure",
    ],
    uiux: [
      "Built for quick reading and decision-making",
      "Status clarity is prioritized throughout",
      "Operational flows are designed to reduce confusion",
      "The interface stays clean while supporting heavy admin use",
    ],
    buildSummary:
      "GymFlow Admin was built as a practical management system for startup gyms that need better structure without expensive access-control hardware. The prototype focuses on payments, subscriptions, member states, check-ins, and admin reporting.",
    visualIntent:
      "The aim was to make the system feel dependable, clear, and sharp — a product that gives control instead of noise.",
    detailLayout: "museum_frame",
    heroMedia: {
      kind: "image",
      src: "/images/gym/gymflow-admin.png",
      alt: "GymFlow admin dashboard hero view",
      objectPosition: "center center",
    },
    sideMedia: {
      kind: "image",
      src: "/images/gym/gymflow-repo.png",
      alt: "GymFlow reports screen",
      objectPosition: "center center",
    },
  },
  {
    id: "south-side",
    title: "South Side",
    artist: "Marcus Mdluli",
    year: "2026",
    medium: "Fashion Website / Editorial Commerce / Motion Frontend",
    note: "A fashion-led prototype built around image weight, attitude, silence, and premium pacing.",
    image: "/images/work/south-side/hero.jpg",
    tech: ["Next.js", "TypeScript", "GSAP", "CSS"],
    codeUsed: [
      "Editorial layout pacing",
      "Image-led storytelling sections",
      "Cinematic page transitions",
      "Minimal navigation and product framing",
    ],
    uiux: [
      "Built to feel expressive and premium",
      "Imagery carries most of the emotion",
      "Motion is used for atmosphere, not noise",
      "The layout feels closer to fashion editorial than a normal shop",
    ],
    buildSummary:
      "South Side explores how a streetwear brand can live online with more editorial control and stronger visual identity. The prototype focuses on mood, product framing, and cinematic flow instead of generic e-commerce patterns.",
    visualIntent:
      "The goal was to make the brand feel cool, confident, and cinematic from the first frame.",
    detailLayout: "museum_frame",
    heroMedia: {
      kind: "image",
      src: "/images/work/south-side/hero.jpg",
      alt: "South Side hero layout",
      objectPosition: "center center",
    },
    sideMedia: {
      kind: "image",
      src: "/images/work/south-side/image copy.png",
      alt: "South Side editorial detail",
      objectPosition: "center center",
    },
  },
  {
    id: "cocofizz",
    title: "CocoFizz",
    artist: "Marcus Mdluli",
    year: "2026",
    medium: "Restaurant Website / Hospitality Branding / Motion",
    note: "A premium fast-food concept shaped through appetite, typography, warmth, and brand rhythm.",
    image: "/images/work/cocofizz/hero.jpg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    codeUsed: [
      "Hospitality-led visual pacing",
      "Food-first hierarchy",
      "Typography-driven section design",
      "Motion timing for brand energy",
    ],
    uiux: [
      "Designed to feel elevated but still playful",
      "Food visuals remain central",
      "The experience feels more boutique than template-based",
      "Motion supports appetite and flow without becoming loud",
    ],
    buildSummary:
      "CocoFizz takes a fast-food idea and gives it a more premium hospitality direction. The prototype focuses on appetite, brand recall, and a visual identity that feels more memorable than a standard restaurant site.",
    visualIntent:
      "The goal was to make the experience feel modern, rich, and slightly unexpected for the category.",
    heroMedia: {
      kind: "image",
      src: "/images/work/cocofizz/hero.jpg",
      alt: "CocoFizz hero composition",
      objectPosition: "center center",
    },
    sideMedia: {
      kind: "image",
      src: "/images/work/cocofizz/overview.jpg",
      alt: "CocoFizz hospitality detail",
      objectPosition: "center center",
    },
  },
  {
    id: "noir-faces",
    title: "Noir Faces",
    artist: "Marcus Mdluli",
    year: "2026",
    medium: "Editorial Photography / Portfolio Experience / Visual Study",
    note: "A monochrome editorial piece focused on mood, silence, contrast, and emotional restraint.",
    image: "/images/work/noir-faces/hero.jpg",
    tech: ["Next.js", "TypeScript", "GSAP", "Lenis"],
    codeUsed: [
      "Gallery-led sequencing",
      "Minimal interface treatment",
      "Editorial image storytelling",
      "Monochrome hierarchy and pacing",
    ],
    uiux: [
      "The imagery is given room to breathe",
      "Typography stays restrained to protect mood",
      "Spacing is treated as part of the emotional tone",
      "The page feels cinematic rather than content-heavy",
    ],
    buildSummary:
      "Noir Faces is a visual study built around emotional clarity and restraint. In this archive, it becomes a prototype for how imagery, rhythm, and frontend structure can create a premium digital experience on their own.",
    visualIntent:
      "The aim was to make the work feel intimate, timeless, and quietly expensive.",
    heroMedia: {
      kind: "image",
      src: "/images/work/noir-faces/hero.jpg",
      alt: "Noir Faces hero portrait",
      objectPosition: "center center",
    },
    sideMedia: {
      kind: "image",
      src: "/images/work/noir-faces/image.png",
      alt: "Noir Faces supporting visual",
      objectPosition: "center center",
    },
  },
  {
    id: "premium-cannabis-store",
    title: "Premium Cannabis Store",
    artist: "Marcus Mdluli",
    year: "2026",
    medium: "Retail Tech / E-Commerce / Full-Stack Platform",
    note: "A connected retail prototype built for storefront, admin, delivery, and operations.",
    image: "/images/cannabis/image copy 4.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Zustand",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
    ],
    codeUsed: [
      "Customer storefront and checkout flow",
      "Admin dashboard system design",
      "Driver portal workflow logic",
      "Inventory and delivery lifecycle handling",
    ],
    uiux: [
      "Built to support multiple user roles without losing consistency",
      "The interface stays sharp across customer, admin, and driver views",
      "Operational clarity and visual discipline work together",
      "The design feels premium while remaining usable in real workflows",
    ],
    buildSummary:
      "This prototype comes from the Premium Cannabis Store platform and focuses on connecting the full retail flow: browsing, cart, checkout, delivery management, inventory control, admin operations, and driver actions.",
    visualIntent:
      "The goal was to make a retail platform feel premium, structured, and fully alive across every side of the business.",
    detailLayout: "museum_frame",
    heroMedia: {
      kind: "image",
      src: "/images/cannabis/image copy 4.png",
      alt: "Premium Cannabis Store hero interface",
      objectPosition: "center center",
    },
    sideMedia: {
      kind: "image",
      src: "/images/cannabis/image copy 6.png",
      alt: "Premium Cannabis Store operations detail",
      objectPosition: "center center",
    },
  },
];

export function getSketchById(id: string) {
  return sketches.find((item) => item.id === id);
}
