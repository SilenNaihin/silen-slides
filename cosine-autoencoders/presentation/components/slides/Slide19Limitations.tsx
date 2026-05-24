"use client";

import { Slide } from "../Slide";

export default function Slide19Limitations() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-8">Limitations & Future Work</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Left card: Limitations */}
        <div className="border border-[--color-border] rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              <span className="text-[--color-muted] mt-1 shrink-0">&bull;</span>
              <span>
                Cosine loses at deep LayerNorm layers (Pythia, Falcon) where
                LayerNorm preserves magnitude-correlated structure
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-muted] mt-1 shrink-0">&bull;</span>
              <span>
                Sentiment reversal: +3.5% for standard &mdash; magnitude carries
                task-relevant signal in some cases
              </span>
            </li>
          </ul>
        </div>

        {/* Right card: Future Directions */}
        <div className="border border-[--color-accent] rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[--color-accent]">
            Future Directions
          </h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1 shrink-0">&bull;</span>
              <span>
                Other sparsity selectors (TopK, JumpReLU, gated), larger models
                (&gt;8B), instruction-tuned checkpoints
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1 shrink-0">&bull;</span>
              <span>
                More ablations and seeds &mdash; scale the evidence beyond
                single-seed, single dictionary-size headlines
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1 shrink-0">&bull;</span>
              <span>
                Auxiliary-loss-free training &mdash; cosine retains +6.3% FVE and
                2.39&times; more alive features without it
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Slide>
  );
}
