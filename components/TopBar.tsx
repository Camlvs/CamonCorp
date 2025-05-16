export default function TopBar({ text }: { text: string }) {
  return (
    <div className="bg-white">
      <p className="text-center text-sm py-[10px] text-mainRed">{text}</p>
    </div>
  );
}
