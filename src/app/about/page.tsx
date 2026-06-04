"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

const ABOUT_PORTRAIT = "/images/profile/profile-main.jpg";

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="min-h-screen overflow-x-hidden bg-[#f3f0ea] text-black">
        <section className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.9fr)_minmax(420px,0.85fr)] lg:items-start xl:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative overflow-hidden border border-black/8 bg-black">
                  <div className="relative aspect-[0.84/1]">
                    <Image
                      src={ABOUT_PORTRAIT}
                      alt="Marcus Mdluli portrait"
                      fill
                      priority
                      sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 48vw, 100vw"
                      className="object-cover grayscale"
                    />
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center bg-[#ff4d12] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                  Frontend / Motion / UI Systems
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[760px]"
              >
                <h1 className="max-w-[10ch] text-[clamp(2.9rem,6vw,5.7rem)] font-semibold leading-[0.95] tracking-[-0.08em] text-black">
                  Frontend systems that feel clear, sharp, and memorable.
                </h1>

                <div className="mt-8 space-y-6 text-[1.02rem] leading-[1.95] text-black/56 xl:text-[1.08rem]">
                  <p>
                    I build at the intersection of{" "}
                    <span className="font-semibold text-black">
                      visual identity, motion, and frontend structure
                    </span>
                    . My work is shaped by typography, rhythm, editorial spacing,
                    and the small interaction details that make a website feel
                    intentional from the first second.
                  </p>

                  <p>
                    I care about building interfaces that do more than function. I
                    want them to feel composed, premium, and easy to remember.
                    Most of what I make lives between{" "}
                    <span className="font-semibold text-black">
                      brand sites, portfolios, gallery-like experiences, and
                      motion-led UI systems
                    </span>
                    .
                  </p>

                  <p>
                    Outside of standard web layouts, I also use code as a visual
                    sketchbook. That means experimenting with interfaces,
                    compositions, motion studies, and design systems that feel
                    closer to digital art direction than generic product UI.
                  </p>

                  <p>
                    I am based in{" "}
                    <span className="font-semibold text-black">South Africa</span>{" "}
                    and focused on frontend work that balances aesthetics with
                    clean execution.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10 border border-black/10 bg-white/55 p-6 sm:p-7"
                >
                  <div className="flex gap-4">
                    <div className="w-[3px] shrink-0 bg-[#ff4d12]" />

                    <div className="min-w-0">
                      <h2 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-black">
                        Frontend Craft — Motion / UI / Editorial Systems
                      </h2>
                      <p className="mt-2 text-[0.98rem] leading-[1.8] text-black/52">
                        Brand sites, portfolios, landing pages, gallery systems,
                        interaction design, layout rhythm, and restrained motion
                        built with design sensitivity and strong frontend
                        structure.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/work" className="group inline-flex items-stretch">
                    <span className="inline-flex h-[56px] items-center bg-[#ff4d12] px-6 text-[0.83rem] font-medium uppercase tracking-[0.08em] text-white transition-transform duration-200 group-hover:-translate-y-[1px]">
                      View Work
                    </span>
                    <span className="inline-flex h-[56px] w-[56px] items-center justify-center bg-[#ff4d12] text-white transition-transform duration-200 group-hover:-translate-y-[1px]">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>

                  <Link href="/contact" className="group inline-flex items-stretch">
                    <span className="inline-flex h-[56px] items-center border border-black/12 bg-transparent px-6 text-[0.83rem] font-medium uppercase tracking-[0.08em] text-black transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                      Contact
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
