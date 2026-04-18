"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AboutExperienceScroll, {
  type AboutExperienceItem,
} from "@/components/about/about-experience-scroll";
import AboutPrinciplesScroll from "@/components/about/about-principles-scroll";

type TableRow = {
  label: string;
  detail: string;
  source: string;
};

type TableGroup = {
  year: string;
  rows: TableRow[];
};

type FloatingCardConfig = {
  src: string;
  alt: string;
  className: string;
  x: number[];
  y: number[];
  rotate: number[];
  duration: number;
};

const heroMedia = "/images/work/2.png";

const experiences: AboutExperienceItem[] = [
  {
    id: "independent",
    title: "Independent",
    period: "2020 — Now",
    blurb:
      "Frontend developer working across self-initiated concepts, product interfaces, and visual systems with a strong focus on clarity, motion, and structure.",
    images: [
      "/images/work/5.png",
      "/images/work/3.png",
      "/images/work/4.png",
      "/images/work/2.png",
      "/images/work/5.png",
      "/images/work/3.png",
    ],
  },
  {
    id: "landscope",
    title: "Landscope",
    period: "2025",
    blurb:
      "A collaborative workspace concept for professionals in the built environment, focused on structure, workflow visibility, and premium interface rhythm.",
    images: [
      "/images/work/2.png",
      "/images/work/5.png",
      "/images/work/3.png",
      "/images/work/4.png",
      "/images/work/2.png",
      "/images/work/5.png",
    ],
  },
  {
    id: "mybud",
    title: "myBUD",
    period: "2025",
    blurb:
      "A cannabis identity and loyalty system designed around membership, customer experience, and a premium digital-meets-physical product feeling.",
    images: [
      "/images/work/4.png",
      "/images/work/3.png",
      "/images/work/2.png",
      "/images/work/5.png",
      "/images/work/4.png",
      "/images/work/3.png",
    ],
  },
  {
    id: "house-of-jireh",
    title: "House of Jireh",
    period: "2025",
    blurb:
      "A nonprofit-focused web direction exploring warmth, trust, readability, and meaningful calls to action through a restrained visual system.",
    images: [
      "/images/work/5.png",
      "/images/work/2.png",
      "/images/work/4.png",
      "/images/work/3.png",
      "/images/work/5.png",
      "/images/work/2.png",
    ],
  },
];

const recognitions: TableGroup[] = [
  {
    year: "2026",
    rows: [
      {
        label: "Frontend profile redesign",
        detail: "Visual system refinement / motion language / page structure",
        source: "Personal",
      },
      {
        label: "About section rebuild",
        detail: "Narrative layout / editorial spacing / system thinking",
        source: "Portfolio",
      },
    ],
  },
  {
    year: "2025",
    rows: [
      {
        label: "Landscope concept",
        detail: "Product direction / UI system / dashboard thinking",
        source: "Concept",
      },
      {
        label: "myBUD identity system",
        detail: "Membership experience / loyalty flow / premium positioning",
        source: "Concept",
      },
      {
        label: "House of Jireh website direction",
        detail: "Storytelling / hierarchy / trust-led presentation",
        source: "Client concept",
      },
    ],
  },
  {
    year: "2024",
    rows: [
      {
        label: "Frontend motion studies",
        detail: "Interaction detail / transitions / landing-page experiments",
        source: "Archive",
      },
    ],
  },
];

const contributions: TableGroup[] = [
  {
    year: "2025",
    rows: [
      {
        label: "Landscope",
        detail:
          "Contributed product thinking, page architecture, and premium UI direction",
        source: "Workspace concept",
      },
      {
        label: "myBUD",
        detail:
          "Contributed identity structure, membership ideas, and e-commerce visual direction",
        source: "Cannabis platform",
      },
    ],
  },
  {
    year: "2024",
    rows: [
      {
        label: "Frontend experiments",
        detail:
          "Contributed interaction studies, animation systems, and layout exploration",
        source: "Personal archive",
      },
      {
        label: "Portfolio motion work",
        detail:
          "Contributed page transitions, hover behavior, and presentation rhythm",
        source: "Personal website",
      },
    ],
  },
];

