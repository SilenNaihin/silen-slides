"use client";

import { Slide } from "../Slide";

export default function Slide09Q4Pathology() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">
        Standard SAEs Blow Up on High-Norm Tokens
      </h1>

      {/* Figure */}
      <div className="flex justify-center">
        <img
          src="/assets/fig_q4_pathology.png"
          alt="Per-quartile FVE showing standard SAE collapse at Q4 with FVE=-184, plus reconstruction norm ratio reaching 9.5x"
          className="max-h-[420px] w-full object-contain"
        />
      </div>

      {/* Callout */}
      <div className="mt-6 border-l-4 border-[--color-accent] bg-[--color-surface] px-5 py-4 rounded-r-lg">
        <p className="text-xl font-semibold">
          Q4 FVE = −184 — the standard SAE reconstructs high-norm tokens at 9.5× their input norm
        </p>
      </div>

      {/* Muted note */}
      <p className="text-base text-[--color-muted] mt-4">
        Both cosine variants stay positive across all quartiles.
      </p>
    </Slide>
  );
}
