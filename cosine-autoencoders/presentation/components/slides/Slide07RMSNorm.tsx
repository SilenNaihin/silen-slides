"use client";

import { Slide } from "../Slide";
import { InlineMath } from "../KaTeX";

export default function Slide07RMSNorm() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-8">The Norm Mismatch</h1>

      <div className="grid grid-cols-[40%_1fr] gap-8 items-center">
        {/* Left: bullet annotations */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <span className="text-[--color-accent] font-bold text-xl mt-0.5">1</span>
            <p className="text-lg">
              RMSNorm strips magnitude before the sublayer reads it
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[--color-accent] font-bold text-xl mt-0.5">2</span>
            <p className="text-lg">
              But the encoder score{" "}
              <InlineMath math={String.raw`\langle w_i, x \rangle = \|x\| \cdot \cos(x, w_i)`} />{" "}
              scales with{" "}
              <InlineMath math={String.raw`\|x\|`} />
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[--color-accent] font-bold text-xl mt-0.5">3</span>
            <p className="text-lg">
              The encoder detects a quantity the model discards
            </p>
          </div>
        </div>

        {/* Right: figure (~60% width) */}
        <div className="flex items-center justify-center">
          <img
            src="/assets/fig_rmsnorm_placement.png"
            alt="RMSNorm placement diagram showing residual stream splitting into normalized path (to sublayer) vs raw path (to SAE encoder)"
            className="max-h-[420px] w-full object-contain"
          />
        </div>
      </div>
    </Slide>
  );
}