const floatingCards: FloatingCardConfig[] = [
  {
    src: "/images/work/5.png",
    alt: "Phone concept on orange fabric",
    className: "left-[12%] top-[12%] w-[170px] sm:w-[190px]",
    x: [40, 18, -8, -28, -46],
    y: [0, -6, 2, -3, 0],
    rotate: [-1.2, -0.5, 0.2, 0.7, -0.8],
    duration: 12,
  },
  {
    src: "/images/work/2.png",
    alt: "Laptop concept preview",
    className: "left-[22%] top-[22%] w-[130px] sm:w-[150px]",
    x: [28, 10, -8, -24, -36],
    y: [0, 4, -2, 3, 0],
    rotate: [1, 0.4, -0.2, -0.7, 0.8],
    duration: 11,
  },
  {
    src: "/images/work/3.png",
    alt: "Mobile editorial preview",
    className: "left-[50%] top-[11%] w-[150px] sm:w-[170px]",
    x: [24, 10, -6, -18, -30],
    y: [0, -5, 3, -2, 0],
    rotate: [-1, -0.2, 0.4, 0.8, -0.6],
    duration: 13,
  },
  {
    src: "/images/work/4.png",
    alt: "App interface preview",
    className: "right-[18%] top-[16%] w-[128px] sm:w-[148px]",
    x: [30, 12, -4, -20, -34],
    y: [0, 3, -3, 2, 0],
    rotate: [1, 0.2, -0.4, -0.8, 0.6],
    duration: 12.5,
  },
  {
    src: "/images/work/3.png",
    alt: "Floating phone preview",
    className: "right-[8%] top-[24%] w-[128px] sm:w-[148px]",
    x: [22, 8, -6, -18, -32],
    y: [0, -4, 2, -3, 0],
    rotate: [-0.8, -0.1, 0.3, 0.7, -0.6],
    duration: 11.8,
  },
  {
    src: "/images/work/4.png",
    alt: "Artwork preview",
    className: "right-[20%] bottom-[18%] w-[128px] sm:w-[148px]",
    x: [24, 10, -4, -16, -28],
    y: [0, 4, -2, 2, 0],
    rotate: [0.8, 0.2, -0.2, -0.6, 0.4],
    duration: 12.8,
  },
  {
    src: "/images/work/2.png",
    alt: "Phone interface preview",
    className: "left-[8%] bottom-[16%] w-[118px] sm:w-[136px]",
    x: [34, 16, 0, -20, -34],
    y: [0, -3, 3, -2, 0],
    rotate: [-1, -0.4, 0.1, 0.6, -0.7],
    duration: 11.6,
  },
  {
    src: "/images/work/5.png",
    alt: "Phone concept repeat preview",
    className: "right-[6%] bottom-[8%] w-[138px] sm:w-[158px]",
    x: [20, 8, -6, -18, -30],
    y: [0, 3, -2, 2, 0],
    rotate: [0.9, 0.2, -0.2, -0.6, 0.5],
    duration: 13.2,
  },
];

function HeaderNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-white/92 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-5 md:px-8 lg:px-10 xl:px-12">
        <Link href="/" className="inline-flex items-center">
          <div className="flex h-[28px] w-[28px] items-center justify-center border-[3px] border-black">
            <div className="h-[10px] w-[10px] bg-[#ff4d12]" />
          </div>
        </Link>

        <nav className="flex items-center gap-7 text-[15px] text-black/88">
          <Link href="/work" className="transition hover:text-black/55">
            Work
          </Link>
          <Link href="/gallery" className="transition hover:text-black/55">
            Archive
          </Link>
          <span className="text-black/26">About</span>
          <Link
            href="/contact"
            className="rounded-full bg-black px-4 py-2 text-[15px] text-white transition hover:bg-[#ff4d12] hover:text-black"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function TableSection({
  count,
  title,
  note,
  groups,
}: {
  count: string;
  title: string;
  note: string;
  groups: TableGroup[];
}) {
  return (
    <section className="border-t border-black/8 px-6 py-24 md:px-8 lg:px-10 xl:px-12">
      <div className="grid gap-14 lg:grid-cols-[130px_1fr_340px] lg:items-start">
        <div className="text-[72px] font-light leading-none tracking-[-0.06em] text-black">
          {count}
        </div>

        <div>
          <h2 className="text-[clamp(2.8rem,5vw,4.4rem)] font-light leading-[0.95] tracking-[-0.06em] text-black">
            {title}
          </h2>
        </div>

        <p className="max-w-[32ch] text-[17px] leading-[1.62] text-black/74">
          {note}
        </p>
      </div>

      <div className="mt-14 space-y-12">
        {groups.map((group) => (
          <div key={group.year} className="border-t border-black/8 pt-7">
            <div className="grid gap-5 lg:grid-cols-[120px_1fr]">
              <div className="text-[28px] font-light tracking-[-0.04em] text-black/28">
                {group.year}
              </div>

              <div className="space-y-2">
                {group.rows.map((row, index) => (
                  <div
                    key={`${group.year}-${row.label}-${index}`}
                    className="grid items-center gap-3 rounded-[18px] px-4 py-4 transition hover:bg-white/60 lg:grid-cols-[1.2fr_1.6fr_180px]"
                  >
                    <div className="text-[18px] text-black">{row.label}</div>
                    <div className="text-[16px] text-black/48">
                      {row.detail}
                    </div>
                    <div className="text-[16px] text-black/32 lg:text-right">
                      {row.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FloatingCard({
  card,
  index,
  reduceMotion,
}: {
  card: FloatingCardConfig;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        reduceMotion
          ? { x: 0, y: 0, rotate: 0, opacity: 1 }
          : {
              x: card.x,
              y: card.y,
              rotate: card.rotate,
              opacity: 1,
            }
      }
      transition={{
        duration: card.duration,
        delay: index * 0.18,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className={`absolute hidden md:block will-change-transform ${card.className}`}
    >
      <div className="relative aspect-[1.12/0.72] overflow-hidden rounded-[2px] bg-[#e7e1d8] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}

function SideBySideSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden border-t border-black/8 px-6 py-32 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="relative min-h-[680px]">
          {floatingCards.map((card, index) => (
            <FloatingCard
              key={`${card.src}-${index}`}
              card={card}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}

          <div className="flex min-h-[680px] items-center justify-center">
            <div className="text-center">
              <h2 className="mx-auto max-w-[760px] text-[clamp(3rem,6vw,5.4rem)] font-light leading-[0.99] tracking-[-0.08em] text-black">
                Crafting products
                <br />
                side by side
              </h2>

              <Link
                href="/contact"
                className="mt-10 inline-flex h-[56px] min-w-[236px] items-center justify-center rounded-full bg-black px-8 text-[15px] font-medium tracking-[-0.02em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:bg-[#ff4d12] hover:text-black"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      <HeaderNav />

      <section className="px-6 pb-24 pt-28 md:px-8 md:pt-32 lg:px-10 lg:pb-28 lg:pt-[11rem] xl:px-12 xl:pt-[12.5rem]">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-[920px] lg:max-w-[960px] xl:max-w-[1020px]">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-[clamp(3.2rem,7vw,5.2rem)] font-light leading-[0.98] tracking-[-0.078em]"
            >
              Marcus Mdluli
            </motion.h1>

            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-3 max-w-[900px] lg:max-w-[920px] xl:max-w-[980px] text-[clamp(2.95rem,6vw,4.85rem)] font-light leading-[1] tracking-[-0.078em] text-black/22"
            >
              Designing digital products to feel clear, purposeful, and
              memorable.
            </motion.h2>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="relative mt-16 aspect-[16/5.4] overflow-hidden bg-[#e7e1d8] lg:mt-20 lg:aspect-[16/4.8] xl:aspect-[16/4.5]"
          >
            <Image
              src={heroMedia}
              alt="About hero"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div />
            <p className="max-w-[28ch] text-[17px] leading-[1.72] text-black/76 lg:pt-2">
              Frontend developer building premium digital experiences through
              structure, typography, motion, and quiet attention to detail.
            </p>
          </div>
        </div>
      </section>

      <AboutExperienceScroll items={experiences} />

      <AboutPrinciplesScroll />

      <TableSection
        count="08"
        title="Recognitions"
        note="A simple record of recent milestones, portfolio iterations, and selected work markers."
        groups={recognitions}
      />

      <TableSection
        count="06"
        title="Contributed to"
        note="A compact view of the concepts, systems, and product directions I’ve shaped through personal and collaborative work."
        groups={contributions}
      />

      <SideBySideSection />
    </main>
  );
}
