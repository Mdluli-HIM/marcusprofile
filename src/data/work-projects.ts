export type FilterKey =
  | "All"
  | "Brand"
  | "Marketing"
  | "Motion"
  | "Portfolio"
  | "Fashion"
  | "E-commerce"
  | "Branding"
  | "Editorial"
  | "Portraits"
  | "Photography"
  | "Luxury"
  | "Craft"
  | "Restaurant"
  | "Hospitality";

export type WorkProject = {
  id: number;
  slug: string;
  title: string;
  meta: string;
  image: string;
  thumb: string;
  alt: string;
  tags: FilterKey[];
  liveUrl: string;
  caseStudy: {
    ghostTitle: string;
    heroImage: string;
    overviewImage: string;
    challengeImage: string;
    galleryImages: string[];
    introHeading: string;
    introBody: string[];
    challengeHeading: string;
    challengeBody: string[];
    outcomeHeading: string;
    outcomeBody: string[];
    details: Array<{
      label: string;
      value: string;
    }>;
  };
};

export const filterMenuItems: { key: FilterKey; label: string }[] = [
  { key: "All", label: "[ALL]" },
  { key: "Brand", label: "[AGENCY WEBSITE]" },
  { key: "Motion", label: "[ANIMATIONS]" },
  { key: "Marketing", label: "[MARKETING SITE]" },
  { key: "Portfolio", label: "[PORTFOLIO]" },
  { key: "Fashion", label: "[FASHION]" },
  { key: "E-commerce", label: "[E-COMMERCE]" },
  { key: "Branding", label: "[BRANDING]" },
  { key: "Editorial", label: "[EDITORIAL]" },
  { key: "Portraits", label: "[PORTRAITS]" },
  { key: "Photography", label: "[PHOTOGRAPHY]" },
  { key: "Luxury", label: "[LUXURY]" },
  { key: "Craft", label: "[CRAFT]" },
  { key: "Restaurant", label: "[RESTAURANT]" },
  { key: "Hospitality", label: "[HOSPITALITY]" },
];

