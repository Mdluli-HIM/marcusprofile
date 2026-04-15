"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { sketches, type Sketch } from "@/data/gallery";

const stageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "16%" : "-16%",
    opacity: 0,
    scale: 1.02,
    clipPath: direction > 0 ? "inset(0 0 0 22%)" : "inset(0 22% 0 0)",
    filter: "blur(2px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0 0 0)",
    filter: "blur(0px)",
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-10%" : "10%",
    opacity: 0,
    scale: 0.992,
    clipPath: direction > 0 ? "inset(0 22% 0 0)" : "inset(0 0 0 22%)",
    filter: "blur(1.5px)",
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function HeaderBar() {
  return (
    <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 text-[10px] uppercase tracking-[0.22em] text-black/72 sm:px-8 lg:px-10">
      <p className="text-black/88"></p>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">Graphic</span>
        <span>Designs</span>
      </div>
    </div>
  );
}

function WorkLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.18em] text-black/44">
      {children}
    </p>
  );
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="inline-flex h-[48px] w-[48px] items-center justify-center border border-black/12 bg-white text-black transition-colors hover:border-black/24 hover:bg-[#ebe7de]"
    >
      {children}
    </motion.button>
  );
}

function PreviewTile({
  sketch,
  side,
  direction,
  onClick,
}: {
  sketch: Sketch;
  side: "left" | "right";
  direction: number;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const enterX =
    side === "left" ? (direction > 0 ? 14 : -14) : direction > 0 ? 16 : -16;

  const exitX =
    side === "left" ? (direction > 0 ? -10 : 10) : direction > 0 ? -12 : 12;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex h-full w-full items-center justify-center"
    >
      <div className="w-full max-w-[96px] xl:max-w-[118px]">
        <div className="relative aspect-[0.68/1] overflow-hidden bg-black">
          <AnimatePresence
            mode="wait"
            custom={{ enterX, exitX }}
            initial={false}
          >
            <motion.div
              key={sketch.id}
              custom={{ enterX, exitX }}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      x: enterX,
                      opacity: 0,
                      scale: 0.985,
                      filter: "blur(1.5px)",
                    }
              }
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      x: exitX,
                      opacity: 0,
                      scale: 0.985,
                      filter: "blur(1.5px)",
                    }
              }
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src={sketch.image}
                alt={sketch.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`preview-accent-${side}-${sketch.id}`}
              initial={{
                x: direction > 0 ? "24%" : "-24%",
                opacity: 0,
                scaleX: 0.72,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scaleX: 1,
              }}
              exit={{
                x: direction > 0 ? "-24%" : "24%",
                opacity: 0,
                scaleX: 0.72,
              }}
              transition={{
                duration: 0.44,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 bottom-0 h-[2px] origin-center bg-[#ff4d12]"
            />
          </AnimatePresence>

          <div className="absolute inset-0 border border-black/10" />
          <div className="absolute inset-0 bg-black/8 transition-opacity duration-200 hover:opacity-0" />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`preview-caption-${side}-${sketch.id}`}
            initial={{
              opacity: 0,
              y: 6,
              x: direction > 0 ? 8 : -8,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{
              opacity: 0,
              y: -4,
              x: direction > 0 ? -6 : 6,
            }}
            transition={{ duration: 0.26 }}
            className={`pt-2 text-[11px] leading-[1.3] tracking-[-0.02em] text-black/82 ${
              side === "right" ? "text-right" : "text-left"
            }`}
          >
            {sketch.artist} — {sketch.title}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

function StaticDigit({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-[1.05em] min-w-[1.1ch] items-center justify-center tabular-nums ${className}`}
    >
      {value}
    </span>
  );
}

function RollingDigit({
  value,
  direction,
  className = "",
}: {
  value: string;
  direction: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline-flex h-[1.05em] min-w-[1.1ch] items-center justify-center overflow-hidden align-middle">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.span
          key={value}
          custom={direction}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  y: direction > 0 ? "115%" : "-115%",
                  opacity: 0,
                  filter: "blur(2px)",
                }
          }
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  y: direction > 0 ? "-115%" : "115%",
                  opacity: 0,
                  filter: "blur(2px)",
                }
          }
          transition={{
            duration: 0.46,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute inset-0 flex items-center justify-center tabular-nums ${className}`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ProjectCounter({
  current,
  total,
  direction,
}: {
  current: number;
  total: number;
  direction: number;
}) {
  const currentText = formatCounter(current);
  const totalText = formatCounter(total);
  const progress = total <= 1 ? 1 : (current - 1) / (total - 1);

  const currentLeft = currentText[0];
  const currentRight = currentText[1];
  const totalLeft = totalText[0];
  const totalRight = totalText[1];

  return (
    <div className="flex flex-col items-center gap-3 pb-1">
      <div className="flex items-center gap-4 text-[1.7rem] tracking-[-0.05em] xl:text-[1.9rem]">
        <span className="inline-flex items-center">
          <StaticDigit value={currentLeft} className="text-[#ff4d12]" />
          <RollingDigit
            value={currentRight}
            direction={direction}
            className="text-[#ff4d12]"
          />
        </span>

        <motion.span
          key={`divider-${current}`}
          initial={{ opacity: 0.3, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex origin-center text-black/30"
        >
          —
        </motion.span>

        <span className="inline-flex items-center text-black/72">
          <StaticDigit value={totalLeft} className="text-black/72" />
          <StaticDigit value={totalRight} className="text-black/72" />
        </span>
      </div>

      <div className="relative h-[2px] w-[170px] overflow-hidden bg-black/10 xl:w-[190px]">
        <motion.span
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-0 top-0 h-full bg-[#ff4d12]"
        />

        <motion.span
          animate={{ left: `calc(${progress * 100}% - 5px)` }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 rotate-45 bg-[#ff4d12]"
        />
      </div>

      <p className="text-[9px] uppercase tracking-[0.24em] text-black/34">
        Project Index
      </p>
    </div>
  );
}

function DesktopStage({
  currentSketch,
  previousSketch,
  nextSketch,
  direction,
  currentIndex,
  total,
  onPrev,
  onNext,
}: {
  currentSketch: Sketch;
  previousSketch: Sketch;
  nextSketch: Sketch;
  direction: number;
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hidden min-h-0 flex-1 lg:block">
      <div className="flex h-full min-h-0 flex-col px-8 pb-7 pt-8 lg:px-10 xl:px-12">
        <div className="text-center">
          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[0.22em] text-black/78 underline underline-offset-4"
          >
            Masterpieces
          </Link>
        </div>

        <div className="mt-6 min-h-0 flex-1">
          <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-7">
            <div className="grid min-h-0 grid-cols-[96px_minmax(0,1fr)_96px] items-end gap-4 xl:grid-cols-[118px_minmax(0,1fr)_118px] xl:gap-6">
              <PreviewTile
                sketch={previousSketch}
                side="left"
                direction={direction}
                onClick={onPrev}
              />

              <div className="flex min-w-0 items-center justify-center overflow-hidden">
                <div className="w-full max-w-[min(54vw,680px)]">
                  <div className="relative aspect-[1.02/1] overflow-hidden bg-black">
                    <AnimatePresence
                      mode="wait"
                      custom={direction}
                      initial={false}
                    >
                      <motion.div
                        key={currentSketch.id}
                        custom={direction}
                        variants={stageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                      >
                        <Image
                          src={currentSketch.image}
                          alt={currentSketch.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence
                      mode="wait"
                      custom={direction}
                      initial={false}
                    >
                      <motion.div
                        key={`accent-${currentSketch.id}`}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? "24%" : "-24%",
                          opacity: 0,
                          scaleX: 0.65,
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          scaleX: 1,
                        }}
                        exit={{
                          x: direction > 0 ? "-24%" : "24%",
                          opacity: 0,
                          scaleX: 0.65,
                        }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-x-0 bottom-0 h-[3px] origin-center bg-[#ff4d12]"
                      />
                    </AnimatePresence>

                    <div className="absolute inset-0 border border-black/10" />

                    {!reduceMotion && (
                      <motion.div
                        key={`sheen-${currentSketch.id}`}
                        initial={{
                          x: direction > 0 ? "-120%" : "120%",
                          opacity: 0,
                        }}
                        animate={{
                          x: direction > 0 ? "120%" : "-120%",
                          opacity: [0, 0.14, 0],
                        }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="pointer-events-none absolute inset-y-0 w-[28%] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      />
                    )}
                  </div>

                  <AnimatePresence
                    mode="wait"
                    custom={direction}
                    initial={false}
                  >
                    <motion.p
                      key={`caption-${currentSketch.id}`}
                      custom={direction}
                      initial={{
                        opacity: 0,
                        y: 8,
                        x: direction > 0 ? 10 : -10,
                      }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{
                        opacity: 0,
                        y: -6,
                        x: direction > 0 ? -8 : 8,
                      }}
                      transition={{ duration: 0.28 }}
                      className="pt-2 text-[11px] leading-[1.35] tracking-[-0.02em] text-black/88"
                    >
                      {currentSketch.artist} — {currentSketch.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <PreviewTile
                sketch={nextSketch}
                side="right"
                direction={direction}
                onClick={onNext}
              />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-end gap-6 border-t border-black/8 pt-6">
              <div className="min-w-0">
                <WorkLabel>{currentSketch.medium}</WorkLabel>

                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={`info-${currentSketch.id}`}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      y: 10,
                      x: direction > 0 ? 12 : -12,
                    }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      x: direction > 0 ? -10 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mt-3 text-[2rem] font-medium tracking-[-0.05em] text-black xl:text-[2.2rem]">
                      {currentSketch.title}
                    </h2>
                    <p className="mt-3 max-w-[360px] text-[0.96rem] leading-[1.75] text-black/68">
                      {currentSketch.note}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5">
                  <Link
                    href={`/gallery/${currentSketch.id}`}
                    className="group inline-flex items-stretch"
                  >
                    <motion.span
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex h-[52px] items-center bg-[#ff4d12] px-6 text-[0.82rem] font-medium uppercase tracking-[0.08em] text-black xl:h-[54px] xl:text-[0.84rem]"
                    >
                      About Image
                    </motion.span>
                    <motion.span
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex h-[52px] w-[52px] items-center justify-center bg-[#ff4d12] text-black xl:h-[54px] xl:w-[54px]"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </div>
              </div>

              <div className="flex items-end gap-3">
                <ControlButton onClick={onPrev} label="Previous project">
                  <ArrowLeft className="h-4 w-4" />
                </ControlButton>

                <ProjectCounter
                  current={currentIndex + 1}
                  total={total}
                  direction={direction}
                />

                <ControlButton onClick={onNext} label="Next project">
                  <ArrowRight className="h-4 w-4" />
                </ControlButton>
              </div>

              <div className="pb-1 text-right">
                <p className="text-[11px] uppercase tracking-[0.22em] text-black/48">
                  {currentSketch.artist} / {currentSketch.year}
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`status-${currentSketch.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.24 }}
                    className="mt-2 text-[11px] uppercase tracking-[0.22em] text-black/34"
                  >
                    Viewing{" "}
                    <span className="text-[#ff4d12]">
                      {formatCounter(currentIndex + 1)}
                    </span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileStage({
  sketch,
  direction,
  onPrev,
  onNext,
  currentIndex,
  total,
}: {
  sketch: Sketch;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}) {
  return (
    <div className="space-y-5 p-5 lg:hidden">
      <div className="border border-black/10 bg-white p-5">
        <WorkLabel>Sketch Archive</WorkLabel>
        <h1 className="mt-3 max-w-[280px] text-[2.3rem] font-medium uppercase leading-[0.92] tracking-[-0.06em] text-black">
          The sketches in all sorts of code
        </h1>
        <p className="mt-4 max-w-[420px] text-[0.96rem] leading-[1.8] text-black/70">
          A quiet coded archive shaped like a curated exhibition board.
        </p>
      </div>

      <div className="overflow-hidden border border-black/10 bg-white">
        <div className="relative aspect-[1.08/1] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={sketch.id}
              custom={direction}
              variants={stageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={sketch.image}
                alt={sketch.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={`mobile-accent-${sketch.id}`}
              custom={direction}
              initial={{
                x: direction > 0 ? "24%" : "-24%",
                opacity: 0,
                scaleX: 0.65,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scaleX: 1,
              }}
              exit={{
                x: direction > 0 ? "-24%" : "24%",
                opacity: 0,
                scaleX: 0.65,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 bottom-0 h-[3px] origin-center bg-[#ff4d12]"
            />
          </AnimatePresence>
        </div>

        <div className="border-t border-black/10 p-5">
          <WorkLabel>{sketch.medium}</WorkLabel>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={`mobile-info-${sketch.id}`}
              custom={direction}
              initial={{
                opacity: 0,
                y: 10,
                x: direction > 0 ? 12 : -12,
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{
                opacity: 0,
                y: -8,
                x: direction > 0 ? -10 : 10,
              }}
              transition={{ duration: 0.28 }}
            >
              <h2 className="mt-2 text-[1.7rem] font-medium tracking-[-0.04em] text-black">
                {sketch.title}
              </h2>
              <p className="mt-3 text-[0.96rem] leading-[1.8] text-black/72">
                {sketch.note}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between">
            <ProjectCounter
              current={currentIndex + 1}
              total={total}
              direction={direction}
            />

            <div className="flex items-center gap-2">
              <ControlButton onClick={onPrev} label="Previous project">
                <ArrowLeft className="h-4 w-4" />
              </ControlButton>
              <ControlButton onClick={onNext} label="Next project">
                <ArrowRight className="h-4 w-4" />
              </ControlButton>
            </div>
          </div>

          <div className="mt-5">
            <Link
              href={`/gallery/${sketch.id}`}
              className="group inline-flex items-stretch"
            >
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ duration: 0.18 }}
                className="inline-flex h-[52px] items-center bg-[#ff4d12] px-6 text-[0.84rem] font-medium uppercase tracking-[0.08em] text-black"
              >
                About Image
              </motion.span>
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ duration: 0.18 }}
                className="inline-flex h-[52px] w-[52px] items-center justify-center bg-[#ff4d12] text-black"
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(1);

  const currentSketch = useMemo(
    () => sketches[currentIndex] ?? sketches[0],
    [currentIndex],
  );

  const previousSketch =
    sketches[(currentIndex - 1 + sketches.length) % sketches.length];
  const nextSketch = sketches[(currentIndex + 1) % sketches.length];

  function goPrev() {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + sketches.length) % sketches.length);
  }

  function goNext() {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sketches.length);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setDirection(-1);
        setCurrentIndex(
          (prev) => (prev - 1 + sketches.length) % sketches.length,
        );
      }

      if (event.key === "ArrowRight") {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % sketches.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SiteShell>
      <main className="min-h-screen bg-[#f2f0e8] text-black lg:h-screen lg:overflow-hidden">
        <section className="min-h-screen px-6 py-6 sm:px-8 sm:py-8 lg:h-screen lg:px-10 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[calc(100vh-3rem)] border border-black/8 bg-[#f2f0e8] lg:flex lg:h-[calc(100vh-3rem)] lg:flex-col lg:overflow-hidden"
          >
            <HeaderBar />

            <DesktopStage
              currentSketch={currentSketch}
              previousSketch={previousSketch}
              nextSketch={nextSketch}
              direction={direction}
              currentIndex={currentIndex}
              total={sketches.length}
              onPrev={goPrev}
              onNext={goNext}
            />

            <MobileStage
              sketch={currentSketch}
              direction={direction}
              onPrev={goPrev}
              onNext={goNext}
              currentIndex={currentIndex}
              total={sketches.length}
            />
          </motion.div>
        </section>
      </main>
    </SiteShell>
  );
}
