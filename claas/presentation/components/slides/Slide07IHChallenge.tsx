"use client";

export default function Slide07IHChallenge() {
  return (
    <div className="h-full w-full flex">
      {/* Left panel */}
      <div className="w-[240px] flex-shrink-0 flex flex-col justify-center px-6">
        <h1 className="text-xl font-bold leading-tight mb-3">The IH-Challenge</h1>
        <p className="text-xs text-[--color-muted] mb-4">Adversarial instruction following</p>
        <div className="space-y-1.5 text-xs">
          <div>100 scenarios &middot; 5 splits</div>
          <div>3-turn adaptive attacker</div>
          <div>Qwen3-8B &middot; 2&times;H100</div>
          <div className="pt-2 border-t border-[--color-border] mt-2">
            Baseline: <strong>27.2%</strong>
          </div>
        </div>
        <p className="text-xs text-[--color-muted] mt-4">
          Attacker needs ONE exploit. Defender must cover ALL rules.
        </p>
      </div>

      {/* Image — absolute full height */}
      <div className="flex-1 h-full flex items-center justify-center p-4">
        <img
          src="/assets/scenario-walkthrough.png"
          className="max-w-full max-h-full object-contain"
          alt="Scenario walkthrough showing attacker-defender-verifier flow"
        />
      </div>
    </div>
  );
}
