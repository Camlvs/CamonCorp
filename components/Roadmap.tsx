"use client";
import { YourVideo } from "@/sanity/lib/type";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Roadmap({ data }: { data: YourVideo }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="relative w-full overflow-clip">
      <div className=" w-full md:px-10" ref={containerRef}>
        <div ref={ref} className="relative max-w-7xl mx-auto lg:pb-20">
          {data.videos.map((item, index: number) => (
            <div
              key={index}
              className="mb-[64px] lg-[mb-0] flex flex-col lg:flex-row justify-start lg:pt-[120px] md:gap-[120px]"
            >
              <div className="sticky hidden lg:flex flex-row z-40 items-start top-40 self-start w-full max-w-[500px] gap-6">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-b from-[#2a2a2a] to-[#111] shadow-[0_0_10px_rgba(255,255,255,0.2)] flex items-center justify-center text-white font-medium">
                  <span>{index + 1}</span>
                </div>

                <div className="flex flex-col md:pl-20 gap-4">
                  <h3 className="hidden md:block text-3xl text-[#FFAC32] font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-[#FFFFFFCC] text-xl">{item.description}</p>
                </div>
              </div>

              <div className="pr-4 flex lg:items-center lg:justify-center lg:hidden gap-4">
                <div className="z-20 h-10 w-10 shrink-0 rounded-full bg-gradient-to-b from-[#2a2a2a] to-[#111] shadow-[0_0_10px_rgba(255,255,255,0.2)] flex items-center justify-center text-white font-medium text-sm">
                  <span>{index + 1}</span>
                </div>

                <div className="flex flex-col max-w-[300px]">
                  <h3 className="text-base font-semibold text-[#FFAC32]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[#FFFFFFCC] text-sm">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="relative pl-14 mt-[40px] lg:mt-0 pr-4 md:pl-4 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={560}
                  height={500}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-[20px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-200 dark:via-neutral-700 to-transparent from-[0%] to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-[linear-gradient(to_bottom,#E73022_0%,#F2766C_50%,#ECD6B1_100%)] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
