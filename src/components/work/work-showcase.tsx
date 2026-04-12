"use client";

import Image from "next/image";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Grid2x2,
  LayoutGrid,
} from "lucide-react";
import gsap from "gsap";
import { Flip, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, SplitText, useGSAP);

type FilterKey = "All" | "Brand" | "Marketing" | "Motion" | "Portfolio";
type ViewMode = "featured" | "split" | "grid";

type Project = {
  id: number;
  title: string;
  meta: string;
  image: string;
  thumb: string;
  alt: string;
  tags: FilterKey[];
};

const filterMenuItems: { key: FilterKey; label: string }[] = [
  { key: "All", label: "[ALL]" },
  { key: "Brand", label: "[AGENCY WEBSITE]" },
  { key: "Motion", label: "[ANIMATIONS]" },
  { key: "Marketing", label: "[MARKETING SITE]" },
  { key: "Portfolio", label: "[PORTFOLIO]" },
];

const projects: Project[] = [
  {
    id: 1,
    title: "GREENMIND",
    meta: "[MARKETING SITE] — [BRANDING]",
    image: "/images/work/project-left.jpg",
    thumb: "/images/work/thumb-1.jpg",
    alt: "Greenmind project preview",
    tags: ["Brand", "Marketing"],
  },
  {
    id: 2,
    title: "BODYARMOR",
    meta: "[MARKETING SITE] — [ANIMATIONS]",
    image: "/images/work/project-center.jpg",
    thumb: "/images/work/thumb-2.jpg",
    alt: "Bodyarmor project preview",
    tags: ["Marketing", "Motion"],
  },
  {
    id: 3,
    title: "ANNIMATE",
    meta: "[WEB EXPERIENCE] — [SPORTS]",
    image: "/images/work/project-right.jpg",
    thumb: "/images/work/thumb-3.jpg",
    alt: "Annimate project preview",
    tags: ["Motion", "Portfolio"],
  },
  {
    id: 4,
    title: "WKNDHRS",
    meta: "[PORTFOLIO] — [ANIMATIONS]",
    image: "/images/work/project-center.jpg",
    thumb: "/images/work/thumb-4.jpg",
    alt: "Weekend Hours project preview",
    tags: ["Portfolio", "Motion"],
  },
];

const panelEase = [0.22, 1, 0.36, 1] as const;
const exitEase = [0.4, 0, 1, 1] as const;

const layoutContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: panelEase,
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: {
      duration: 0.2,
      ease: exitEase,
    },
  },
};

const layoutItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.985,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: panelEase,
    },
  },
};

const CARD_MEDIA_HEIGHT = "h-[480px] sm:h-[520px] xl:h-[560px]";
const FEATURED_CARD_WIDTH =
  "w-[84vw] sm:w-[76vw] md:w-[min(90vw,760px)] shrink-0";
const LOOP_MULTIPLIER = 3;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

type ControlButtonProps = {
  active?: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
};

