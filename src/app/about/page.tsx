"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

const ABOUT_PORTRAIT = "/images/profile/image copy.png";

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
                  Software Design / Engineering / Frontend & Backend
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-[760px]"
              >
                <h1 className="max-w-[12ch] text-[clamp(2.9rem,6vw,5.7rem)] font-semibold leading-[0.95] tracking-[-0.08em] text-black">
                  Designing software to help people.
                </h1>

                <div className="mt-8 space-y-6 text-[1.02rem] leading-[1.95] text-black/56 xl:text-[1.08rem]">
                  <p>
                    I&apos;m a{" "}
                    <span className="font-semibold text-black">
                      software designer and engineer
                    </span>{" "}
                    based in South Africa, open globally. I care about building
                    products that are clear, useful, and well made — from interface and UX
                    through to working code.
                  </p>

                  <p>
                    My strength is{" "}
                    <span className="font-semibold text-black">
                      frontend development and product design
                    </span>
                    , backed by backend experience with APIs, databases, and
                    full-stack systems. I can think through the user experience
                    and ship the product behind it.
                  </p>

                  <p>
                    I&apos;ve built web apps, e-commerce platforms, SaaS
                    dashboards, and product demos — always with a focus on
                    structure, performance, and interfaces that feel simple to
                    use.
                  </p>

                  <p>
                    I&apos;m{" "}
                    <span className="font-semibold text-black">
                      open to software design and engineering roles
                    </span>{" "}
                    where I can contribute across design and development.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-10 border border-black/10 bg-white/55 p-6 sm:p-7"
                >
                  <div className="flex gap-4">
                    <div className="w-[3px] shrink-0 bg-[#ff4d12]" />

                    <div className="min-w-0">
                      <h2 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-black">
                        Software Designer & Engineer
                      </h2>
                      <p className="mt-2 text-[0.98rem] leading-[1.8] text-black/52">
                        Frontend-led, full-stack capable. React, TypeScript,
                        Node.js, UI design, and product delivery.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/work"
                    className="group inline-flex items-stretch"
                  >
                    <span className="inline-flex h-[56px] items-center bg-[#ff4d12] px-6 text-[0.83rem] font-medium uppercase tracking-[0.08em] text-white transition-transform duration-200 group-hover:-translate-y-[1px]">
                      View Work
                    </span>
                    <span className="inline-flex h-[56px] w-[56px] items-center justify-center bg-[#ff4d12] text-white transition-transform duration-200 group-hover:-translate-y-[1px]">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>

                  <Link
                    href="/contact"
                    className="group inline-flex items-stretch"
                  >
                    <span className="inline-flex h-[56px] items-center bg-[#6d9472] px-6 text-[0.83rem] font-medium uppercase tracking-[0.08em] text-black transition-transform duration-200 group-hover:-translate-y-[1px]">
                      Get in Touch
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
