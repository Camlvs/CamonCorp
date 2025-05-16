import { Faq } from "@/components/Faq";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { TextReveal } from "@/components/magicui/text-reveal";
import Navbar from "@/components/Navbar";
import Roadmap from "@/components/Roadmap";
import Testimonials from "@/components/Testimonials";
import Tooltip from "@/components/Tooltip";
import TopBar from "@/components/TopBar";
import Youtubers from "@/components/Youtubers";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import {
  avisQuery,
  chiffresQuery,
  faqQuery,
  headerQuery,
  missionQuery,
  offreQuery,
  valeursQuery,
  yourProjectsQuery,
  yourVideoQuery,
  youtubersQuery,
} from "@/sanity/lib/query";
import {
  Avis,
  Chiffres,
  FAQ,
  Header,
  Mission,
  Offre,
  Valeurs,
  YourProjects,
  YourVideo,
  Youtuber,
  Youtubers as YoutubersType,
} from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const header: Header = await sanityFetch({
    query: headerQuery,
    tags: ["brands"],
  });

  const mission: Mission = await sanityFetch({
    query: missionQuery,
    tags: ["mission"],
  });

  const youtubers = await sanityFetch<YoutubersType>({
    query: youtubersQuery,
    tags: ["youtubers"],
  });

  const chiffres = await sanityFetch<Chiffres>({
    query: chiffresQuery,
    tags: ["chiffres"],
  });

  const yourProjects = await sanityFetch<YourProjects>({
    query: yourProjectsQuery,
    tags: ["yourProjects"],
  });

  const valeurs = await sanityFetch<Valeurs>({
    query: valeursQuery,
    tags: ["valeurs"],
  });

  const yourVideo = await sanityFetch<YourVideo>({
    query: yourVideoQuery,
    tags: ["yourVideo"],
  });

  const avis = await sanityFetch<Avis>({
    query: avisQuery,
    tags: ["avis"],
  });

  const offre = await sanityFetch<Offre>({
    query: offreQuery,
    tags: ["offre"],
  });

  const faq = await sanityFetch<FAQ>({
    query: faqQuery,
    tags: ["faq"],
  });

  return (
    <>
      <div className="bg-black">
        {header.bandeau && <TopBar text={header.bandeau} />}
        <Navbar />

        <div className="pb-[230px] text-center main-video flex flex-col justify-center items-center mt-[100px]">
          <div className="text-7xl font-poppins font-semibold">
            <PortableText value={header.title} />
          </div>
          <div className="text-[#A9A9A9] text-2xl mt-7">
            <PortableText value={header.subTitle} />
          </div>
          <button className="flex gap-2.5 items-center mt-[50px] bg-mainRed text-white font-poppins font-semibold px-10 py-3 rounded-2xl">
            {header.button}
            <Image src="/nextIcon.svg" width={24} height={24} alt="arrow" />
          </button>
          <div className="mt-[33px] flex gap-6">
            {header.subButton.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Image
                  src="/checkIcon.svg"
                  width={16}
                  height={16}
                  alt="scroll"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
        <Youtubers />
      </div>
      <div className="mt-[70px] px-[50px]">
        <div className="bg-[#303030] rounded-2xl flex gap-[40px] p-[50px]">
          <div className="flex flex-col">
            <Tooltip text={mission.title} />
            <h1 className="text-5xl font-poppins font-semibold mt-2">
              {(() => {
                const words = mission.subtitle.trim().split(" ");
                const lastTwo = words.slice(-2).join(" ");
                const before = words.slice(0, -2).join(" ");
                return (
                  <>
                    {before && <span>{before} </span>}
                    <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
                  </>
                );
              })()}
            </h1>

            <div className="mt-10">
              <PortableText value={mission.description} />
            </div>
            <button className="flex w-fit gap-2.5 items-center mt-[40px] bg-mainRed text-white font-poppins font-semibold px-10 py-3 rounded-2xl">
              {mission.buttonText}
              <Image src="/nextIcon.svg" width={24} height={24} alt="arrow" />
            </button>
            <div className="flex gap-5 mt-[45px]">
              {mission.socialLinks.map((item, index) => (
                <div key={index} className="flex gap-1">
                  <Link href={item.url}>
                    <Image
                      width={24}
                      height={24}
                      src={`/${item.platform.toLowerCase()}.svg`}
                      alt={item.platform}
                    />
                  </Link>
                  <p className="font-light">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            width={570}
            height={600}
            src={urlFor(mission.image).url()}
            alt="mission"
            className="rounded-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-[100px]">
        <p className="text-2xl font-bold mb-6">
          <Tooltip text={youtubers.title} />
        </p>

        <div className="text-5xl font-poppins font-semibold mt-2">
          {(() => {
            const words = youtubers.subTitle.trim().split(" ");
            const lastTwo = words.slice(-3).join(" ");
            const before = words.slice(0, -3).join(" ");
            return (
              <>
                {before && <span>{before} </span>}
                <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
              </>
            );
          })()}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubers.youtubersList.map((youtuber: Youtuber) => (
            <div
              key={youtuber.name}
              className={`flex flex-col items-start ${
                youtuber.name === "Mastu" ? "row-span-2" : ""
              }`}
            >
              <Link
                href={youtuber.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2"
              >
                <Image
                  src={youtuber.image}
                  alt={youtuber.name}
                  width={450}
                  height={280}
                  className="rounded-2xl object-cover"
                />
                <div className="flex gap-2.5 mt-3">
                  <Image
                    src={"/flash.svg"}
                    width={28}
                    height={28}
                    alt="camoncorp"
                  />
                  <p className="text-2xl">{youtuber.name}</p>
                </div>
                <div className="mt-4 bg-white rounded-full text-[#E50C00] px-3 text-sm w-fit">
                  {youtuber.videoTitle}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-[#E50C00] text-white px-7 py-2 rounded-xl flex items-center gap-2">
          Voir tous nos projets
          <Image src={"rightArrow.svg"} width={24} height={24} alt="arrow" />
        </div>
      </div>
      <div className="py-24 px-14 bg-[#282828] mx-[50px] rounded-2xl mt-24 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold mb-6">
          <Tooltip text={chiffres.title} />
        </p>
        <p className="text-5xl font-poppins font-semibold mt-2">
          {(() => {
            const words = chiffres.subtitle.trim().split(" ");
            const lastTwo = words.slice(-3).join(" ");
            const before = words.slice(0, -3).join(" ");
            return (
              <>
                {before && <span>{before} </span>}
                <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
              </>
            );
          })()}
        </p>
        <div className="mt-12 flex border border-[#FFFFFF59] rounded-2xl flex-wrap py-14">
          {chiffres.statistics.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center border-r border-[#FFFFFF59] px-14 last:border-r-0"
            >
              <p className="mb-8 text-2l text-[#FFFFFFB3]">{stat.title}</p>
              <div className="text-5xl font-bold">
                <AnimatedGradientText>{stat.number}</AnimatedGradientText>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-[60px] mt-7 bg-white rounded-2xl mx-[50px]">
        <p className="text-5xl pt-10 text-black font-semibold text-center">
          {yourProjects.title}
        </p>
        <div className="flex items-center gap-[100px] px-[50px] pt-[50px]">
          <div className="flex flex-col">
            <div className="mt-4 text-black">
              <PortableText value={yourProjects.richText} />
            </div>
            <div className="w-fit mt-12 bg-[#E50C00] text-white px-7 py-2 rounded-xl flex items-center gap-2">
              {yourProjects.buttonText}
              <Image
                src={"rightArrow.svg"}
                width={24}
                height={24}
                alt="arrow"
              />
            </div>
            <div className="flex gap-5 mt-[45px]">
              {yourProjects.socialLinks.map((item, index) => (
                <div key={index} className="flex gap-1">
                  <Link href={item.url}>
                    <Image
                      width={24}
                      height={24}
                      src={`/${item.platform.toLowerCase()}.svg`}
                      alt={item.platform}
                    />
                  </Link>
                  <p className="text-black">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            {yourProjects.projects.slice(0, 3).map((project, index) => {
              const positions = [
                "top-12 -left-8 rotate-6", // 1er : en haut à gauche
                "top-6 -right-6 -rotate-12", // 2e : en haut à droite
                "top-1/2 -right-12 rotate-2 -translate-y-1/2", // 3e : centré à droite
              ];

              return (
                <div
                  key={index}
                  className={`absolute ${positions[index]} w-fit flex flex-col bg-[#242324] rounded-2xl border border-[#FFFFFF59] px-[20px] py-2`}
                >
                  <div className="flex gap-2">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={29}
                      height={29}
                      className="rounded-full"
                    />
                    <p className="text-white">{project.title}</p>
                  </div>
                  <p className="text-sm text-[#989898]">
                    {project.description}
                  </p>
                </div>
              );
            })}
            <div className="w-[530px]">
              <Image
                src={yourProjects.image}
                alt="Projects"
                width={530}
                height={790}
                className="rounded-2xl h-[790px] !w-[530px] object-cover"
              />
            </div>
            <div className="absolute bottom-4 -left-6 rotate-12 flex bg-[#242324] rounded-2xl p-6 border border-[#FFFFFF59] w-fit gap-5">
              {yourProjects.statistics.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 items-center justify-center"
                >
                  <p className="text-[#989898] text-xl">{stat.title}</p>
                  <p className="text-3xl font-semibold text-white">
                    <NumberTicker
                      value={parseFloat(stat.number1)}
                      className="text-white"
                    />
                    M
                  </p>
                  <p className="text-sm text-[#17A34A] flex gap-1">
                    <Image
                      src={"topArrow.svg"}
                      width={12}
                      height={12}
                      alt="arrow"
                    />
                    +{stat.number2}K
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="gap-12 py-24 px-14 bg-[#282828] mx-[50px] rounded-2xl mt-24 flex justify-center">
        <div className="flex flex-col">
          <p className="text-2xl font-bold mb-6">
            <Tooltip text={valeurs.title} />
          </p>
          <p className="text-5xl font-poppins font-semibold mt-2">
            {(() => {
              const words = valeurs.subtitle.trim().split(" ");
              const before = words.slice(0, 2).join(" "); // les deux premiers mots
              const after = words.slice(2).join(" "); // le reste
              return (
                <>
                  <AnimatedGradientText>{before}</AnimatedGradientText>{" "}
                  <span>{after} </span>
                </>
              );
            })()}
          </p>
          <div className="mt-10 text-xl">
            <PortableText value={valeurs.description} />
          </div>
          <div className="w-fit mt-12 bg-[#E50C00] text-white px-7 py-2 rounded-xl flex items-center gap-2">
            {valeurs.buttonText}
            <Image src={"rightArrow.svg"} width={24} height={24} alt="arrow" />
          </div>
        </div>
        <div className="max-w-[770px]">
          <div className="flex flex-wrap gap-6 justify-center">
            {valeurs.values.map((value, index) => (
              <div
                key={index}
                className="cursor-pointer group flex flex-col p-6 bg-white rounded-2xl w-[370px] transition duration-300 transform hover:-rotate-6 hover:bg-red-600"
              >
                <div className="flex gap-2 mb-2 items-center">
                  <Image
                    src={value.image}
                    alt={value.title}
                    width={43}
                    height={43}
                  />
                  <h3 className="text-xl text-black group-hover:text-white transition duration-300">
                    {value.title}
                  </h3>
                </div>
                <p className="text-black mt-2 group-hover:text-white transition duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <TextReveal className="italic font-semibold">
          On ne suit pas les tendances, on les crée. Prêt à marquer YouTube ?
        </TextReveal>
      </div>
      <div className="py-24 px-14 bg-[#282828] mx-[50px] rounded-2xl mt-24">
        <p className="text-2xl font-bold mb-6">
          <Tooltip text={yourVideo.title} />
        </p>
        <p className="text-5xl font-poppins font-semibold mt-2">
          {(() => {
            const words = yourVideo.subtitle.trim().split(" ");
            const lastTwo = words.slice(-2).join(" ");
            const before = words.slice(0, -2).join(" ");
            return (
              <>
                {before && <span>{before} </span>}
                <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
              </>
            );
          })()}
        </p>
        <p className="mt-6 text-xl text-[#A9A9A9]">{yourVideo.description}</p>
        <div>
          <Roadmap data={yourVideo} />
        </div>
      </div>

      {/* AVIS */}

      <div className="relative flex flex-col items-center mt-24 pb-[130px]">
        <p className="text-2xl font-bold mb-6">
          <Tooltip text={avis.title} />
        </p>
        <p className="text-5xl font-poppins font-semibold mt-2">
          {(() => {
            const words = avis.subtitle.trim().split(" ");
            const lastTwo = words.slice(-2).join(" ");
            const before = words.slice(0, -2).join(" ");
            return (
              <>
                {before && <span>{before} </span>}
                <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
              </>
            );
          })()}
        </p>
        <div className="mt-6 text-[#F0F0F0] text-2xl text-center leading-[40px]">
          <PortableText value={avis.description} />
        </div>
        <Testimonials data={avis} />
        <Image src="/avis.svg" fill alt="ais" className="-z-10" />
      </div>

      {/* OFFRE */}

      <div className="relative flex flex-col items-center mt-24 pb-[130px]">
        <Tooltip text={offre.title} />
        <p className="text-5xl font-poppins font-semibold mt-6">
          {(() => {
            const words = offre.subtitle.trim().split(" ");
            const lastTwo = words.slice(-2).join(" ");
            const before = words.slice(0, -2).join(" ");
            return (
              <>
                {before && <span>{before} </span>}
                <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
              </>
            );
          })()}
        </p>
        <div className="ralewayOver mt-6 text-[#F0F0F0] text-2xl text-center leading-[40px]">
          <PortableText value={offre.description} />
        </div>
        <div className="mt-12 flex gap-[50px] items-start">
          {offre.offers.map((offer, index) => (
            <div
              key={index}
              className={cn(
                "w-[390px] flex flex-col items-start rounded-2xl py-10 px-6",
                index === 1 ? "bg-white" : "bg-[#282828]"
              )}
            >
              <p
                className={cn(
                  "text-2xl font-medium",
                  index === 1 ? "text-black" : "text-white"
                )}
              >
                {offer.title}
              </p>
              <p
                className={cn(
                  "text-[#FFFFFFCC] mt-2 font-raleway font-medium",
                  index !== 1 ? "text-[#ffffffCC]" : "text-[#000000CC]"
                )}
              >
                {offer.subtitle}
              </p>
              {index === 1 ? (
                <p className="text-5xl font-medium mt-4 text-black">
                  {offer.pricing}
                </p>
              ) : (
                <p className="text-5xl font-medium mt-4 ralewayOver">
                  <AnimatedGradientText>{offer.pricing}</AnimatedGradientText>
                </p>
              )}

              <button
                className={cn(
                  "text-sm py-3 w-full rounded-xl flex gap-2 justify-center mx-auto mt-9",
                  index !== 1 ? "bg-[#333]" : "bg-[#E50C00]"
                )}
              >
                <Image
                  src={"whatApp.svg"}
                  width={22}
                  height={22}
                  alt="whatsApp"
                />
                {offer.buttonText}
              </button>

              <span
                className={cn(
                  "w-full h-[1px] mt-11 mb-10",
                  index === 1
                    ? "bg-[#00000040]"
                    : "bg-[linear-gradient(to_left,_#ECD6B1_0%,_#F2766C_50%,_#E73022_100%)]"
                )}
              ></span>

              <h4
                className={cn(
                  "mt-6 font-medium text-[18px]",
                  index !== 1 ? "text-white" : "text-black"
                )}
              >
                {offer.titleOffre}
              </h4>
              <ul className="mt-4 space-y-4">
                {offer.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={cn(
                      "flex items-center gap-2",
                      index !== 1 ? "text-white" : "text-black/80"
                    )}
                  >
                    <Image
                      src={index === 1 ? "checkWhite.svg" : "checkDark.svg"}
                      width={16}
                      height={16}
                      alt="check"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="relative py-24 px-14 bg-[#282828] mx-[50px] rounded-2xl mt-24">
        <p className="text-5xl font-poppins font-semibold mt-2">
          {(() => {
            const words = faq.title.trim().split(" ");
            const lastTwo = words.slice(-2).join(" ");
            const before = words.slice(0, -2).join(" ");
            return (
              <>
                {before && <span>{before} </span>}
                <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
              </>
            );
          })()}
        </p>
        <div className="mt-12 w-full">
          <Faq questions={faq.questions} />
        </div>
      </div>
    </>
  );
}
