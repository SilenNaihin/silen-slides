"use client";

import { Slide } from "../Slide";

export default function Slide15HeadlineNumbers() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">Headline Numbers</h1>

      <div className="grid grid-cols-2 gap-8 items-center flex-1">
        {/* Left: dumbbell chart */}
        <div className="h-full flex items-center">
          <img
            src="/assets/fig_sparse_probing_per_dataset.png"
            alt="Dumbbell chart showing sparse probing accuracy improvement from 0.678 to 0.815 top-1"
            className="w-full object-contain max-h-[400px]"
          />
        </div>

        {/* Right: Table 1 */}
        <div>
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="border-b border-[--color-border]">
                <th className="text-left py-2 pr-3"></th>
                <th className="text-center py-2 px-3">Standard</th>
                <th className="text-center py-2 px-3">Global <em>a</em></th>
                <th className="text-center py-2 px-3">Per-feature</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[--color-border]">
                <td className="py-2 pr-3 font-medium">FVE</td>
                <td className="text-center py-2 px-3">0.770</td>
                <td className="text-center py-2 px-3">0.769</td>
                <td className="text-center py-2 px-3 font-bold text-[--color-accent]">0.771</td>
              </tr>
              <tr className="border-b border-[--color-border]">
                <td className="py-2 pr-3 font-medium">Probing top-1</td>
                <td className="text-center py-2 px-3">0.667</td>
                <td className="text-center py-2 px-3">0.800</td>
                <td className="text-center py-2 px-3 font-bold text-[--color-accent]">0.815</td>
              </tr>
              <tr className="border-b border-[--color-border]">
                <td className="py-2 pr-3 font-medium">Q4 FVE</td>
                <td className="text-center py-2 px-3">&minus;184</td>
                <td className="text-center py-2 px-3 font-bold text-[--color-accent]">+0.33</td>
                <td className="text-center py-2 px-3">+0.25</td>
              </tr>
              <tr className="border-b border-[--color-border]">
                <td className="py-2 pr-3 font-medium">Dead %</td>
                <td className="text-center py-2 px-3">0.0</td>
                <td className="text-center py-2 px-3">0.0</td>
                <td className="text-center py-2 px-3">0.0</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-medium">Learned <em>a</em></td>
                <td className="text-center py-2 px-3">&mdash;</td>
                <td className="text-center py-2 px-3">0.258</td>
                <td className="text-center py-2 px-3">mean 0.076</td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm text-[--color-muted] mt-4">
            Qwen3-8B L18, 500M tokens, d_sae = 65,536
          </p>
        </div>
      </div>
    </Slide>
  );
}
