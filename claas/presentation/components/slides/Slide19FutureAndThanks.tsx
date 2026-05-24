"use client";

import { Slide } from "../Slide";

export default function Slide19FutureAndThanks() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold">What We&apos;re Working On</h1>
      <p className="text-lg text-[--color-muted] mt-2 mb-6">
        From context to weights. From transient to persistent.
      </p>

      <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="border border-[--color-border] rounded-lg overflow-hidden flex flex-col">
          <img
            src="/assets/future-selfimprove.png"
            className="w-full flex-1 object-contain"
            alt="Autonomously self-improving infrastructure"
          />
          <div className="p-4 flex-shrink-0">
            <h3 className="font-semibold text-base">Detect &middot; Evaluate &middot; Fix &middot; Monitor</h3>
            <p className="text-sm text-[--color-muted] mt-1">
              Infrastructure for orgs: detect failure patterns, deploy fixes. 94% failure detection.
            </p>
          </div>
        </div>

        <div className="border border-[--color-border] rounded-lg overflow-hidden flex flex-col">
          <img
            src="/assets/future-lora-identity.png"
            className="w-full flex-1 object-contain"
            alt="LoRA distillation for personal identity"
          />
          <div className="p-4 flex-shrink-0">
            <h3 className="font-semibold text-base">Your Style, Persistent in Weights</h3>
            <p className="text-sm text-[--color-muted] mt-1">
              Continually distill writing style into a personal LoRA. 68% identity match.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
