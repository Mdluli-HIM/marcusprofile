export type FilterKey = "All" | "Platform" | "Commerce" | "Editorial" | "Brand";

export type WorkProject = {
  id: number;
  slug: string;
  title: string;
  meta: string;
  status: "Finished Demo" | "Live Demo" | "Portfolio Demo";
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
    solutionHeading?: string;
    solutionBody?: string[];
    featuresHeading?: string;
    features?: string[];
    techHeading?: string;
    techStack?: string[];
  };
};

export const filterMenuItems: { key: FilterKey; label: string }[] = [
  { key: "All", label: "[ALL]" },
  { key: "Platform", label: "[PLATFORM]" },
  { key: "Commerce", label: "[COMMERCE]" },
  { key: "Editorial", label: "[EDITORIAL]" },
  { key: "Brand", label: "[BRAND]" },
];

export const projects: WorkProject[] = [
  {
    id: 1,
    slug: "noir-faces",
    title: "NOIR FACES",
    meta: "[FINISHED DEMO] — [EDITORIAL] — [PHOTOGRAPHY]",
    status: "Finished Demo",
    image: "/images/work/noir-faces/hero.jpg",
    thumb: "/images/work/noir-faces/thumb.jpg",
    alt: "Noir Faces editorial photography preview",
    tags: ["Editorial"],
    liveUrl: "https://studio-tau-pearl.vercel.app/",
    caseStudy: {
      ghostTitle: "NOIR FACES",
      heroImage: "/images/work/noir-faces/hero.jpg",
      overviewImage: "/images/work/noir-faces/image.png",
      challengeImage: "/images/work/noir-faces/image copy 2.png",
      galleryImages: [
        "/images/work/noir-faces/image copy 2.png",
        "/images/work/noir-faces/image copy 3.png",
        "/images/work/noir-faces/image copy.png",
        "/images/work/noir-faces/image.png",
      ],
      introHeading: "A finished editorial demo shaped through mood.",
      introBody: [
        "Noir Faces is a finished portfolio demo created as a cinematic editorial photography experience focused on atmosphere, silence, and emotional intensity.",
        "The project demonstrates how a visual campaign can be presented through monochrome contrast, negative space, subtle texture, and a refined gallery-led interface.",
      ],
      challengeHeading: "Creating emotional depth through restraint.",
      challengeBody: [
        "The challenge was building a photography experience that felt luxurious and emotionally considered without relying on excessive visual effects.",
        "Every frame needed to feel deliberate while still allowing the subject’s expression, composition, and movement to remain the central focus.",
      ],
      outcomeHeading: "A completed visual demo with a cinematic identity.",
      outcomeBody: [
        "The final demo presents a refined editorial series that balances elegance with intimacy.",
        "It shows how photography, layout, pacing, and interaction can work together to create a premium visual identity for a campaign or creative studio.",
      ],
      details: [
        { label: "Status", value: "Finished Demo" },
        { label: "Type", value: "Portfolio Case Study" },
        { label: "Timeline", value: "4 Months" },
        { label: "Category", value: "Editorial / Portrait Photography" },
        { label: "Techstack", value: "Next.js / TypeScript / GSAP / Lenis" },
        { label: "Location", value: "Cape Town, South Africa" },
      ],
    },
  },
  {
    id: 2,
    slug: "spotted",
    title: "SPOTTED",
    meta: "[FINISHED DEMO] — [SOCIAL DISCOVERY] — [PLACES]",
    status: "Finished Demo",
    image: "/images/work/spotted/image.png",
    thumb: "/images/work/spotted/image.png",
    alt: "SPOTTED social place discovery app preview",
    tags: ["Platform"],
    liveUrl: "https://YOUR-SPOTTED-VERCEL-URL.vercel.app",
    caseStudy: {
      ghostTitle: "SPOTTED",
      heroImage: "/images/work/spotted/image.png",
      overviewImage: "/images/work/spotted/image copy 6.png",
      challengeImage: "/images/work/spotted/image copy 4.png",
      galleryImages: [
        "/images/work/spotted/image copy 2.png",
        "/images/work/spotted/image copy.png",
        "/images/work/spotted/image copy 3.png",
        "/images/work/spotted/image.png",
      ],
      introHeading:
        "A finished demo for discovering places through real community experiences.",
      introBody: [
        "SPOTTED is a finished product demo for a social discovery platform that helps people find restaurants, cafés, nightlife spots, study spaces, outdoor places, and hidden gems based on mood, location, and intention.",
        "The demo shows how a place discovery product can move beyond basic listings by using community stories, photos, mood tags, ratings, saved places, visited places, and shareable place links.",
      ],
      challengeHeading:
        "Making place discovery feel more human than a normal directory.",
      challengeBody: [
        "The challenge was to design a platform that does more than display places. It needed to help users decide where to go by showing real experiences, useful tips, social proof, and the emotional atmosphere of each location.",
        "The interface also needed to feel premium, minimal, mobile-first, and easy to use while supporting discovery, search, filters, place profiles, stories, sharing, saving, and user contributions.",
      ],
      outcomeHeading:
        "A polished finished demo that turns local places into social experiences.",
      outcomeBody: [
        "The finished demo allows users to discover places by mood, area, and category, view place profiles, browse community stories, save places, mark places as visited, share direct place links, and explore community-led recommendations.",
        "SPOTTED demonstrates a strong product foundation with a clean visual identity, warm editorial interface, mobile-first flows, and a scalable backend direction for authentication, places, stories, saves, visits, and share tracking.",
      ],
      details: [
        { label: "Status", value: "Finished Demo" },
        { label: "Type", value: "Product Demo / Portfolio Case Study" },
        { label: "Timeline", value: "Completed MVP Demo" },
        {
          label: "Category",
          value: "Social Discovery / Location Platform / Community App",
        },
        {
          label: "Techstack",
          value:
            "Next.js / TypeScript / Tailwind CSS / Framer Motion / Node.js / Express / Prisma / PostgreSQL",
        },
        {
          label: "Role",
          value:
            "Product Design / UI Design / Frontend Development / Backend Architecture",
        },
      ],
    },
  },
  {
    id: 3,
    slug: "cocofizz",
    title: "CocoFizz",
    meta: "[FINISHED DEMO] — [FOOD & DRINK] — [RESTAURANT]",
    status: "Finished Demo",
    image: "/images/work/cocofizz/image.png",
    thumb: "/images/work/cocofizz/image.png",
    alt: "CocoFizz restaurant website preview",
    tags: ["Brand"],
    liveUrl: "https://cook-web-teal.vercel.app/",
    caseStudy: {
      ghostTitle: "COCOFIZZ",
      heroImage: "/images/work/cocofizz/image copy 7.png",
      overviewImage: "/images/work/cocofizz/image copy.png",
      challengeImage: "/images/work/cocofizz/image.png",
      galleryImages: [
        "/images/work/cocofizz/image copy 2.png",
        "/images/work/cocofizz/image copy 5.png",
        "/images/work/cocofizz/image copy 4.png",
        "/images/work/cocofizz/image copy 6.png",
      ],
      introHeading:
        "A finished restaurant demo shaped like a premium hospitality experience.",
      introBody: [
        "CocoFizz is a finished brand and website demo for a high-end fast-food concept with a boutique Mediterranean feel.",
        "The demo blends playful food visuals with a clean, premium layout using oversized typography, warm neutral tones, rounded imagery, and smooth motion that feels intentional rather than flashy.",
      ],
      challengeHeading: "Making fast food feel premium without losing energy.",
      challengeBody: [
        "The challenge was balancing bold, appetizing product presentation with a minimal art direction inspired by high-end restaurant and hospitality websites.",
        "The interface needed to feel clean and editorial while still supporting strong branding, clear calls to action, and playful visual personality.",
      ],
      outcomeHeading:
        "A completed demo with a distinctive digital brand presence.",
      outcomeBody: [
        "The final demo gives CocoFizz a memorable visual identity through strong typography, curated imagery, and a structured hospitality-style layout.",
        "It shows how a restaurant or food brand can feel elevated, modern, and more memorable than a typical landing page.",
      ],
      details: [
        { label: "Status", value: "Finished Demo" },
        { label: "Type", value: "Brand Website Demo" },
        { label: "Timeline", value: "Completed Concept" },
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
    slug: "gymflow-admin",
    title: "GymFlow Admin",
    meta: "[FINISHED DEMO] — [SAAS] — [GYM MANAGEMENT]",
    status: "Finished Demo",
    image: "/images/gym/image.png",
    thumb: "/images/gym/gymflow-dark.png",
    alt: "GymFlow Admin dashboard preview",
    tags: ["Platform"],
    liveUrl: "https://gymflow-silk-delta.vercel.app/login?next=%2Fdashboard",
    caseStudy: {
      ghostTitle: "GYMFLOW",
      heroImage: "/images/gym/gymflow-admin.png",
      overviewImage: "/images/gym/gymflow-repo.png",
      challengeImage: "/images/gym/gymflow-dark.png",
      galleryImages: [
        "/images/gym/gymflow-login.png",
        "/images/gym/gymflow-repo.png",
        "/images/gym/image.png",
        "/images/gym/gymflow-hero.png",
      ],
      introHeading:
        "A finished SaaS demo for gym operations and member control.",
      introBody: [
        "GymFlow Admin is a finished full-stack SaaS demo designed to show how gyms can manage members, subscriptions, payments, check-ins, reminders, and reports from one structured system.",
        "The product demonstrates an operational dashboard that helps staff identify paid, unpaid, expired, suspended, and active members without relying on manual records or disconnected tools.",
      ],
      challengeHeading:
        "Creating a professional gym management workflow without unnecessary complexity.",
      challengeBody: [
        "The challenge was to design a practical system that could support everyday gym operations: member registration, plan assignment, subscription tracking, payment recording, check-ins, reminders, and reporting.",
        "The demo needed to feel professional and scalable while staying easy for staff to understand and use during daily operations.",
      ],
      outcomeHeading:
        "A completed SaaS demo ready to present as a working system.",
      outcomeBody: [
        "The finished demo covers the core operational workflow of a gym: create a member, assign a plan, create a subscription, record payment, check the member in, send reminders, and view business reports.",
        "GymFlow demonstrates how a custom SaaS platform can support real operational structure, visibility, and control across membership-based businesses.",
      ],
      details: [
        { label: "Status", value: "Finished Demo" },
        { label: "Type", value: "SaaS Product Demo" },
        { label: "Timeline", value: "Completed MVP Demo" },
        { label: "Category", value: "SaaS / Gym Management / Admin System" },
        {
          label: "Techstack",
          value:
            "Next.js / TypeScript / Tailwind CSS / Node.js / Express / MongoDB",
        },
        { label: "Role", value: "Product Design / Frontend / Backend" },
        { label: "Location", value: "South Africa" },
      ],
    },
  },
  {
    id: 5,
    slug: "south-side",
    title: "SOUTH SIDE",
    meta: "[FINISHED DEMO] — [FASHION] — [E-COMMERCE]",
    status: "Finished Demo",
    image: "/images/work/south-side/hero.jpg",
    thumb: "/images/work/south-side/thumb.jpg",
    alt: "South Side clothing website preview",
    tags: ["Commerce", "Brand"],
    liveUrl: "https://south-side-ten.vercel.app/",
    caseStudy: {
      ghostTitle: "SOUTH SIDE",
      heroImage: "/images/work/south-side/hero.jpg",
      overviewImage: "/images/work/south-side/image copy.png",
      challengeImage: "/images/work/south-side/image copy 3.png",
      galleryImages: [
        "/images/work/south-side/image copy 4.png",
        "/images/work/south-side/hero.jpg",
        "/images/work/south-side/image copy 2.png",
        "/images/work/south-side/image.png",
      ],
      introHeading:
        "A finished fashion demo built like an editorial experience.",
      introBody: [
        "South Side is a finished fashion and e-commerce demo designed for a streetwear brand with a clean, premium, and editorial visual language.",
        "The project demonstrates how a clothing website can combine product browsing, brand storytelling, motion, and atmosphere without feeling like a generic online store.",
      ],
      challengeHeading:
        "Creating an e-commerce experience without making it feel generic.",
      challengeBody: [
        "The challenge was to design a website that could present clothing while still feeling like a fashion publication rather than a standard product grid.",
        "The interface needed to feel minimal, premium, and expressive while still making the shop, product details, contact page, and brand story easy to access.",
      ],
      outcomeHeading:
        "A completed fashion demo with motion, atmosphere, and strong brand presence.",
      outcomeBody: [
        "The finished demo uses cinematic page transitions, forest and sand visual modes, animated product sections, a custom contact experience, frameless image treatments, and subtle GSAP interactions.",
        "The result is a fashion website demo that feels immersive, premium, and brand-led while still supporting product browsing and future backend expansion.",
      ],
      details: [
        { label: "Status", value: "Finished Demo" },
        { label: "Type", value: "Fashion E-commerce Demo" },
        { label: "Timeline", value: "Completed Demo" },
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
  {
    id: 6,
    slug: "leaves-and-stuff",
    title: "LEAVES AND STUFF",
    meta: "[FINISHED DEMO] — [RETAIL TECH] — [E-COMMERCE]",
    status: "Finished Demo",
    image: "/images/cannabis/image copy 4.png",
    thumb: "/images/cannabis/image copy 4.png",
    alt: "Leaves and Stuff retail management platform preview",
    tags: ["Platform", "Commerce"],
    liveUrl: "https://leaves-and-stuff-okcm.vercel.app/",
    caseStudy: {
      ghostTitle: "LEAVES AND STUFF",
      heroImage: "/images/cannabis/image copy 4.png",
      overviewImage: "/images/cannabis/image copy 4.png",
      challengeImage: "/images/cannabis/image copy 6.png",
      galleryImages: [
        "/images/cannabis/image copy 2.png",
        "/images/cannabis/image copy 5.png",
        "/images/cannabis/image copy 3.png",
        "/images/cannabis/image copy.png",
      ],
      introHeading:
        "A finished full-stack demo for modern retail and delivery operations.",
      introBody: [
        "Leaves and Stuff is a finished full-stack retail and e-commerce demo designed to show how a modern store can connect customers, administrators, and delivery drivers inside one operational system.",
        "The demo combines a mobile-first customer storefront with product discovery, persistent carts, saved addresses, checkout, order tracking, inventory management, payment confirmation, driver assignments, and operational reporting.",
      ],
      challengeHeading:
        "Connecting the complete retail and delivery workflow without creating a complicated experience.",
      challengeBody: [
        "The main challenge was designing a system that could support three different user experiences: customers purchasing products, administrators managing store operations, and drivers completing deliveries.",
        "The platform needed to manage products, stock, payments, customer accounts, delivery assignments, order statuses, failed deliveries, and tap-on-delivery payments while remaining simple, responsive, and easy to use.",
        "A consistent visual system was also required across the customer storefront, admin dashboard, driver portal, authentication pages, forms, product pages, and operational tools.",
      ],
      outcomeHeading:
        "A completed retail platform demo with customer, admin, and delivery flows.",
      outcomeBody: [
        "The finished demo delivers a mobile-first customer shopping experience alongside an administrative control centre for managing orders, products, inventory, payments, customers, drivers, and store settings.",
        "Administrators can confirm and pack orders, assign drivers, monitor inventory, record stock movements, confirm customer payments, manage product availability, and track the full order lifecycle from checkout to delivery.",
        "Drivers can receive assigned deliveries, view customer and address information, confirm payments at handover, complete orders, and record failed delivery reasons.",
      ],
      details: [
        { label: "Status", value: "Finished Demo" },
        { label: "Type", value: "Full-Stack Retail Platform Demo" },
        { label: "Timeline", value: "Completed MVP Demo" },
        {
          label: "Category",
          value: "Retail Technology / E-commerce / SaaS Platform",
        },
        {
          label: "Techstack",
          value:
            "Next.js / TypeScript / Tailwind CSS / React Query / Zustand / Node.js / Express / Prisma / PostgreSQL / Docker",
        },
        {
          label: "Role",
          value:
            "Software Architecture / Full-Stack Development / UI Design / Database Design",
        },
        {
          label: "Platforms",
          value: "Customer Store / Admin Dashboard / Driver Portal",
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
