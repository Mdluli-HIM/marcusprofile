"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen overflow-hidden bg-[#1b120d] text-[#f5eadb]"
    >
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04]" />

      <div className="relative z-10 grid h-full w-full grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex h-full items-center px-8 md:px-14 lg:px-20">
          <div className="max-w-[760px]">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#c9b29d]">
              Frontend Developer / Motion / UI Systems
            </p>

            <h1 className="text-[clamp(4.5rem,11vw,9rem)] font-black uppercase leading-[0.88] tracking-[-0.03em]">
              Marcus
              <span className="block text-[#e0a11b]">Mdluli</span>
            </h1>

            <p className="mt-8 max-w-[560px] text-base leading-8 text-[#dbcbbd] md:text-lg">
              I build visually sharp, unconventional frontend experiences with
              strong layout thinking, motion detail, and personality that makes
              employers remember the work.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 border border-[#e0a11b] bg-[#e0a11b] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:translate-x-1"
              >
                View Work
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center border border-[#4c372b] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#f5eadb] transition hover:bg-[#2a1c15]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden h-full lg:block">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[#a96f3c]" />
            <Image
              src="/images/profile-hero.jpg"
              alt="Marcus Mdluli"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}
