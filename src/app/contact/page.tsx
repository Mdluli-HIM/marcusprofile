"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

const CONTACT_EMAIL = "mphomdluli@icloud.com";
const LINKEDIN_URL = "www.linkedin.com/in/mpho-marcus-mdluli";
const GITHUB_URL = "https://github.com/Mdluli-HIM";

function ContactLink({
  href,
  label,
  variant = "primary",
  external = false,
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const surfaceClass =
    variant === "secondary"
      ? "bg-[#6d9472] text-black"
      : "bg-[#ff4d12] text-black";

  const content = (
    <span className="group inline-flex items-stretch transition-transform duration-200 hover:-translate-y-[1px]">
      <span
        className={`inline-flex h-[52px] items-center px-5 text-[0.8rem] font-medium uppercase tracking-[0.08em] md:h-[56px] md:px-6 md:text-[0.83rem] ${surfaceClass}`}
      >
        {label}
      </span>
      <span
        className={`inline-flex h-[52px] w-[52px] items-center justify-center md:h-[56px] md:w-[56px] ${surfaceClass}`}
      >
        <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </span>
  );

  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <a href={href}>{content}</a>;
}

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="min-h-screen bg-[#f3f0ea] px-5 py-8 md:px-8 md:py-10 xl:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-[0.92fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="lg:pt-6"
            >
              <div className="mb-4 md:mb-5">
                <p className="text-[1.5rem] font-black uppercase leading-none tracking-[-0.08em] text-black md:text-[2rem]">
                  MARCUS
                </p>
              </div>

              <div className="relative overflow-hidden border border-black/8 bg-black/5">
                <div className="relative h-[280px] sm:h-[380px] md:h-[480px] lg:h-[600px] xl:h-[720px]">
                  <Image
                    src="/images/contact/contact-photo.jpg"
                    alt="Marcus Mdluli portrait"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: "easeOut" }}
              className="lg:pt-8"
            >
              <h1 className="text-[clamp(2.75rem,11vw,7.2rem)] font-light leading-[0.9] tracking-[-0.06em] text-black md:leading-[0.88] md:tracking-[-0.07em]">
                Get in
                <span className="block">touch</span>
              </h1>

              <p className="mt-8 max-w-[420px] text-[0.98rem] leading-[1.7] text-black/54 md:mt-10 md:text-[1.05rem]">
                Open to software design and engineering roles. Based in South
                Africa, open globally.
              </p>

              <div className="mt-10 space-y-8 md:mt-16 lg:mt-20">
                <div>
                  <p className="mb-4 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#ff4d12]">
                    <span className="h-[8px] w-[8px] bg-[#ff4d12]" />
                    Email
                  </p>
                  <p className="mb-2 text-[0.98rem] text-black/58">
                    {CONTACT_EMAIL}
                  </p>
                  <ContactLink
                    href={`mailto:${CONTACT_EMAIL}`}
                    label="Email Me"
                  />
                </div>

                <div>
                  <p className="mb-4 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#ff4d12]">
                    <span className="h-[8px] w-[8px] bg-[#ff4d12]" />
                    Connect
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ContactLink
                      href={LINKEDIN_URL}
                      label="LinkedIn"
                      variant="secondary"
                      external
                    />
                    <ContactLink href={GITHUB_URL} label="GitHub" external />
                  </div>
                </div>

                <div className="border-t border-black/10 pt-8">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-black/38">
                    Location
                  </p>
                  <p className="mt-3 text-[1rem] text-black/78">
                    South Africa · open globally
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
