"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide08ProblemSetupMath() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">Formal Framework</h1>

      {/* Equation 1 — Trajectory Sampling */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[--color-muted] uppercase tracking-wide mb-2">Trajectory Sampling</p>
        <div className="bg-[--color-surface] rounded-lg px-5 py-3">
          <BlockMath
            math={String.raw`\tau_i \sim \prod_{t=1}^{T} \pi_{\theta^k}(y_{i,t} \mid x_{\leq t}, y_{<t}) \cdot p(x_{i,t} \mid x_{<t}, y_{<t}, s_i)`}
            className="!my-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 text-base text-[--color-muted] pl-2">
          <div><InlineMath math={String.raw`\pi_{\theta^k}`} /> &mdash; Policy after <em>k</em> updates</div>
          <div><InlineMath math={String.raw`y_{i,t}`} /> &mdash; Model response at turn <em>t</em></div>
          <div><InlineMath math={String.raw`s_i`} /> &mdash; Scenario spec (system prompt + rules)</div>
          <div><InlineMath math={String.raw`p(x_{i,t}|\cdots)`} /> &mdash; Environment / attacker next move</div>
        </div>
      </div>

      {/* Equation 2 — Reward + Buffer */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[--color-muted] uppercase tracking-wide mb-2">Reward + Buffer</p>
        <div className="bg-[--color-surface] rounded-lg px-5 py-3">
          <BlockMath math={String.raw`r_i = R_i(\tau_i) \in \{0, 1\}, \quad \mathcal{B}^k \leftarrow \mathcal{B}^k \cup \{s_i, \tau_i, r_i\}`} className="!my-1" />
        </div>
        <p className="text-base text-[--color-muted] mt-2 pl-2">
          Binary verifier reward (did the defender hold?). Every rollout gets stored with its reward for future gradient updates.
        </p>
      </div>

      {/* Equation 3 — Optimization */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[--color-muted] uppercase tracking-wide mb-2">Optimization</p>
        <div className="bg-[--color-surface] rounded-lg px-5 py-3">
          <BlockMath
            math={String.raw`\theta^{k+1} = \arg\max_\theta \sum_{(\tau_i, r_i) \in \mathcal{B}^k} \ell(\tau_i, \theta, r_i)`}
            className="!my-1"
          />
        </div>
        <p className="text-base text-[--color-muted] mt-2 pl-2">
          Train on the entire buffer — not just the latest sample. Old trajectories get reused until evicted (experience replay).
        </p>
      </div>

      {/* Key insight */}
      <div className="callout text-base">
        <strong>Key insight:</strong>{" "}
        <InlineMath math={String.raw`k = P(i)`} /> ties each trajectory to the policy that generated it — critical for importance weighting when reusing stale data.
      </div>
    </Slide>
  );
}
