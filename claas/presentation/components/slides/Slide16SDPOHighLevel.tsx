"use client";

import { Slide } from "../Slide";
import { InlineMath } from "../KaTeX";

export default function Slide16SDPOHighLevel() {
  return (
    <Slide>
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Self-Distillation Policy Optimization</h1>
          <p className="text-lg text-[--color-muted] mt-2">
            The same model, given extra info (hindsight), becomes its own reward model
          </p>
        </div>

        {/* Teacher / Student visual */}
        <div className="flex gap-8 items-stretch flex-1 min-h-0">
          {/* Teacher */}
          <div className="flex-1 border-2 border-[--color-accent] rounded-lg p-6 bg-blue-50/20 flex flex-col">
            <p className="text-sm font-semibold text-[--color-accent] uppercase tracking-wide mb-3">Teacher</p>
            <div className="flex-1 flex flex-col justify-center space-y-3">
              <p className="text-xl font-medium">Same weights (EMA copy)</p>
              <p className="text-xl">+ solution / feedback in context</p>
              <div className="mt-4 bg-white/60 rounded-lg p-3 border border-[--color-border]">
                <p className="text-base text-[--color-muted] font-mono">
                  &quot;Here&apos;s what went wrong: [feedback]. Now respond to: [prompt]&quot;
                </p>
              </div>
              <p className="text-base text-[--color-muted] mt-2">
                Produces <InlineMath math={String.raw`\pi_\theta(a_t | s_t, f)`} /> — informed distribution
              </p>
            </div>
          </div>

          {/* Arrow + loss */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 px-2">
            <p className="text-sm font-bold text-[--color-accent] mb-2">JSD</p>
            <svg width="24" height="80" viewBox="0 0 24 80" fill="none">
              <path d="M12 2v72M6 20l6-18 6 18M6 60l6 18 6-18" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-bold text-[--color-accent] mt-2">per token</p>
          </div>

          {/* Student */}
          <div className="flex-1 border border-[--color-border] rounded-lg p-6 flex flex-col">
            <p className="text-sm font-semibold text-[--color-muted] uppercase tracking-wide mb-3">Student</p>
            <div className="flex-1 flex flex-col justify-center space-y-3">
              <p className="text-xl font-medium">Model being trained</p>
              <p className="text-xl">Original prompt only (no hindsight)</p>
              <div className="mt-4 bg-[--color-surface] rounded-lg p-3 border border-[--color-border]">
                <p className="text-base text-[--color-muted] font-mono">
                  &quot;Respond to: [prompt]&quot;
                </p>
              </div>
              <p className="text-base text-[--color-muted] mt-2">
                Produces <InlineMath math={String.raw`\pi_\theta(a_t | s_t)`} /> — uninformed distribution
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="callout mt-5 text-base">
          <strong>No separate reward model needed.</strong> The gap between teacher and student IS the per-token reward signal.
        </div>
      </div>
    </Slide>
  );
}
