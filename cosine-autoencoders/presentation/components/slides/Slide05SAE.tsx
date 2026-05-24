"use client";

import { Slide } from "../Slide";
import { BlockMath, InlineMath } from "../KaTeX";

export default function Slide05SAE() {
  const encoderEq = String.raw`z = \sigma\bigl((x - b_{\text{dec}})\, W_{\text{enc}}^\top + b_{\text{enc}}\bigr)`;
  const decoderEq = String.raw`\hat{x} = z\, W_{\text{dec}} + b_{\text{dec}}`;
  const lossEq = String.raw`\mathcal{L} = \|x - \hat{x}\|^2`;

  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-8">Sparse Autoencoders</h1>

      <p className="text-xl text-[--color-muted] mb-6">
        Project activations into a much larger space where each dimension corresponds to one interpretable feature.
      </p>

      <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-6 mb-8 space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium w-20">Encoder:</span>
          <BlockMath math={encoderEq} className="!my-0" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium w-20">Decoder:</span>
          <BlockMath math={decoderEq} className="!my-0" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium w-20">Loss:</span>
          <BlockMath math={lossEq} className="!my-0" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-lg">
          <span className="font-semibold text-[--color-accent]">Overcomplete:</span>{" "}
          <InlineMath math={String.raw`d_{\text{sae}} \gg d`} /> (65,536 vs 4,096)
        </p>
        <p className="text-lg">
          <span className="font-semibold text-[--color-accent]">Sparse:</span>{" "}
          Only <InlineMath math="k" /> features active per token
        </p>
        <p className="text-lg">
          <span className="font-semibold text-[--color-accent]">Interpretable:</span>{" "}
          Each decoder row <InlineMath math={String.raw`w_i`} /> = learned feature direction
        </p>
      </div>
    </Slide>
  );
}
