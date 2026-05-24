"use client";

import { Slide } from "../Slide";
import { InlineMath } from "../KaTeX";

export default function Slide20Recipe() {
  return (
    <Slide centered>
      <h1 className="text-4xl font-bold mb-8">The Practical Recipe</h1>

      {/* Main recipe card */}
      <div className="border-2 border-[--color-accent] rounded-lg p-8 bg-blue-50/10 max-w-3xl w-full">
        <ol className="space-y-6 text-xl text-left list-none">
          <li className="flex items-start gap-4">
            <span className="text-[--color-accent] font-bold text-2xl shrink-0">
              1.
            </span>
            <span>Unit-normalize encoder rows</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-[--color-accent] font-bold text-2xl shrink-0">
              2.
            </span>
            <span>
              Replace score with:{" "}
              <InlineMath
                math={String.raw`e^b \|x_c\|^a \cos(x_c,\, w_i) + b_{\text{enc},i}`}
              />
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-[--color-accent] font-bold text-2xl shrink-0">
              3.
            </span>
            <span>
              Initialize{" "}
              <InlineMath math={String.raw`a = 0`} />,{" "}
              <InlineMath math={String.raw`b = \log\sqrt{d_{\text{model}}}`} />
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-[--color-accent] font-bold text-2xl shrink-0">
              4.
            </span>
            <span className="font-semibold">
              That&apos;s it. One scalar. Drop-in replacement.
            </span>
          </li>
        </ol>
      </div>

      {/* Below card note */}
      <p className="text-lg mt-6 text-[--color-muted]">
        Global variant adds 2 parameters. Per-feature adds &lt; 0.1% overhead.
      </p>

      {/* Final italic quote */}
      <p className="text-lg mt-4 italic text-[--color-muted] max-w-3xl">
        &ldquo;We believe cosine scoring should be the default for dictionary
        learning on normalized representations.&rdquo;
      </p>
    </Slide>
  );
}