export const projects: WorkProject[] = [
  {
    id: 1,
    slug: "noir-faces",
    title: "NOIR FACES",
    meta: "[EDITORIAL] — [PHOTOGRAPHY]",
    image: "/images/work/noir-faces/hero.jpg",
    thumb: "/images/work/noir-faces/thumb.jpg",
    alt: "Noir Faces editorial photography preview",
    tags: ["Editorial", "Portraits", "Photography"],
    liveUrl: "https://highendvisuals.vercel.app/work/noir-faces",

    caseStudy: {
      ghostTitle: "NOIR FACES",

      heroImage: "/images/work/noir-faces/hero.jpg",

      overviewImage: "/images/work/noir-faces/overview.jpg",

      challengeImage: "/images/work/noir-faces/challenge.jpg",

      galleryImages: [
        "/images/work/noir-faces/gallery-1.jpg",
        "/images/work/noir-faces/gallery-2.jpg",
        "/images/work/noir-faces/gallery-3.jpg",
        "/images/work/noir-faces/gallery-4.jpg",
      ],

      introHeading: "A monochrome portrait study shaped through mood.",
      introBody: [
        "Noir Faces was created as a cinematic editorial photography series focused on atmosphere, silence, and emotional intensity.",
        "The visual direction leaned heavily into monochrome contrast, negative space, and subtle texture to create imagery that feels timeless and tactile.",
      ],

      challengeHeading: "Creating emotional depth through restraint.",
      challengeBody: [
        "The challenge was building a photography experience that felt luxurious and emotionally heavy without relying on excessive visual effects.",
        "Every frame needed to feel deliberate while still allowing the subject’s expression and movement to remain the central focus.",
      ],

      outcomeHeading: "A cleaner and more cinematic visual identity.",
      outcomeBody: [
        "The final result became a refined editorial series that balances elegance with intimacy.",
        "The project established a stronger visual language for the studio through monochrome storytelling, slower pacing, and gallery-led presentation.",
      ],

      details: [
        {
          label: "Timeline",
          value: "4 Months",
        },
        {
          label: "Category",
          value: "Editorial / Portrait Photography",
        },
        {
          label: "Techstack",
          value: "Next.js / TypeScript / GSAP / Lenis",
        },
        {
          label: "Location",
          value: "Cape Town, South Africa",
        },
      ],
    },
  },
  {
    id: 2,
    slug: "afrocraft",
    title: "AfroCraft",
    meta: "[E-COMMERCE] — [LUXURY CRAFT]",
    image: "/images/work/afrocraft/hero.jpg",
    thumb: "/images/work/afrocraft/thumb.jpg",
    alt: "AfroCraft handcrafted African bags website preview",
    tags: ["E-commerce", "Luxury", "Craft"],
    liveUrl: "https://YOUR-AFROCRAFT-VERCEL-URL.vercel.app",
    caseStudy: {
      ghostTitle: "AFROCRAFT",
      heroImage: "/images/work/afrocraft/hero.jpg",
      overviewImage: "/images/work/afrocraft/overview.jpg",
      challengeImage: "/images/work/afrocraft/challenge.jpg",
      galleryImages: [
        "/images/work/afrocraft/gallery-1.jpg",
        "/images/work/afrocraft/gallery-2.jpg",
        "/images/work/afrocraft/gallery-3.jpg",
      ],
      introHeading: "A luxury storefront for handcrafted African bags.",
      introBody: [
        "AfroCraft is a premium e-commerce experience built for handmade African bags, designed around warm editorial layouts, minimal navigation, and image-led product storytelling.",
        "The project combines a luxury fashion feel with practical commerce flows such as product browsing, product details, cart, checkout, authentication, admin management, and waitlist functionality for sold-out products.",
      ],
      challengeHeading:
        "Making African craft feel premium without losing warmth.",
      challengeBody: [
        "The challenge was to create an e-commerce interface that feels luxurious and editorial, while still being easy to use for customers who want to browse, understand, and purchase products quickly.",
        "The design needed to avoid a generic online-store look, using strong imagery, subtle African-inspired background details, warm tones, clean spacing, and a calm shopping flow.",
      ],
      outcomeHeading: "A refined commerce experience with cultural presence.",
      outcomeBody: [
        "The final experience uses a minimal luxury navigation system, editorial homepage layouts, product gallery interactions, clean product detail pages, and a smooth customer journey from discovery to checkout.",
        "The backend supports products, categories, cart, orders, reviews, authentication, admin dashboards, customer management, and a back-in-stock waitlist for sold-out products.",
      ],
      details: [
        { label: "Timeline", value: "Ongoing MVP" },
        { label: "Category", value: "E-Commerce / Luxury Retail" },
        {
          label: "Techstack",
          value:
            "Next.js / TypeScript / Tailwind CSS / Node.js / Express / MongoDB",
        },
        { label: "Location", value: "South Africa" },
      ],
    },
  },
  {
    id: 3,
    slug: "cocofizz",
    title: "CocoFizz",
    meta: "[FOOD & DRINK] — [RESTAURANT]",
    image: "/images/work/cocofizz/hero.jpg",
    thumb: "/images/work/cocofizz/thumb.jpg",
    alt: "CocoFizz restaurant website preview",
    tags: ["Restaurant", "Branding", "Motion", "Hospitality"],
    liveUrl: "https://YOUR-COCOFIZZ-VERCEL-URL.vercel.app",
    caseStudy: {
      ghostTitle: "COCOFIZZ",
      heroImage: "/images/work/cocofizz/hero.jpg",
      overviewImage: "/images/work/cocofizz/overview.jpg",
      challengeImage: "/images/work/cocofizz/challenge.jpg",
      galleryImages: [
        "/images/work/cocofizz/gallery-1.jpg",
        "/images/work/cocofizz/gallery-2.jpg",
        "/images/work/cocofizz/gallery-3.jpg",
      ],
      introHeading:
        "A fast-food brand shaped like a premium hospitality experience.",
      introBody: [
        "CocoFizz was designed as a high-end fast-food website with a boutique Mediterranean feel, blending playful food visuals with a clean, premium layout.",
        "The direction focused on oversized typography, warm neutral tones, rounded imagery, and smooth motion that feels intentional rather than flashy.",
      ],
      challengeHeading: "Making fast food feel premium without losing energy.",
      challengeBody: [
        "The challenge was balancing bold, appetizing product presentation with a minimal art direction inspired by high-end restaurant and hospitality websites.",
        "The interface needed to feel clean and editorial while still supporting strong branding, clear calls to action, and playful visual personality.",
      ],
      outcomeHeading: "A cleaner, more distinctive digital brand presence.",
      outcomeBody: [
        "The final concept gives CocoFizz a memorable visual identity through strong typography, curated imagery, and a structured case-study style layout.",
        "It creates a polished brand experience that feels elevated, modern, and much more memorable than a typical restaurant landing page.",
      ],
      details: [
        { label: "Timeline", value: "Concept Project" },
        { label: "Category", value: "Food & Drink / Restaurant Website" },
        {
          label: "Techstack",
          value: "Next.js / TypeScript / Tailwind CSS / GSAP",
        },
        { label: "Role", value: "UI Design / Frontend Development" },
      ],
    },
  },
  {
    id: 4,
    slug: "south-side",
    title: "SOUTH SIDE",
    meta: "[FASHION] — [E-COMMERCE] — [MOTION]",
    image: "/images/work/south-side/hero.jpg",
    thumb: "/images/work/south-side/thumb.jpg",
    alt: "South Side clothing website preview",
    tags: ["Fashion", "E-commerce", "Motion", "Branding"],
    liveUrl: "https://YOUR-SOUTH-SIDE-VERCEL-URL.vercel.app",
    caseStudy: {
      ghostTitle: "SOUTH SIDE",
      heroImage: "/images/work/south-side/hero.jpg",
      overviewImage: "/images/work/south-side/overview.jpg",
      challengeImage: "/images/work/south-side/challenge.jpg",
      galleryImages: [
        "/images/work/south-side/gallery-1.jpg",
        "/images/work/south-side/gallery-2.jpg",
        "/images/work/south-side/gallery-3.jpg",
      ],
      introHeading: "A fashion website built like an editorial experience.",
      introBody: [
        "South Side is a clothing website designed for a streetwear brand with a clean, premium, and editorial visual language.",
        "The project focuses on creating a fashion-forward digital experience using large imagery, subtle motion, frameless layouts, product storytelling, and a minimal navigation system.",
      ],
      challengeHeading:
        "Creating an e-commerce feel without making it feel generic.",
      challengeBody: [
        "The challenge was to design a website that could sell clothing while still feeling like a fashion publication rather than a traditional online store.",
        "The interface needed to feel minimal, premium, and expressive, while still making the shop, product details, contact page, and brand story easy to access.",
      ],
      outcomeHeading:
        "A refined clothing website with motion, atmosphere, and strong brand presence.",
      outcomeBody: [
        "The final website uses cinematic page transitions, forest and sand visual modes, animated product sections, a custom contact experience, frameless image treatments, and subtle GSAP interactions.",
        "The result is a fashion website that feels more immersive, premium, and brand-led while still supporting product browsing and future backend expansion.",
      ],
      details: [
        { label: "Timeline", value: "In Progress" },
        { label: "Category", value: "Fashion / E-commerce / Brand Website" },
        { label: "Techstack", value: "Next.js / TypeScript / GSAP / CSS" },
        {
          label: "Role",
          value: "Frontend Development / UI Design / Motion Design",
        },
        { label: "Location", value: "South Africa" },
      ],
    },
  },
];

/** Legacy slugs that should resolve to the current project slug. */
const slugAliases: Record<string, string> = {
  wkndhrs: "south-side",
};

export function getProjectBySlug(slug: string) {
  const resolvedSlug = slugAliases[slug] ?? slug;
  return projects.find((project) => project.slug === resolvedSlug);
}
