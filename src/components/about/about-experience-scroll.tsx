"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type AboutExperienceItem = {
  id: string;
  title: string;
  period: string;
  blurb: string;
  images: string[];
};

type AboutExperienceScrollProps = {
  items?: AboutExperienceItem[];
};

const IMAGES_PER_STEP = 3;
const STACK_GAP = 22;
const IMAGE_GAP = 18;

function chunkImages(images: string[], size: number) {
  const chunks: string[][] = [];

  for (let i = 0; i < images.length; i += size) {
    const part = images.slice(i, i + size);
    if (part.length) chunks.push(part);
  }

  return chunks;
}

export default function AboutExperienceScroll({
  items,
}: AboutExperienceScrollProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [stackHeight, setStackHeight] = useState(720);

  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const normalizedItems = useMemo(() => {
    return safeItems.map((item) => {
      const imageGroups = chunkImages(item.images ?? [], IMAGES_PER_STEP);

      return {
        ...item,
        imageGroups: imageGroups.length ? imageGroups : [[]],
      };
    });
  }, [safeItems]);

  const phaseMap = useMemo(() => {
    return normalizedItems.flatMap((item, itemIndex) =>
      item.imageGroups.map((group, groupIndex) => ({
        key: `${item.id}-${groupIndex}`,
        itemIndex,
        groupIndex,
        images: group,
      })),
    );
  }, [normalizedItems]);

  const activePhase = useMemo(
    () => phaseMap[phaseIndex] ?? phaseMap[0] ?? null,
    [phaseMap, phaseIndex],
  );

  const activeItemIndex = activePhase?.itemIndex ?? 0;
  const activeGroupIndex = activePhase?.groupIndex ?? 0;

  const activeItem = useMemo(
    () => normalizedItems[activeItemIndex] ?? null,
    [normalizedItems, activeItemIndex],
  );

  const railOffset = useMemo(() => {
    return -(phaseIndex * (stackHeight + STACK_GAP));
  }, [phaseIndex, stackHeight]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const compute = () => {
      const nextHeight = viewport.clientHeight;
      if (nextHeight > 0) setStackHeight(nextHeight);
    };

    compute();

    const observer = new ResizeObserver(() => {
      compute();
    });

    observer.observe(viewport);

    return () => {
      observer.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      if (!rootRef.current || phaseMap.length <= 1) return;
      if (reduceMotion) return;

      let currentPhase = 0;
      const maxPhase = phaseMap.length - 1;

      const setActiveStep = (nextPhase: number) => {
        const safePhaseIndex = Math.max(0, Math.min(nextPhase, maxPhase));
        currentPhase = safePhaseIndex;
        setPhaseIndex(safePhaseIndex);

        const nextItemIndex = phaseMap[safePhaseIndex]?.itemIndex ?? 0;

        rowsRef.current.forEach((row, rowIndex) => {
          if (!row) return;

          const title = row.querySelector("[data-exp-title]");
          const pill = row.querySelector("[data-exp-pill]");

          if (title) {
            gsap.to(title, {
              opacity: rowIndex === nextItemIndex ? 1 : 0.18,
              duration: 0.24,
              ease: "power2.out",
            });
          }

          if (pill) {
            gsap.to(pill, {
              opacity: rowIndex === nextItemIndex ? 1 : 0,
              y: rowIndex === nextItemIndex ? 0 : 4,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      };

      setActiveStep(0);

      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: `+=${window.innerHeight * maxPhase * 1.02 + window.innerHeight * 0.9}`,
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        snap: {
          snapTo: (progress: number) => {
            if (maxPhase <= 0) return 0;
            const step = 1 / maxPhase;
            return Math.round(progress / step) * step;
          },
          duration: { min: 0.16, max: 0.28 },
          ease: "power2.out",
          directional: true,
        },
        onUpdate: (self) => {
          const nextPhase = Math.round(self.progress * maxPhase);

          if (nextPhase !== currentPhase) {
            setActiveStep(nextPhase);
          }
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: rootRef, dependencies: [phaseMap, reduceMotion] },
  );

  if (!normalizedItems.length || !activeItem) return null;

  return (
    <section
      ref={rootRef}
      className="border-t border-black/8 bg-white px-6 md:px-8 lg:px-10 xl:px-12"
    >
      <div className="mx-auto flex min-h-screen max-w-[1600px] items-center">
        <div className="grid w-full items-start gap-8 lg:grid-cols-[72px_minmax(0,1fr)_380px] xl:grid-cols-[84px_minmax(0,1fr)_410px] xl:gap-12">
          <div className="hidden lg:flex justify-center pt-2">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black">
              <div className="h-[12px] w-[12px] bg-[#ff4d12]" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="max-w-[560px] xl:max-w-[620px]">
              <div className="space-y-1">
                {normalizedItems.map((item, index) => {
                  const isActive = index === activeItemIndex;

                  return (
                    <div
                      key={item.id}
                      ref={(node) => {
                        rowsRef.current[index] = node;
                      }}
                      className="flex min-h-[62px] items-center gap-3"
                    >
                      <span
                        data-exp-title
                        className={`text-[clamp(2rem,3.9vw,3.15rem)] font-light leading-[1.02] tracking-[-0.07em] ${
                          isActive ? "text-black" : "text-black/18"
                        }`}
                      >
                        {item.title}
                      </span>

                      <span
                        data-exp-pill
                        className={`rounded-full bg-black/6 px-2.5 py-[5px] text-[11px] leading-none text-black/38 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.period}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeItem.id}-${activeGroupIndex}-copy`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <p className="mt-10 max-w-[36ch] text-[15px] leading-[1.75] text-black/68 xl:mt-12">
                  {activeItem.blurb}
                </p>

                <div className="mt-4 text-[10px] uppercase tracking-[0.16em] text-black/30">
                  {String(activeGroupIndex + 1).padStart(2, "0")} /{" "}
                  {String(activeItem.imageGroups.length).padStart(2, "0")}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="min-w-0">
            <div
              ref={viewportRef}
              className="relative mx-auto h-[74vh] max-h-[860px] min-h-[620px] w-full overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />

              <motion.div
                animate={{ y: railOffset }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 64,
                        damping: 20,
                        mass: 0.95,
                      }
                }
                className="absolute inset-x-0 top-0 will-change-transform"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: `${STACK_GAP}px`,
                }}
              >
                {phaseMap.map((phase) => (
                  <div
                    key={phase.key}
                    className="flex shrink-0 flex-col"
                    style={{
                      height: `${stackHeight}px`,
                      rowGap: `${IMAGE_GAP}px`,
                    }}
                  >
                    {phase.images.map((src, index) => (
                      <div
                        key={`${phase.key}-${src}-${index}`}
                        className="relative min-h-0 flex-1 overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt={`${normalizedItems[phase.itemIndex]?.title ?? "Project"} image ${index + 1}`}
                          fill
                          sizes="(min-width: 1280px) 410px, (min-width: 1024px) 380px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
