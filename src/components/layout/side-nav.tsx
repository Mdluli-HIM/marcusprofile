"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  meta: string;
};

const ACCENT = "#ff4d12";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navItems: NavItem[] = [
  { href: "/", label: "HOME", meta: "Main index" },
  { href: "/work", label: "WORK", meta: "Selected projects" },
  { href: "/gallery", label: "ARCHIVE", meta: "Sketches and experiments" },
  { href: "/about", label: "ABOUT", meta: "Process and direction" },
  { href: "/contact", label: "CONTACT", meta: "Start a conversation" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandTrigger({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      className="group inline-flex h-[30px] w-[30px] items-center justify-center border-[2.5px] border-black bg-transparent transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ outlineColor: ACCENT }}
    >
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, scale: 0.94, borderRadius: 2 }
            : { rotate: 0, scale: 1, borderRadius: 0 }
        }
        transition={{ duration: 0.32, ease: EASE }}
        className="block h-[10px] w-[10px]"
        style={{ backgroundColor: ACCENT }}
      />
    </button>
  );
}

function GalleryEgg({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/gallery"
      aria-label="Open gallery"
      onClick={onClick}
      className={mobile ? "inline-flex" : "block"}
    >
      <motion.div
        initial={false}
        animate={{ y: [0, -1.5, 0] }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.96 }}
        className={`group relative flex items-center justify-center ${
          mobile
            ? "h-10 w-10 rounded-full border border-black/10 bg-[white/92 backdrop-blur-md"
            : "h-10 w-10"
        }`}
      >
        <span
          className={`absolute border border-black/16 transition-colors duration-200 group-hover:border-[#ff4d12]/55 ${
            mobile ? "h-[14px] w-[14px]" : "h-[16px] w-[16px]"
          }`}
        />
        <motion.span
          initial={false}
          animate={{
            opacity: [0.3, 0.72, 0.3],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${mobile ? "h-[5px] w-[5px]" : "h-[6px] w-[6px]"}`}
          style={{ backgroundColor: ACCENT }}
        />

        {!mobile && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-[calc(100%+12px)] whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-black/42"
          >
            Gallery
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
}

function DesktopRail({
  pathname,
  open,
  onToggle,
}: {
  pathname: string;
  open: boolean;
  onToggle: () => void;
}) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const activeHref = useMemo(() => {
    const found = navItems.find((item) => isActive(pathname, item.href));
    return found?.href ?? "/";
  }, [pathname]);

  const indicatorHref = hoveredHref ?? activeHref;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[72px] bg-[white text-black lg:block">
      <div className="absolute inset-y-0 right-0 w-px bg-black/12" />

      <div className="relative flex h-full flex-col items-center justify-between py-4">
        <BrandTrigger isOpen={open} onClick={onToggle} />

        <nav
          className="flex flex-1 flex-col items-center justify-center gap-2"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {navItems.map((item) => {
            const isCurrent = activeHref === item.href;
            const isHovered = hoveredHref === item.href;
            const showIndicator = indicatorHref === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                onMouseEnter={() => setHoveredHref(item.href)}
                onFocus={() => setHoveredHref(item.href)}
                onBlur={() => setHoveredHref(null)}
                className="relative flex h-[78px] w-[44px] items-center justify-center"
              >
                {showIndicator && (
                  <motion.span
                    layoutId="desktop-rail-indicator"
                    className="absolute -left-[15px] top-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      width: "2px",
                      height: isHovered && !isCurrent ? "34px" : "28px",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 38,
                      mass: 0.7,
                    }}
                  />
                )}

                <motion.span
                  initial={false}
                  animate={{
                    color: isCurrent
                      ? ACCENT
                      : isHovered
                        ? "#111111"
                        : "rgba(0,0,0,0.48)",
                    x: isHovered && !isCurrent ? 1 : 0,
                    y: isHovered && !isCurrent ? -1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="-rotate-90 whitespace-nowrap text-[10px] font-medium tracking-[0.28em]"
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-4">
          <GalleryEgg />
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-black/10 bg-black/[0.03]">
            <span
              className="block h-[6px] w-[6px] rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function MobileRail({
  pathname,
  open,
  onToggle,
  onClose,
}: {
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const activeHref = useMemo(() => {
    const found = navItems.find((item) => isActive(pathname, item.href));
    return found?.href ?? "/";
  }, [pathname]);

  const indicatorHref = hoveredHref ?? activeHref;

  return (
    <>
      <div className="fixed left-4 top-4 z-[60] lg:hidden">
        <BrandTrigger isOpen={open} onClick={onToggle} />
      </div>

      <nav
        className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-[420px] -translate-x-1/2 items-center justify-between rounded-full border border-black/10 bg-[white/94 px-3 py-2 text-black shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
        onMouseLeave={() => setHoveredHref(null)}
      >
        {navItems.map((item) => {
          const isCurrent = activeHref === item.href;
          const showIndicator = indicatorHref === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              onClick={onClose}
              onMouseEnter={() => setHoveredHref(item.href)}
              onFocus={() => setHoveredHref(item.href)}
              onBlur={() => setHoveredHref(null)}
              className="relative flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.96 }}
                className="relative grid h-12 place-items-center"
              >
                {showIndicator && (
                  <motion.span
                    layoutId="mobile-rail-indicator"
                    className="absolute bottom-0 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 38,
                      mass: 0.7,
                    }}
                  />
                )}

                <span
                  className="text-[9px] font-medium tracking-[0.2em] transition-colors duration-300"
                  style={{
                    color: isCurrent ? ACCENT : "rgba(0,0,0,0.58)",
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function FlyoutMenu({
  pathname,
  open,
  onClose,
}: {
  pathname: string;
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const activeHref = useMemo(() => {
    const found = navItems.find((item) => isActive(pathname, item.href));
    return found?.href ?? "/";
  }, [pathname]);

  const indicatorHref = hoveredHref ?? activeHref;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/16"
          />

          <motion.aside
            initial={reduceMotion ? false : { x: 28, opacity: 0 }}
            animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { x: 28, opacity: 0 }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,360px)] flex-col border-l border-black/10 bg-[white px-7 py-8 text-black lg:left-[72px] lg:right-auto lg:w-[340px] lg:border-l-0 lg:border-r lg:px-9 lg:py-10"
          >
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/45">
              Marcus Mdluli
            </p>

            <h2 className="mt-4 text-[2.8rem] font-black uppercase leading-[0.92] tracking-[-0.04em] lg:text-5xl">
              Frontend
              <span className="block" style={{ color: ACCENT }}>
                Developer
              </span>
            </h2>

            <nav
              className="mt-10 flex flex-col gap-5 lg:mt-12"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {navItems.map((item) => {
                const isCurrent = activeHref === item.href;
                const isHovered = hoveredHref === item.href;
                const showIndicator = indicatorHref === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    onFocus={() => setHoveredHref(item.href)}
                    onBlur={() => setHoveredHref(null)}
                    className="relative block w-full py-1 pl-9 text-left text-[1.8rem] font-black uppercase leading-none tracking-[0.03em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d12]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[white lg:text-[2rem]"
                  >
                    {showIndicator && (
                      <motion.span
                        layoutId="flyout-nav-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          backgroundColor: ACCENT,
                          height: "2px",
                          width: isHovered && !isCurrent ? "36px" : "28px",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 38,
                          mass: 0.7,
                        }}
                      />
                    )}

                    <motion.span
                      initial={false}
                      animate={{
                        color: isCurrent
                          ? ACCENT
                          : isHovered
                            ? "#111111"
                            : "#111111",
                        x: isHovered && !isCurrent ? 2 : 0,
                      }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="relative inline-block"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border border-black/10 bg-white px-5 py-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                Focus
              </p>
              <p className="mt-3 text-sm leading-7 text-black/85">
                Premium frontend, restrained motion, clean systems, and
                brand-led web experiences.
              </p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <>
      <DesktopRail pathname={pathname} open={open} onToggle={toggleMenu} />
      <MobileRail
        pathname={pathname}
        open={open}
        onToggle={toggleMenu}
        onClose={closeMenu}
      />
      <FlyoutMenu pathname={pathname} open={open} onClose={closeMenu} />
    </>
  );
}
