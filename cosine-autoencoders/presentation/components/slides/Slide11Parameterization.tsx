"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide11Parameterization() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">Making It Trainable</h1>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left card: Global a */}
        <div className="border border-[--color-border] rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-3">Global <InlineMath math={String.raw`a`} /></h2>
          <div className="mb-3">
            <BlockMath
              math={String.raw`s_i(x) = \exp(a \log\|x_c\| + b) \cdot \cos(x_c, w_i) + b_{\text{enc},i}`}
            />
          </div>
          <ul className="space-y-2 text-base text-[--color-muted]">
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1">&#x2022;</span>
              <span>Single scalar <InlineMath math={String.raw`a`} /> shared across all features</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1">&#x2022;</span>
              <span>Well-conditioned gradients in <InlineMath math={String.raw`a`} /> regardless of <InlineMath math={String.raw`\|x\|`} /></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1">&#x2022;</span>
              <span>Adds <strong className="text-[--color-foreground]">1 parameter</strong> total</span>
            </li>
          </ul>
        </div>

        {/* Right card: Per-feature a_i */}
        <div className="border border-[--color-accent] rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-3">Per-feature <InlineMath math={String.raw`a_i`} /></h2>
          <div className="mb-3">
            <BlockMath
              math={String.raw`a_i = a_{\text{base}} + \delta_i`}
            />
          </div>
          <ul className="space-y-2 text-base text-[--color-muted]">
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1">&#x2022;</span>
              <span>Shared base + per-feature offset</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1">&#x2022;</span>
              <span>Each feature learns its own norm dependence</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1">&#x2022;</span>
              <span><strong className="text-[--color-foreground]">&lt; 0.1% overhead</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-accent] mt-1">&#x2022;</span>
              <span>Both initialized at <InlineMath math={String.raw`a_{\text{base}} = 0,\; \delta_i = 0`} /></span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom callout */}
      <div className="w-full bg-[--color-surface] border-l-4 border-[--color-accent] rounded-r-lg px-5 py-4">
        <p className="text-lg font-medium">
          The optimizer is free to recover inner product (<InlineMath math={String.raw`a = 1`} />).{" "}
          <span className="text-[--color-accent] font-semibold">It never does.</span>
        </p>
      </div>
    </Slide>
  );
}
