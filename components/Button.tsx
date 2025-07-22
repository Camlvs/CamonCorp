import Image from "next/image";

export default function button({ text, icon }: { text: string; icon: string }) {
  return (
    <button
      className="text-sm lg:text-base flex gap-2.5 items-center mt-6 lg:mt-[50px] px-2 lg:px-10 py-3
    rounded-xl font-poppins lg:font-semibold bg-mainRed text-white border border-transparent hover:border-[#E50C00]
    hover:bg-white hover:text-mainRed transition-all duration-300 ease-in-out group"
    >
      {text}
      {icon && <Image src={icon} width={24} height={24} alt="arrow" />}
    </button>
  );
}
