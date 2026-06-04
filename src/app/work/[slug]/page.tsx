import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/work-projects";

function Divider() {
  return <div className="h-px w-full bg-black/10" />;
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div className="py-4">
        <p className="text-[1.08rem] text-black/85">
          {label}: {value}
        </p>
      </div>
      <Divider />
    </>
  );
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const uiGallery = [
    project.caseStudy.overviewImage,
    ...project.caseStudy.galleryImages,
    project.caseStudy.heroImage,
    project.caseStudy.challengeImage,
  ]
    .filter(Boolean)
    .filter((src, index, arr) => arr.indexOf(src) === index)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f4f1ec] text-[#14110e]">
      <header className="mx-auto w-full max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border border-black/10 bg-white/60 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-black/60 transition hover:text-black"
            >
              <span aria-hidden>←</span>
              Back to work
            </Link>
            <h1 className="text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[0.94] tracking-[-0.06em]">
              {project.title}
            </h1>
            <p className="text-[0.78rem] uppercase tracking-[0.22em] text-black/45">
              {project.meta}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[46px] items-center justify-center bg-[#ff5a1f] px-6 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-black transition hover:opacity-90"
            >
              View live site
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-8">
            <div className="relative overflow-hidden bg-[#121212]">
              <div className="relative aspect-[16/8] min-h-[260px] w-full">
                <Image
                  src={project.caseStudy.heroImage}
                  alt={`${project.title} hero`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden">
                <div className="translate-y-[18%] text-[clamp(3.5rem,14vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-white/18">
                  {project.caseStudy.ghostTitle}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-[clamp(2.1rem,5vw,3.3rem)] font-medium leading-[0.98] tracking-[-0.06em]">
                {project.caseStudy.introHeading}
              </h2>
              <Divider />
              <div className="max-w-[900px] space-y-6 text-[1.08rem] leading-[1.75] text-black/72">
                {project.caseStudy.introBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-black/10 bg-white/70 p-6 backdrop-blur">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/45">
                Project details
              </p>
              <div className="mt-4 space-y-0">
                {project.caseStudy.details.map((item) => (
                  <MetaRow key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>

            <div className="border border-black/10 bg-white/70 p-6 backdrop-blur">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/45">
                Tech used
              </p>
              <div className="mt-3 text-[1.02rem] leading-[1.7] text-black/72">
                {project.caseStudy.details.find((item) => item.label === "Techstack")
                  ?.value ?? "—"}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/45">
                UI gallery
              </p>
              <h3 className="text-[clamp(1.8rem,4vw,2.7rem)] font-medium leading-[0.98] tracking-[-0.06em]">
                Four key screens
              </h3>
            </div>
          </div>

          <Divider />

          <div className="grid gap-5 md:grid-cols-2">
            {uiGallery.map((src) => (
              <div key={src} className="overflow-hidden bg-white/60 p-4">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={src}
                    alt={`${project.title} UI screen`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="space-y-3">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/45">
              Challenges
            </p>
            <h3 className="text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.06em]">
              {project.caseStudy.challengeHeading}
            </h3>
          </div>

          <div className="space-y-6">
            <div className="max-w-[900px] space-y-6 text-[1.08rem] leading-[1.75] text-black/72">
              {project.caseStudy.challengeBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/45">
              Outcome
            </p>
            <h3 className="text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.06em]">
              {project.caseStudy.outcomeHeading}
            </h3>
          </div>

          <div className="max-w-[900px] space-y-6 text-[1.08rem] leading-[1.75] text-black/72">
            {project.caseStudy.outcomeBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
