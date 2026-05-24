"use client";

import { Slide } from "../Slide";
import { InlineMath, BlockMath } from "../KaTeX";

export default function Slide06CurrentAlgorithms() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-4">
        The Standard Approach: Group-Based RL
      </h1>
      <p className="text-lg text-[--color-muted] mb-6">
        Recall: we need <InlineMath math={String.raw`\hat{A}_t`} /> to compute the policy gradient. GRPO estimates it from groups:
      </p>

      <div className="bg-[--color-surface] rounded-lg p-5 mb-6">
        <p className="text-sm font-semibold text-[--color-muted] uppercase tracking-wide mb-2">GRPO Advantage Estimate</p>
        <BlockMath math={String.raw`\hat{A}_i = \frac{R(\tau_i) - \mu_{\text{group}}}{\sigma_{\text{group}}}, \quad \text{where group} = \{R(\tau_1), \ldots, R(\tau_K)\} \text{ for same prompt}`} />
        <p className="text-base text-[--color-muted] mt-2">
          Sample <em>K</em> rollouts for the same prompt, normalize returns within the group. Requires replaying prompts.
        </p>
      </div>

      <div className="callout mb-6">
        <p className="text-lg">
          <span className="font-semibold">The Gap:</span>{" "}
          GRPO needs multiple rollouts per prompt to form a group. Deployed agents get one shot per scenario.
        </p>
        <p className="text-base mt-2 text-[--color-muted]">
          We need <InlineMath math={String.raw`\hat{A}_t`} /> from a single trajectory — no group to normalize against.
        </p>
      </div>

      <p className="text-base text-[--color-subtle]">
        Our algorithms (REINFORCE++, PPO, SDPO) each solve this differently — coming up.
      </p>
    </Slide>
  );
}
