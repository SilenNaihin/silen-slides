"use client";

import { Slide } from "../Slide";

export default function Slide14PerTaskProbing() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">
        Cosine Wins on Probing Across Tasks
      </h1>

      <img
        src="/assets/fig_hero.png"
        alt="Figure 2: per-task probing accuracy, firings vs token norm, reconstruction norm ratio"
        className="w-full max-h-[320px] object-contain mb-6"
      />

      <ul className="space-y-3 text-base">
        <li>
          <span className="font-semibold">Panel A:</span> Per-feature cosine wins 7/8 tasks, +14.9% mean. Sentiment is the only reversal (+3.5% for standard — magnitude carries task-relevant signal there).
        </li>
        <li>
          <span className="font-semibold">Panel B:</span> Standard fires 29% more on high-norm tokens (selective firing bias).
        </li>
        <li>
          <span className="font-semibold">Panel C:</span> Standard reconstructs Q4 at 9.5x input norm (magnitude leaks into sparse code).
        </li>
      </ul>
    </Slide>
  );
}
