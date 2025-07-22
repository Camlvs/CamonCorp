"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PortableTextBlock } from "sanity";

export default function NavBar({
  cta,
  topBar,
}: {
  cta: string;
  topBar: PortableTextBlock[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY) {
        setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const isScrolled = scrollY > 750;

  return (
    <>
      {/* TopBar */}
      {topBar && (
        <div
          className={`bg-mainRed fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="text-center text-sm py-[10px] text-white">
            <PortableText value={topBar} />
          </div>
        </div>
      )}

      {/* Desktop nav */}
      <div
        className={`hidden lg:flex justify-around items-center p-5 fixed w-full z-50 transition-all duration-300 ease-in-out ${
          isVisible ? (topBar ? "top-[40px]" : "top-[0px]") : "-top-[100px]"
        }`}
        style={{
          backgroundColor: isScrolled ? "#141414" : "transparent",
        }}
      >
        <Link href={"/"}>
          <Image src="/logo.svg" width={78} height={48} alt="camonCorp" />
        </Link>
        <div className="flex gap-10 font-poppins font-semibold text-white">
          <Link href="#missions">Missions</Link>
          <Link href="#realisations">Réalisations</Link>
          <Link href="#process">Process</Link>
          <Link href="#references">Références</Link>
          <Link href="#tarifs">Tarifs</Link>
        </div>
        <a href={cta} target="_blank" rel="noopener noreferrer">
          <div className="flex gap-3.5 items-center text-mainRed font-poppins bg-white rounded-xl px-6 py-2.5 hover:bg-mainRed hover:text-white transition-all duration-300 ease-in-out group cursor-pointer">
            <Image
              src="/WA.svg"
              width={22}
              height={22}
              alt="whatsapp"
              className="group-hover:invert group-hover:brightness-0 group-hover:contrast-[100] transition-all duration-300 ease-in-out"
            />
            Démarrer maintenant
          </div>
        </a>
      </div>

      {/* Mobile nav */}
      <div
        className={`z-50 fixed w-full flex py-3 lg:hidden justify-between items-center px-5 transition-all duration-300 ease-in-out ${
          isVisible ? (topBar ? "top-[40px]" : "top-[50px]") : "-top-[100px]"
        }`}
        style={{
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 1)" : "transparent",
        }}
      >
        <Image
          src="/logo.svg"
          width={42}
          height={26}
          alt="camonCorp"
          className="object-cover"
        />
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
              <Link href="#references" onClick={() => setIsOpen(false)}>
                Références
              </Link>
              <Link href="#tarifs" onClick={() => setIsOpen(false)}>
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
