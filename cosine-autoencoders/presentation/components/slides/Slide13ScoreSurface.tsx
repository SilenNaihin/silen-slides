"use client";

import { Slide } from "../Slide";
import { InlineMath } from "../KaTeX";

export default function Slide13ScoreSurface() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">
        What Does the Score Surface Look Like?
      </h1>

      <img
        src="/assets/fig_arch_overview.png"
        alt="Score surface contour plots for a=1, a=0, and a=0.258, plus per-feature a_i distribution"
        className="w-full max-h-[300px] object-contain mb-6"
      />

      <div className="grid grid-cols-3 gap-6 mb-4">
        <div className="border border-[--color-border] rounded-lg p-4">
          <p className="text-base font-semibold mb-1">
            <InlineMath math="a = 1" />
          </p>
          <p className="text-base text-[--color-muted]">
            Inner product — hyperbolic curves, high-norm tokens outscore low-norm
          </p>
        </div>
        <div className="border border-[--color-border] rounded-lg p-4">
          <p className="text-base font-semibold mb-1">
            <InlineMath math="a = 0" />
          </p>
          <p className="text-base text-[--color-muted]">
            Pure cosine — vertical curves, norm ignored
          </p>
        </div>
        <div className="border border-[--color-border] rounded-lg p-4">
          <p className="text-base font-semibold mb-1">
            <InlineMath math="a = 0.258" />
          </p>
          <p className="text-base text-[--color-muted]">
            Learned — mild tilt, close to cosine
          </p>
        </div>
      </div>

      <p className="text-base text-[--color-muted]">
        Per-feature <InlineMath math="a_i" /> distribution clusters near 0.08, well below inner-product limit
      </p>
    </Slide>
  );
}
