"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function NavBar({ cta }: { cta: string }) {
  return (
    <div className="flex justify-around items-center p-5 fixed w-full bg-[#141414] z-50 top-[40px]">
      <Image src="/logo.svg" width={78} height={48} alt="camonCorp" />
      <div className="flex gap-10 font-poppins font-semibold">
        <Link href="#missions">Missions</Link>
        <Link href="#realisations">Réalisations</Link>
        <Link href="#process">Process</Link>
        <Link href="#refs">Références</Link>
        <Link href="#tarif">Tarifs</Link>
      </div>
      <a href={cta} target="_blank" rel="noopener noreferrer">
        <div className="flex gap-1 items-center text-mainRed font-poppins bg-white rounded-xl px-6 py-2.5">
          <Image src="/wa.svg" width={22} height={22} alt="whatsapp" />
          Démarrer maintenant
        </div>
      </a>
      <Menu />
    </div>
  );
}
