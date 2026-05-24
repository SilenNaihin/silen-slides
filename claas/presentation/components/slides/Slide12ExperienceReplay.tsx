"use client";

import { Slide } from "../Slide";
import { InlineMath } from "../KaTeX";

export default function Slide12ExperienceReplay() {
  return (
    <Slide>
      <h1 className="text-3xl font-bold">Experience Replay: Learning More from Less</h1>
      <p className="text-base text-[--color-muted] mt-1 mb-4">
        Each trajectory contributes to multiple gradient updates instead of being discarded
      </p>

      <div className="flex gap-6 items-start flex-1 min-h-0">
        {/* Left: key insights */}
        <div className="w-[320px] flex-shrink-0 space-y-3">
          <div className="border border-[--color-border] rounded-lg p-4">
            <p className="text-base">
              <strong><InlineMath math={String.raw`A_{\max} = 1`} /></strong>
              <span className="text-[--color-muted]"> — Each trajectory trains once. Limited.</span>
            </p>
          </div>
          <div className="border-2 border-[--color-accent] rounded-lg p-4 bg-blue-50/20">
            <p className="text-base">
              <strong><InlineMath math={String.raw`A_{\max} = 25`} /></strong>
              <span className="text-[--color-muted]"> — ~25 updates per trajectory. Strong transfer.</span>
            </p>
          </div>
          <div className="border border-[--color-border] rounded-lg p-4">
            <p className="text-base">
              <strong><InlineMath math={String.raw`A_{\max} = 50+`} /></strong>
              <span className="text-[--color-muted]"> — Too stale for REINFORCE++. Collapse.</span>
            </p>
          </div>
          <p className="text-sm text-[--color-muted] pt-2">
            SDPO tolerates <InlineMath math={String.raw`A_{\max}=50`} /> due to EMA teacher — 2x more gradient reuse
          </p>
        </div>

        {/* Right: ablation chart - full size */}
        <div className="flex-1 flex items-center min-h-0">
          <img
            src="/assets/replay-ablation.png"
            alt="Line chart showing defender success rate vs checkpoint for different buffer ages"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </Slide>
  );
}
