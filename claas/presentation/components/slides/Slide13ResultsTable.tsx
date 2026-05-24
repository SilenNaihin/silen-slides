"use client";

import { Slide } from "../Slide";

const rows = [
  { method: "Baseline (no training)", forward: "–", forgetting: "–", final: "27.2 ± 1.3", highlight: false },
  { method: "ICL (context accumulation)", forward: "28.3 ± 2.3", forgetting: "8.9 ± 1.8", final: "24.1 ± 1.9", highlight: false },
  { method: "PPO (actor-critic)", forward: "37.6 ± 1.0", forgetting: "5.4 ± 1.2", final: "49.0 ± 3.2", highlight: false },
  { method: "REINFORCE++ (norm. returns)", forward: "37.0 ± 1.8", forgetting: "8.3 ± 2.5", final: "43.9 ± 8.5", highlight: false },
  { method: "SDPO (self-distillation)", forward: "61.2 ± 1.8", forgetting: "4.2 ± 1.2", final: "75.2 ± 1.2", highlight: true },
];

export default function Slide13ResultsTable() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold">Results: Defense Success Rate (%)</h1>
      <p className="text-base text-[--color-muted] mt-2 mb-6">
        100 scenarios &middot; 5 splits &middot; 9 trials (3 shuffles &times; 3 seeds)
      </p>

      <div className="w-full overflow-hidden rounded-lg border border-[--color-border]">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-6 py-4 font-semibold">Method</th>
              <th className="text-right px-6 py-4 font-semibold">Forward &uarr;</th>
              <th className="text-right px-6 py-4 font-semibold">Forgetting &darr;</th>
              <th className="text-right px-6 py-4 font-semibold">Final &uarr;</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-[--color-border] ${row.highlight ? "bg-blue-50/60" : ""}`}
              >
                <td className={`px-6 py-4 ${row.highlight ? "font-bold" : ""}`}>
                  {row.method}
                </td>
                <td className={`px-6 py-4 text-right ${row.highlight ? "font-bold" : ""}`}>
                  {row.forward}
                </td>
                <td className={`px-6 py-4 text-right ${row.highlight ? "font-bold" : ""}`}>
                  {row.forgetting}
                </td>
                <td className={`px-6 py-4 text-right ${row.highlight ? "font-bold text-[--color-accent]" : ""}`}>
                  {row.final}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-8 mt-5 text-sm text-[--color-muted]">
        <p><strong>Forward:</strong> performance on unseen future splits</p>
        <p><strong>Forgetting:</strong> degradation on prior splits</p>
        <p><strong>Final:</strong> performance across ALL splits at last checkpoint</p>
      </div>
    </Slide>
  );
}
