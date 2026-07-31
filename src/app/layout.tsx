import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcus Mdluli",
  description:
    "UI/UX designer portfolio — e-commerce case studies, Figma files, and live prototypes for desktop and mobile.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
