"use client";

import { Slide } from "../Slide";

export default function Slide16Discovery() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">
        The Gap Is Discovery, Not Separability
      </h1>

      <div className="flex justify-center mb-6">
        <img
          src="/assets/fig_discovery_vs_separability.png"
          alt="Discovery vs separability breakdown showing shared and unique features"
          className="max-h-[350px] object-contain"
        />
      </div>

      <ul className="space-y-3 text-base text-[--color-foreground]">
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            <strong>&ldquo;Shared features&rdquo;</strong> = matched across both
            dictionaries (Pearson &gt; 0.7, same direction)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            Standard&rsquo;s flat line: unique features add{" "}
            <strong>no</strong> probing signal — they encode norm, not content
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            Cosine&rsquo;s steep rise: unique features encode real interpretable
            concepts
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-accent] mt-1 shrink-0">&#9654;</span>
          <span>
            ~87% of the gap comes from features cosine discovers and standard
            does not
          </span>
        </li>
      </ul>
    </Slide>
  );
}
