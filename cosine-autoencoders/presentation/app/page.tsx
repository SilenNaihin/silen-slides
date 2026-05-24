"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Slide01Title from "@/components/slides/Slide01Title";
import Slide02Outline from "@/components/slides/Slide02Outline";
import Slide03BlackBox from "@/components/slides/Slide03BlackBox";
import Slide04Superposition from "@/components/slides/Slide04Superposition";
import Slide05SAE from "@/components/slides/Slide05SAE";
import Slide06BatchTopK from "@/components/slides/Slide06BatchTopK";
import Slide07RMSNorm from "@/components/slides/Slide07RMSNorm";
import Slide08NormDetector from "@/components/slides/Slide08NormDetector";
import Slide09NormFeatures from "@/components/slides/Slide09NormFeatures";
import Slide09Q4Pathology from "@/components/slides/Slide09Q4Pathology";
import Slide10CosineScore from "@/components/slides/Slide10CosineScore";
import Slide11Parameterization from "@/components/slides/Slide11Parameterization";
import Slide12Architecture from "@/components/slides/Slide12Architecture";
import Slide13ScoreSurface from "@/components/slides/Slide13ScoreSurface";
import Slide14PerTaskProbing from "@/components/slides/Slide14PerTaskProbing";
import Slide15HeadlineNumbers from "@/components/slides/Slide15HeadlineNumbers";
import Slide16Discovery from "@/components/slides/Slide16Discovery";
import Slide17Ablations from "@/components/slides/Slide17Ablations";
import Slide18ADistribution from "@/components/slides/Slide18ADistribution";
import Slide19Limitations from "@/components/slides/Slide19Limitations";
import Slide20Recipe from "@/components/slides/Slide20Recipe";

const slides = [
  Slide01Title,
  Slide02Outline,
  Slide03BlackBox,
  Slide04Superposition,
  Slide05SAE,
  Slide06BatchTopK,
  Slide07RMSNorm,
  Slide08NormDetector,
  Slide09NormFeatures,
  Slide09Q4Pathology,
  Slide10CosineScore,
  Slide11Parameterization,
  Slide12Architecture,
  Slide13ScoreSurface,
  Slide14PerTaskProbing,
  Slide15HeadlineNumbers,
  Slide16Discovery,
  Slide17Ablations,
  Slide18ADistribution,
  Slide19Limitations,
  Slide20Recipe,
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
