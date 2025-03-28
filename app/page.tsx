import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Youtubers from "@/components/Youtubers";

export default function Home() {
  return (
    <>
      <div className="bg-black">
        <TopBar />
        <Navbar />

        <div className="pb-[230px] text-center main-video flex flex-col justify-center items-center mt-[100px]">
          <h1 className="text-7xl font-poppins font-semibold">
            La prod des créateurs <br />
            audacieux.
          </h1>
          <p className="text-[#A9A9A9] text-2xl mt-7">
            De la pré-prod à la post-prod, on crée des vidéos <br /> qui
            captivent, engagent et convertissent.
          </p>
          <button className="flex gap-2.5 items-center mt-[50px] bg-mainRed text-white font-poppins font-semibold px-10 py-3 rounded-2xl">
            Démarre ta prochaine vidéo avec nous
            <Image src="/nextIcon.svg" width={24} height={24} alt="arrow" />
          </button>
          <div className="mt-[33px] flex gap-6">
            <div className="flex gap-2">
              <Image src="/checkIcon.svg" width={16} height={16} alt="scroll" />
              <p>Plus de vues</p>
            </div>
            <div className="flex gap-2">
              <Image src="/checkIcon.svg" width={16} height={16} alt="scroll" />
              <p>Plus de vues</p>
            </div>
            <div className="flex gap-2">
              <Image src="/checkIcon.svg" width={16} height={16} alt="scroll" />
              <p>Plus de vues</p>
            </div>
          </div>
        </div>
        <Youtubers />
      </div>
      <div className="mt-[70px] px-[50px]">
        <div className="bg-[#303030] rounded-2xl flex gap-[40px] p-[50px]">
          <div className="flex flex-col">
            <span>Missions Cam on corp</span>
            <h1 className="text-5xl font-poppins font-semibold mt-2">
              Plus qu’une mission, <br /> une véritable production
            </h1>
            <p className="mt-10">
              Faire de vos rêves d&apos;enfant une réalité. Vous savez, ceux qui
              étaient moqués et qu’on nous disait qu’ils ne marcheraient pas. On
              aime raconter des histoires audacieuses qui inspirent. Et vous
              apprendre à ne jamais dire jamais. Quand les histoires sont
              partagées avec passion et authenticité, elles peuvent non
              seulement transformer votre secteur mais aussi captiver et
              transmettre des émotions. Ensemble, faisons vibrer le monde avec
              votre récit unique.
            </p>
            <button className="flex w-fit gap-2.5 items-center mt-[40px] bg-mainRed text-white font-poppins font-semibold px-10 py-3 rounded-2xl">
              Donnez vie à votre projet
              <Image src="/nextIcon.svg" width={24} height={24} alt="arrow" />
            </button>
            <div className="flex gap-5 mt-[45px]">
              <div className="flex gap-1">
                <Image width={24} height={24} src="/linkedin.svg" alt="video" />
                <p className="font-light">Cam on Corp</p>
              </div>
              <div className="flex gap-1">
                <Image
                  width={24}
                  height={24}
                  src="/instagram.svg"
                  alt="video"
                />
                <p className="font-light">Cam on Corp.Officiel</p>
              </div>
            </div>
          </div>
          <Image
            width={570}
            height={600}
            src="/1.png"
            alt="video"
            className="rounded-2xl"
          />
        </div>
      </div>
    </>
  );
}
