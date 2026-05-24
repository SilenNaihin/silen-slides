"use client";

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function Slide({ children, className = "", centered = false }: SlideProps) {
  return (
    <div
      className={`slide-content h-full flex flex-col ${
        centered ? "items-center justify-center text-center" : "justify-center"
      } ${className}`}
    >
      {children}
    </div>
  );
}
