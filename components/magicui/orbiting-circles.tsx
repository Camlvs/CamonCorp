import { cn } from "@/lib/utils";
import { Etape1 } from "@/sanity/lib/type";
import React, { useEffect, useRef, useState } from "react";

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

/**
 * Safari ne supporte pas les custom properties dans les keyframes.
 * On anime donc l'angle en JS et on applique le transform manuellement.
 */
function getTransform(angle: number, radius: number): React.CSSProperties {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
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

function isSafari(): boolean {
  if (typeof window === "undefined") return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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
  const [angles, setAngles] = useState<number[]>([]);
  const animationFrame = useRef<number | null>(null);
  const isSafariBrowser = useRef<boolean>(false);

  useEffect(() => {
    isSafariBrowser.current = isSafari();
  }, []);

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

  // Animation JS pour Safari
  useEffect(() => {
    if (!isSafariBrowser.current || !visibleData) return;

    const total = visibleData.length;
    const baseAngles = visibleData.map((_, i) => (360 / total) * i);

    let start: number | null = null;

    function animate(now: number) {
      if (start === null) start = now;
      const elapsed = (now - start) / 1000; // en secondes
      const progress = (elapsed / calculatedDuration) % 1;
      const direction = reverse ? -1 : 1;
      const newAngles = baseAngles.map(
        (base) => base + direction * 360 * progress
      );
      setAngles(newAngles);
      animationFrame.current = requestAnimationFrame(animate);
    }

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleData, calculatedDuration, reverse]);

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

        // Safari: on anime l'angle en JS, sinon on utilise CSS animation
        let style: React.CSSProperties;
        if (isSafariBrowser.current && angles.length === total) {
          style = {
            ...getTransform(angles[index], computedRadius),
            backgroundColor: etape.backgroundColor,
            minWidth: 0,
            width: "fit-content",
            maxWidth: "100%",
            transition: "transform 0.1s linear",
          };
        } else {
          style = {
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
        }

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
      {/* Les keyframes ne sont utilisées que sur Chrome/Firefox */}
      {!isSafariBrowser.current && (
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
      )}
    </>
  );
}
