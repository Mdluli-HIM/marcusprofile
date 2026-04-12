"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Plus } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { TransitionLink } from "@/components/layout/page-transition";

const aboutImages = {
  hero: "/images/contact/about-page.png",
  story: "/images/contact/how-did-er-get-here.png",
  process: "/images/contact/Creative workspace from a fisheye view.png",
  cta: "/images/profile-hero.jpg",
};

const principles = [
  "I design with hierarchy, proportion, rhythm, and contrast before decoration.",
  "Motion should direct attention, connect sections, and give the interface intention.",
  "I care about typography, spacing, alignment, interaction states, and visual control.",
  "I like work that feels graphic and memorable without becoming noisy or hard to use.",
  "I build with modern frontend tools, but I want the final result to feel human and authored.",
  "I would rather make a few sections unforgettable than make an entire site feel generic.",
];

const stats = [
  { value: "100%", label: "Frontend Focus" },
  { value: "0", label: "Template Thinking" },
  { value: "1", label: "Clear Point Of View" },
];

function Reveal({
  children,
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTag({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.82rem] uppercase tracking-[0.22em] text-[#ff4d12]">
      {children}
    </p>
  );
}

function SectionDivider() {
  return (
    <Reveal y={18}>
      <div className="mx-auto max-w-[1600px] px-5 py-1 md:px-10 lg:px-12 xl:px-16">
        <div className="flex items-center gap-4 py-4 md:py-5">
          <span className="h-[12px] w-[12px] rotate-45 bg-[#ff4d12]" />
          <div className="h-px flex-1 bg-black/10" />
        </div>
      </div>
    </Reveal>
  );
}

function AboutButton({
  href,
  children,
  variant = "orange",
}: {
  href: string;
  children: ReactNode;
  variant?: "orange" | "white" | "black";
}) {
  const colors =
    variant === "black"
      ? {
          main: "bg-black text-white",
          side: "bg-black text-white",
        }
      : variant === "white"
        ? {
            main: "bg-white text-black",
            side: "bg-white text-black",
          }
        : {
            main: "bg-[#ff4d12] text-black",
            side: "bg-[#ff4d12] text-black",
          };

  return (
    <TransitionLink href={href} className="group inline-flex items-stretch">
      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.18 }}
        className={`inline-flex h-[56px] items-center px-7 text-[0.92rem] font-medium uppercase tracking-[0.08em] ${colors.main}`}
      >
        {children}
      </motion.span>

      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.18 }}
        className={`inline-flex h-[56px] w-[56px] items-center justify-center ${colors.side}`}
      >
        <Plus size={18} strokeWidth={2.2} />
      </motion.span>
    </TransitionLink>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex min-h-[220px] flex-col justify-between bg-[#090909] p-6 md:min-h-[280px] lg:min-h-[320px] lg:p-8"
    >
      <p className="text-[clamp(4rem,8vw,6rem)] font-light leading-none tracking-[-0.08em] text-white">
        {value}
      </p>

      <div className="flex items-center gap-3">
        <span className="h-[12px] w-[12px] bg-[#ff4d12]" />
        <p className="text-[0.96rem] uppercase tracking-[0.08em] text-white/76">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

function ParallaxImage({
  src,
  alt,
  y,
  priority = false,
  className = "",
  sizes = "(max-width: 1280px) 100vw, 45vw",
}: {
  src: string;
  alt: string;
  y?: MotionValue<string>;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div style={y ? { y } : undefined} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const storyImageRef = useRef<HTMLDivElement | null>(null);
  const processImageRef = useRef<HTMLDivElement | null>(null);
  const ctaImageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: storyImageProgress } = useScroll({
    target: storyImageRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: processImageProgress } = useScroll({
    target: processImageRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: ctaImageProgress } = useScroll({
    target: ctaImageRef,
    offset: ["start end", "end start"],
  });

  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "16%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [0.42, 0.68]);
  const heroTitleScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const heroTitleY = useTransform(heroProgress, [0, 1], [0, -48]);
  const heroBodyY = useTransform(heroProgress, [0, 1], [0, -22]);
  const heroRadialOpacity = useTransform(
    heroProgress,
    [0, 0.75, 1],
    [0.12, 0.06, 0],
  );
  const storyImageY = useTransform(storyImageProgress, [0, 1], ["-8%", "8%"]);
  const processImageY = useTransform(
    processImageProgress,
    [0, 1],
    ["-10%", "8%"],
  );
  const ctaImageY = useTransform(ctaImageProgress, [0, 1], ["-6%", "10%"]);

  return (
    <SiteShell>
      <main className="bg-[#f2f2ef] text-black">
        <section
          ref={heroRef}
          className="relative min-h-[88svh] bg-black lg:h-[180vh]"
        >
          <div className="relative min-h-[88svh] overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:min-h-0">
            <motion.div
              style={{ y: heroImageY, scale: heroImageScale }}
              className="absolute inset-0"
            >
              <Image
                src={aboutImages.hero}
                alt="Marcus Mdluli portrait"
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </motion.div>

            <motion.div
              style={{ opacity: heroOverlayOpacity }}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              style={{ opacity: heroRadialOpacity }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]"
            />

            <div className="relative z-10 mx-auto flex h-full min-h-[88svh] max-w-[1600px] items-end px-5 pb-10 pt-[calc(4.5rem+env(safe-area-inset-top))] md:px-10 md:pb-12 md:pt-24 lg:min-h-0 lg:px-12 lg:pt-24 xl:px-16 xl:pb-16">
              <div className="w-full">
                <motion.p
                  style={{ y: heroBodyY }}
                  className="text-[0.72rem] uppercase tracking-[0.24em] text-white/55 md:text-[0.8rem] md:tracking-[0.28em]"
                >
                  About Marcus / Frontend / Motion / Visual Systems
                </motion.p>

                <motion.h1
                  style={{ scale: heroTitleScale, y: heroTitleY }}
                  className="mt-4 max-w-[1320px] origin-left text-[clamp(2.35rem,10.5vw,8.3rem)] font-light leading-[0.94] tracking-[-0.07em] text-white md:mt-6 md:leading-[0.9] md:tracking-[-0.08em]"
                >
                  One developer.
                  <span className="block">One obsession: craft.</span>
                </motion.h1>

                <motion.div
                  style={{ y: heroBodyY }}
                  className="mt-8 grid gap-6 md:mt-10 md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
                >
                  <p className="max-w-[760px] text-[1.02rem] leading-[1.65] text-white/78 md:text-[1.14rem] md:leading-[1.75] lg:text-[1.26rem] lg:leading-[1.82]">
                    I am a frontend developer focused on visual identity,
                    motion, creative layout systems, and interfaces that feel
                    memorable from the first second. I care about typography,
                    rhythm, structure, and making websites feel intentional
                    instead of assembled.
                  </p>

                  <div className="pt-1 lg:justify-self-end lg:pt-0">
                    <AboutButton href="/contact" variant="white">
                      Let&apos;s Work Together
                    </AboutButton>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/8 bg-[#f2f2ef]">
          <div className="mx-auto max-w-[1600px] px-5 py-6 md:px-10 md:py-8 lg:px-12 xl:px-16">
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center md:gap-x-10 md:gap-y-5">
                <p className="text-[0.82rem] uppercase tracking-[0.18em] text-black/42 md:text-[0.92rem]">
                  Trusted by
                </p>
                <p className="text-[1.45rem] font-semibold tracking-[-0.05em] text-black/55 md:text-[2rem]">
                  Frontend
                </p>
                <p className="text-[1.45rem] font-semibold tracking-[-0.05em] text-black/55 md:text-[2rem]">
                  Motion
                </p>
                <p className="text-[1.45rem] font-semibold tracking-[-0.05em] text-black/55 md:text-[2rem]">
                  Systems
                </p>
                <p className="text-[0.82rem] uppercase tracking-[0.18em] text-black/42 md:text-[0.92rem]">
                  + detail-led execution
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <SectionDivider />

        <section className="bg-[#f2f2ef]">
          <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20 lg:px-12 xl:px-16 xl:py-32">
            <div className="grid gap-10 xl:gap-14 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
              <Reveal>
                <div ref={storyImageRef} className="relative">
                  <ParallaxImage
                    src={aboutImages.story}
                    alt="Marcus studio portrait"
                    y={storyImageY}
                    className="h-[220px] bg-black/5 sm:h-[300px] md:h-[400px] lg:h-[520px] xl:h-[640px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 46vw"
                  />
                </div>
              </Reveal>

              <div className="xl:pt-8">
                <Reveal>
                  <SectionTag>{"// The Story"}</SectionTag>
                </Reveal>

                <Reveal delay={0.06}>
                  <h2 className="mt-3 text-[clamp(2.1rem,7vw,5.2rem)] font-light leading-[0.98] tracking-[-0.06em] text-black md:mt-4 md:leading-[0.96] md:tracking-[-0.07em]">
                    How I got here
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="mt-8 max-w-[760px] space-y-5 text-[1.05rem] leading-[1.72] text-black/74 md:mt-10 md:space-y-7 md:text-[1.22rem] md:leading-[1.85]">
                    <p>
                      I have always been drawn to websites that feel deliberate.
                      Not just clean, but structured. Not just animated, but
                      alive in the right places.
                    </p>
                    <p>
                      What started as curiosity turned into an obsession with
                      frontend craft, motion systems, and visual decisions that
                      make a page feel expensive before a user even reads the
                      copy.
                    </p>
                    <p>
                      My taste leans toward graphic layouts, sharp hierarchy,
                      restrained interaction, and work that carries personality
                      without losing clarity. I like interfaces that feel
                      authored.
                    </p>
                    <p>
                      That is what I want my work to communicate: intention,
                      control, and a point of view that is difficult to forget.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="bg-[#080808] text-white">
          <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20 lg:px-12 xl:px-16 xl:py-32">
            <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start xl:gap-16">
              <div className="xl:sticky xl:top-28">
                <Reveal>
                  <SectionTag>{"// How I Work"}</SectionTag>
                </Reveal>

                <Reveal delay={0.06}>
                  <h2 className="mt-3 text-[clamp(2.1rem,7vw,5rem)] font-light leading-[0.98] tracking-[-0.06em] text-white md:mt-4 md:leading-[0.96] md:tracking-[-0.07em]">
                    The way I build
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-[460px] text-[1.02rem] leading-[1.68] text-white/68 md:mt-8 md:text-[1.14rem] md:leading-[1.8]">
                    This page is the only long scroll in the site because it
                    should feel like a deeper read. It is where the process,
                    approach, and values have room to breathe.
                  </p>
                </Reveal>

                <Reveal delay={0.14}>
                  <div
                    ref={processImageRef}
                    className="relative mt-8 xl:mt-12 xl:block"
                  >
                    <ParallaxImage
                      src={aboutImages.process}
                      alt="Marcus process portrait"
                      y={processImageY}
                      className="h-[200px] bg-white/5 sm:h-[260px] md:h-[340px] xl:h-[420px]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 34vw"
                    />
                  </div>
                </Reveal>
              </div>

              <div className="space-y-0">
                {principles.map((item, index) => (
                  <Reveal key={item} delay={index * 0.04} y={26}>
                    <div className="grid grid-cols-[16px_1fr] gap-4 border-b border-white/10 py-5 md:grid-cols-[18px_1fr] md:gap-5 md:py-7">
                      <div className="flex items-center pt-1">
                        <span className="h-[10px] w-[10px] rotate-45 bg-[#ff4d12]" />
                      </div>
                      <p className="max-w-[960px] text-[1.05rem] leading-[1.68] text-white/82 md:text-[1.24rem] md:leading-[1.75]">
                        {item}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="bg-black text-white">
          <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20 lg:px-12 xl:px-16 xl:py-28">
            <div className="grid gap-3 sm:gap-4 md:gap-5 xl:grid-cols-[1fr_1fr_1fr_0.98fr]">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.06 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <StatCard value={stat.value} label={stat.label} />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative min-h-[200px] overflow-hidden bg-[#151515] sm:min-h-[260px] md:min-h-[320px]"
              >
                <Image
                  src={aboutImages.process}
                  alt="Marcus portrait detail"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 24vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="bg-[#f2f2ef]">
          <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20 lg:px-12 xl:px-16 xl:py-32">
            <div className="grid gap-10 xl:gap-14 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
              <div>
                <Reveal>
                  <h2 className="text-[clamp(2.1rem,7vw,5.6rem)] font-light leading-[0.96] tracking-[-0.06em] text-black md:leading-[0.94] md:tracking-[-0.07em]">
                    Want to work together?
                  </h2>
                </Reveal>

                <Reveal delay={0.06}>
                  <div ref={ctaImageRef} className="relative mt-8 md:mt-10">
                    <ParallaxImage
                      src={aboutImages.cta}
                      alt="Marcus portrait"
                      y={ctaImageY}
                      className="h-[240px] bg-black/5 sm:h-[320px] md:h-[400px] lg:h-[420px] xl:h-[540px]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 48vw"
                    />
                  </div>
                </Reveal>
              </div>

              <div className="xl:pt-2">
                <Reveal>
                  <p className="max-w-[640px] text-[clamp(1.65rem,5.5vw,3.6rem)] font-light leading-[1.12] tracking-[-0.04em] text-black md:leading-[1.06] md:tracking-[-0.05em]">
                    Tell me what you&apos;re building. I&apos;ll tell you how I
                    can help.
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-10 space-y-2 text-[1.05rem] leading-[1.65] text-black/76 md:mt-16 md:space-y-3 md:text-[1.2rem] md:leading-[1.7] lg:mt-20">
                    <p>marcusmdle@gmail.com</p>
                    <p>Working with teams worldwide.</p>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-12 flex flex-wrap items-center gap-3 md:mt-16 lg:mt-20 lg:gap-4">
                    <TransitionLink
                      href="/contact"
                      className="text-[1.35rem] leading-none text-black/82 underline underline-offset-[6px] md:text-[1.8rem] md:underline-offset-8"
                    >
                      Get Started
                    </TransitionLink>

                    <AboutButton href="/contact" variant="black">
                      Book a 15-min Call
                    </AboutButton>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-14 text-[1.05rem] text-black/68 md:mt-20 lg:mt-24 md:text-[1.2rem]">
                    Let the details carry the feeling.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
