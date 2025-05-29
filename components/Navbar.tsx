"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar({ cta }: { cta: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden lg:flex justify-around items-center p-5 fixed w-full bg-transparent z-50 top-[40px]">
        <Image src="/logo.svg" width={78} height={48} alt="camonCorp" />
        <div className="flex gap-10 font-poppins font-semibold text-white">
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
      </div>

      {/* Mobile nav */}
      <div className="z-50 fixed w-full flex lg:hidden justify-between items-center px-5 top-[50px]">
        <Image src="/logo.svg" width={42} height={26} alt="camonCorp" />
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} className="text-white" />
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 bg-gradient-to-r from-beige via-peach to-red z-[100000] flex flex-col"
          >
            <div className="pt-4 px-5 flex justify-between items-center pb-6 border-b border-black">
              <p className="text-xl font-light text-black">MENU</p>
              <button onClick={() => setIsOpen(false)}>
                <X className={"text-black"} size={32} />
              </button>
            </div>

            <div className="mt-12 pl-5 flex flex-col gap-6 font-semibold text-black text-lg">
              <Link href="#missions" onClick={() => setIsOpen(false)}>
                Missions
              </Link>
              <Link href="#realisations" onClick={() => setIsOpen(false)}>
                Réalisations
              </Link>
              <Link href="#process" onClick={() => setIsOpen(false)}>
                Process
              </Link>
              <Link href="#refs" onClick={() => setIsOpen(false)}>
                Références
              </Link>
              <Link href="#tarif" onClick={() => setIsOpen(false)}>
                Tarifs
              </Link>
            </div>

            <a
              href={cta}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto mb-10 mx-5 bg-mainRed text-white text-center py-3 rounded-xl font-semibold"
            >
              Démarrer maintenant
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
