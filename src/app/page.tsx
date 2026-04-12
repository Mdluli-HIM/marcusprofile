"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group inline-flex">
      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.18 }}
        className="inline-flex h-[54px] items-center bg-[#ff4d12] px-7 text-[0.92rem] font-semibold uppercase tracking-[0.08em] text-black"
      >
        <span>{children}</span>
        <motion.span
          className="ml-3 inline-flex"
          initial={false}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.18 }}
        >
          <ArrowRight size={16} strokeWidth={2.2} />
        </motion.span>
      </motion.span>
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group inline-flex">
      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.18 }}
        className="inline-flex h-[54px] items-center border border-white/12 bg-transparent px-7 text-[0.92rem] font-semibold uppercase tracking-[0.08em] text-white"
      >
        <span>{children}</span>
      </motion.span>
    </Link>
  );
}

function AnimatedPortraitPanel() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 120,
    damping: 18,
  });

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 120,
    damping: 18,
  });

  const imageScale = useSpring(useTransform(my, [-0.5, 0.5], [1.02, 1.06]), {
    stiffness: 90,
    damping: 18,
  });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1400,
      }}
      className="relative h-full min-h-[420px] overflow-hidden bg-[#d7d7d7]"
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0">
        <Image
          src="/images/profile-hero.jpg"
          alt="Marcus Mdluli portrait"
          fill
          priority
          className="object-cover grayscale"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)] opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-6 border border-white/10 bg-black/88 px-5 py-4 text-white backdrop-blur-[2px]"
      >
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
          Selected Style
        </p>
        <p className="mt-2 text-[1rem] uppercase tracking-[0.04em]">
          Weird / Graphic / Premium
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <SiteShell home>
      <section className="min-h-screen bg-black text-white">
        <div className="grid min-h-screen xl:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
            className="relative flex min-h-screen items-center border-r border-white/10 px-8 py-14 md:px-12 xl:px-16"
          >
            <div className="absolute inset-y-0 right-0 w-px bg-white/10" />

            <div className="mx-auto w-full max-w-[620px]">
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="text-[0.78rem] uppercase tracking-[0.28em] text-white/45"
              >
                Frontend Developer / Motion / UI Systems
              </motion.p>

              <div className="mt-6 overflow-hidden">
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 34 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="text-[clamp(4.4rem,10vw,8.2rem)] font-black uppercase leading-[0.88] tracking-[-0.08em]"
                >
                  <span className="block text-white">Marcus</span>
                  <span className="block text-[#ff4d12]">Mdluli</span>
                </motion.h1>
              </div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mt-10 max-w-[560px] text-[1.18rem] leading-[1.7] text-white/72"
              >
                I build visually sharp, unconventional frontend experiences with
                strong layout thinking, motion detail, and personality that
                makes employers remember the work.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <PrimaryButton href="/work">View Work</PrimaryButton>
                <SecondaryButton href="/contact">Contact</SecondaryButton>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mt-16 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3"
              >
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
                    Approach
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/76">
                    Graphic layouts, restrained motion, and premium interaction.
                  </p>
                </div>

                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
                    Focus
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/76">
                    Brand sites, portfolios, landing pages, and motion-first UI.
                  </p>
                </div>

                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
                    Based In
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/76">
                    South Africa — available for frontend and creative web work.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[48vh] xl:min-h-screen"
          >
            <AnimatedPortraitPanel />
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
