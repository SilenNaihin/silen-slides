"use client";

import { Slide } from "../Slide";

export default function Slide17Ablations() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">Design Space Ablation</h1>

      <div className="flex justify-center mb-6">
        <img
          src="/assets/ablations_table.png"
          alt="Full design-space ablation table with all variant rows"
          className="w-full max-h-[380px] object-contain"
        />
      </div>

      <ul className="space-y-3 text-base text-[--color-foreground]">
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            Global <em>a</em> alone gets most of the gain (0.800 vs 0.815 for
            per-feature)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            Encoder unit-normalization is essential (makes the score true cosine)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            Decoder normalization and bias restoration don&rsquo;t matter —
            it&rsquo;s all in the encoder score geometry
          </span>
        </li>
      </ul>
    </Slide>
  );
}
