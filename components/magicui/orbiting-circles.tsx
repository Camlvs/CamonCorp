import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Etape1 } from "@/sanity/lib/type";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
}

export function OrbitingCircles({
  className,
  reverse,
  duration = 50,
  radius = 200,
  path = true,
  iconSize = 50,
  speed = 1,
  data,
  title1,
  ...props
}: OrbitingCirclesProps) {
  const [computedRadius, setComputedRadius] = useState(radius);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize(); // set on load
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
        const angle = (360 / visibleData.length) * index;
        return (
          <div
            key={index}
            style={
              {
                "--duration": calculatedDuration,
                "--radius": computedRadius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                backgroundColor: etape.backgroundColor,
              } as React.CSSProperties
            }
            className={cn(
              `absolute transform-gpu animate-orbit items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            {...props}
          >
            <p
              className="px-[18px] py-[4px] text-sm rounded-full font-semibold"
              style={{
                color: etape.textColor,
              }}
            >
              {etape.title}
            </p>
          </div>
        );
      })}
    </>
  );
}
