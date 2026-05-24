"use client";

import { Slide } from "../Slide";

export default function Slide09Algorithm() {
  return (
    <Slide>
      <h2 className="text-3xl font-bold mb-2">Algorithm 1: CLaaS</h2>

      <div className="flex gap-6 items-start flex-1 min-h-0">
        {/* Algorithm image — takes most of the space */}
        <div className="flex-1 flex items-center min-h-0">
          <img
            src="/assets/algorithm.png"
            alt="CLaaS algorithm pseudocode"
            className="w-full rounded-lg"
          />
        </div>

        {/* Annotations referencing line numbers */}
        <div className="w-[260px] flex-shrink-0 space-y-3 pt-2">
          <div className="border border-[--color-border] rounded-lg p-3">
            <p className="font-semibold text-sm">Line 2: Parallel</p>
            <p className="text-sm text-[--color-muted]">ROLLOUT and TRAIN run concurrently — zero idle GPU</p>
          </div>
          <div className="border border-[--color-border] rounded-lg p-3">
            <p className="font-semibold text-sm">Lines 5-6: Collect</p>
            <p className="text-sm text-[--color-muted]">Every rollout stored with binary verifier reward</p>
          </div>
          <div className="border border-[--color-border] rounded-lg p-3">
            <p className="font-semibold text-sm">Line 7: FIFO eviction</p>
            <p className="text-sm text-[--color-muted]">Buffer stays bounded at B<sub>max</sub></p>
          </div>
          <div className="border border-[--color-border] rounded-lg p-3">
            <p className="font-semibold text-sm">Line 12-13: Update</p>
            <p className="text-sm text-[--color-muted]">Sample minibatch, compute policy gradient</p>
          </div>
          <div className="border border-[--color-border] rounded-lg p-3">
            <p className="font-semibold text-sm">Line 15: Staleness</p>
            <p className="text-sm text-[--color-muted]">Evict entries older than A<sub>max</sub> steps</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
