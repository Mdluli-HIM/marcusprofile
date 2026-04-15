import type { Metadata } from "next";
import "./globals.css";
import InitialLoader from "@/components/motion/initial-loader";
import { PageTransitionProvider } from "@/components/layout/page-transition";

export const metadata: Metadata = {
  title: "Marcus Mdluli",
  description: "Frontend developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageTransitionProvider>
          <InitialLoader>{children}</InitialLoader>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
