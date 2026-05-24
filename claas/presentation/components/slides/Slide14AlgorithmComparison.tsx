"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide14AlgorithmComparison() {
  return (
    <Slide>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Algorithm Comparison</h1>
          <p className="text-base text-[--color-muted] mt-1">
            Three ways to estimate <InlineMath math={String.raw`\hat{A}_t`} /> from a single trajectory
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[--color-border] text-sm flex-shrink-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-semibold text-[--color-muted] w-[20%]">Property</th>
                <th className="text-left p-3 font-semibold w-[24%]">REINFORCE++</th>
                <th className="text-left p-3 font-semibold w-[26%]">PPO</th>
                <th className="text-left p-3 font-semibold bg-blue-50/30 w-[30%]">SDPO</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[--color-border]">
                <td className="p-3 font-medium text-[--color-muted]">Core idea</td>
                <td className="p-3">Normalize returns across buffer</td>
                <td className="p-3">Learn value baseline</td>
                <td className="p-3 bg-blue-50/30">Distill from hindsight</td>
              </tr>
              <tr className="border-t border-[--color-border]">
                <td className="p-3 font-medium text-[--color-muted]">Advantage</td>
                <td className="p-3"><InlineMath math={String.raw`(R - \mu_\mathcal{B}) / \sigma_\mathcal{B}`} /></td>
                <td className="p-3"><InlineMath math={String.raw`\text{GAE: } \sum (\gamma\lambda)^l \delta_{t+l}`} /></td>
                <td className="p-3 bg-blue-50/30"><InlineMath math={String.raw`\log(\pi_T / \pi_S)`} /></td>
              </tr>
              <tr className="border-t border-[--color-border]">
                <td className="p-3 font-medium text-[--color-muted]">Variance reduction</td>
                <td className="p-3">Global normalization</td>
                <td className="p-3">Learned critic <InlineMath math={String.raw`V(s)`} /></td>
                <td className="p-3 bg-blue-50/30">Smooth KL from EMA teacher</td>
              </tr>
              <tr className="border-t border-[--color-border]">
                <td className="p-3 font-medium text-[--color-muted]">Extra parameters</td>
                <td className="p-3">None</td>
                <td className="p-3">Critic (value head)</td>
                <td className="p-3 bg-blue-50/30">EMA copy of policy</td>
              </tr>
              <tr className="border-t border-[--color-border]">
                <td className="p-3 font-medium text-[--color-muted]">Max replay age</td>
                <td className="p-3">25</td>
                <td className="p-3">25</td>
                <td className="p-3 bg-blue-50/30 font-bold">50 (2x tolerant)</td>
              </tr>
              <tr className="border-t border-[--color-border] bg-gray-50/50">
                <td className="p-3 font-medium text-[--color-muted]">Final rate</td>
                <td className="p-3">43.9%</td>
                <td className="p-3">49.0%</td>
                <td className="p-3 bg-blue-50/30 font-bold text-[--color-accent]">75.2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Definitions */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-[--color-muted]">
          <div>
            <InlineMath math={String.raw`\mu_\mathcal{B}, \sigma_\mathcal{B}`} /> = running mean/std of rewards across buffer
          </div>
          <div>
            <InlineMath math={String.raw`\delta_{t+l} = r_t + \gamma V(s_{t+1}) - V(s_t)`} /> = TD error
          </div>
          <div>
            <InlineMath math={String.raw`\pi_T / \pi_S`} /> = teacher (with feedback) / student (without) ratio
          </div>
        </div>

        <div className="mt-4 callout text-sm">
          <strong>SDPO gives per-token credit.</strong> Binary reward assigns the same gradient to all tokens in a trajectory.
        </div>
      </div>
    </Slide>
  );
}
