"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { getProjectBySlug } from "@/data/work-projects";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#ff4d12]">
      <span className="h-[8px] w-[8px] bg-[#ff4d12]" />
      <span>{children}</span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-black/10 py-4">
      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-black/36">
        {label}
      </p>
      <p className="mt-2 text-[1rem] leading-[1.7] text-black/78">{value}</p>
    </div>
  );
}

function CtaButton({
  href,
  label,
  external = false,
  disabled = false,
}: {
  href: string;
  label: string;
  external?: boolean;
  disabled?: boolean;
}) {
  const content = (
    <>
      <span className="inline-flex h-[56px] items-center bg-[#ff4d12] px-7 text-[0.85rem] font-medium uppercase tracking-[0.08em] text-black transition hover:brightness-[0.98]">
        {label}
      </span>
      <span className="inline-flex h-[56px] w-[56px] items-center justify-center bg-[#ff4d12] text-black">
        {external ? (
          <ArrowUpRight className="h-5 w-5" />
        ) : (
          <Plus className="h-5 w-5" />
        )}
      </span>
    </>
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        title="Figma link coming soon"
        className="inline-flex cursor-not-allowed items-stretch opacity-45"
      >
        {content}
      </span>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-stretch"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex items-stretch">
      {content}
    </Link>
  );
}

export default function WorkProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;
  const hasFigmaUrl = Boolean(project.figmaUrl?.trim());

  return (
    <SiteShell>
      <div className="min-h-screen bg-[#f3f0ea] text-black">
        <section className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-[1600px]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden border border-black/8 bg-black/5">
                <div className="relative aspect-[16/7]">
                  <Image
                    src={caseStudy.heroImage}
                    alt={project.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <h1 className="text-center text-[clamp(3.8rem,11vw,10rem)] font-semibold uppercase leading-none tracking-[-0.08em] text-white/30">
                    {caseStudy.ghostTitle}
                  </h1>
                </div>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(320px,0.85fr)_minmax(420px,1.15fr)] xl:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h2 className="text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-black">
                  {project.title}
                </h2>

                <div className="mt-8 flex flex-wrap gap-4">
                  <CtaButton
                    href={project.liveUrl}
                    label="View Live Site"
                    external
                  />
                  <CtaButton
                    href={project.figmaUrl ?? "#"}
                    label="View in Figma"
                    external
                    disabled={!hasFigmaUrl}
                  />
                </div>

                <div className="mt-10">
                  {caseStudy.details.map((detail) => (
                    <DetailRow
                      key={detail.label}
                      label={detail.label}
                      value={detail.value}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SectionEyebrow>Overview</SectionEyebrow>

                <h3 className="max-w-[12ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
                  {caseStudy.introHeading}
                </h3>

                <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.95] text-black/58 xl:text-[1.08rem]">
                  {caseStudy.introBody.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(320px,0.92fr)_minmax(420px,1.08fr)] xl:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative overflow-hidden border border-black/8 bg-black/5">
                  <div className="relative aspect-[1.12/1]">
                    <Image
                      src={caseStudy.challengeImage}
                      alt={`${project.title} challenge visual`}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SectionEyebrow>Challenge</SectionEyebrow>

                <h3 className="max-w-[12ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
                  {caseStudy.challengeHeading}
                </h3>

                <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.95] text-black/58 xl:text-[1.08rem]">
                  {caseStudy.challengeBody.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>

            {caseStudy.solutionHeading && caseStudy.solutionBody?.length ? (
              <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(320px,0.92fr)_minmax(420px,1.08fr)] xl:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="relative overflow-hidden border border-black/8 bg-black/5">
                    <div className="relative aspect-[1.12/1]">
                      <Image
                        src={caseStudy.overviewImage}
                        alt={`${project.title} solution visual`}
                        fill
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.26,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <SectionEyebrow>Solution</SectionEyebrow>

                  <h3 className="max-w-[12ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
                    {caseStudy.solutionHeading}
                  </h3>

                  <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.95] text-black/58 xl:text-[1.08rem]">
                    {caseStudy.solutionBody.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : null}

            {caseStudy.featuresHeading && caseStudy.features?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-16"
              >
                <SectionEyebrow>Features</SectionEyebrow>

                <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.7fr)_minmax(420px,1.3fr)] xl:gap-16">
                  <div>
                    <h3 className="max-w-[12ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
                      {caseStudy.featuresHeading}
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {caseStudy.features.map((feature, index) => (
                      <div
                        key={index}
                        className="border border-black/10 bg-white/60 p-5 text-[0.98rem] leading-[1.75] text-black/70"
                      >
                        <div className="mb-3 h-[8px] w-[8px] bg-[#ff4d12]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}

            {caseStudy.techHeading && caseStudy.techStack?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-16"
              >
                <SectionEyebrow>Technology</SectionEyebrow>

                <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.7fr)_minmax(420px,1.3fr)] xl:gap-16">
                  <div>
                    <h3 className="max-w-[12ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
                      {caseStudy.techHeading}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {caseStudy.techStack.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center border border-black/10 bg-white/70 px-4 py-3 text-[0.85rem] uppercase tracking-[0.08em] text-black/76"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}

            <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(320px,0.92fr)_minmax(420px,1.08fr)] xl:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative overflow-hidden border border-black/8 bg-black/5">
                  <div className="relative aspect-[1.12/1]">
                    <Image
                      src={caseStudy.overviewImage}
                      alt={`${project.title} overview visual`}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SectionEyebrow>Outcome</SectionEyebrow>

                <h3 className="max-w-[12ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
                  {caseStudy.outcomeHeading}
                </h3>

                <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.95] text-black/58 xl:text-[1.08rem]">
                  {caseStudy.outcomeBody.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.46,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-16"
            >
              <SectionEyebrow>Gallery</SectionEyebrow>

              <div className="grid gap-5 md:grid-cols-2">
                {caseStudy.galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden border border-black/8 bg-black/5"
                  >
                    <div className="relative aspect-[1.25/1]">
                      <Image
                        src={image}
                        alt={`${project.title} gallery image ${index + 1}`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-16 flex flex-wrap gap-4"
            >
              <CtaButton
                href={project.liveUrl}
                label="View Live Site"
                external
              />
              <CtaButton
                href={project.figmaUrl ?? "#"}
                label="View in Figma"
                external
                disabled={!hasFigmaUrl}
              />
              <CtaButton href="/work" label="Back to Projects" />
            </motion.div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
