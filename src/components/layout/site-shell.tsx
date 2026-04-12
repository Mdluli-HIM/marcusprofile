import { ReactNode } from "react";
import { SideNav } from "@/components/layout/side-nav";
import {
  PageTransitionProvider,
  PageViewport,
} from "@/components/layout/page-transition";

type SiteShellProps = {
  children: ReactNode;
  home?: boolean;
};

export function SiteShell({ children, home = false }: SiteShellProps) {
  return (
    <PageTransitionProvider>
      <SideNav />
      <main
        className={
          home
            ? "min-h-screen pt-[64px] md:pt-0 md:pl-[72px]"
            : "min-h-screen bg-[#f2f2ef] pt-[64px] text-black md:pt-0 md:pl-[72px]"
        }
      >
        <PageViewport>{children}</PageViewport>
      </main>
    </PageTransitionProvider>
  );
}
