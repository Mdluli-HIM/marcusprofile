import { ReactNode } from "react";
import { SideNav } from "@/components/layout/side-nav";

type SiteShellProps = {
  children: ReactNode;
  home?: boolean;
};

export function SiteShell({ children, home = false }: SiteShellProps) {
  return (
    <>
      <SideNav />
      <main
        className={
          home
            ? "min-h-screen pb-24 lg:pb-0 lg:pl-[72px]"
            : "min-h-screen bg-[white pb-24 text-black lg:pb-0 lg:pl-[72px]"
        }
      >
        {children}
      </main>
    </>
  );
}
