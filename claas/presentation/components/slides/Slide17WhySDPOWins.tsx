"use client";

import { Slide } from "../Slide";

export default function Slide17WhySDPOWins() {
  return (
    <Slide>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Why SDPO Wins</h1>
          <p className="text-lg text-[--color-muted] mt-2">75.2% from 100 scenarios vs 49% (PPO) — same data, better signal</p>
        </div>

        <div className="flex gap-6 items-start flex-1 min-h-0">
          {/* Left: advantages */}
          <div className="w-[340px] flex-shrink-0 space-y-4">
            <div className="border border-[--color-border] rounded-lg p-4">
              <p className="font-semibold text-lg mb-1">Dense Per-Token Signal</p>
              <p className="text-base text-[--color-muted]">
                Binary reward = same gradient for all tokens. SDPO = per-token credit via log-ratio.
              </p>
            </div>
            <div className="border border-[--color-border] rounded-lg p-4">
              <p className="font-semibold text-lg mb-1">Self-Supervised</p>
              <p className="text-base text-[--color-muted]">
                Teacher uses text feedback. No human labels, no separate reward model.
              </p>
            </div>
            <div className="border border-[--color-border] rounded-lg p-4">
              <p className="font-semibold text-lg mb-1">Off-Policy Tolerant (A<sub>max</sub>=50)</p>
              <p className="text-base text-[--color-muted]">
                EMA teacher drifts slowly — old trajectories stay bounded — 2x more gradient reuse.
              </p>
            </div>
          </div>

          {/* Right: image — full available space */}
          <div className="flex-1 flex items-center min-h-0">
            <img
              src="/assets/sdpo-advantages.png"
              alt="SDPO advantages infographic"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </Slide>
  );
}
