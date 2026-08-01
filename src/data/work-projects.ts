export type FilterKey = "All" | "Platform" | "Commerce" | "Editorial" | "Brand";

export type WorkProject = {
  id: number;
  slug: string;
  title: string;
  meta: string;
  status: "Finished Demo" | "Live Demo" | "Portfolio Demo" | "In Progress";
  image: string;
  thumb: string;
  alt: string;
  tags: FilterKey[];
  liveUrl: string;
  /** Published Figma file — replace with your file URL for each project. */
  figmaUrl?: string;
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
    id: 7,
    slug: "freshdash-grocery",
    title: "FRESHDASH GROCERY",
    meta: "[IN PROGRESS] — [GROCERY E-COMMERCE] — [MOBILE-FIRST / SHOPIFY UX]",
    status: "In Progress",
    image: "/images/freshdash/hero.png",
    thumb: "/images/freshdash/thumb.png",
    alt: "FreshDash grocery delivery platform preview",
    tags: ["Commerce"],
    liveUrl: "https://freshdash.vercel.app/",
    figmaUrl:
      "https://www.figma.com/design/LDmAlTj0Ts2HP78OubQYCJ/Freshcart?node-id=0-1&t=MpdMdhx4lpF6WWRS-1",
    caseStudy: {
      ghostTitle: "FRESHDASH",
      heroImage: "/images/freshdash/hero.png",
      overviewImage: "/images/freshdash/overview.png",
      challengeImage: "/images/freshdash/challenge.png",
      galleryImages: [
        "/images/freshdash/gallery-1.png",
        "/images/freshdash/gallery-2.png",
        "/images/freshdash/gallery-3.png",
        "/images/freshdash/gallery-4.png",
      ],
      introHeading:
        "A mobile-first grocery storefront shaped around Shopify commerce patterns and everyday shopping behaviour.",
      introBody: [
        "FreshDash is a grocery delivery case study focused on the full customer journey — from browsing categories and collections to search, product detail, cart, account, and checkout. The work demonstrates proven e-commerce UX across mobile and responsive web, with interaction patterns familiar to Shopify storefronts.",
        "The project was designed in Figma first — with organised pages for user flows, wireframes, a component library, desktop and mobile screens, and developer handoff — then built as a live frontend prototype to show how design decisions translate into production-ready interfaces.",
      ],
      challengeHeading:
        "Designing a grocery experience that handles complex commerce tasks without overwhelming mobile users.",
      challengeBody: [
        "Grocery shopping online requires product discovery, filtering, favourites, quantity controls, delivery preferences, persistent carts, and account management — all within a small screen. The challenge was to structure this information clearly while keeping the experience fast and intuitive.",
        "The design needed to adapt responsibly across breakpoints: navigation collapsing into mobile menus, product grids shifting from four columns to two, filters moving into bottom sheets, and touch-friendly controls replacing hover-dependent patterns.",
        "Another goal was to create reusable components — product cards, cart drawers, collection headers, promotional sections — that could integrate with Shopify or a custom backend while maintaining a consistent visual language.",
      ],
      outcomeHeading:
        "A polished grocery commerce case study with complete journeys, reusable components, and live prototype validation.",
      outcomeBody: [
        "FreshDash presents end-to-end shopping flows including category browsing, collection pages, advanced search, favourites, animated mini-cart interactions, account menus, and a streamlined checkout path — documented in Figma and validated through a working frontend build.",
        "The interface demonstrates strong typography hierarchy, spacing discipline, mobile-first layout decisions, motion used for feedback rather than decoration, and accessibility-conscious states throughout the experience.",
        "Combined with frontend development experience, the project shows how design and implementation work together — from Figma components and responsive constraints to HTML, CSS breakpoints, and reusable React patterns.",
      ],
      featuresHeading: "Customer journey covered",
      features: [
        "Homepage with collections, promotions, and category entry points",
        "Collection browsing with filters and sort patterns",
        "Product detail with variants, quantity, and add-to-cart",
        "Search with fast results and contextual refinement",
        "Persistent cart with mini-cart drawer and quantity controls",
        "Account, favourites, and delivery preference screens",
        "Checkout flow with mobile-optimised form layout",
        "Responsive adaptation from mobile through desktop breakpoints",
      ],
      details: [
        { label: "Status", value: "In Progress" },
        {
          label: "Type",
          value: "E-commerce UI/UX Case Study + Live Prototype",
        },
        { label: "Timeline", value: "Ongoing Personal Project" },
        {
          label: "Category",
          value: "Grocery Delivery / E-commerce / Shopify-Inspired UX",
        },
        {
          label: "Figma",
          value:
            "Cover, Brief, User Flows, Wireframes, Design System, Components, Desktop + Mobile Screens, Prototype, Handoff",
        },
        {
          label: "Techstack",
          value:
            "Next.js 16 / React / TypeScript / Tailwind CSS / Framer Motion / Lucide React",
        },
        {
          label: "Role",
          value:
            "UI/UX Design / Product Design / Design Systems / Frontend Development",
        },
        {
          label: "Platforms",
          value: "Mobile Web / Responsive Web / Progressive Commerce",
        },
        { label: "Location", value: "South Africa" },
      ],
    },
  },
  {
    id: 5,
    slug: "xibelani",
    title: "XIBELANI",
    meta: "[CASE STUDY] — [CULTURAL FASHION E-COMMERCE] — [DESKTOP + MOBILE]",
    status: "Finished Demo",
    image: "/images/work/xibelani/hero.jpg",
    thumb: "/images/work/xibelani/thumb.jpg",
    alt: "Xibelani traditional Tsonga attire website preview",
    tags: ["Commerce", "Brand"],
    liveUrl: "https://south-side-ten.vercel.app/",
    figmaUrl: "",
    caseStudy: {
      ghostTitle: "XIBELANI",
      heroImage: "/images/work/xibelani/hero.jpg",
      overviewImage: "/images/work/xibelani/image copy.png",
      challengeImage: "/images/work/xibelani/image copy 3.png",
      galleryImages: [
        "/images/work/xibelani/image copy 4.png",
        "/images/work/xibelani/hero.jpg",
        "/images/work/xibelani/image copy 2.png",
        "/images/work/xibelani/image.png",
      ],
      introHeading:
        "A cultural fashion e-commerce case study where Tsonga heritage meets editorial presentation and shoppable product flows.",
      introBody: [
        "Xibelani is a traditional attire e-commerce case study celebrating the knee-length pleated skirt and indigenous dance of Tsonga women from Limpopo and Mpumalanga. The work covers homepage storytelling, heritage archive, dedicated collection archive, shop browsing, product presentation, contact, and brand narrative across desktop and mobile.",
        "Typography, image treatment, spacing, and motion were used to honour vibrant cultural identity while keeping navigation, product discovery, and Instagram-based ordering clear for customers moving toward purchase.",
      ],
      challengeHeading:
        "Balancing expressive cultural storytelling with the clarity e-commerce customers expect.",
      challengeBody: [
        "Heritage fashion needs strong visual identity rooted in tradition — colour symbolism, ceremony context, and dance culture — but customers still need to find products, understand pricing, and move through the site without confusion. The challenge was to rebrand from a streetwear concept into an experience that feels editorial and culturally authentic while supporting practical shopping tasks.",
        "Responsive design required thoughtful adaptation — cinematic desktop layouts simplifying for mobile, navigation restructuring across Shop, Heritage, Philosophy, and Archive routes, product grids reflowing, and typography scaling to maintain hierarchy at every breakpoint.",
        "The brand needed to feel confident and distinct — honouring Tsonga tradition from classic knee-length xibelani to modern mini styles and bridal couture — while demonstrating adaptability across ceremony, celebration, and contemporary dance contexts.",
      ],
      outcomeHeading:
        "A cultural commerce case study with strong heritage branding, motion, and shoppable structure.",
      outcomeBody: [
        "The completed case study delivers cinematic page transitions, dual visual modes (Fuchsia and Turquoise), animated product sections, frameless imagery, and GSAP-driven interactions — all supporting a coherent shopping and heritage experience.",
        "Dedicated routes for Heritage (/studio), Archive (/archive), Shop, and Contact — plus colour meanings, style categories, and ceremony-focused copy — demonstrate typography hierarchy, layout discipline, white space, and brand consistency across a full customer-facing storefront.",
        "Documented in Figma with desktop and mobile screens, the work shows how a cultural fashion brand can stand apart from template-based e-commerce while remaining usable and conversion-aware through Instagram ordering flows.",
      ],
      featuresHeading: "Customer journey covered",
      features: [
        "Editorial homepage with Xibelani heritage storytelling and rhythm-led brand narrative",
        "Heritage studio archive with infinite gallery and individual story pages",
        "Dedicated archive page with collection, styles, and colour cultural meanings",
        "Shop browsing with Traditional, Modern, Bridal, and Accessories categories",
        "Product detail with image gallery and Instagram order flow",
        "Contact page with ceremony, bridal, and collaboration enquiry paths",
        "Responsive navigation and layout adaptation across desktop and mobile",
        "Motion, loader, and transition design for atmosphere",
      ],
      details: [
        { label: "Status", value: "Case Study / Live Prototype" },
        {
          label: "Type",
          value: "Cultural Fashion E-commerce UI/UX Case Study",
        },
        { label: "Timeline", value: "Completed Case Study" },
        {
          label: "Category",
          value: "Heritage Fashion / E-commerce / Brand Experience",
        },
        { label: "Techstack", value: "Next.js / TypeScript / GSAP / CSS" },
        {
          label: "Role",
          value: "UI/UX Design / Visual Design / Motion / Frontend Development",
        },
        { label: "Location", value: "Limpopo & Mpumalanga, South Africa" },
      ],
    },
  },
  {
    id: 6,
    slug: "leaves-and-stuff",
    title: "LEAVES AND STUFF",
    meta: "[CASE STUDY] — [RETAIL E-COMMERCE] — [STORE + CHECKOUT + DELIVERY]",
    status: "Finished Demo",
    image: "/images/cannabis/image copy 4.png",
    thumb: "/images/cannabis/image copy 4.png",
    alt: "Leaves and Stuff retail management platform preview",
    tags: ["Platform", "Commerce"],
    liveUrl: "https://leaves-and-stuff-okcm.vercel.app/",
    figmaUrl: "",
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
        "A full retail e-commerce case study connecting mobile storefront, checkout, admin operations, and delivery.",
      introBody: [
        "Leaves and Stuff demonstrates end-to-end retail e-commerce UX — a mobile-first customer storefront with product discovery, persistent carts, saved addresses, checkout, and order tracking, alongside admin and driver interfaces for operational fulfilment.",
        "The case study shows how a single design system can span multiple user roles while keeping the customer shopping journey simple, fast, and conversion-focused on mobile.",
      ],
      challengeHeading:
        "Designing a complete retail workflow without sacrificing the customer shopping experience.",
      challengeBody: [
        "Retail platforms must support customers buying products, staff managing orders and inventory, and drivers completing deliveries — each with different priorities and screen requirements. The UX challenge was maintaining clarity across all three without visual inconsistency.",
        "The customer storefront needed proven e-commerce patterns: browse, search, product detail, cart, checkout, order status, and account management — optimised for mobile shoppers who form the majority of online retail traffic.",
        "A shared component library, typography system, and spacing rules were required across storefront, admin dashboard, driver portal, authentication, and form-heavy operational screens.",
      ],
      outcomeHeading:
        "A retail e-commerce case study with documented customer journeys and multi-role interface design.",
      outcomeBody: [
        "The completed work delivers a mobile-first shopping experience with full checkout and order tracking, plus admin tools for order management, inventory, payments, and driver assignment — all within a consistent visual system.",
        "The project demonstrates responsive design awareness, reusable components, operational UX for data-heavy dashboards, and the development handoff thinking needed to ship complex commerce platforms.",
        "Figma documentation covers user flows, wireframes, component variants, and desktop/mobile screens for both customer and operational experiences.",
      ],
      featuresHeading: "Customer journey covered",
      features: [
        "Mobile storefront with product discovery and categories",
        "Product detail, cart, and persistent basket behaviour",
        "Checkout with saved addresses and order confirmation",
        "Order tracking and account management",
        "Admin order fulfilment and inventory workflows",
        "Driver delivery assignment and handover screens",
      ],
      details: [
        { label: "Status", value: "Case Study / Live Prototype" },
        {
          label: "Type",
          value: "Retail E-commerce + Operations UI/UX Case Study",
        },
        { label: "Timeline", value: "Completed Case Study" },
        {
          label: "Category",
          value: "Retail / E-commerce / Multi-Role Platform UX",
        },
        {
          label: "Techstack",
          value:
            "Next.js / TypeScript / Tailwind CSS / React Query / Zustand / Node.js / Express / Prisma / PostgreSQL / Docker",
        },
        {
          label: "Role",
          value:
            "UI/UX Design / Product Design / Full-Stack Development / Design Systems",
        },
        {
          label: "Platforms",
          value: "Customer Store / Admin Dashboard / Driver Portal",
        },
        { label: "Location", value: "South Africa" },
      ],
    },
  },
  {
    id: 2,
    slug: "spotted",
    title: "SPOTTED",
    meta: "[CASE STUDY] — [MOBILE PLATFORM] — [DISCOVERY UX]",
    status: "Finished Demo",
    image: "/images/work/spotted/image.png",
    thumb: "/images/work/spotted/image.png",
    alt: "SPOTTED social place discovery app preview",
    tags: ["Platform"],
    liveUrl: "https://YOUR-SPOTTED-VERCEL-URL.vercel.app",
    figmaUrl: "",
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
        "A mobile-first discovery platform case study focused on search, filters, profiles, and social UX.",
      introBody: [
        "SPOTTED is a place-discovery case study that helps users find restaurants, cafés, nightlife, study spaces, and hidden gems through mood, location, and community stories — designed mobile-first with clear navigation and task completion paths.",
        "The work demonstrates UX thinking beyond static screens: how users search and filter, evaluate options through profiles and social proof, save places, share links, and contribute content without friction.",
      ],
      challengeHeading:
        "Turning place discovery into an intuitive mobile experience rather than a flat directory.",
      challengeBody: [
        "Discovery products must help users decide quickly — combining search, filters, mood tags, ratings, photos, and stories into scannable mobile layouts without overwhelming the screen.",
        "The interface needed responsive adaptation, bottom-sheet patterns for filters, card-based browsing, profile pages with clear hierarchy, and accessible touch targets throughout.",
        "Design system components — cards, tags, navigation, profile modules — were structured in Figma for reuse and developer handoff.",
      ],
      outcomeHeading:
        "A mobile platform case study proving search, filter, profile, and social discovery UX.",
      outcomeBody: [
        "The completed case study covers mood-based discovery, place profiles, community stories, save and share flows, and contribution patterns — all within a warm, editorial mobile interface.",
        "The project demonstrates user journey mapping, wireframe-to-final design progression, component-based Figma structure, and frontend implementation that validates interaction decisions.",
      ],
      details: [
        { label: "Status", value: "Case Study / Live Prototype" },
        { label: "Type", value: "Mobile Platform UI/UX Case Study" },
        { label: "Timeline", value: "Completed Case Study" },
        {
          label: "Category",
          value: "Social Discovery / Mobile UX / Platform Design",
        },
        {
          label: "Techstack",
          value:
            "Next.js / TypeScript / Tailwind CSS / Framer Motion / Node.js / Express / Prisma / PostgreSQL",
        },
        {
          label: "Role",
          value: "UI/UX Design / Product Design / Frontend Development",
        },
      ],
    },
  },
  {
    id: 3,
    slug: "cocofizz",
    title: "CocoFizz",
    meta: "[CASE STUDY] — [HOSPITALITY BRAND] — [TYPOGRAPHY + LAYOUT]",
    status: "Finished Demo",
    image: "/images/work/cocofizz/image.png",
    thumb: "/images/work/cocofizz/image.png",
    alt: "CocoFizz restaurant website preview",
    tags: ["Brand"],
    liveUrl: "https://cook-web-teal.vercel.app/",
    figmaUrl: "",
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
        "A hospitality brand case study proving typography, layout, and visual identity across a premium web experience.",
      introBody: [
        "CocoFizz is a restaurant and hospitality brand case study that elevates a fast-food concept through boutique typography, warm neutral palettes, rounded imagery, and intentional motion — demonstrating how branding and UI work together on desktop and mobile.",
        "The project shows ability to adapt visual personality for different brand contexts: here, playful appetite meets premium hospitality restraint.",
      ],
      challengeHeading:
        "Making fast food feel premium through typography, spacing, and brand-led layout.",
      challengeBody: [
        "Hospitality websites need clear hierarchy for headings, body copy, promotional messages, and calls to action — while photography and food imagery carry emotional weight.",
        "Layout decisions around grids, white space, alignment, and section pacing were critical to avoid a template feel while keeping navigation and key actions obvious.",
        "Responsive breakpoints required the editorial desktop layout to simplify gracefully on mobile without losing brand character.",
      ],
      outcomeHeading:
        "A brand-led case study with strong typography, layout discipline, and hospitality UX.",
      outcomeBody: [
        "The completed work delivers a distinctive digital brand presence through oversized type, curated food photography, structured section design, and motion timed for appetite and flow.",
        "The case study demonstrates branding consistency — colour, font, imagery, tone, and interface elements applied cohesively — and documents the design process in Figma from concept through final screens.",
      ],
      details: [
        { label: "Status", value: "Case Study / Live Prototype" },
        { label: "Type", value: "Brand + Hospitality UI/UX Case Study" },
        { label: "Timeline", value: "Completed Case Study" },
        {
          label: "Category",
          value: "Food & Drink / Brand Website / Visual Design",
        },
        {
          label: "Techstack",
          value: "Next.js / TypeScript / Tailwind CSS / GSAP",
        },
        {
          label: "Role",
          value: "UI/UX Design / Visual Design / Frontend Development",
        },
      ],
    },
  },
  {
    id: 4,
    slug: "gymflow-admin",
    title: "GymFlow Admin",
    meta: "[CASE STUDY] — [SAAS DASHBOARD] — [OPERATIONS UX]",
    status: "Finished Demo",
    image: "/images/gym/image.png",
    thumb: "/images/gym/gymflow-dark.png",
    alt: "GymFlow Admin dashboard preview",
    tags: ["Platform"],
    liveUrl: "https://gymflow-silk-delta.vercel.app/login?next=%2Fdashboard",
    figmaUrl: "",
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
        "A SaaS dashboard case study focused on data clarity, workflow UX, and operational decision-making.",
      introBody: [
        "GymFlow Admin is a gym management dashboard case study designed for staff who need to register members, track subscriptions, record payments, manage check-ins, and read reports — without confusion or unnecessary complexity.",
        "The work demonstrates UX for data-heavy interfaces: clear status indicators, scannable tables, logical information hierarchy, and flows that reduce cognitive load during daily operations.",
      ],
      challengeHeading:
        "Designing an admin system that stays readable under real operational pressure.",
      challengeBody: [
        "Dashboard UX must prioritise quick reading and decision-making — membership states, payment status, and check-in workflows need to be visible at a glance with consistent labelling and spacing.",
        "Component reuse across login, dashboard, member profiles, forms, and reports was structured in Figma with Auto Layout, variants, and shared styles for efficient iteration and handoff.",
        "The interface needed to feel professional and trustworthy while supporting frequent daily use on desktop and tablet.",
      ],
      outcomeHeading:
        "A SaaS dashboard case study with clear operational UX and structured Figma documentation.",
      outcomeBody: [
        "The completed case study covers the core gym workflow from member creation through subscription, payment, check-in, reminders, and reporting — with UI designed for clarity over decoration.",
        "The project demonstrates design system thinking applied to admin interfaces, responsive layout awareness, and frontend development that validates form states, feedback, and navigation patterns.",
      ],
      details: [
        { label: "Status", value: "Case Study / Live Prototype" },
        { label: "Type", value: "SaaS Dashboard UI/UX Case Study" },
        { label: "Timeline", value: "Completed Case Study" },
        { label: "Category", value: "SaaS / Admin UX / Operations Dashboard" },
        {
          label: "Techstack",
          value:
            "Next.js / TypeScript / Tailwind CSS / Node.js / Express / MongoDB",
        },
        {
          label: "Role",
          value: "UI/UX Design / Product Design / Frontend + Backend",
        },
        { label: "Location", value: "South Africa" },
      ],
    },
  },
  {
    id: 1,
    slug: "noir-faces",
    title: "NOIR FACES",
    meta: "[CASE STUDY] — [EDITORIAL] — [TYPOGRAPHY + VISUAL HIERARCHY]",
    status: "Finished Demo",
    image: "/images/work/noir-faces/hero.jpg",
    thumb: "/images/work/noir-faces/thumb.jpg",
    alt: "Noir Faces editorial photography preview",
    tags: ["Editorial"],
    liveUrl: "https://studio-tau-pearl.vercel.app/",
    figmaUrl: "",
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
      introHeading:
        "An editorial case study demonstrating typography restraint, spacing, and visual hierarchy.",
      introBody: [
        "Noir Faces is an editorial photography case study built around monochrome contrast, negative space, and gallery-led pacing — proving how layout, typography, and imagery create premium digital experiences without clutter.",
        "The work shows strong fundamentals applicable across commerce and brand projects: clear hierarchy, consistent spacing, intentional white space, and responsive image treatment.",
      ],
      challengeHeading:
        "Creating emotional depth through layout restraint rather than visual noise.",
      challengeBody: [
        "Editorial experiences require typography that supports mood without competing with imagery — headings, captions, and navigation text scaled and spaced to guide attention deliberately.",
        "Gallery sequencing, scroll pacing, and minimal interface chrome were designed to keep photography central while maintaining usable navigation on mobile and desktop.",
        "The case study documents wireframe-to-final progression in Figma, with layout grids and type styles applied consistently across breakpoints.",
      ],
      outcomeHeading:
        "An editorial case study proving typography, layout, and visual hierarchy craft.",
      outcomeBody: [
        "The completed work presents a refined editorial series where elegance and intimacy balance through disciplined layout, restrained type, and cinematic pacing.",
        "The project demonstrates branding sensibility — tone, contrast, and visual rhythm applied consistently — skills directly transferable to luxury fashion, beauty, and lifestyle e-commerce contexts.",
      ],
      details: [
        { label: "Status", value: "Case Study / Live Prototype" },
        { label: "Type", value: "Editorial UI/UX + Visual Design Case Study" },
        { label: "Timeline", value: "4 Months" },
        { label: "Category", value: "Editorial / Photography / Visual Design" },
        { label: "Techstack", value: "Next.js / TypeScript / GSAP / Lenis" },
        {
          label: "Role",
          value: "UI/UX Design / Visual Design / Frontend Development",
        },
        { label: "Location", value: "Cape Town, South Africa" },
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
