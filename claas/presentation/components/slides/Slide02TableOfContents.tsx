"use client";

import { Slide } from "../Slide";

const items = [
  { title: "The Problem", desc: "Why deployed agents need continual learning" },
  { title: "Background", desc: "RL primer + current limitations" },
  { title: "Problem Setup", desc: "IH-Challenge & formal framework" },
  { title: "CLaaS", desc: "System architecture, algorithm, async loop" },
  { title: "Experience Replay", desc: "Buffer design & sample efficiency" },
  { title: "Results", desc: "Parametric updates vs. in-context learning" },
  { title: "SDPO Deep Dive", desc: "Why self-distillation wins" },
  { title: "What's Next", desc: "Current experiments & future directions" },
];

export default function Slide02TableOfContents() {
  return (
    <Slide>
      <h2 className="text-4xl font-bold mb-10">Outline</h2>
      <ol className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-baseline gap-4 text-xl">
            <span className="text-[--color-accent] font-bold min-w-[28px]">
              {i + 1}.
            </span>
            <span>
              <strong>{item.title}</strong>
              <span className="text-[--color-muted]"> — {item.desc}</span>
            </span>
          </li>
        ))}
      </ol>
    </Slide>
  );
}
