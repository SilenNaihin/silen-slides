"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide05RLPrimer() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">
        RL for Language Models
      </h1>

      {/* The Objective */}
      <div className="mb-6">
        <BlockMath math={String.raw`J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \gamma^t r_t \right]`} />
        <p className="text-lg text-[--color-muted] mt-2">
          Maximize expected cumulative reward under policy <InlineMath math={String.raw`\pi_\theta`} />
        </p>
      </div>

      {/* Policy Gradient */}
      <div className="mb-5">
        <BlockMath math={String.raw`\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t | s_t) \cdot \hat{A}_t \right]`} />
      </div>

      {/* Advantage definition */}
      <div className="bg-[--color-surface] rounded-lg p-5 mb-6">
        <p className="text-lg mb-2">
          <strong>Advantage</strong> <InlineMath math={String.raw`\hat{A}_t`} /> = how much better was this action than expected?
        </p>
        <BlockMath math={String.raw`\hat{A}_t = \sum_{k=t}^{T} \gamma^{k-t} r_k - V(s_t)`} />
        <p className="text-base text-[--color-muted]">
          Future discounted returns minus baseline. Positive = better than average, negative = worse.
        </p>
      </div>

      {/* Key insight */}
      <div className="callout text-base">
        <strong>Core idea:</strong> Nudge up likelihood of good actions, nudge down bad ones. The advantage tells us <em>which tokens</em> to reinforce.
      </div>
    </Slide>
  );
}
