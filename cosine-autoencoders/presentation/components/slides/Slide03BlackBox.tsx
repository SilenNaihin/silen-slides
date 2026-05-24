"use client";

import { Slide } from "../Slide";

export default function Slide03BlackBox() {
  return (
    <Slide>
      <div className="space-y-8">
        <h2 className="text-4xl font-bold">Understanding What Models Know</h2>

        <ul className="space-y-4 text-xl pl-1">
          <li className="flex items-start gap-3">
            <span className="text-[--color-accent] mt-1.5 shrink-0">&#x2022;</span>
            <span>
              Models represent concepts as directions in high-dimensional space
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[--color-accent] mt-1.5 shrink-0">&#x2022;</span>
            <span>
              A single neuron often responds to multiple unrelated concepts
              (polysemanticity)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[--color-accent] mt-1.5 shrink-0">&#x2022;</span>
            <span>
              We need tools to decompose these tangled representations into
              interpretable pieces
            </span>
          </li>
        </ul>

        {/* Polysemanticity diagram */}
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-full border-2 border-[--color-border] flex items-center justify-center">
              <span className="text-sm font-mono text-[--color-muted]">neuron</span>
            </div>
            <div className="flex flex-col gap-4">
              {["cat", "car", "calendar"].map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <svg width="48" height="2" className="shrink-0">
                    <line
                      x1="0"
                      y1="1"
                      x2="40"
                      y2="1"
                      stroke="var(--color-accent)"
                      strokeWidth="2"
                    />
                    <polygon
                      points="40,0 48,1 40,2"
                      fill="var(--color-accent)"
                    />
                  </svg>
                  <span className="text-lg font-mono">&ldquo;{label}&rdquo;</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="border border-[--color-border] rounded-lg p-5 bg-[--color-surface]">
          <p className="text-lg font-medium">
            <span className="text-[--color-accent] font-semibold">Goal:</span>{" "}
            Find a dictionary of human-interpretable features that explain model
            behavior
          </p>
        </div>
      </div>
    </Slide>
  );
}
