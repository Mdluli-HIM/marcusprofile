"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type PageTransitionContextValue = {
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null,
);

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.button !== 0
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used inside PageTransitionProvider",
    );
  }

  return context;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");

  const previousPathnameRef = useRef(pathname);
  const pushTimeoutRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (!href || href === pathname || isTransitioning) return;

      if (pushTimeoutRef.current) {
        window.clearTimeout(pushTimeoutRef.current);
      }

      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }

      setIsTransitioning(true);
      setPhase("cover");

      pushTimeoutRef.current = window.setTimeout(() => {
        router.push(href);
      }, 300);
    },
    [isTransitioning, pathname, router],
  );

  useEffect(() => {
    if (!isTransitioning) {
      previousPathnameRef.current = pathname;
      return;
    }

    if (pathname === previousPathnameRef.current) return;

    previousPathnameRef.current = pathname;

    const raf = window.requestAnimationFrame(() => {
      setPhase("reveal");
    });

    exitTimeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
      setIsTransitioning(false);
    }, 520);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [isTransitioning, pathname]);

  useEffect(() => {
    return () => {
      if (pushTimeoutRef.current) {
        window.clearTimeout(pushTimeoutRef.current);
      }

      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      navigate,
      isTransitioning,
    }),
    [navigate, isTransitioning],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed inset-y-0 left-[72px] right-0 z-[200] overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            x: phase === "idle" ? "-101%" : phase === "cover" ? "0%" : "101%",
          }}
          transition={{
            duration: phase === "cover" ? 0.42 : 0.54,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 bg-black"
        >
          <div className="absolute inset-y-0 right-0 w-[3px] bg-[#ff4d12]" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            x: phase === "idle" ? "-108%" : phase === "cover" ? "0%" : "108%",
            opacity: phase === "idle" ? 0 : 1,
          }}
          transition={{
            duration: phase === "cover" ? 0.5 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025),transparent_22%)]"
        />
      </div>
    </PageTransitionContext.Provider>
  );
}

export function PageViewport({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.46,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

type TransitionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Omit<LinkProps, "href"> & {
    href: string;
    children: ReactNode;
  };

export function TransitionLink({
  href,
  children,
  onClick,
  target,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname();
  const { navigate, isTransitioning } = usePageTransition();

  return (
    <Link
      href={href}
      target={target}
      aria-disabled={isTransitioning}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) return;
        if (target === "_blank") return;
        if (isModifiedEvent(event)) return;
        if (href.startsWith("#")) return;
        if (/^https?:\/\//.test(href)) return;
        if (href === pathname) return;

        event.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
