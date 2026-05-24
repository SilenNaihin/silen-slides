"use client";

import { Slide } from "../Slide";

export default function Slide01Title() {
  return (
    <Slide centered>
      <div className="space-y-8">
        <h1 className="text-5xl font-bold leading-tight max-w-4xl">
          Size Doesn&apos;t Matter: Cosine-Scored Sparse Autoencoders
        </h1>
        <p className="text-xl text-[--color-muted] max-w-3xl">
          Fixing the scoring geometry for dictionary learning on normalized
          representations
        </p>
        <div className="pt-4 space-y-2">
          <p className="text-lg">Silen Naihin &middot; Lev Stambler</p>
          <p className="text-base text-[--color-muted]">
            ICML 2026 (Under Review)
          </p>
        </div>
        <p className="pt-8 text-sm text-[--color-muted] tracking-wide">
          Qwen3-8B &middot; 500M tokens &middot; +14.9% sparse-probing top-1
        </p>
      </div>
    </Slide>
  );
}
