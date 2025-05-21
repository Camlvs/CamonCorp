import { PortableText } from "next-sanity";
import { PortableTextBlock } from "sanity";

export default function TopBar({ text }: { text: PortableTextBlock[] }) {
  return (
    <div className="bg-mainRed">
      <div className="text-center text-sm py-[10px] text-white">
        <PortableText value={text} />
      </div>
    </div>
  );
}
