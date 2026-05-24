"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide08NormDetector() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-4">The Cosine Encoder</h1>

      <p className="text-lg text-[--color-muted] mb-4">
        Replace the inner-product score with a learned blend of cosine similarity and input magnitude:
      </p>

      {/* Main equation */}
      <div className="bg-[--color-surface] p-5 rounded-lg border border-[--color-border] mb-4">
        <BlockMath
          math={String.raw`s_i(x) = e^b \|x_c\|^a \cdot \cos(x_c, w_i) + b_{\text{enc},i}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-base mb-5">
        <div><InlineMath math={String.raw`a = 0`} /> <span className="text-[--color-muted]">→ pure cosine (direction only)</span></div>
        <div><InlineMath math={String.raw`a = 1`} /> <span className="text-[--color-muted]">→ recovers inner product</span></div>
        <div className="col-span-2"><InlineMath math={String.raw`a`} /> <span className="text-[--color-muted]">is learned — the optimizer decides how much norm matters</span></div>
      </div>

      <div className="callout text-base">
        <strong>Key property:</strong> The optimizer is free to recover inner product (<InlineMath math={String.raw`a=1`} />). Training consistently drives <InlineMath math={String.raw`a \to 0.26`} />, far from the inner-product limit.
      </div>
    </Slide>
  );
}
