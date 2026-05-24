"use client";

import { Slide } from "../Slide";

export default function Slide20ThankYou() {
  return (
    <Slide centered>
      <h1 className="text-5xl font-bold">Thank You</h1>

      <div className="h-8" />

      <img
        src="/assets/claas-system-cute.png"
        className="w-48 mx-auto rounded-xl"
        alt="CLaaS mascot"
      />

      <div className="h-6" />

      <p className="text-lg">Kion Fallah &middot; Silen Naihin &middot; Barak Widawsky</p>
      <p className="text-sm text-[--color-subtle] mt-1">
        ICML 2026 Workshop on Online Continual Learning
      </p>
    </Slide>
  );
}
