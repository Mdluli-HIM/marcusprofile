"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { useMemo, useState } from "react";
import { TransitionLink } from "@/components/layout/page-transition";

type IconProps = SVGProps<SVGSVGElement>;

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

const HOME_NAV_ICON_SRC = "/images/nav-icons/home.png";
const BURGER_MENU_ICON_SRC = "/images/nav-icons/burger-menu.png";
const WORK_NAV_ICON_SRC = "/images/nav-icons/project-management.png";
const CONTACT_NAV_ICON_SRC = "/images/nav-icons/contact-icon.png";

type NavItem = {
  href: string;
  label: string;
  icon?: ComponentType<IconProps>;
  imageSrc?: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "HOME", imageSrc: HOME_NAV_ICON_SRC },
  { href: "/about", label: "ABOUT", icon: ProfileGlyph },
  { href: "/work", label: "WORK", imageSrc: WORK_NAV_ICON_SRC },
  { href: "/contact", label: "CONTACT", imageSrc: CONTACT_NAV_ICON_SRC },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const activeHref = useMemo(() => {
    const found = navItems.find((item) => isActive(pathname, item.href));
    return found?.href ?? "/";
  }, [pathname]);

  const indicatorHref = hoveredHref ?? activeHref;

  return (
    <>
      {/* Mobile / tablet top bar */}
      <aside className="fixed inset-x-0 top-0 z-50 flex h-[64px] items-center justify-between border-b border-black/10 bg-[#f2f2ef] px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center text-black"
        >
          <motion.span
            animate={{ rotate: open ? 90 : 0, opacity: open ? 0.72 : 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative flex h-[20px] w-[20px] items-center justify-center"
          >
            <Image
              src={BURGER_MENU_ICON_SRC}
              alt=""
              width={20}
              height={20}
              className="h-[20px] w-[20px] object-contain"
              aria-hidden
            />
          </motion.span>
        </button>

        <div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black">
          <span className="text-[10px] font-medium tracking-[0.18em]">MM</span>
        </div>
      </aside>

      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[72px] bg-[#f2f2ef] text-black md:block">
        <div className="absolute inset-y-0 right-0 w-px bg-black/12" />

        <div className="relative flex h-full flex-col items-center justify-between py-4">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-11 w-11 place-items-center text-black transition hover:border-black/20"
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0, opacity: open ? 0.72 : 1 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative flex h-[20px] w-[20px] items-center justify-center"
            >
              <Image
                src={BURGER_MENU_ICON_SRC}
                alt=""
                width={20}
                height={20}
                className="h-[20px] w-[20px] object-contain"
                aria-hidden
              />
            </motion.span>
          </button>

          <nav
            className="flex flex-col items-center gap-3"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navItems.map(({ href, label, icon: Icon, imageSrc }) => {
              const isCurrent = activeHref === href;
              const showIndicator = indicatorHref === href;
              const emphasized = isCurrent || hoveredHref === href;

              return (
                <TransitionLink
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
                    {showIndicator ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-[#ff4d12]"
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 38,
                          mass: 0.7,
                        }}
                      />
                    ) : null}

                    {imageSrc ? (
                      <span
                        className={`relative z-10 transition-opacity duration-200 ${
                          emphasized ? "opacity-100" : "opacity-[0.78]"
                        }`}
                      >
                        <Image
                          src={imageSrc}
                          alt=""
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px] object-contain"
                          aria-hidden
                        />
                      </span>
                    ) : Icon ? (
                      <span
                        className={`relative z-10 transition-colors duration-200 ${
                          emphasized ? "text-black" : "text-black/78"
                        }`}
                      >
                        <Icon className="h-[20px] w-[20px]" />
                      </span>
                    ) : null}
                  </motion.div>
                </TransitionLink>
              );
            })}
          </nav>

          <div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black">
            <span className="text-[10px] font-medium tracking-[0.18em]">
              MM
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile + desktop flyout */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/18"
            />

            <motion.aside
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed left-0 top-[64px] z-50 flex h-[calc(100vh-64px)] w-[min(88vw,340px)] flex-col border-r border-black/10 bg-[#f2f2ef] px-6 py-8 text-black md:left-[72px] md:top-0 md:h-screen md:w-[340px] md:px-8 md:py-10"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-black/45">
                Marcus Mdluli
              </p>

              <h2 className="mt-4 text-[2.3rem] font-black uppercase leading-[0.92] tracking-[-0.04em] md:text-5xl">
                Frontend
                <span className="block text-[#ff4d12]">Developer</span>
              </h2>

              <nav
                className="mt-10 flex flex-col gap-4 md:mt-12 md:gap-5"
                onMouseLeave={() => setHoveredHref(null)}
              >
                {navItems.map(({ href, label }) => {
                  const isCurrent = activeHref === href;
                  const showIndicator = indicatorHref === href;
                  const isEmphasized = isCurrent || hoveredHref === href;

                  return (
                    <TransitionLink
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setHoveredHref(href)}
                      onFocus={() => setHoveredHref(href)}
                      onBlur={() => setHoveredHref(null)}
                      className={`flex w-full items-center gap-3 text-[1.5rem] font-black uppercase leading-none tracking-[0.03em] transition-colors duration-200 md:text-[2rem] ${
                        isEmphasized ? "text-[#ff4d12]" : "text-black/78"
                      }`}
                    >
                      <span
                        className="flex h-[2px] w-6 shrink-0 items-center justify-start self-center md:w-7"
                        aria-hidden
                      >
                        {showIndicator ? (
                          <motion.span
                            layoutId="nav-panel-indicator"
                            className="block h-[2px] w-6 rounded-full bg-[#ff4d12] md:w-7"
                            transition={{
                              type: "spring",
                              stiffness: 520,
                              damping: 38,
                              mass: 0.7,
                            }}
                          />
                        ) : null}
                      </span>

                      <span className="min-w-0">{label}</span>
                    </TransitionLink>
                  );
                })}
              </nav>

              <div className="mt-auto border border-black/10 bg-white px-4 py-4 md:px-5 md:py-5">
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
    </>
  );
}
