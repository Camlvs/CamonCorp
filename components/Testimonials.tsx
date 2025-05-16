import { Marquee } from "@/components/magicui/marquee";
import { Avis } from "@/sanity/lib/type";
import Image from "next/image";

export default function Testimonials({ data }: { data: Avis }) {
  return (
    <div className="mt-12 relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {data.testimonials.map((item, index: number) => (
          <div className="w-[500px] bg-white rounded-2xl p-6" key={index}>
            <p className="text-black">{item.description}</p>
            <div className="flex gap-2  mt-4">
              <Image
                src={item.image}
                alt={item.title}
                width={70}
                height={70}
                className="rounded-full"
              />
              <div className="text-black flex flex-col justify-between">
                <p>{item.title}</p>
                <Image
                  src="fiveStars.svg"
                  width={172}
                  height={30}
                  alt="stars"
                />
              </div>
            </div>
          </div>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
