import { cn } from "@/lib/utils";
import { Etape1 } from "@/sanity/lib/type";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

function isSafariMobile(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  // iOS Safari detection (iPhone/iPad/iPod) and not Chrome/Firefox/Opera
  const isIOS = /iP(ad|hone|od)/.test(ua);
  const isSafari = !!ua.match(/Version\/[\d.]+.*Safari/);
  return isIOS && isSafari;
}

function isSafariDesktop(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  // Desktop Safari detection (Macintosh + Safari, not Chrome)
  const isMac = /Macintosh/.test(ua);
  const isSafari = !!ua.match(/Version\/[\d.]+.*Safari/);
  const isNotChrome = !/Chrome|CriOS|Chromium/.test(ua);
  return isMac && isSafari && isNotChrome;
}

export default function OrbitingCircles({
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
  const [angles, setAngles] = useState<number[]>([]);
  const animationFrame = useRef<number | null>(null);
  const isSafariMobileBrowser = useRef<boolean>(false);
  const isSafariDesktopBrowser = useRef<boolean>(false);

  useEffect(() => {
    isSafariMobileBrowser.current = isSafariMobile();
    isSafariDesktopBrowser.current = isSafariDesktop();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    setComputedRadius(mediaQuery.matches ? 120 : radius);

    return () => {};
  }, [radius]);

  const calculatedDuration = duration / speed;
  const visibleData = data;

  useEffect(() => {
    if (!visibleData || visibleData.length === 0) return;

    const total = visibleData.length;
    const baseAngles = visibleData.map((_, i) => (360 / total) * i);

    let start: number | null = null;

    function animate(now: number) {
      if (start === null) start = now;
      const elapsed = (now - start) / 1000;
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
        <Image
					src="logo.svg"
					alt={title1}
					width={100}
					height={100}
				/>
      </div>
      {visibleData?.map((etape, index) => {
        const total = visibleData.length;
        // Sur mobile, angle statique; sur desktop, angle animé
        const angle =
          angles.length === total ? angles[index] : (360 / total) * index;

        const style: React.CSSProperties = {
          ...getTransform(angle, computedRadius),
          backgroundColor: etape.backgroundColor,
          minWidth: 0,
          width: "fit-content",
          maxWidth: "100%",
          transition: "transform 0.1s linear",
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
    </>
  );
}
