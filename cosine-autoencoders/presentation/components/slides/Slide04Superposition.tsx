"use client";

import { Slide } from "../Slide";

export default function Slide04Superposition() {
  // 5 feature directions at various angles in a 2D circle
  const features = [
    { angle: 20, label: "feature 1" },
    { angle: 85, label: "feature 2" },
    { angle: 145, label: "feature 3" },
    { angle: 215, label: "feature 4" },
    { angle: 310, label: "feature 5" },
  ];

  const radius = 80;
  const cx = 100;
  const cy = 100;

  return (
    <Slide>
      <div className="space-y-8">
        <h2 className="text-4xl font-bold">Superposition</h2>

        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Left: text explanation */}
          <div className="space-y-5">
            <p className="text-xl leading-relaxed">
              Models store more features than they have dimensions by encoding
              them as <span className="font-semibold text-[--color-accent]">nearly-orthogonal directions</span>.
            </p>
            <p className="text-xl leading-relaxed">
              With <span className="font-mono">d</span> dimensions, a model can
              represent <span className="font-mono">&gt;&gt; d</span> features
              if they&apos;re <span className="font-semibold">sparse</span>{" "}
              (rarely active together).
            </p>
          </div>

          {/* Right: SVG diagram */}
          <div className="flex justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-64 h-64"
              aria-label="2D circle with 5 feature direction arrows"
            >
              {/* Unit circle */}
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Feature arrows */}
              {features.map((f, i) => {
                const rad = (f.angle * Math.PI) / 180;
                const x2 = cx + radius * 0.85 * Math.cos(rad);
                const y2 = cy - radius * 0.85 * Math.sin(rad);
                const labelX = cx + (radius + 14) * Math.cos(rad);
                const labelY = cy - (radius + 14) * Math.sin(rad);

                return (
                  <g key={i}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={x2}
                      y2={y2}
                      stroke="var(--color-accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Arrowhead */}
                    <circle cx={x2} cy={y2} r="3" fill="var(--color-accent)" />
                    {/* Label */}
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[8px] fill-[--color-muted]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {f.label}
                    </text>
                  </g>
                );
              })}

              {/* Center dot */}
              <circle cx={cx} cy={cy} r="3" fill="var(--color-foreground)" />
            </svg>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-lg text-[--color-muted] border-t border-[--color-border] pt-4">
          This is why individual neurons are polysemantic — they participate in
          multiple feature directions
        </p>
      </div>
    </Slide>
  );
}
