"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Slide01Title from "@/components/slides/Slide01Title";
import Slide02TableOfContents from "@/components/slides/Slide02TableOfContents";
import Slide03ProblemWhy from "@/components/slides/Slide03ProblemWhy";
import Slide04ProblemICL from "@/components/slides/Slide04ProblemICL";
import Slide05RLPrimer from "@/components/slides/Slide05RLPrimer";
import Slide06CurrentAlgorithms from "@/components/slides/Slide06CurrentAlgorithms";
import Slide07IHChallenge from "@/components/slides/Slide07IHChallenge";
import Slide08ProblemSetupMath from "@/components/slides/Slide08ProblemSetupMath";
import Slide09Algorithm from "@/components/slides/Slide09Algorithm";
import Slide10SystemOverview from "@/components/slides/Slide10SystemOverview";
import Slide11AsyncTimeline from "@/components/slides/Slide11AsyncTimeline";
import Slide12ExperienceReplay from "@/components/slides/Slide12ExperienceReplay";
import Slide13ResultsTable from "@/components/slides/Slide13ResultsTable";
import Slide14AlgorithmComparison from "@/components/slides/Slide14AlgorithmComparison";
import Slide15SDPOMath from "@/components/slides/Slide15SDPOMath";
import Slide16SDPOHighLevel from "@/components/slides/Slide16SDPOHighLevel";
import Slide17WhySDPOWins from "@/components/slides/Slide17WhySDPOWins";
import Slide18WhatWeveTried from "@/components/slides/Slide18WhatWeveTried";
import Slide19FutureAndThanks from "@/components/slides/Slide19FutureAndThanks";
import Slide20ThankYou from "@/components/slides/Slide20ThankYou";

const slides = [
  Slide01Title,
  Slide02TableOfContents,
  Slide03ProblemWhy,
  Slide04ProblemICL,
  Slide05RLPrimer,
  Slide06CurrentAlgorithms,
  Slide07IHChallenge,
  Slide08ProblemSetupMath,
  Slide09Algorithm,
  Slide10SystemOverview,
  Slide11AsyncTimeline,
  Slide12ExperienceReplay,
  Slide13ResultsTable,
  Slide14AlgorithmComparison,
  Slide15SDPOMath,
  Slide16SDPOHighLevel,
  Slide17WhySDPOWins,
  Slide18WhatWeveTried,
  Slide19FutureAndThanks,
  Slide20ThankYou,
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const prevRef = useRef<number | null>(null);
  const total = slides.length;

  const goTo = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(total - 1, n));
    if (clamped === current) return;
    prevRef.current = current;
    setCurrent(clamped);
    window.location.hash = `#slide-${clamped + 1}`;
  }, [total, current]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#slide-")) {
      const n = parseInt(hash.replace("#slide-", ""), 10);
      if (n >= 1 && n <= total) setCurrent(n - 1);
    }
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX;
    const w = window.innerWidth;
    if (x > w * 0.65) next();
    else if (x < w * 0.35) prev();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden" onClick={handleClick}>
      {slides.map((SlideComponent, i) => {
        let className = "slide";
        if (i === current) className += " active";
        else if (i === prevRef.current) className += " prev";

        return (
          <section className={className} key={i}>
            <SlideComponent />
          </section>
        );
      })}

      {/* Navigation dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === current ? "active" : ""}`}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-6 right-8 text-xs text-[--color-subtle] font-mono z-50">
        {current + 1} / {total}
      </div>
    </div>
  );
}
