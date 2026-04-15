"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { GalleryMedia, Sketch } from "@/data/gallery";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.22em] text-black/42">
      {children}
    </p>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <motion.div
      variants={staggerList}
      initial="hidden"
      animate="show"
      className="mt-4 space-y-3"
    >
      {items.map((item) => (
        <motion.div
          key={item}
          variants={listItem}
          className="flex items-start gap-3 border-b border-black/8 pb-3"
        >
          <motion.span
            className="mt-[7px] h-[7px] w-[7px] bg-[#ff4d12]"
            whileHover={{ scale: 1.25, rotate: 45 }}
            transition={{ duration: 0.2 }}
          />
          <p className="text-[0.96rem] leading-[1.75] text-black/72">{item}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -26 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 26 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerList: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function MediaFrame({
  media,
  fallbackImage,
  fallbackAlt,
  aspectClass,
  objectPosition = "center center",
  priority = false,
  dark = false,
}: {
  media?: GalleryMedia;
  fallbackImage: string;
  fallbackAlt: string;
  aspectClass: string;
  objectPosition?: string;
  priority?: boolean;
  dark?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const asset = media ?? {
    kind: "image" as const,
    src: fallbackImage,
    alt: fallbackAlt,
    objectPosition,
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 110, damping: 18, mass: 0.5 });

  const x = useTransform(sx, [-1, 1], [-12, 12]);
  const y = useTransform(sy, [-1, 1], [-10, 10]);
  const scale = useTransform(sx, [-1, 1], [1.035, 1.05]);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    mx.set(px * 2 - 1);
    my.set(py * 2 - 1);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.28 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden border border-black/10 bg-black ${aspectClass}`}
    >
      <motion.div
        style={reduceMotion ? undefined : { x, y, scale }}
        className="absolute inset-0"
      >
        {asset.kind === "video" ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={asset.poster}
            style={{ objectPosition: asset.objectPosition ?? objectPosition }}
          >
            <source src={asset.src} />
          </video>
        ) : (
          <Image
            src={asset.src}
            alt={asset.alt ?? fallbackAlt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 48vw, 100vw"
            className="object-cover transition-transform duration-700"
            style={{ objectPosition: asset.objectPosition ?? objectPosition }}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[#ff4d12]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className={`pointer-events-none absolute inset-0 ${
          dark
            ? "bg-gradient-to-t from-black/28 via-transparent to-transparent"
            : "bg-gradient-to-t from-black/20 via-transparent to-transparent"
        }`}
      />

      <motion.div
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: "120%", opacity: [0, 0.16, 0] }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="pointer-events-none absolute inset-y-0 w-[24%] bg-gradient-to-r from-transparent via-white/28 to-transparent"
      />

      <div className="absolute inset-0 border border-white/6" />
    </motion.div>
  );
}

function MuseumFrameDetail({
  sketch,
  index,
  total,
}: {
  sketch: Sketch;
  index: number;
  total: number;
}) {
  return (
    <div className="overflow-x-hidden px-6 py-8 sm:px-8 lg:px-10 xl:px-12">
      <div className="grid gap-8 xl:gap-10">
        <div className="grid gap-8 xl:grid-cols-[44px_minmax(0,1.02fr)_72px_minmax(0,0.86fr)] xl:items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            className="hidden xl:flex justify-center pt-2"
          >
            <div className="[writing-mode:vertical-rl] text-[11px] uppercase tracking-[0.28em] text-black/68">
              Editorial Study
            </div>
          </motion.div>

          <div className="min-w-0">
            <MediaFrame
              media={sketch.heroMedia}
              fallbackImage={sketch.image}
              fallbackAlt={sketch.title}
              aspectClass="aspect-[1.3/0.82]"
              priority
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.08 }}
              className="mt-5 max-w-[720px] space-y-4"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-black/50">
                <span>{sketch.artist}</span>
                <span className="h-[4px] w-[4px] bg-[#ff4d12]" />
                <span>{sketch.year}</span>
                <span className="h-[4px] w-[4px] bg-[#ff4d12]" />
                <span>
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              <h1 className="text-[clamp(2.2rem,4vw,4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black">
                {sketch.title}
              </h1>

              <p className="max-w-[46ch] text-[0.98rem] leading-[1.9] text-black/72">
                {sketch.buildSummary}
              </p>

              <div className="pt-2">
                <SectionLabel>Code Used</SectionLabel>
                <DetailList items={sketch.codeUsed.slice(0, 3)} />
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.12 }}
            className="hidden xl:flex justify-center pt-2"
          >
            <div className="[writing-mode:vertical-rl] text-[11px] uppercase leading-[1.9] tracking-[0.24em] text-black/54">
              {sketch.medium} / UI / UX / Motion / Layout / Frontend / Visual Intent
            </div>
          </motion.div>

          <div className="min-w-0">
            <MediaFrame
              media={sketch.sideMedia}
              fallbackImage={sketch.image}
              fallbackAlt={`${sketch.title} detail`}
              aspectClass="aspect-[0.82/1.16]"
              objectPosition="72% center"
              dark
            />
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.16 }}
          className="grid gap-8 border-t border-black/8 pt-8 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div className="min-w-0 space-y-8">
            <div>
              <SectionLabel>Tech Used</SectionLabel>
              <motion.div
                variants={staggerList}
                initial="hidden"
                animate="show"
                className="mt-4 flex flex-wrap gap-3"
              >
                {sketch.tech.map((item) => (
                  <motion.span
                    key={item}
                    variants={listItem}
                    whileHover={{ y: -2, backgroundColor: "#ffffff" }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center border border-black/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-black/72"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div>
              <SectionLabel>Visual Intent</SectionLabel>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.22 }}
                className="mt-3 max-w-[56ch] text-[0.98rem] leading-[1.85] text-black/70"
              >
                {sketch.visualIntent}
              </motion.p>
            </div>
          </div>

          <div className="min-w-0 space-y-8">
            <div>
              <SectionLabel>UI / UX Thinking</SectionLabel>
              <DetailList items={sketch.uiux} />
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.28 }}
              className="pt-2"
            >
              <Link href="/gallery" className="group inline-flex items-stretch">
                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex h-[54px] items-center bg-[#ff4d12] px-6 text-[0.84rem] font-medium uppercase tracking-[0.08em] text-black"
                >
                  Back to Gallery
                </motion.span>
                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex h-[54px] w-[54px] items-center justify-center bg-[#ff4d12] text-black"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DefaultDetail({
  sketch,
  index,
  total,
}: {
  sketch: Sketch;
  index: number;
  total: number;
}) {
  return (
    <div className="overflow-x-hidden px-6 py-8 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1.15fr)_420px] lg:gap-10 lg:px-10 xl:grid-cols-[minmax(0,1.2fr)_460px] xl:gap-14 xl:px-12">
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="min-w-0">
        <MediaFrame
          fallbackImage={sketch.image}
          fallbackAlt={sketch.title}
          aspectClass="aspect-[1.18/1]"
          priority
        />

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="text-[12px] uppercase tracking-[0.18em] text-black/54">
            {sketch.artist}
          </p>
          <span className="h-[4px] w-[4px] bg-[#ff4d12]" />
          <p className="text-[12px] uppercase tracking-[0.18em] text-black/54">
            {sketch.year}
          </p>
          <span className="h-[4px] w-[4px] bg-[#ff4d12]" />
          <p className="text-[12px] uppercase tracking-[0.18em] text-black/54">
            {sketch.medium}
          </p>
          <span className="h-[4px] w-[4px] bg-[#ff4d12]" />
          <p className="text-[12px] uppercase tracking-[0.18em] text-black/54">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeRight}
        initial="hidden"
        animate="show"
        className="mt-10 flex min-w-0 flex-col lg:mt-0"
      >
        <SectionLabel>Project Detail</SectionLabel>

        <h1 className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[0.92] tracking-[-0.06em]">
          {sketch.title}
        </h1>

        <p className="mt-5 max-w-[42ch] text-[1rem] leading-[1.9] text-black/72">
          {sketch.buildSummary}
        </p>

        <div className="mt-8 space-y-8">
          <div>
            <SectionLabel>Visual Intent</SectionLabel>
            <p className="mt-3 text-[0.98rem] leading-[1.85] text-black/70">
              {sketch.visualIntent}
            </p>
          </div>

          <div>
            <SectionLabel>Tech Used</SectionLabel>
            <motion.div
              variants={staggerList}
              initial="hidden"
              animate="show"
              className="mt-4 flex flex-wrap gap-3"
            >
              {sketch.tech.map((item) => (
                <motion.span
                  key={item}
                  variants={listItem}
                  whileHover={{ y: -2, backgroundColor: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center border border-black/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-black/72"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div>
            <SectionLabel>Code Used</SectionLabel>
            <DetailList items={sketch.codeUsed} />
          </div>

          <div>
            <SectionLabel>UI / UX Thinking</SectionLabel>
            <DetailList items={sketch.uiux} />
          </div>
        </div>

        <div className="mt-10">
          <Link href="/gallery" className="group inline-flex items-stretch">
            <motion.span
              whileHover={{ y: -1 }}
              transition={{ duration: 0.18 }}
              className="inline-flex h-[54px] items-center bg-[#ff4d12] px-6 text-[0.84rem] font-medium uppercase tracking-[0.08em] text-black"
            >
              Back to Gallery
            </motion.span>
            <motion.span
              whileHover={{ y: -1 }}
              transition={{ duration: 0.18 }}
              className="inline-flex h-[54px] w-[54px] items-center justify-center bg-[#ff4d12] text-black"
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export function GalleryDetailView({
  sketch,
  index,
  total,
}: {
  sketch: Sketch;
  index: number;
  total: number;
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f2f0e8] text-black">
      <section className="px-6 py-6 sm:px-8 sm:py-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-[1720px]">
          <div className="overflow-x-hidden border border-black/8 bg-[#f2f0e8]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between border-b border-black/10 px-6 py-5 sm:px-8 lg:px-10 xl:px-12"
            >
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-black/72 transition hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to gallery
              </Link>

              <p className="text-[10px] uppercase tracking-[0.22em] text-black/72">
                About Image
              </p>
            </motion.div>

            {sketch.detailLayout === "museum_frame" ? (
              <MuseumFrameDetail sketch={sketch} index={index} total={total} />
            ) : (
              <DefaultDetail sketch={sketch} index={index} total={total} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}