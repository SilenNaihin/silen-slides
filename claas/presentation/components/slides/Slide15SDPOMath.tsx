"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide15SDPOMath() {
  return (
    <Slide>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">From REINFORCE to SDPO</h1>
          <p className="text-base text-[--color-muted] mt-1">
            Replacing scalar reward with self-distillation
          </p>
        </div>

        {/* Visual transformation */}
        <div className="flex items-center gap-6 my-4 flex-1 min-h-0">
          {/* Left — Standard PG */}
          <div className="flex-1 bg-[--color-surface] rounded-lg p-5 border border-[--color-border]">
            <p className="text-sm font-semibold text-[--color-muted] uppercase tracking-wide mb-3">Standard Policy Gradient</p>
            <div className="text-center">
              <BlockMath math={String.raw`\nabla_\theta J = \mathbb{E}\left[ \sum_t \nabla_\theta \log \pi_\theta(a_t|s_t) \cdot \hat{A}_t \right]`} className="!my-1" />
            </div>
            <p className="text-sm text-[--color-muted] text-center mt-3">
              Scalar reward — same signal for all tokens
            </p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center flex-shrink-0 px-2">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M2 12h32M28 6l8 6-8 6" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Right — SDPO */}
          <div className="flex-1 rounded-lg p-5 border-2 border-[--color-accent] bg-blue-50/20">
            <p className="text-sm font-semibold text-[--color-accent] uppercase tracking-wide mb-3">Self-Distillation</p>
            <div className="text-center">
              <BlockMath math={String.raw`\nabla_\theta J = \mathbb{E}\left[ \sum_t \nabla_\theta \log \pi_\theta(a_t|s_t) \cdot \log \frac{\pi_\theta(a_t|s_t, f)}{\pi_\theta(a_t|s_t)} \right]`} className="!my-1" />
            </div>
            <p className="text-sm text-[--color-accent] text-center mt-3 font-medium">
              Per-token advantage from teacher/student ratio
            </p>
          </div>
        </div>

        {/* Annotations */}
        <div className="grid grid-cols-2 gap-4 text-sm mt-2 mb-3">
          <div><InlineMath math="f" /> = feedback text given to teacher via ICL</div>
          <div><InlineMath math={String.raw`\pi_\theta(a_t|s_t, f)`} /> = teacher prob (with hindsight)</div>
          <div><InlineMath math={String.raw`\pi_\theta(a_t|s_t)`} /> = student prob (no hindsight)</div>
          <div>Log ratio = per-token advantage (dense signal)</div>
        </div>

        <div className="callout text-sm">
          Each token gets its own reward based on teacher-student agreement. No more single scalar for entire trajectories.
        </div>
      </div>
    </Slide>
  );
}
