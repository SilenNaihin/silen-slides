"use client";

import { Slide } from "../Slide";

const items = [
  "The interpretability problem",
  "Sparse autoencoders — extracting features from superposition",
  "The norm problem — when magnitude hijacks meaning",
  "Our fix — cosine-scored encoders",
  "Results — +14.9% interpretability at matched reconstruction",
  "What's next",
];

export default function Slide02Outline() {
  return (
    <Slide>
      <div className="space-y-10">
        <h2 className="text-4xl font-bold">Outline</h2>
        <ol className="space-y-5 pl-2">
          {items.map((item, i) => (
            <li key={i} className="text-xl flex items-baseline gap-4">
              <span className="text-[--color-accent] font-semibold tabular-nums">
                {i + 1}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
