"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SiteShell } from "@/components/layout/site-shell";

type StackItem = {
  name: string;
  icon: string;
};

const stackItems: StackItem[] = [
  { name: "TypeScript", icon: "/icons/typescript.png" },
  { name: "JavaScript", icon: "/icons/javascript.png" },
  { name: "React", icon: "/icons/react.png" },
  { name: "GSAP", icon: "/icons/gsap.png" },
  { name: "Figma", icon: "/icons/figma.png" },
  { name: "MongoDB", icon: "/icons/mongodb.png" },
  { name: "Node.js", icon: "/icons/node.png" },
];

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
          className="ml-3 inline-flex text-[16px]"
          initial={false}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.18 }}
        >
          →
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
        className="inline-flex h-[54px] items-center bg-[#6d9472] px-7 text-[0.92rem] font-semibold uppercase tracking-[0.08em] text-black transition hover:brightness-[0.98]"
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
          src="/images/profile/image copy.png"
          alt="Marcus Mdluli portrait"
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          priority
          className="object-cover grayscale"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)] opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-6 left-6 h-10 w-10 bg-[#ff4d12] sm:bottom-8 sm:left-8 sm:h-12 sm:w-12"
      />
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <SiteShell home>
      <section className="min-h-screen bg-black text-white">
        <div className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
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
            className="relative flex min-h-[58svh] items-center border-b border-white/10 px-6 py-20 md:px-10 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-12 xl:px-16"
          >
            <div className="absolute inset-y-0 right-0 w-px bg-white/10" />

            <div className="mx-auto w-full max-w-[620px]">
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="text-[0.78rem] uppercase tracking-[0.28em] text-white/45"
              >
                Software Design / Engineering / Frontend & Backend
              </motion.p>

              <div className="mt-6 overflow-hidden">
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 34 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      },
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
                    transition: {
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="mt-10 max-w-[560px] text-[1.18rem] leading-[1.7] text-white/72"
              >
                Designing software to help people. I work as a software
                designer and engineer — strong on frontend, with backend
                experience to ship complete products.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <PrimaryButton href="/work">View Work</PrimaryButton>
                <SecondaryButton href="/contact">Get in Touch</SecondaryButton>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="mt-16 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
                    Focus
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/76">
                    Useful software with clear interfaces, thoughtful UX, and
                    code that holds up in production.
                  </p>
                </div>

                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
                    Skills
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/76">
                    Frontend development, UI design, product thinking, APIs,
                    databases, and full-stack delivery.
                  </p>
                </div>

                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
                    Open To
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-white/76">
                    Software design, frontend, and full-stack roles. Based in
                    South Africa, open globally.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-8"
              >
                {stackItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="group flex items-center gap-3"
                  >
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-200 group-hover:border-white/20 group-hover:bg-white/10">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>

                    <span className="hidden text-[0.72rem] uppercase tracking-[0.18em] text-white/42 xl:inline">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[48vh] lg:min-h-screen"
          >
            <AnimatedPortraitPanel />
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
