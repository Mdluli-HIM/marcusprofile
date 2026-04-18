"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SideNav } from "@/components/layout/side-nav";
import AboutExperienceScroll, {
  type AboutExperienceItem,
} from "@/components/about/about-experience-scroll";
import AboutPrinciplesScroll from "@/components/about/about-principles-scroll";

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

const floatingCards: FloatingCardConfig[] = [
  {
    src: "/images/work/5.png",
    alt: "Phone concept on orange fabric",
    className: "left-[14%] top-[12%] w-[160px] sm:w-[180px]",
    x: [-26, -8, 12, 28, 12, -8, -26],
    y: [0, -4, 2, 0, -2, 2, 0],
    rotate: [-1.2, -0.6, 0.2, 0.8, 0.2, -0.4, -1],
    duration: 11,
  },
  {
    src: "/images/work/2.png",
    alt: "Laptop concept preview",
    className: "left-[24%] top-[24%] w-[126px] sm:w-[144px]",
    x: [-20, -6, 10, 22, 10, -6, -20],
    y: [0, 3, -2, 0, 2, -1, 0],
    rotate: [1, 0.4, -0.2, -0.6, -0.1, 0.4, 0.8],
    duration: 10.5,
  },
  {
    src: "/images/work/3.png",
    alt: "Mobile editorial preview",
    className: "left-[50%] top-[11%] w-[146px] sm:w-[164px]",
    x: [-18, -4, 14, 24, 14, -4, -18],
    y: [0, -3, 2, 0, -2, 2, 0],
    rotate: [-1, -0.3, 0.2, 0.6, 0.2, -0.3, -0.8],
    duration: 12.5,
  },
  {
    src: "/images/work/4.png",
    alt: "App interface preview",
    className: "right-[18%] top-[15%] w-[124px] sm:w-[142px]",
    x: [-24, -10, 8, 20, 8, -10, -24],
    y: [0, 2, -2, 0, 2, -1, 0],
    rotate: [0.9, 0.3, -0.2, -0.5, -0.1, 0.2, 0.7],
    duration: 10.8,
  },
  {
    src: "/images/work/3.png",
    alt: "Floating phone preview",
    className: "right-[8%] top-[21%] w-[122px] sm:w-[140px]",
    x: [-18, -6, 10, 24, 10, -6, -18],
    y: [0, -3, 2, 0, -2, 1, 0],
    rotate: [-0.8, -0.2, 0.3, 0.7, 0.2, -0.3, -0.6],
    duration: 11.8,
  },
  {
    src: "/images/work/4.png",
    alt: "Artwork preview",
    className: "right-[20%] bottom-[18%] w-[124px] sm:w-[142px]",
    x: [-22, -8, 10, 22, 10, -8, -22],
    y: [0, 3, -2, 0, 2, -1, 0],
    rotate: [0.8, 0.2, -0.2, -0.5, -0.1, 0.3, 0.6],
    duration: 12.2,
  },
  {
    src: "/images/work/2.png",
    alt: "Phone interface preview",
    className: "left-[10%] bottom-[15%] w-[118px] sm:w-[134px]",
    x: [-24, -10, 8, 20, 8, -10, -24],
    y: [0, -3, 2, 0, -2, 2, 0],
    rotate: [-1, -0.3, 0.2, 0.5, 0.1, -0.3, -0.8],
    duration: 10.9,
  },
  {
    src: "/images/work/5.png",
    alt: "Phone concept repeat preview",
    className: "right-[6%] bottom-[9%] w-[134px] sm:w-[152px]",
    x: [-20, -6, 12, 24, 12, -6, -20],
    y: [0, 2, -2, 0, 2, -1, 0],
    rotate: [0.9, 0.2, -0.2, -0.6, -0.1, 0.3, 0.6],
    duration: 12.9,
  },
];

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
      initial={{
        opacity: 1,
        x: card.x[0],
        y: card.y[0],
        rotate: card.rotate[0],
      }}
      animate={
        reduceMotion
          ? { opacity: 1, x: 0, y: 0, rotate: 0 }
          : {
              opacity: 1,
              x: card.x,
              y: card.y,
              rotate: card.rotate,
            }
      }
      transition={{
        duration: card.duration,
        delay: index * 0.12,
        repeat: Infinity,
        ease: "easeInOut",
        times: reduceMotion ? undefined : [0, 0.18, 0.38, 0.62, 0.78, 0.9, 1],
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

          <div className="relative z-10 flex min-h-[680px] items-center justify-center">
            <div className="text-center">
              <h2 className="mx-auto max-w-[760px] text-[clamp(3rem,6vw,5.4rem)] font-light leading-[0.99] tracking-[-0.08em] text-black">
                Crafting products
                <br />
                side by side
              </h2>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-[15px] font-medium leading-none tracking-[-0.02em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:bg-[#ff4d12] hover:text-black"
              >
                <span className="whitespace-nowrap text-white">Get quote</span>
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
    <>
      <SideNav />

      <main className="min-h-screen overflow-x-hidden bg-white text-black lg:pl-[72px]">
        <section className="px-6 pb-18 pt-16 md:px-8 md:pt-20 lg:px-10 lg:pb-22 lg:pt-24 xl:px-12 xl:pt-28">
          <div className="mx-auto max-w-[1680px]">
            <div className="max-w-[1040px]">
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-[clamp(3.25rem,7vw,5.35rem)] font-light leading-[0.95] tracking-[-0.082em] text-black"
              >
                Marcus Mdluli
              </motion.h1>

              <motion.h2
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mt-2 max-w-[1120px] text-[clamp(3rem,6.1vw,5.15rem)] font-light leading-[0.98] tracking-[-0.082em] text-black/18"
              >
                Designing digital products to feel clear, purposeful, and
                memorable.
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-6 sm:mt-8 lg:mt-10"
          >
            <div className="relative w-full overflow-hidden bg-[#e7e1d8]">
              <div className="relative aspect-[3840/1760] min-h-[460px] sm:min-h-[560px] md:min-h-[660px] lg:min-h-[760px] xl:min-h-[840px] 2xl:min-h-[900px]">
                <Image
                  src={heroMedia}
                  alt="About hero"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          <div className="mx-auto mt-8 max-w-[1680px]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_470px]">
              <div />
              <p className="max-w-[30ch] text-[17px] leading-[1.72] text-black/72">
                Frontend developer building premium digital experiences through
                structure, typography, motion, and quiet attention to detail.
              </p>
            </div>
          </div>
        </section>

        <AboutExperienceScroll items={experiences} />

        <AboutPrinciplesScroll />

        <SideBySideSection />
      </main>
    </>
  );
}
