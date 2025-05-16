import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex justify-around items-center p-5">
      <Image src="/logo.svg" width={78} height={48} alt="camonCorp" />
      <div className="flex gap-10 font-poppins font-semibold">
        <Link href="#">Missions</Link>
        <Link href="#">Réalisations</Link>
        <Link href="#">Process</Link>
        <Link href="#">Références</Link>
        <Link href="#">Tarifs</Link>
      </div>
      <div className="flex gap-1 items-center text-mainRed font-poppins bg-white rounded-2xl px-6 py-2">
        <Image src="/wa.svg" width={22} height={22} alt="whatsapp" />
        Démarrer maintenant
      </div>
    </div>
  );
}
