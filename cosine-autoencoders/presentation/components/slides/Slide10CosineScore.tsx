"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide10CosineScore() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">The Cosine Encoder</h1>

      {/* 3-step progression */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-[--color-accent] font-mono font-bold text-lg shrink-0">1.</span>
          <div className="text-lg">
            <span className="font-semibold">Standard:</span>{" "}
            <InlineMath math={String.raw`s_i(x) = \langle w_i, x \rangle`} />
            <span className="text-[--color-muted] ml-2">(couples direction + magnitude)</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-[--color-accent] font-mono font-bold text-lg shrink-0">2.</span>
          <div className="text-lg">
            <span className="font-semibold">Idea:</span> remove{" "}
            <InlineMath math={String.raw`\|x\|`} /> — use{" "}
            <InlineMath math={String.raw`\cos(x_c, w_i)`} />
            <span className="text-[--color-muted] ml-2">(but decoder still needs scale)</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-[--color-accent] font-mono font-bold text-lg shrink-0">3.</span>
          <div className="text-lg">
            <span className="font-semibold">Solution:</span> let the optimizer choose how much norm to keep
          </div>
        </div>
      </div>

      {/* Main equation card */}
      <div className="bg-[--color-surface] p-6 rounded-lg border border-[--color-border] mb-6">
        <BlockMath
          math={String.raw`s_i(x) = e^b \|x_c\|^a \cdot \cos(x_c, w_i) + b_{\text{enc},i}`}
          className="text-xl"
        />
      </div>

      {/* Bullet explanations */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-lg">
        <div className="flex items-center gap-2">
          <InlineMath math={String.raw`a = 0`} />
          <span className="text-[--color-muted]">→ pure cosine (direction only)</span>
        </div>
        <div className="flex items-center gap-2">
          <InlineMath math={String.raw`a = 1`} />
          <span className="text-[--color-muted]">→ recovers inner product</span>
        </div>
        <div className="flex items-center gap-2">
          <InlineMath math={String.raw`a`} />
          <span className="text-[--color-muted]">is learned — optimizer decides the right geometry</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[--color-muted]">Initialize</span>
          <InlineMath math={String.raw`a = 0`} />
          <span className="text-[--color-muted]">, let training find the sweet spot</span>
        </div>
      </div>
    </Slide>
  );
}
