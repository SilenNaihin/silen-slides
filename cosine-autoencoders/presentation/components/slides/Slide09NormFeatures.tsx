"use client";

import { Slide } from "../Slide";
import { InlineMath } from "../KaTeX";

export default function Slide09NormFeatures() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-4">Standard Features Detect Norm, Not Content</h1>

      <div className="space-y-2 mb-5">
        <p className="text-lg">
          Under BatchTopK, a single batch-wide threshold selects the top <InlineMath math={String.raw`kN`} /> pre-activations.
        </p>
        <p className="text-lg">
          High-<InlineMath math={String.raw`\|x\|`} /> tokens inflate <span className="font-semibold">all</span> their pre-activations simultaneously, claiming disproportionate slots regardless of content.
        </p>
        <p className="text-lg">
          Result: the standard encoder spends most of its dictionary on <span className="font-semibold text-[--color-accent]">norm-conditioned features</span> that fire on magnitude, not meaning.
        </p>
      </div>

      {/* Figure */}
      <div className="flex justify-center">
        <img
          src="/assets/fig_parasitism.png"
          alt="Standard's unmatched features fire 86% on Q4 highest-norm tokens vs 57% for cosine"
          className="max-h-[300px] w-full object-contain"
        />
      </div>

      <p className="text-sm text-[--color-muted] text-center mt-3">
        55,789 standard-only features fire 86% on the highest-norm quartile. Cosine&apos;s unique features spread across all quartiles.
      </p>
    </Slide>
  );
}
