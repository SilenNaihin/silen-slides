"use client";

import { Slide } from "../Slide";
import { BlockMath } from "../KaTeX";

export default function Slide06BatchTopK() {
  const l1Loss = String.raw`\mathcal{L} = \|x - \hat{x}\|^2 + \lambda \|z\|_1`;

  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-8">Why BatchTopK?</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* L1 Penalty Card */}
        <div className="border border-[--color-border] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-[--color-muted]">L1 Penalty</h2>
          <BlockMath math={l1Loss} />
          <ul className="space-y-3 text-lg mt-4">
            <li className="flex gap-2">
              <span className="text-[--color-muted] shrink-0">-</span>
              <span>Constant shrinkage pressure on <em>all</em> activations</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[--color-muted] shrink-0">-</span>
              <span>Features learn to be small, not sparse</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[--color-muted] shrink-0">-</span>
              <span className="font-medium">Penalizes the features you DO want</span>
            </li>
          </ul>
        </div>

        {/* BatchTopK Card */}
        <div className="border border-[--color-accent] rounded-lg p-6 bg-blue-50/10">
          <h2 className="text-xl font-semibold mb-4 text-[--color-accent]">BatchTopK</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex gap-2">
              <span className="text-[--color-accent] shrink-0">+</span>
              <span>Keep exactly <em>k &middot; N</em> largest pre-activations per batch</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[--color-accent] shrink-0">+</span>
              <span>No penalty on selected features — full strength</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[--color-accent] shrink-0">+</span>
              <span>Sparsity by selection, not suppression</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[--color-accent] shrink-0">+</span>
              <span className="font-semibold">&ldquo;Sparse AND faithful&rdquo;</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-base text-[--color-muted] text-center">
        BatchTopK is now the SAEBench community standard (Karvonen et al., 2025)
      </p>
    </Slide>
  );
}
