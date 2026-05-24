"use client";

import { Slide } from "../Slide";

export default function Slide04ProblemICL() {
  return (
    <Slide>
      <h2 className="text-4xl font-bold mb-8">
        In-Context Learning: Necessary but Insufficient
      </h2>
      <div className="grid grid-cols-2 gap-10">
        {/* Left: ICL */}
        <div className="border border-[--color-border] rounded-lg p-8">
          <h3 className="font-semibold text-xl mb-5">In-Context Learning</h3>
          <ul className="space-y-3 text-lg text-[--color-foreground]">
            <li>Transient — lost between sessions</li>
            <li>Bounded — limited token budget</li>
            <li>Diminishing returns on new scenarios</li>
          </ul>
          <p className="text-3xl font-bold text-[--color-muted] mt-8">
            Final rate: 24.1%
          </p>
        </div>
        {/* Right: CLaaS */}
        <div className="border-2 border-[--color-accent] rounded-lg p-8 bg-blue-50/20">
          <h3 className="font-semibold text-xl mb-5">Parametric Updates (CLaaS)</h3>
          <ul className="space-y-3 text-lg text-[--color-foreground]">
            <li>Persistent — baked into weights</li>
            <li>Unbounded — compounds over time</li>
            <li>Transfers to unseen future tasks</li>
          </ul>
          <p className="text-3xl font-bold text-[--color-accent] mt-8">
            Final rate: 75.2%
          </p>
        </div>
      </div>
      <p className="text-lg text-[--color-muted] text-center mt-8">
        Key asymmetry: An attacker only needs ONE exploit. A defender must cover ALL rules simultaneously.
      </p>
    </Slide>
  );
}
