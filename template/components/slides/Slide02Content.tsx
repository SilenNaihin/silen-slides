"use client";

import { Slide } from "../Slide";

export default function Slide02Content() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold mb-6">Content Slide</h1>
      <p className="text-xl text-[--color-muted] mb-8">
        Replace this with your content. Use big text — this is a slideshow.
      </p>

      <div className="grid grid-cols-2 gap-8">
        <div className="border border-[--color-border] rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Point One</h3>
          <p className="text-base text-[--color-muted]">
            Explanation with generous whitespace.
          </p>
        </div>
        <div className="border border-[--color-border] rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Point Two</h3>
          <p className="text-base text-[--color-muted]">
            Keep it spacious and readable.
          </p>
        </div>
      </div>

      <div className="callout mt-8 text-base">
        <strong>Key insight:</strong> One main takeaway per slide.
      </div>
    </Slide>
  );
}
