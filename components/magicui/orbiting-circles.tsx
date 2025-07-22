import { cn } from "@/lib/utils";
import { Etape1 } from "@/sanity/lib/type";
import React, { useEffect, useState } from "react";

export type OrbitingCirclesProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  data?: Etape1[];
  title1: string;
};

function getTransform(angle: number, radius: number): React.CSSProperties {
  // Convert angle to radians
  const rad = (angle * Math.PI) / 180;
  // Calculate x and y position
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  // Center the item
  return {
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "auto",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export function OrbitingCircles({
  className,
  reverse,
  duration = 50,
  radius = 200,
  path = true,
  speed = 1,
  data,
  title1,
  ...props
}: OrbitingCirclesProps) {
  const [computedRadius, setComputedRadius] = useState(radius);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    setComputedRadius(mediaQuery.matches ? 120 : radius);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [radius]);

  const calculatedDuration = duration / speed;

  const visibleData =
    isMobile && data ? data.slice(0, Math.ceil(data.length / 2)) : data;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={computedRadius}
            fill="none"
          />
        </svg>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-90 text-white text-xl lg:text-[32px] max-w-[210px] text-center font-poppins">
        {title1}
      </div>
      {visibleData?.map((etape, index) => {
        const total = visibleData.length;
        const baseAngle = (360 / total) * index;
        const animationName = reverse ? "orbit-reverse" : "orbit";
        const animationDuration = `${calculatedDuration}s`;
        const animationTiming = "linear";
        const animationIteration = "infinite";
        const style: React.CSSProperties = {
          ...getTransform(baseAngle, computedRadius),
          backgroundColor: etape.backgroundColor,
          animationName,
          animationDuration,
          animationTimingFunction: animationTiming,
          animationIterationCount: animationIteration,
          // @ts-expect-error -- custom property for keyframes
          "--orbit-angle": `${baseAngle}deg`,
          "--orbit-radius": `${computedRadius}px`,
          minWidth: 0,
          width: "fit-content",
          maxWidth: "100%",
        };

        return (
          <div
            key={index}
            style={style}
            className={cn(
              "flex items-center justify-center rounded-full",
              className
            )}
            {...props}
          >
            <p
              className="px-[18px] py-[4px] text-sm rounded-full font-semibold w-full truncate"
              style={{
                color: etape.textColor,
                background: "transparent",
                minWidth: 0,
                width: "100%",
                maxWidth: "100%",
                textAlign: "center",
                display: "block",
              }}
            >
              {etape.title}
            </p>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(var(--orbit-angle, 0deg))
              translateX(var(--orbit-radius, 200px))
              rotate(calc(-1 * var(--orbit-angle, 0deg)));
          }
          100% {
            transform: translate(-50%, -50%)
              rotate(calc(360deg + var(--orbit-angle, 0deg)))
              translateX(var(--orbit-radius, 200px))
              rotate(calc(-360deg - var(--orbit-angle, 0deg)));
          }
        }
        @keyframes orbit-reverse {
          0% {
            transform: translate(-50%, -50%) rotate(var(--orbit-angle, 0deg))
              translateX(var(--orbit-radius, 200px))
              rotate(calc(-1 * var(--orbit-angle, 0deg)));
          }
          100% {
            transform: translate(-50%, -50%)
              rotate(calc(-360deg + var(--orbit-angle, 0deg)))
              translateX(var(--orbit-radius, 200px))
              rotate(calc(360deg - var(--orbit-angle, 0deg)));
          }
        }
      `}</style>
    </>
  );
}
