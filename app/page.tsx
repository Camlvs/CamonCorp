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
  footerQuery,
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
  Footer,
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

  const footer = await sanityFetch<Footer>({
    query: footerQuery,
    tags: ["footer"],
  });

  return (
    <>
      <div className="relative bg-black overflow-hidden">
        {header.bandeau && <TopBar text={header.bandeau} />}
        <Navbar cta={header.cta} />

        {header.video && (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={header.video}
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        <div
          className={cn(
            "pb-[230px] text-center flex flex-col justify-center items-center pt-[200px] relative z-10",
            header.video ? "" : "main-video",
          )}
        >
          <div className="text-[32px] lg:text-7xl font-poppins font-semibold">
            <PortableText value={header.title} />
          </div>
          <div className="text-[#A9A9A9] text-[18px] lg:text-2xl px-[32px] lg:px-0 mt-7">
            <PortableText value={header.subTitle} />
          </div>
          <a href={header.cta} target="_blank" rel="noopener noreferrer">
            <button className="text-sm lg:text-base flex gap-2.5 items-center mt-[50px] bg-mainRed text-white font-poppins lg:font-semibold px-2 lg:px-10 py-3 rounded-xl">
              {header.button}
              <Image src="/nextIcon.svg" width={24} height={24} alt="arrow" />
            </button>
          </a>
          <div className="mt-[33px] flex gap-6">
            {header.subButton.map((item, index) => (
              <div key={index} className="flex gap-2 text-xs lg:text-base">
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
      <div className="mt-[70px] lg:px-[50px]" id="missions">
        <div className="bg-[#303030] rounded-2xl flex items-center lg:items-start gap-[40px] p-3 lg:p-[50px] flex-col lg:flex-row">
          <div className="flex flex-col  pt-6 lg:pt-0">
            <div className="mx-auto lg:mx-0">
              <Tooltip text={mission.title} />
            </div>
            <h1 className="text-5xl font-poppins font-semibold mt-4 lg:mt-2">
              {(() => {
                const words = mission.subtitle.trim().split(" ");
                const lastTwo = words.slice(-2).join(" ");
                const before = words.slice(0, -2).join(" ");
                return (
                  <div className="text-center lg:text-left text-[28px] lg:text-[48px] max-w-[604px] mt-4">
                    {before && <span>{before} </span>}
                    <AnimatedGradientText>{lastTwo}</AnimatedGradientText>
                  </div>
                );
              })()}
            </h1>
            <Image
              width={365}
              height={380}
              src={urlFor(mission.image).url()}
              alt="mission"
              className="rounded-2xl mt-6 lg:hidden"
            />
            <div className="mt-10 text-sm lg:text-base">
              <PortableText value={mission.description} />
            </div>
            <a href={header.cta} target="_blank" rel="noopener noreferrer">
              <button className="flex w-fit gap-2.5 items-center bg-mainRed text-white font-poppins font-semibold px-10 py-3 rounded-2xl mx-auto lg:mx-0 mt-10 mb-8 lg:mb-0 lg:mt-[40px]">
                {mission.buttonText}
                <Image src="/nextIcon.svg" width={24} height={24} alt="arrow" />
              </button>
            </a>
            <div className="lg:flex gap-5 mt-[45px] pb-6 lg:pb-0 hidden">
              {mission.socialLinks.map((item, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <Link href={item.url}>
                    <Image
                      width={24}
                      height={24}
                      src={`/${item.platform.toLowerCase()}.svg`}
                      alt={item.platform}
                    />
                  </Link>
                  <p className="font-light text-[13px] lg:text-base">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Image
            width={570}
            height={600}
            src={urlFor(mission.image).url()}
            alt="mission"
            className="rounded-2xl hidden lg:block"
          />
        </div>
      </div>
      <div id="realisations" className="flex flex-col items-center mt-[100px]">
        <div className="text-2xl font-bold mb-2 lg:mb-6">
          <Tooltip text={youtubers.title} />
        </div>

        <div className="text-[28px] text-center lg:text-5xl font-poppins font-semibold mt-2">
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
        <div className="mt-6 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex gap-2.5 mt-3 pl-2.5 lg:pl-0">
                  <Image
                    src={"/flash.svg"}
                    width={28}
                    height={28}
                    alt="camoncorp"
                  />
                  <p className="text-2xl">{youtuber.name}</p>
                </div>
                <div className="ml-2.5 lg:ml-0 mt-4 bg-white rounded-full text-[#E50C00] px-3 text-sm w-fit">
                  {youtuber.videoTitle}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <a href={header.cta} target="_blank" rel="noopener noreferrer">
          <div className="mt-12 bg-[#E50C00] text-white px-7 py-2.5 rounded-xl flex items-center gap-2">
            Voir tous nos projets
            <Image src={"rightArrow.svg"} width={24} height={24} alt="arrow" />
          </div>
        </a>
      </div>
      <div className="py-24 px-3 lg:px-14 bg-[#282828] lg:mx-[50px] rounded-2xl mt-24 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-6">
          <Tooltip text={chiffres.title} />
        </div>
        <p className="text-[28px] text-center lg:text-5xl font-poppins font-semibold mt-2">
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
        <div className="mt-12 flex border border-[#FFFFFF59] rounded-2xl flex-col lg:flex-row flex-wrap py-14">
          {chiffres.statistics.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center lg:border-r border-[#FFFFFF59] px-14 last:border-r-0"
            >
              <p className="mb-2.5 lg:mb-8 text-2l text-[#FFFFFFB3]">
                {stat.title}
              </p>
              <div className="text-5xl font-bold">
                {stat.textBefore && (
                  <AnimatedGradientText>{stat.textBefore}</AnimatedGradientText>
                )}
                <NumberTicker
                  value={parseFloat(stat.number)}
                  className="font-poppins font-bold bg-gradient-to-r from-beige via-peach to-red bg-clip-text text-transparent"
                />
                {stat.textAfter && (
                  <AnimatedGradientText>{stat.textAfter}</AnimatedGradientText>
                )}
              </div>
              <span className="mt-8 mb-8 w-3/4 mx-auto h-[1px] bg-[#FFFFFF59] lg:hidden"></span>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-[60px] mt-7 bg-white rounded-2xl lg:mx-[50px]">
        <div className="flex items-center gap-[60px] lg:gap-[100px] px-4 lg:px-[50px] pt-[50px] flex-col-reverse lg:flex-row">
          <div className="flex flex-col">
            <p className="text-[28px] mb-6 lg:text-5xl pt-10 text-black font-semibold lg:leading-[50px]">
              {yourProjects.title}
            </p>
            <div className="mt-4 text-black">
              <PortableText value={yourProjects.richText} />
            </div>
            <a href={header.cta} target="_blank" rel="noopener noreferrer">
              <div className="w-fit mt-12 bg-[#E50C00] text-white px-7 py-3 rounded-xl flex items-center gap-2">
                {yourProjects.buttonText}
                <Image
                  src={"rightArrow.svg"}
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </div>
            </a>
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
                  className={`absolute ${positions[index]} hidden lg:flex w-fit flex-col bg-[#242324] rounded-2xl border border-[#FFFFFF59] px-[20px] py-2`}
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
            <div className="lg:w-[530px]">
              <Image
                src={yourProjects.image}
                alt="Projects"
                width={530}
                height={790}
                className="rounded-2xl w-[340px] h-[520px] lg:h-[790px] lg:!w-[530px] object-cover"
              />
            </div>
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 
                lg:bottom-4 lg:translate-x-0 lg:-left-6 lg:rotate-12 
                flex bg-[#242324] rounded-2xl p-6 border border-[#FFFFFF59] gap-5 w-3/4 justify-center"
            >
              {yourProjects.statistics.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 items-center justify-center"
                >
                  <p className="text-[#989898] text-xs lg:text-xl">
                    {stat.title}
                  </p>
                  <p className="text-sm lg:text-3xl font-semibold text-white">
                    <NumberTicker
                      value={parseFloat(stat.number1)}
                      className="text-white"
                    />
                    M
                  </p>
                  <p className="text-[10px] lg:text-sm text-[#17A34A] flex gap-1">
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
      <div className="gap-12 py-12 lg:py-24 lg:px-14 bg-[#282828] lg:mx-[50px] rounded-2xl mt-24 flex flex-col lg:flex-row  justify-center">
        <div className="flex flex-col items-center lg:items-start px-[20px] lg:px-0">
          <div className="text-2xl font-bold mb-6">
            <Tooltip text={valeurs.title} />
          </div>
          <p className="text-[28px] text-center lg:text-start lg:text-5xl font-poppins font-semibold mt-2">
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
          <div className="text-center lg:text-start mt-10 lg:text-xl">
            <PortableText value={valeurs.description} />
          </div>
          <div className="hidden w-fit mt-12 bg-[#E50C00] text-white px-7 py-3 rounded-xl lg:flex items-center gap-2">
            {valeurs.buttonText}
            <Image src={"rightArrow.svg"} width={24} height={24} alt="arrow" />
          </div>
        </div>
        <div className="max-w-[770px]">
          <div className="flex flex-wrap gap-6 justify-center">
            {valeurs.values.map((value, index) => (
              <div
                key={index}
                className="cursor-pointer group flex flex-col p-6 bg-white rounded-2xl w-[350px] transition duration-300 transform hover:-rotate-6 hover:bg-[#E50C00]"
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
        <a href={header.cta} target="_blank" rel="noopener noreferrer">
          <div className="mb-4 lg:mb-0 flex w-fit mt-3 bg-[#E50C00] text-white mx-auto px-7 py-3 rounded-xl lg:hidden items-center gap-2">
            {valeurs.buttonText}
            <Image src={"rightArrow.svg"} width={24} height={24} alt="arrow" />
          </div>
        </a>
      </div>
      <div>
        <TextReveal className="italic font-semibold">
          On ne suit pas les tendances, on les crée. Prêt à marquer YouTube ?
        </TextReveal>
      </div>
      <div
        id="process"
        className="py-12 lg:py-24 px-3 lg:px-14 bg-[#282828] lg:mx-[50px] rounded-2xl"
      >
        <div className="flex lg:block justify-center text-2xl font-bold mb-6">
          <Tooltip text={yourVideo.title} />
        </div>
        <p className="text-[28px] text-center lg:text-start lg:text-5xl font-poppins font-semibold mt-2">
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
        <p className="mt-6 text-center lg:text-start mb-6 lg:mb-0 lg:text-xl text-[#A9A9A9]">
          {yourVideo.description}
        </p>
        <div>
          <Roadmap data={yourVideo} />
        </div>
        <a href={header.cta} target="_blank" rel="noopener noreferrer">
          <div className="flex w-fit mt-3 bg-[#E50C00] text-white mx-auto px-7 py-2 rounded-xl lg:hidden items-center gap-2">
            Je suis convaincu, on y va
            <Image src={"rightArrow.svg"} width={24} height={24} alt="arrow" />
          </div>
        </a>
      </div>

      {/* AVIS */}

      <div
        id="refs"
        className="relative flex flex-col items-center mt-24 pb-[50px] lg:pb-[130px]"
      >
        <div className="text-2xl font-bold mb-6">
          <Tooltip text={avis.title} />
        </div>
        <p className="text-[28px] lg:text-5xl font-poppins font-semibold mt-2">
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
        <div className="mt-6 text-[#F0F0F0] text-base lg:text-2xl text-center lg:leading-[40px] px-6 lg:px-0">
          <PortableText value={avis.description} />
        </div>
        <Testimonials data={avis} />
        <Image src="/avis.svg" fill alt="ais" className="-z-10" />
      </div>

      {/* OFFRE */}

      <div
        id="tarif"
        className="relative flex flex-col items-center mt-24 pb-[50px] lg:pb-[130px]"
      >
        <Tooltip text={offre.title} />
        <p className="text-[28px] lg:text-5xl font-poppins font-semibold mt-6">
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
        <div className="ralewayOver mt-6 text-[#F0F0F0] lg:text-2xl text-center lg:leading-[40px]">
          <PortableText value={offre.description} />
        </div>
        <div className="mt-12 flex flex-col lg:flex-row gap-[50px] items-start mx-[10px] lg:mx-0">
          {offre.offers.map((offer, index) => (
            <div
              key={index}
              className={cn(
                "lg:w-[390px] flex flex-col items-start rounded-2xl py-10 px-6",
                index === 1 ? "bg-white" : "bg-[#282828]",
              )}
            >
              <p
                className={cn(
                  "lg:text-2xl font-medium",
                  index === 1 ? "text-black" : "text-white",
                )}
              >
                {offer.title}
              </p>
              <p
                className={cn(
                  "text-[#FFFFFFCC] mt-2 font-raleway font-medium",
                  index !== 1 ? "text-[#ffffffCC]" : "text-[#000000CC]",
                )}
              >
                {offer.subtitle}
              </p>
              {index === 1 ? (
                <p className="text-2xl lg:text-5xl font-medium mt-4 text-black">
                  {offer.pricing}
                </p>
              ) : (
                <p className="text-2xl lg:text-5xl font-medium mt-4 ralewayOver">
                  <AnimatedGradientText>{offer.pricing}</AnimatedGradientText>
                </p>
              )}
              <a
                href={header.cta}
                target="_blank"
                className="w-full"
                rel="noopener noreferrer"
              >
                <button
                  className={cn(
                    "text-sm py-3 w-full rounded-xl flex gap-2 justify-center mx-auto mt-9",
                    index !== 1 ? "bg-[#333]" : "bg-[#E50C00]",
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
              </a>

              <span
                className={cn(
                  "w-full h-[1px] mt-11 mb-10",
                  index === 1
                    ? "bg-[#00000040]"
                    : "bg-[linear-gradient(to_left,_#ECD6B1_0%,_#F2766C_50%,_#E73022_100%)]",
                )}
              ></span>

              <h4
                className={cn(
                  "mt-6 font-medium text-[18px]",
                  index !== 1 ? "text-white" : "text-black",
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
                      index !== 1 ? "text-white" : "text-black/80",
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
      <div className="relative py-12 lg:py-24 px-3 lg:px-14 bg-[#282828] lg:mx-[50px] rounded-2xl mt-24">
        <p className="text-[28px] text-center lg:text-5xl font-poppins font-semibold mt-2">
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

      {/* FOOTER */}

      <div className="relative mt-[150px] overflow-hidden">
        <div className="absolute top-8 left-0 w-full h-[44px] overflow-hidden z-20">
          <div className="scroll-strip scrolling-top">
            {[...Array(2)].flatMap((_, loopIndex) =>
              [...Array(15)].map((_, i) => (
                <Image
                  key={`top-${loopIndex}-${i}`}
                  src={footer.logo1}
                  alt="Logo"
                  width={217}
                  height={44}
                  className="object-contain mr-4"
                />
              )),
            )}
          </div>
        </div>

        <div className="relative z-10 flex justify-center items-center h-[700px] lg:h-none">
          {footer.video ? (
            <video
              src={footer.video}
              className="w-full max-w-[800px] rounded-2xl"
              controls
            />
          ) : (
            <Image
              src="/footer.png"
              alt="Fallback"
              height={730}
              width={1920}
              className="object-cover h-full"
            />
          )}
          <a href={header.cta} target="_blank" rel="noopener noreferrer">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E50C00] text-white px-7 py-2 rounded-xl items-center gap-2 flex w-[270px] lg:  w-fit">
              Donnez vie à votre projet
              <Image
                src={"rightArrow.svg"}
                width={24}
                height={24}
                alt="arrow"
              />
            </div>
          </a>
        </div>

        <div className="absolute bottom-8 left-0 w-full h-[44px] overflow-hidden z-10">
          <div className="scroll-strip scrolling-bottom">
            {[...Array(2)].flatMap((_, loopIndex) =>
              [...Array(15)].map((_, i) => (
                <Image
                  key={`bottom-${loopIndex}-${i}`}
                  src={footer.logo1}
                  alt="Logo"
                  width={217}
                  height={44}
                  className="object-contain mr-4"
                />
              )),
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex px-[40px] h-[220px] rounded-t-2xl mt-24 bg-gradient-to-r from-beige via-peach to-red items-center justify-between">
        <div>
          <Image
            src={footer.logo2}
            alt="Logo"
            width={75}
            height={50}
            className="object-contain"
          />

          <p className="mt-4">
            {footer.contactText} {footer.email}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm font-poppins font-normal">
          <Link href="#missions">Missions</Link>
          <Link href="#realisations">Réalisations</Link>
          <Link href="#process">Process</Link>
          <Link href="#refs">Références</Link>
          <Link href="#tarif">Tarif</Link>
        </div>
        <div className="flex flex-col gap-5 mt-[45px]">
          {mission.socialLinks.map((item, index) => (
            <div key={index}>
              <Link href={item.url}>
                <Image
                  width={24}
                  height={24}
                  src={`/${item.platform.toLowerCase()}_white.svg`}
                  alt={item.platform}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 px-3 flex flex-col lg:hidden rounded-t-2xl mt-12 bg-gradient-to-r from-beige via-peach to-red ">
        <div>
          <Image
            src={footer.logo2}
            alt="Logo"
            width={75}
            height={50}
            className="object-contain"
          />

          <p className="mt-4">
            {footer.contactText} {footer.email}
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col gap-2 text-sm font-poppins font-normal">
            <Link href="#missions">Missions</Link>
            <Link href="#realisations">Réalisations</Link>
            <Link href="#process">Process</Link>
            <Link href="#refs">Références</Link>
            <Link href="#tarif">Tarif</Link>
          </div>
          <div className="flex flex-col gap-5 ">
            {mission.socialLinks.map((item, index) => (
              <div key={index}>
                <Link href={item.url}>
                  <Image
                    width={24}
                    height={24}
                    src={`/${item.platform.toLowerCase()}_white.svg`}
                    alt={item.platform}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
