"use client";

import { Slide } from "../Slide";

export default function Slide12Architecture() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">Architecture &amp; Headline Results</h1>

      {/* Full-width architecture image */}
      <div className="w-full flex justify-center mb-6">
        <img
          src="/assets/fig_architecture_composite.png"
          alt="Figure 1: Standard vs cosine encoder architecture, FVE/probing comparison, and learned a number line"
          className="w-full max-h-[350px] object-contain"
        />
      </div>

      {/* Three stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-[--color-border] rounded-lg p-4 text-center">
          <p className="text-base text-[--color-muted] mb-1">FVE matched</p>
          <p className="text-xl font-bold">0.770 vs 0.771</p>
        </div>
        <div className="border border-[--color-border] rounded-lg p-4 text-center">
          <p className="text-base text-[--color-muted] mb-1">Probing top-1</p>
          <p className="text-xl font-bold text-[--color-accent]">+14.9%</p>
        </div>
        <div className="border border-[--color-border] rounded-lg p-4 text-center">
          <p className="text-base text-[--color-muted] mb-1">Learned <em>a</em></p>
          <p className="text-xl font-bold">&asymp; 0.26 <span className="text-base font-normal text-[--color-muted]">(far from inner product)</span></p>
        </div>
      </div>
    </Slide>
  );
}
