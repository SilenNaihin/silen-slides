"use client";

import { Slide } from "../Slide";

export default function Slide01Title() {
  return (
    <Slide centered>
      <h1 className="text-5xl font-bold">Presentation Title</h1>
      <p className="text-xl text-[--color-muted] mt-4">
        Subtitle or tagline
      </p>
      <div className="h-8" />
      <p className="text-lg">Author One &middot; Author Two</p>
      <p className="text-sm text-[--color-subtle] mt-2">
        Venue &middot; Date
      </p>
    </Slide>
  );
}
