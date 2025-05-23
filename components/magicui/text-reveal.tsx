"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky justify-center top-0 mx-auto flex h-[40%]  items-center bg-transparent px-[1rem]"
        }
      >
        <span
          ref={targetRef}
          className={
            "relative flex flex-wrap justify-center p-5 lg:max-w-[70%] text-center text-[42px] lg:text-[80px] font-semibold text-[#282828] md:p-8 lg:p-10"
          }
        >
          <img
            src={"/textReveal1.svg"}
            alt="flash"
            className="absolute top-[-5rem] lg:-top-2 -left-2"
          />
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
          <img
            src={"/textReveal2.svg"}
            alt="flash"
            className="absolute bottom-[-5rem] lg:-bottom-2 -right-2"
          />
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-0">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-white text-center text-[42px] lg:text-[80px]"}
      >
        {children}
      </motion.span>
    </span>
  );
};
