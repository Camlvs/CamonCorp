import { cn } from "@/lib/utils";

export default function Tooltip({ text }: { text: string }) {
  return (
    <div className="w-fit group relative mx-0 flex items-center justify-start rounded-full px-4 py-1.5 ">
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-b from-[#ECD6B1]/50 via-[#F2766C]/50 to-[#E73022]/50 bg-[length:300%_100%] p-[2px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
