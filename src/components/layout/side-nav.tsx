"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { SVGProps } from "react";
import { useMemo, useState } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function HomeGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.75 10.25 12 4.5l7.25 5.75"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.75V19h9V9.75"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="8" r="3.1" strokeWidth="1.65" />
      <path
        d="M6.75 18.25c1.35-2.2 3.25-3.35 5.25-3.35s3.9 1.15 5.25 3.35"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WorkGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect
        x="4.5"
        y="7.5"
        width="15"
        height="10.25"
        rx="1.7"
        strokeWidth="1.65"
      />
      <path
        d="M9 7.5v-.65c0-1 .75-1.75 1.75-1.75h2.5c1 0 1.75.75 1.75 1.75v.65"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path d="M4.5 11.5h15" strokeWidth="1.65" />
    </svg>
  );
}

function MailGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect
        x="4.5"
        y="6.5"
        width="15"
        height="11"
        rx="1.7"
        strokeWidth="1.65"
      />
      <path
        d="m6.25 8.25 5.75 4.35 5.75-4.35"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "HOME", icon: HomeGlyph },
  { href: "/about", label: "ABOUT", icon: ProfileGlyph },
  { href: "/work", label: "WORK", icon: WorkGlyph },
  { href: "/contact", label: "CONTACT", icon: MailGlyph },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [mobileHoveredHref, setMobileHoveredHref] = useState<string | null>(null);

  const activeHref = useMemo(() => {
    const found = navItems.find((item) => isActive(pathname, item.href));
    return found?.href ?? "/";
  }, [pathname]);

  const indicatorHref = hoveredHref ?? activeHref;
  const mobileIndicatorHref = mobileHoveredHref ?? activeHref;

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[72px] bg-[#f2f2ef] text-black lg:block">
        <div className="absolute inset-y-0 right-0 w-px bg-black/12" />

        <div className="relative flex h-full flex-col items-center justify-between py-4">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="relative grid h-11 w-11 place-items-center border border-black/10 bg-white text-black transition hover:border-black/20"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute h-[1.5px] w-5 bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute h-[1.5px] w-5 bg-current"
            />
          </button>

          <nav
            className="flex flex-col items-center gap-3"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navItems.map(({ href, label, icon: Icon }) => {
              const isCurrent = activeHref === href;
              const showIndicator = indicatorHref === href;

              return (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  onMouseEnter={() => setHoveredHref(href)}
                  onFocus={() => setHoveredHref(href)}
                  onBlur={() => setHoveredHref(null)}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.18 }}
                    className="relative grid h-11 w-11 place-items-center"
                  >
                    {showIndicator && (
                      <motion.span
                        layoutId="desktop-nav-indicator"
                        className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-[#ff4d12]"
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 38,
                          mass: 0.7,
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isCurrent || hoveredHref === href
                          ? "text-black"
                          : "text-black/78"
                      }`}
                    >
                      <Icon className="h-[20px] w-[20px]" />
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          <div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black">
            <span className="text-[10px] font-medium tracking-[0.18em]">MM</span>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 lg:hidden">
        <div className="inline-flex h-10 items-center rounded-full border border-black/10 bg-[#f2f2ef]/92 px-4 text-[11px] font-medium tracking-[0.18em] text-black backdrop-blur-md">
          MM
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="relative grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-[#f2f2ef]/92 text-black backdrop-blur-md"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute h-[1.5px] w-5 bg-current"
          />
          <motion.span
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute h-[1.5px] w-5 bg-current"
          />
        </button>
      </div>

      <nav
        className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-[360px] -translate-x-1/2 items-center justify-between rounded-full border border-black/10 bg-[#f2f2ef]/94 px-3 py-2 text-black shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
        onMouseLeave={() => setMobileHoveredHref(null)}
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isCurrent = activeHref === href;
          const showIndicator = mobileIndicatorHref === href;

          return (
            <Link
              key={label}
              href={href}
              aria-label={label}
              onMouseEnter={() => setMobileHoveredHref(href)}
              onFocus={() => setMobileHoveredHref(href)}
              onBlur={() => setMobileHoveredHref(null)}
              className="relative flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.96 }}
                className="relative grid h-12 place-items-center"
              >
                {showIndicator && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute bottom-0 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-[#ff4d12]"
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 38,
                      mass: 0.7,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isCurrent || mobileHoveredHref === href
                      ? "text-black"
                      : "text-black/70"
                  }`}
                >
                  <Icon className="h-[20px] w-[20px]" />
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/16"
            />

            <motion.aside
              initial={{ x: 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 28, opacity: 0 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,360px)] flex-col border-l border-black/10 bg-[#f2f2ef] px-7 py-8 text-black lg:left-[72px] lg:right-auto lg:w-[340px] lg:border-l-0 lg:border-r lg:px-9 lg:py-10"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-black/45">
                Marcus Mdluli
              </p>

              <h2 className="mt-4 text-[2.8rem] font-black uppercase leading-[0.92] tracking-[-0.04em] lg:text-5xl">
                Frontend
                <span className="block text-[#ff4d12]">Developer</span>
              </h2>

              <nav className="mt-10 space-y-5 lg:mt-12">
                {navItems.map(({ href, label }) => {
                  const active = activeHref === href;

                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`group inline-flex items-center gap-3 text-[1.8rem] font-black uppercase tracking-[0.03em] transition lg:text-[2rem] ${
                        active ? "text-[#ff4d12]" : "text-black hover:text-[#ff4d12]"
                      }`}
                    >
                      <span className="block h-[2px] w-0 bg-[#ff4d12] transition-all duration-300 group-hover:w-7" />
                      {label}
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
        )}
      </AnimatePresence>
    </>
  );
}
