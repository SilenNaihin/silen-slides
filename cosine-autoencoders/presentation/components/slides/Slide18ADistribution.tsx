"use client";

import { Slide } from "../Slide";

export default function Slide18ADistribution() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">
        Training Chooses Direction Over Magnitude
      </h1>

      <div className="flex justify-center mb-6">
        <img
          src="/assets/fig_a_distribution.png"
          alt="Per-feature a_i density at 5M vs 50M tokens"
          className="max-h-[350px] object-contain"
        />
      </div>

      <ul className="space-y-3 text-base text-[--color-foreground]">
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            Initialized at <em>a</em> = 0 (pure cosine)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            After 50M tokens, per-feature mean = 0.11 — still far from inner
            product (<em>a</em> = 1)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>No feature ever approaches the inner-product regime</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            The optimizer independently confirms: direction is the useful signal
          </span>
        </li>
      </ul>
    </Slide>
  );
}
