"use client";

import katex from "katex";

interface MathProps {
  math: string;
  display?: boolean;
  className?: string;
}

export function Math({ math, display = false, className = "" }: MathProps) {
  const html = katex.renderToString(math, {
    displayMode: display,
    throwOnError: false,
    trust: true,
  });

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function BlockMath({ math, className = "" }: { math: string; className?: string }) {
  return <Math math={math} display={true} className={`block my-4 ${className}`} />;
}

export function InlineMath({ math, className = "" }: { math: string; className?: string }) {
  return <Math math={math} display={false} className={className} />;
}
