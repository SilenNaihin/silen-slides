"use client";

import { Slide } from "../Slide";

export default function Slide10SystemOverview() {
  return (
    <Slide>
      <h1 className="text-4xl font-bold">The CLaaS System</h1>
      <p className="text-lg text-[--color-muted] mt-2 mb-6">
        Continual improvement abstracted behind a chat API
      </p>

      <img
        src="/assets/architecture.png"
        alt="CLaaS system architecture showing REST API, agent harness, replay buffer, training engine, and LoRA hot-reload"
        className="w-full max-w-[900px] mx-auto rounded-lg"
      />

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="border border-[--color-border] rounded-lg p-5">
          <p className="font-semibold text-base mb-1">Chat API</p>
          <p className="text-base text-[--color-muted]">
            Single line of code to integrate
          </p>
        </div>
        <div className="border border-[--color-border] rounded-lg p-5">
          <p className="font-semibold text-base mb-1">Replay Buffer</p>
          <p className="text-base text-[--color-muted]">
            Stores (prompt, response, reward) for reuse
          </p>
        </div>
        <div className="border border-[--color-border] rounded-lg p-5">
          <p className="font-semibold text-base mb-1">Async Training</p>
          <p className="text-base text-[--color-muted]">
            veRL updates LoRA, hot-reloaded to server
          </p>
        </div>
      </div>
    </Slide>
  );
}
