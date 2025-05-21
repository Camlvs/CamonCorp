import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const reviews = [
  {
    username: "Mastu",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    username: "Louis",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    username: "Joyca",
    img: "https://avatar.vercel.sh/john",
  },
  {
    username: "Squeezie",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    username: "Amixem",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    username: "Charles",
    img: "https://avatar.vercel.sh/james",
  },
];

const ReviewCard = ({ img, username }: { img: string; username: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 lg:py-3 cursor-pointer overflow-hidden rounded-xl"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={45}
          height={45}
          alt="CamonCorp"
          src={img}
        />
        <p>{username}</p>
      </div>
    </figure>
  );
};

export default function Youtubers() {
  return (
    <div className="bg-white text-black relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
