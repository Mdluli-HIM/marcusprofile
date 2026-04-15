"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type InitialLoaderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "marcus-site-intro-v3";

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

export default function InitialLoader({ children }: InitialLoaderProps) {
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasPlayed = sessionStorage.getItem(STORAGE_KEY) === "played";

    if (hasPlayed) {
      const skipRafId = window.requestAnimationFrame(() => {
        setIsActive(false);
      });

      return () => {
        window.cancelAnimationFrame(skipRafId);
      };
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    let progressRafId = 0;
    let exitTimeoutId: number | undefined;
    let finishTimeoutId: number | undefined;

    const duration = reduceMotion ? 900 : 3400;
    const start = performance.now();

    const tick = (time: number) => {
      const elapsed = time - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuint(raw);
      const nextProgress = Math.min(100, Math.round(eased * 100));

      setProgress(nextProgress);

      if (raw < 1) {
        progressRafId = window.requestAnimationFrame(tick);
        return;
      }

      sessionStorage.setItem(STORAGE_KEY, "played");

      exitTimeoutId = window.setTimeout(
        () => {
          setIsExiting(true);

          finishTimeoutId = window.setTimeout(
            () => {
              setIsActive(false);
              root.style.overflow = previousOverflow;
            },
            reduceMotion ? 180 : 1200,
          );
        },
        reduceMotion ? 80 : 220,
      );
    };

    progressRafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(progressRafId);

      if (exitTimeoutId !== undefined) {
        window.clearTimeout(exitTimeoutId);
      }

      if (finishTimeoutId !== undefined) {
        window.clearTimeout(finishTimeoutId);
      }

      root.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  return (
    <>
      {children}

      <AnimatePresence>
        {isActive ? (
          <motion.div
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto fixed inset-0 z-[500] overflow-hidden bg-[#080506]"
          >
            <motion.div
              animate={
                isExiting
                  ? {
                      y: "-100%",
                      transition: {
                        duration: reduceMotion ? 0.2 : 1.05,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }
                  : { y: "0%" }
              }
              className="absolute inset-x-0 top-0 h-1/2 bg-[#080506]"
            />

            <motion.div
              animate={
                isExiting
                  ? {
                      y: "100%",
                      transition: {
                        duration: reduceMotion ? 0.2 : 1.05,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }
                  : { y: "0%" }
              }
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#080506]"
            />

            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:82px_82px]" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_42%),radial-gradient(circle_at_center,rgba(255,77,18,0.05),transparent_24%)]" />

            <div className="pointer-events-none absolute left-6 top-6 h-6 w-6 border-l border-t border-white/14 sm:left-10 sm:top-10" />
            <div className="pointer-events-none absolute right-6 top-6 h-6 w-6 border-r border-t border-white/14 sm:right-10 sm:top-10" />
            <div className="pointer-events-none absolute bottom-6 left-6 h-6 w-6 border-b border-l border-white/14 sm:bottom-10 sm:left-10" />
            <div className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 border-b border-r border-white/14 sm:bottom-10 sm:right-10" />

            <motion.div
              animate={
                isExiting
                  ? {
                      opacity: 0,
                      scale: 0.985,
                      transition: { duration: reduceMotion ? 0.16 : 0.4 },
                    }
                  : { opacity: 1, scale: 1 }
              }
              className="absolute inset-0"
            >
              <div className="flex h-full items-center justify-center px-6">
                <div className="relative h-[300px] w-[300px] sm:h-[360px] sm:w-[360px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotate: -12 }}
                    animate={
                      isExiting
                        ? {
                            opacity: 0,
                            scale: 1.28,
                            rotate: -28,
                          }
                        : {
                            opacity: [0.08, 0.18, 0.08],
                            scale: [0.94, 1, 0.94],
                            rotate: [0, 10, 0, -10, 0],
                          }
                    }
                    transition={
                      isExiting
                        ? {
                            duration: reduceMotion ? 0.18 : 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : {
                            duration: reduceMotion ? 1.4 : 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 border border-white/10 sm:h-[260px] sm:w-[260px]"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.86, rotate: 14 }}
                    animate={
                      isExiting
                        ? {
                            opacity: 0,
                            scale: 1.34,
                            rotate: 32,
                          }
                        : {
                            opacity: [0.05, 0.14, 0.05],
                            scale: [1, 1.06, 1],
                            rotate: [0, -14, 0, 14, 0],
                          }
                    }
                    transition={
                      isExiting
                        ? {
                            duration: reduceMotion ? 0.18 : 0.66,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : {
                            duration: reduceMotion ? 1.6 : 7.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="absolute left-1/2 top-1/2 h-[264px] w-[264px] -translate-x-1/2 -translate-y-1/2 border border-white/6 sm:h-[324px] sm:w-[324px]"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={
                      isExiting
                        ? {
                            opacity: 0,
                            scale: 1.18,
                          }
                        : {
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.015, 1],
                          }
                    }
                    transition={
                      isExiting
                        ? {
                            duration: reduceMotion ? 0.18 : 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : {
                            duration: reduceMotion ? 1.4 : 4.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="absolute left-1/2 top-1/2 h-[126px] w-[126px] -translate-x-1/2 -translate-y-1/2 border border-white/10 sm:h-[150px] sm:w-[150px]"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.72 }}
                    animate={
                      isExiting
                        ? {
                            scale: 15,
                            rotate: 45,
                            opacity: 1,
                            borderRadius: 0,
                          }
                        : {
                            x: [0, 26, 26, -26, -26, 0],
                            y: [0, 0, 26, 26, -26, 0],
                            rotate: [0, 8, 0, -8, 0],
                            scale: [1, 1.04, 0.96, 1.06, 1],
                            borderRadius: ["0px", "10px", "0px", "12px", "0px"],
                            opacity: 1,
                          }
                    }
                    transition={
                      isExiting
                        ? {
                            duration: reduceMotion ? 0.22 : 0.92,
                            ease: [0.76, 0, 0.24, 1],
                          }
                        : {
                            duration: reduceMotion ? 1.4 : 4.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="absolute left-1/2 top-1/2 h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 bg-[#ff4d12] shadow-[0_0_40px_rgba(255,77,18,0.12)] sm:h-[64px] sm:w-[64px]"
                  />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={
                      isExiting
                        ? { opacity: 0 }
                        : {
                            opacity: [0, 0.16, 0],
                            scale: [0.88, 1.05, 1.16],
                          }
                    }
                    transition={{
                      duration: reduceMotion ? 1.2 : 2.4,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#ff4d12]/18 sm:h-[104px] sm:w-[104px]"
                  />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={
                      isExiting
                        ? { opacity: 0 }
                        : {
                            rotate: [0, 360],
                            opacity: [0.04, 0.12, 0.04],
                          }
                    }
                    transition={{
                      duration: reduceMotion ? 2 : 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[188px] w-[188px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 sm:h-[228px] sm:w-[228px]"
                  />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-10 px-6 sm:bottom-12 sm:px-10">
                <div className="mx-auto w-full max-w-[460px]">
                  <div className="relative h-[2px] overflow-hidden bg-white/10">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.16, ease: "linear" }}
                      className="absolute left-0 top-0 h-full bg-[#ff4d12]"
                    />
                    <motion.div
                      animate={{ left: `calc(${progress}% - 5px)` }}
                      transition={{ duration: 0.16, ease: "linear" }}
                      className="absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 rotate-45 bg-[#ff4d12]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
