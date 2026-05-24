"use client";

import { Slide } from "../Slide";

export default function Slide01Title() {
  return (
    <Slide centered>
      <h1 className="text-5xl font-bold">CLaaS: Continual Learning as a Service</h1>
      <p className="text-xl text-[--color-muted] mt-4">
        Sample Efficient Online Learning for Deployed Agents
      </p>
      <img
        src="/assets/claas-system-cute.png"
        alt="CLaaS System"
        className="rounded-xl mt-8 mx-auto"
        style={{ width: 380 }}
      />
      <p className="text-lg mt-8">
        Kion Fallah &middot; Silen Naihin &middot; Barak Widawsky
      </p>
      <p className="text-sm text-[--color-subtle] mt-2">
        ICML 2026 Workshop on Online Continual Learning
      </p>
    </Slide>
  );
}
