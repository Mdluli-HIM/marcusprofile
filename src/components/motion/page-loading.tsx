"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageLoading() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#080506]">
      <div className="relative flex h-[180px] w-[180px] items-center justify-center sm:h-[220px] sm:w-[220px]">
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: [0, 45, 90, 135, 180],
                  scale: [1, 0.92, 1, 0.92, 1],
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[92px] w-[92px] border border-white/12 sm:h-[112px] sm:w-[112px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: [0, -45, -90, -135, -180],
                  scale: [0.92, 1, 0.92, 1, 0.92],
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[132px] w-[132px] border border-white/8 sm:h-[164px] sm:w-[164px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: [0, 45, 90, 135, 180],
                  scale: [1, 1.08, 0.96, 1.04, 1],
                  borderRadius: ["0px", "10px", "0px", "10px", "0px"],
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 1.6,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-[44px] w-[44px] bg-[#ff4d12] shadow-[0_0_24px_rgba(255,77,18,0.14)] sm:h-[52px] sm:w-[52px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  opacity: [0, 0.14, 0],
                  scale: [0.8, 1.25, 1.45],
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 1.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute h-[70px] w-[70px] rotate-45 border border-[#ff4d12]/20 sm:h-[84px] sm:w-[84px]"
        />
      </div>
    </div>
  );
}