function ControlButton({
  active = false,
  onClick,
  ariaLabel,
  children,
}: ControlButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -1 : 0,
        backgroundColor: active ? "#ff5a1f" : hovered ? "#d9cec1" : "#e2d7cc",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative inline-flex h-[46px] w-[46px] items-center justify-center overflow-hidden text-black sm:h-[42px] sm:w-[42px]"
    >
      <motion.span
        animate={{
          opacity: active || hovered ? 1 : 0,
          scaleY: active || hovered ? 1 : 0.45,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 origin-center bg-[#ff5a1f]"
      />

      <motion.span
        animate={{
          x: hovered ? 1 : 0,
          y: hovered ? -0.5 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

type InteractiveProjectCardProps = {
  project: Project;
  active?: boolean;
  widthClass?: string;
  heightClass?: string;
  onClick?: () => void;
  priority?: boolean;
  coarsePointer?: boolean;
};

function InteractiveProjectCard({
  project,
  active = false,
  widthClass = "w-full",
  heightClass = "h-[420px]",
  onClick,
  priority = false,
  coarsePointer = false,
}: InteractiveProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const cursorXRaw = useMotionValue(180);
  const cursorYRaw = useMotionValue(180);

  const rotateX = useSpring(rotateXRaw, {
    stiffness: 180,
    damping: 20,
    mass: 0.6,
  });

  const rotateY = useSpring(rotateYRaw, {
    stiffness: 180,
    damping: 20,
    mass: 0.6,
  });

  const cursorX = useSpring(cursorXRaw, {
    stiffness: 220,
    damping: 24,
    mass: 0.45,
  });

  const cursorY = useSpring(cursorYRaw, {
    stiffness: 220,
    damping: 24,
    mass: 0.45,
  });

  const mediaX = useSpring(useTransform(rotateYRaw, [-6, 6], [-10, 10]), {
    stiffness: 140,
    damping: 20,
  });

  const mediaY = useSpring(useTransform(rotateXRaw, [-6, 6], [10, -10]), {
    stiffness: 140,
    damping: 20,
  });

  const glowTarget = useMotionValue(0);
  const glowOpacity = useSpring(glowTarget, {
    stiffness: 160,
    damping: 20,
  });

  function handleMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (coarsePointer) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rx = (0.5 - py) * 5;
    const ry = (px - 0.5) * 5;

    rotateXRaw.set(rx);
    rotateYRaw.set(ry);

    cursorXRaw.set(event.clientX - rect.left);
    cursorYRaw.set(event.clientY - rect.top);
  }

  function handleEnter(event: ReactMouseEvent<HTMLDivElement>) {
    if (coarsePointer) return;

    setHovered(true);
    glowTarget.set(1);

    const rect = event.currentTarget.getBoundingClientRect();
    cursorXRaw.set(rect.width / 2);
    cursorYRaw.set(rect.height / 2);
  }

  function handleLeave() {
    if (coarsePointer) return;

    setHovered(false);
    glowTarget.set(0);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.article
      data-project-card="true"
      className={`group ${widthClass} shrink-0 cursor-pointer`}
      onClick={onClick}
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        whileHover={coarsePointer ? undefined : { y: -4 }}
        whileTap={coarsePointer ? { scale: 0.985 } : undefined}
        transition={{ duration: 0.25 }}
        style={
          coarsePointer
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 1400,
              }
        }
        className={`relative overflow-hidden bg-white will-change-transform ${heightClass}`}
      >
        <motion.div
          style={coarsePointer ? undefined : { x: mediaX, y: mediaY }}
          animate={{ scale: hovered ? 1.035 : 1 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover"
            priority={priority}
          />
        </motion.div>

        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent"
        />

        <div
          className={`pointer-events-none absolute inset-0 ring-1 transition duration-300 ${
            active ? "ring-black/18" : "ring-black/8 group-hover:ring-black/16"
          }`}
        />

        {!coarsePointer && (
          <motion.div
            style={{ x: cursorX, y: cursorY }}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.96,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-[#ff4d12] px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-black shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
              View Project
            </div>
          </motion.div>
        )}

        {coarsePointer && active && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <div className="bg-[#ff4d12] px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-black shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
              Swipe to explore
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-2 px-1 pt-4 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-4">
        <h2 className="text-[1.65rem] font-medium uppercase tracking-[-0.035em] md:text-[2rem]">
          {project.title}
        </h2>
        <p className="text-left text-[12px] uppercase tracking-[0.12em] text-[#767676] sm:text-right">
          {project.meta}
        </p>
      </div>
    </motion.article>
  );
}

export function WorkShowcase() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterHovered, setFilterHovered] = useState(false);
  const [hoveredFilterKey, setHoveredFilterKey] = useState<FilterKey | null>(
    null,
  );
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [activeIndex, setActiveIndex] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("featured");
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const filterMenuRef = useRef<HTMLDivElement | null>(null);
  const filterTriggerRef = useRef<HTMLDivElement | null>(null);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollEndTimeoutRef = useRef<number | null>(null);
  const safeActiveIndexRef = useRef(0);

  const isDraggingRef = useRef(false);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartAtRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);
  const lastDragAtRef = useRef(0);

  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  const loopedProjects = useMemo(() => {
    if (!filteredProjects.length) return [];
    return Array.from(
      { length: LOOP_MULTIPLIER },
      () => filteredProjects,
    ).flat();
  }, [filteredProjects]);

  const baseCount = filteredProjects.length;
  const middleOffset = baseCount;
  const filterIndicatorKey = hoveredFilterKey ?? activeFilter;

  const safeActiveIndex =
    baseCount === 0 ? 0 : Math.min(activeIndex, baseCount - 1);

  const activeProject = filteredProjects[safeActiveIndex] ?? null;

  useEffect(() => {
    safeActiveIndexRef.current = safeActiveIndex;
  }, [safeActiveIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setIsCoarsePointer(mediaQuery.matches);
    };

    update();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  useEffect(() => {
    if (!filterOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;

      const clickedMenu = filterMenuRef.current?.contains(target);
      const clickedTrigger = filterTriggerRef.current?.contains(target);

      if (!clickedMenu && !clickedTrigger) {
        setFilterOpen(false);
        setHoveredFilterKey(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFilterOpen(false);
        setHoveredFilterKey(null);
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filterOpen]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        if (controlsRef.current) {
          gsap.set(Array.from(controlsRef.current.children), {
            opacity: 1,
            y: 0,
          });
        }
        return;
      }

      let split: SplitText | null = null;

      if (titleRef.current) {
        split = SplitText.create(titleRef.current, {
          type: "chars",
          charsClass: "work-title-char",
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (split?.chars?.length) {
        tl.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          stagger: 0.022,
        });
      }

      if (controlsRef.current) {
        tl.from(
          Array.from(controlsRef.current.children),
          {
            y: 24,
            opacity: 0,
            duration: 0.65,
            stagger: 0.06,
          },
          split ? "-=0.45" : 0,
        );
      }

      return () => {
        split?.revert();
      };
    },
    { scope: rootRef },
  );

  useLayoutEffect(() => {
    if (!flipStateRef.current || !layoutRef.current) return;

    const state = flipStateRef.current;
    flipStateRef.current = null;

    const ctx = gsap.context(() => {
      Flip.from(state, {
        duration: 0.95,
        ease: "power4.inOut",
        absolute: true,
        nested: true,
        prune: true,
        stagger: 0.03,
      });
    }, layoutRef);

    return () => ctx.revert();
  }, [viewMode, activeFilter]);

  function changeViewMode(nextMode: ViewMode) {
    if (nextMode === viewMode) return;

    const canFlip =
      layoutRef.current && viewMode !== "featured" && nextMode !== "featured";

    if (canFlip) {
      flipStateRef.current = Flip.getState("[data-flip-id]");
    }

    setViewMode(nextMode);
  }

  function getCarouselItems() {
    const scroller = scrollerRef.current;
    if (!scroller) return [];
    return Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-carousel-item]"),
    );
  }

  function getClosestLoopIndex() {
    const scroller = scrollerRef.current;
    if (!scroller || baseCount === 0) return null;

    const items = getCarouselItems();
    if (!items.length) return null;

    const sr = scroller.getBoundingClientRect();
    const viewportCenterX = sr.left + sr.width / 2;

    let closestLoopIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const ir = item.getBoundingClientRect();
      const itemCenterX = ir.left + ir.width / 2;
      const distance = Math.abs(itemCenterX - viewportCenterX);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestLoopIndex = index;
      }
    });

    return closestLoopIndex;
  }

  const scrollToCard = useCallback(
    (loopIndex: number, behavior: ScrollBehavior = "smooth") => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const items = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-carousel-item]"),
      );

      const item = items[loopIndex];
      if (!item) return;

      const target =
        item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;

      scroller.scrollTo({ left: target, behavior });
    },
    [],
  );

  const scrollToCardRef = useRef(scrollToCard);

  useLayoutEffect(() => {
    scrollToCardRef.current = scrollToCard;
  }, [scrollToCard]);

  function normalizeInfinitePosition() {
    const scroller = scrollerRef.current;
    if (!scroller || baseCount === 0) return;

    const items = getCarouselItems();
    if (items.length < baseCount * 2) return;

    const first = items[0];
    const middle = items[middleOffset];
    if (!first || !middle) return;

    const bandWidth = middle.offsetLeft - first.offsetLeft;
    if (bandWidth <= 0) return;

    const current = scroller.scrollLeft;

    if (current < bandWidth * 0.5) {
      scroller.scrollLeft = current + bandWidth;
    } else if (current > bandWidth * 1.5) {
      scroller.scrollLeft = current - bandWidth;
    }
  }

  function updateClosestCard() {
    const closestLoopIndex = getClosestLoopIndex();
    if (closestLoopIndex === null || baseCount === 0) return;
    setActiveIndex(mod(closestLoopIndex, baseCount));
  }

  function resolveSnapTarget(endClientX?: number) {
    normalizeInfinitePosition();

    const closestLoopIndex = getClosestLoopIndex();
    if (closestLoopIndex === null || baseCount === 0) return;

    let nextBaseIndex = mod(closestLoopIndex, baseCount);

    if (
      isCoarsePointer &&
      typeof endClientX === "number" &&
      dragMovedRef.current
    ) {
      const dx = endClientX - dragStartXRef.current;
      const dt = Math.max(performance.now() - dragStartAtRef.current, 1);
      const velocity = Math.abs(dx) / dt;

      if (Math.abs(dx) > 42 || velocity > 0.32) {
        nextBaseIndex =
          dx < 0
            ? mod(nextBaseIndex + 1, baseCount)
            : mod(nextBaseIndex - 1, baseCount);
      }
    }

    setActiveIndex(nextBaseIndex);
    scrollToCard(middleOffset + nextBaseIndex);
  }

  function scheduleSnapToMiddleBand(endClientX?: number) {
    if (scrollEndTimeoutRef.current) {
      window.clearTimeout(scrollEndTimeoutRef.current);
    }

    scrollEndTimeoutRef.current = window.setTimeout(
      () => {
        resolveSnapTarget(endClientX);
      },
      isCoarsePointer ? 40 : 110,
    );
  }

  function handleScroll() {
    if (viewMode !== "featured" || baseCount === 0) return;

    normalizeInfinitePosition();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      updateClosestCard();
    });

    if (!isDraggingRef.current) {
      scheduleSnapToMiddleBand();
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (viewMode !== "featured" || !scrollerRef.current) return;

    isDraggingRef.current = true;
    dragPointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartAtRef.current = performance.now();
    dragStartScrollLeftRef.current = scrollerRef.current.scrollLeft;
    dragMovedRef.current = false;

    scrollerRef.current.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (
      viewMode !== "featured" ||
      !isDraggingRef.current ||
      dragPointerIdRef.current !== event.pointerId ||
      !scrollerRef.current
    ) {
      return;
    }

    const dx = event.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) {
      dragMovedRef.current = true;
    }

    scrollerRef.current.scrollLeft = dragStartScrollLeftRef.current - dx;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      normalizeInfinitePosition();
      updateClosestCard();
    });
  }

  function endPointerDrag(pointerId?: number, endClientX?: number) {
    if (!isDraggingRef.current || !scrollerRef.current) return;

    if (pointerId !== undefined && dragPointerIdRef.current === pointerId) {
      scrollerRef.current.releasePointerCapture(pointerId);
    }

    if (dragMovedRef.current) {
      lastDragAtRef.current = Date.now();
    }

    isDraggingRef.current = false;
    dragPointerIdRef.current = null;

    scheduleSnapToMiddleBand(endClientX);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    endPointerDrag(event.pointerId, event.clientX);
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLDivElement>) {
    endPointerDrag(event.pointerId, event.clientX);
  }

  function setFilter(filter: FilterKey) {
    const nextProjects =
      filter === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(filter));

    setActiveFilter(filter);
    setHoveredFilterKey(null);
    setActiveIndex(nextProjects.length > 1 ? 1 : 0);
    setFilterOpen(false);
  }

  function goPrev() {
    if (!baseCount) return;

    setActiveIndex((prev) => {
      const next = prev === 0 ? baseCount - 1 : prev - 1;

      if (viewMode === "featured") {
        requestAnimationFrame(() => {
          scrollToCard(middleOffset + next);
        });
      }

      return next;
    });
  }

  function goNext() {
    if (!baseCount) return;

    setActiveIndex((prev) => {
      const next = prev === baseCount - 1 ? 0 : prev + 1;

      if (viewMode === "featured") {
        requestAnimationFrame(() => {
          scrollToCard(middleOffset + next);
        });
      }

      return next;
    });
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (viewMode !== "featured" || baseCount === 0) return;

    const id = requestAnimationFrame(() => {
      scrollToCardRef.current(
        middleOffset + safeActiveIndexRef.current,
        "auto",
      );
    });

    return () => cancelAnimationFrame(id);
  }, [viewMode, activeFilter, baseCount, middleOffset]);

  return (
    <section ref={rootRef} className="min-h-screen bg-[#efe6db] text-[#1b120d]">
      <div className="px-6 py-8 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="text-center">
            <h1
              ref={titleRef}
              className="text-[clamp(3.8rem,9vw,7rem)] font-light leading-[0.94] tracking-[-0.06em]"
            >
              Our Craft
            </h1>
          </div>

          <div
            ref={controlsRef}
            className="relative z-20 mt-10 grid gap-5 overflow-visible lg:mt-12 lg:grid-cols-[220px_1fr_220px] lg:items-center"
          >
            <motion.div
              ref={filterTriggerRef}
              className="relative z-[80] w-fit overflow-visible"
              onMouseEnter={() => setFilterHovered(true)}
              onMouseLeave={() => setFilterHovered(false)}
              initial={false}
            >
              <motion.div
                animate={{
                  y: filterHovered ? -1 : 0,
                  borderColor:
                    filterHovered || filterOpen
                      ? "rgba(255,77,18,0.65)"
                      : "rgba(232,160,141,1)",
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative inline-flex border p-[3px]"
              >
                <motion.span
                  animate={{
                    opacity: filterHovered || filterOpen ? 1 : 0,
                    scaleY: filterHovered || filterOpen ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute bottom-[3px] left-[3px] top-[3px] w-[3px] origin-center bg-[#ff5a1f]"
                />

                <motion.button
                  type="button"
                  onClick={() => setFilterOpen((prev) => !prev)}
                  animate={{ x: filterHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-flex h-[54px] items-center bg-black pl-9 pr-7 text-[0.95rem] uppercase tracking-[0.05em] text-white"
                >
                  Filter
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setFilterOpen((prev) => !prev)}
                  animate={{ x: filterHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-flex h-[54px] w-[54px] items-center justify-center bg-black text-white"
                  aria-label="Open filters"
                  aria-expanded={filterOpen}
                >
                  <motion.span
                    animate={{
                      rotate: filterOpen ? 180 : filterHovered ? 8 : 0,
                      y: filterHovered ? -1 : 0,
                    }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <ChevronDown size={18} strokeWidth={2.1} />
                  </motion.span>
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {filterOpen ? (
                  <motion.div
                    ref={filterMenuRef}
                    key="filter-popover"
                    initial={{
                      opacity: 0,
                      y: 10,
                      clipPath: "inset(0 0 100% 0)",
                    }}
                    animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                    exit={{ opacity: 0, y: 8, clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-[calc(100%+6px)] z-[120] w-[174px] bg-black px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                  >
                    <div
                      className="flex flex-col gap-5"
                      onMouseLeave={() => setHoveredFilterKey(null)}
                    >
                      {filterMenuItems.map((item) => {
                        const isCurrent = item.key === activeFilter;
                        const showIndicator = filterIndicatorKey === item.key;

                        return (
                          <motion.button
                            key={item.key}
                            type="button"
                            onClick={() => setFilter(item.key)}
                            onMouseEnter={() => setHoveredFilterKey(item.key)}
                            onFocus={() => setHoveredFilterKey(item.key)}
                            onBlur={() => setHoveredFilterKey(null)}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.18 }}
                            className="group relative flex items-center pl-5 text-left"
                          >
                            {showIndicator && (
                              <motion.span
                                layoutId="filter-active-indicator"
                                className="absolute left-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 bg-[#ff5a1f]"
                                transition={{
                                  type: "spring",
                                  stiffness: 520,
                                  damping: 38,
                                  mass: 0.7,
                                }}
                              />
                            )}

                            <motion.span
                              animate={{
                                color: isCurrent
                                  ? "#ff5a1f"
                                  : "rgba(255,255,255,0.92)",
                              }}
                              whileHover={{ color: "#ffffff" }}
                              transition={{ duration: 0.18 }}
                              className="text-[0.9rem] uppercase tracking-[0.05em]"
                            >
                              {item.label}
                            </motion.span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>

            <div className="flex flex-col items-start gap-4 lg:items-center">
              <div className="flex flex-wrap items-center gap-4">
                {filteredProjects.map((project, index) => {
                  const isActive = index === safeActiveIndex;

                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        setActiveIndex(index);
                        if (viewMode === "featured") {
                          requestAnimationFrame(() => {
                            scrollToCard(middleOffset + index);
                          });
                        }
                      }}
                      className={`relative h-[48px] w-[86px] overflow-hidden border transition ${
                        isActive
                          ? "border-[#9f8f80] opacity-100"
                          : "border-transparent opacity-35 hover:opacity-100"
                      }`}
                      aria-label={`Show ${project.title}`}
                    >
                      <Image
                        src={project.thumb}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              <motion.span
                key={activeProject?.id}
                layout
                className="mt-1 block h-[10px] w-[10px] bg-[#ff5a1f] lg:mt-2"
              />
            </div>

            <div className="flex items-center gap-2 lg:justify-end">
              <ControlButton
                active={viewMode === "split"}
                onClick={() => changeViewMode("split")}
                ariaLabel="Split layout"
              >
                <Columns2 size={18} strokeWidth={2.2} />
              </ControlButton>

              <ControlButton
                active={viewMode === "featured"}
                onClick={() => changeViewMode("featured")}
                ariaLabel="Featured carousel"
              >
                <LayoutGrid size={18} strokeWidth={2.2} />
              </ControlButton>

              <ControlButton
                active={viewMode === "grid"}
                onClick={() => changeViewMode("grid")}
                ariaLabel="Grid layout"
              >
                <Grid2x2 size={18} strokeWidth={2.2} />
              </ControlButton>

              <ControlButton onClick={goPrev} ariaLabel="Previous">
                <ChevronLeft size={18} strokeWidth={2.2} />
              </ControlButton>

              <ControlButton onClick={goNext} ariaLabel="Next">
                <ChevronRight size={18} strokeWidth={2.2} />
              </ControlButton>
            </div>
          </div>

          {isCoarsePointer && viewMode === "featured" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-black/46"
            >
              <span className="h-[8px] w-[8px] rotate-45 bg-[#ff5a1f]" />
              Swipe horizontally to move one project at a time
            </motion.div>
          )}

          <div ref={layoutRef} className="relative z-0">
            <AnimatePresence mode="wait">
              {viewMode === "featured" ? (
                <motion.div
                  key={`featured-${activeFilter}`}
                  variants={layoutContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="mt-8 overflow-x-auto select-none touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  ref={scrollerRef}
                  onScroll={handleScroll}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onPointerLeave={handlePointerUp}
                >
                  <div className="flex min-w-max gap-3 px-[6vw] pb-3 sm:gap-4 sm:px-[4vw]">
                    {loopedProjects.map((project, loopIndex) => {
                      const baseIndex = mod(loopIndex, baseCount);
                      const isActive = baseIndex === safeActiveIndex;

                      return (
                        <motion.div
                          key={`${project.id}-${loopIndex}`}
                          data-carousel-item
                          variants={layoutItemVariants}
                          className="shrink-0"
                        >
                          <InteractiveProjectCard
                            project={project}
                            active={isActive}
                            priority={loopIndex < 2}
                            widthClass={FEATURED_CARD_WIDTH}
                            heightClass={CARD_MEDIA_HEIGHT}
                            coarsePointer={isCoarsePointer}
                            onClick={() => {
                              if (Date.now() - lastDragAtRef.current < 250) {
                                return;
                              }

                              setActiveIndex(baseIndex);
                              requestAnimationFrame(() => {
                                scrollToCard(middleOffset + baseIndex);
                              });
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}

              {viewMode === "split" ? (
                <motion.div
                  key={`split-${activeFilter}`}
                  variants={layoutContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="mt-8 grid gap-5 xl:grid-cols-2"
                >
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      data-flip-id={`project-${project.id}`}
                      className="w-full"
                    >
                      <InteractiveProjectCard
                        project={project}
                        widthClass="w-full"
                        heightClass={CARD_MEDIA_HEIGHT}
                        coarsePointer={isCoarsePointer}
                      />
                    </div>
                  ))}
                </motion.div>
              ) : null}

              {viewMode === "grid" ? (
                <motion.div
                  key={`grid-${activeFilter}`}
                  variants={layoutContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      data-flip-id={`project-${project.id}`}
                      className="w-full"
                    >
                      <InteractiveProjectCard
                        project={project}
                        widthClass="w-full"
                        heightClass={CARD_MEDIA_HEIGHT}
                        coarsePointer={isCoarsePointer}
                      />
                    </div>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
