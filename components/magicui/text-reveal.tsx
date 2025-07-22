"use client";

import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ComponentPropsWithoutRef, ReactNode, useRef } from "react";

export type TextRevealProps = ComponentPropsWithoutRef<"div"> & {
  children: string;
};

export function TextReveal({ children, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <span className="flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
          {words.map((word, i) => {
            // Use a slightly overlapping range to ensure Safari renders the animation smoothly
            const start = i / words.length;
            const end = (i + 1.2) / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
}

type WordProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
};

function Word({ children, progress, range }: WordProps) {
  // Clamp opacity to avoid Safari flicker and ensure smooth fade-in
  const opacity = useTransform(progress, range, [0, 1], { clamp: true });

  // Use will-change and force composite layer for Safari
  return (
    <span className="relative mx-1 lg:mx-1.5" style={{ willChange: "opacity" }}>
      <span className="absolute opacity-30 pointer-events-none select-none">
        {children}
      </span>
      <motion.span
        style={{ opacity, willChange: "opacity" }}
        className="text-black dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
}
