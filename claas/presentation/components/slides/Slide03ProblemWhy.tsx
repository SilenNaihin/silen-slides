"use client";

import { Slide } from "../Slide";

const problems = [
  "LLM agents face distribution shift in dynamic environments — user requests change, tools update, environments evolve",
  "In-context learning is transient — bounded by context window, lost between sessions, doesn't compound",
  "Real environments can't be reset — each scenario gives a single rollout, no counterfactual replay",
  "Need: persistent improvements that generalize to future tasks while retaining prior capabilities",
];

export default function Slide03ProblemWhy() {
  return (
    <Slide>
      <h2 className="text-4xl font-bold">Deployed Agents Drift</h2>
      <p className="text-xl text-[--color-muted] mt-2 mb-8">
        And context windows can&apos;t save them
      </p>
      <div className="space-y-5">
        {problems.map((text, i) => (
          <div
            key={i}
            className="border border-[--color-border] rounded-lg p-5 text-lg"
          >
            {text}
          </div>
        ))}
      </div>
      <div className="callout mt-8 text-lg">
        <strong>Goal:</strong> Self-improving agents that learn from deployment experience
      </div>
    </Slide>
  );
}
