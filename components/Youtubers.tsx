import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { Client, Clients } from "@/sanity/lib/type";
import Image from "next/image";

const ReviewCard = ({ client }: { client: Client }) => {
  return (
    <figure
      className={cn(
        "relative lg:w-64 cursor-pointer overflow-hidden rounded-xl"
      )}
    >
      <div className="flex items-center gap-2 p-2">
        <div className="w-[46px] h-[46px] flex-shrink-0">
          <Image
            className="rounded-full border border-[#E50C00] p-[1px] object-cover w-full h-full"
            width={46}
            height={46}
            alt={client.name}
            src={client.image}
          />
        </div>
        <p className="text-sm font-medium">{client.name}</p>
      </div>
    </figure>
  );
};

export default function Youtubers({ data }: { data: Clients }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white text-black">
      <Marquee pauseOnHover className="[--duration:20s]">
        {data.clientsList.map((client) => (
          <ReviewCard key={client.name} client={client} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
    </div>
  );
}
