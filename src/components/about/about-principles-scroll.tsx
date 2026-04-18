"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Segment = { type: "text"; value: string } | { type: "square" };

type PrincipleRow = {
  id: string;
  lines: Segment[][];
};

const ACCENT = "#ff4d12";
const SQUARE = "#111111";

const PRINCIPLES: PrincipleRow[] = [
  {
    id: "purpose",
    lines: [
      [
        { type: "text", value: "Creating with purpose, " },
        { type: "square" },
        { type: "text", value: " for a desired" },
      ],
      [{ type: "text", value: "outcome" }],
    ],
  },
  {
    id: "appearance",
    lines: [
      [
        { type: "text", value: "It's not just about appearances " },
        { type: "square" },
        { type: "text", value: ", it's about" },
      ],
      [{ type: "text", value: "experiences that connect" }],
    ],
  },
  {
    id: "empathy",
    lines: [
      [{ type: "text", value: "At the core is empathy: understanding" }],
      [
        { type: "text", value: "people's needs " },
        { type: "square" },
        { type: "text", value: " and turning them into" },
      ],
      [{ type: "text", value: "value" }],
    ],
  },
];

function renderLineSegments(
  segments: Segment[],
  rowId: string,
  lineIndex: number,
  tone: "base" | "overlay",
) {
  return segments.map((segment, segmentIndex) => {
    if (segment.type === "square") {
      return (
        <span
          key={`${rowId}-${lineIndex}-square-${segmentIndex}-${tone}`}
          data-overlay-segment={tone === "overlay" ? "true" : undefined}
          data-overlay-square={tone === "overlay" ? "true" : undefined}
          className="mx-[0.13em] inline-block h-[0.14em] w-[0.14em] align-[0.08em]"
          style={{ backgroundColor: SQUARE }}
        />
      );
    }

    return (
      <span
        key={`${rowId}-${lineIndex}-text-${segmentIndex}-${tone}`}
        data-overlay-segment={tone === "overlay" ? "true" : undefined}
      >
        {segment.value}
      </span>
    );
  });
}

export default function AboutPrinciplesScroll() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion() ?? false;

  useGSAP(
    () => {
      const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!rows.length) return;

      rows.forEach((row) => {
        const overlayLines = gsap.utils.toArray<HTMLElement>(
          row.querySelectorAll("[data-overlay-line]"),
        );

        if (!overlayLines.length) return;

        if (reduceMotion) {
          overlayLines.forEach((line) => {
            const segments = gsap.utils.toArray<HTMLElement>(
              line.querySelectorAll("[data-overlay-segment]"),
            );

            gsap.set(segments, {
              clipPath: "inset(0 0% 0 0)",
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            });
          });
          return;
        }

        overlayLines.forEach((line) => {
          const segments = gsap.utils.toArray<HTMLElement>(
            line.querySelectorAll("[data-overlay-segment]"),
          );

          gsap.set(segments, {
            clipPath: "inset(0 100% 0 0)",
            y: 10,
            opacity: 1,
            filter: "blur(1px)",
            willChange: "clip-path, transform, filter",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 68%",
            end: "top 32%",
            scrub: 0.5,
          },
        });

        overlayLines.forEach((line, lineIndex) => {
          const segments = gsap.utils.toArray<HTMLElement>(
            line.querySelectorAll("[data-overlay-segment]"),
          );
          const textSegments = segments.filter(
            (segment) => !segment.hasAttribute("data-overlay-square"),
          );
          const squareSegments = segments.filter((segment) =>
            segment.hasAttribute("data-overlay-square"),
          );

          const lineBaseTime = lineIndex * 0.14;

          if (textSegments.length) {
            tl.to(
              textSegments,
              {
                clipPath: "inset(0 0% 0 0)",
                y: 0,
                filter: "blur(0px)",
                ease: "none",
                duration: 0.2,
                stagger: 0.035,
              },
              lineBaseTime,
            );
          }

          if (squareSegments.length) {
            tl.to(
              squareSegments,
              {
                clipPath: "inset(0 0% 0 0)",
                y: 0,
                filter: "blur(0px)",
                ease: "none",
                duration: 0.14,
              },
              lineBaseTime + 0.06,
            );
          }
        });

        gsap.fromTo(
          row,
          { y: 12 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 76%",
              end: "top 32%",
              scrub: 0.5,
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [reduceMotion] },
  );

  return (
    <section
      ref={rootRef}
      className="border-t border-black/8 bg-white px-6 py-20 md:px-8 lg:px-10 xl:px-12"
    >
      <div className="mx-auto max-w-[1080px]">
        {PRINCIPLES.map((principle, index) => (
          <div
            key={principle.id}
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            className="border-b border-black/8 py-7 md:py-8"
          >
            <div className="relative max-w-[900px]">
              <div className="text-[clamp(1.7rem,3.15vw,3.05rem)] font-light leading-[1.06] tracking-[-0.06em] text-black/18">
                {principle.lines.map((line, lineIndex) => (
                  <div key={`${principle.id}-base-line-${lineIndex}`}>
                    {renderLineSegments(line, principle.id, lineIndex, "base")}
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 text-[clamp(1.7rem,3.15vw,3.05rem)] font-light leading-[1.06] tracking-[-0.06em]"
                style={{ color: ACCENT }}
              >
                {principle.lines.map((line, lineIndex) => (
                  <div
                    key={`${principle.id}-overlay-wrap-${lineIndex}`}
                    className="overflow-hidden"
                  >
                    <div data-overlay-line>
                      {renderLineSegments(
                        line,
                        principle.id,
                        lineIndex,
                        "overlay",
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
