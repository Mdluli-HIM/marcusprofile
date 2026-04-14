"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { useMemo, useState } from "react";

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
/** Work icon: Execution by gravisio — https://www.flaticon.com/free-icons/execution (Flaticon license) */
const WORK_NAV_ICON_SRC = "/images/nav-icons/project-management.png";
/** Contact icon: Paul J. — https://www.flaticon.com/free-icons/contact (Flaticon license) */
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

function GalleryEgg({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link
      href="/gallery"
      aria-label="Open gallery"
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
        whileHover={{
          scale: 1.05,
          rotate: 2,
        }}
        whileTap={{ scale: 0.96 }}
        className={`group relative flex items-center justify-center ${
          mobile
            ? "h-10 w-10 rounded-full border border-black/10 bg-[#f2f2ef]/92 backdrop-blur-md"
            : "h-10 w-10"
        }`}
      >
        <motion.span
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
          className={`absolute bg-[#ff4d12] ${
            mobile ? "h-[5px] w-[5px]" : "h-[6px] w-[6px]"
          }`}
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

export function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [mobileHoveredHref, setMobileHoveredHref] = useState<string | null>(
    null,
  );

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
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative grid h-11 w-11 place-items-center text-black transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d12] ${
              open ? "opacity-100" : "opacity-[0.78] hover:opacity-100"
            }`}
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
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
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col items-center gap-4">
            <GalleryEgg />

            <div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black">
              <span className="text-[10px] font-medium tracking-[0.18em]">
                MM
              </span>
            </div>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 lg:hidden">
        <div className="inline-flex h-10 items-center rounded-full border border-black/10 bg-[#f2f2ef]/92 px-4 text-[11px] font-medium tracking-[0.18em] text-black backdrop-blur-md">
          MM
        </div>

        <div className="flex items-center gap-2">
          <GalleryEgg mobile />

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative grid h-11 w-11 place-items-center rounded-full text-black backdrop-blur-md transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d12] ${
              open ? "opacity-100" : "opacity-[0.78] hover:opacity-100"
            }`}
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
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
        </div>
      </div>

      <nav
        className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-[360px] -translate-x-1/2 items-center justify-between rounded-full border border-black/10 bg-[#f2f2ef]/94 px-3 py-2 text-black shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
        onMouseLeave={() => setMobileHoveredHref(null)}
      >
        {navItems.map(({ href, label, icon: Icon, imageSrc }) => {
          const isCurrent = activeHref === href;
          const showIndicator = mobileIndicatorHref === href;
          const emphasized = isCurrent || mobileHoveredHref === href;

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

                {imageSrc ? (
                  <span
                    className={`relative z-10 transition-opacity duration-200 ${
                      emphasized ? "opacity-100" : "opacity-70"
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
                      emphasized ? "text-black" : "text-black/70"
                    }`}
                  >
                    <Icon className="h-[20px] w-[20px]" />
                  </span>
                ) : null}
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

              <nav
                className="mt-10 flex flex-col gap-5 lg:mt-12"
                onMouseLeave={() => setHoveredHref(null)}
              >
                {navItems.map(({ href, label }) => {
                  const showFlyoutIndicator = indicatorHref === href;
                  const accentLabel = showFlyoutIndicator;

                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setHoveredHref(href)}
                      onFocus={() => setHoveredHref(href)}
                      onBlur={() => setHoveredHref(null)}
                      className={`relative block w-full py-1 pl-9 text-left text-[1.8rem] font-black uppercase leading-none tracking-[0.03em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d12]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2f2ef] lg:text-[2rem] ${
                        accentLabel ? "text-[#ff4d12]" : "text-black"
                      }`}
                    >
                      {showFlyoutIndicator && (
                        <motion.span
                          layoutId="flyout-nav-indicator"
                          className="absolute left-0 top-1/2 h-[2px] w-7 -translate-y-1/2 rounded-full bg-[#ff4d12]"
                          transition={{
                            type: "spring",
                            stiffness: 520,
                            damping: 38,
                            mass: 0.7,
                          }}
                        />
                      )}
                      <span className="relative">{label}</span>
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
