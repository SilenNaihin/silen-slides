"use client";

export default function Slide11AsyncTimeline() {
  return (
    <div className="h-full w-full flex flex-col px-10 py-10">
      <h1 className="text-3xl font-bold">The Improvement Loop</h1>
      <p className="text-base text-[--color-muted] mt-1 mb-3">
        Training runs concurrently — wall-clock cost dominated by inference
      </p>

      <div className="flex-1 flex items-center min-h-0">
        <img
          src="/assets/async-timeline.png"
          alt="Async timeline showing GPU utilization: inference and training running in parallel"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-3 flex-shrink-0">
        <div className="text-center">
          <p className="font-semibold text-sm">Inference</p>
          <p className="text-sm text-[--color-muted]">30-60s / scenario</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-sm">Training</p>
          <p className="text-sm text-[--color-muted]">5-10s / step</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-sm">Overhead</p>
          <p className="text-sm text-[--color-muted]">~0% (async)</p>
        </div>
      </div>
    </div>
  );
}
