"use client";

import { Slide } from "../Slide";

export default function Slide18WhatWeveTried() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold">What We&apos;ve Experimented With</h1>
      <p className="text-lg text-[--color-muted] mt-2 mb-6">
        Self-supervision &middot; Sample efficient learning &middot; Online autonomous improvement
      </p>

      <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="border border-[--color-border] rounded-lg overflow-hidden flex flex-col">
          <img
            src="/assets/future-openclaw.png"
            className="w-full flex-1 object-contain"
            alt="OpenClaw: continuously distill user preferences"
          />
          <div className="p-4 flex-shrink-0">
            <h3 className="font-semibold text-lg">Continuously Distill User Preferences</h3>
            <p className="text-base text-[--color-muted] mt-1">
              Deploy CLaaS via Tinker to collect feedback and distill into weights in real-time.
            </p>
          </div>
        </div>

        <div className="border border-[--color-border] rounded-lg overflow-hidden flex flex-col">
          <img
            src="/assets/future-autoresearch.png"
            className="w-full flex-1 object-contain"
            alt="NanoGPT autoresearch: test-time discovery with self-distillation"
          />
          <div className="p-4 flex-shrink-0">
            <h3 className="font-semibold text-lg">Test-Time Discovery with Self-Distillation</h3>
            <p className="text-base text-[--color-muted] mt-1">
              SDPO agents autonomously discover training improvements. -3.1% val_bpb.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
