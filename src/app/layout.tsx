import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcus Mdluli",
  description:
    "Marcus Mdluli — software designer and engineer. Portfolio across frontend, backend, and UI.",
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
