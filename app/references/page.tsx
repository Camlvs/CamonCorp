import Navbar from "@/components/Navbar";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import {
  footerQuery,
  headerQuery,
  missionQuery,
  youtubersQuery,
} from "@/sanity/lib/query";
import {
  Footer,
  Header,
  Mission,
  Youtuber,
  Youtubers as YoutubersType,
} from "@/sanity/lib/type";
import Image from "next/image";
import Link from "next/link";

export default async function References() {
  const header: Header = await sanityFetch({
    query: headerQuery,
    tags: ["brands"],
  });

  const youtubers = await sanityFetch<YoutubersType>({
    query: youtubersQuery,
    tags: ["youtubers"],
  });

  const footer = await sanityFetch<Footer>({
    query: footerQuery,
    tags: ["footer"],
  });

  const mission: Mission = await sanityFetch({
    query: missionQuery,
    tags: ["mission"],
  });

  return (
    <div>
      <Navbar cta={header.cta} topBar={header.bandeau} />

      <div className="mt-[100px] lg:mt-[200px] flex justify-center mb-6 lg:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] w-full px-4">
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
                className="block mt-2 w-full"
              >
                <div className="overflow-hidden rounded-2xl w-full max-w-[450px]">
                  <Image
                    src={youtuber.image}
                    alt={youtuber.name}
                    width={450}
                    height={280}
                    className="object-cover hover:scale-110 transition-all duration-300 ease-in-out w-full h-auto min-h-[280px]"
                  />
                </div>
                <div className="flex gap-2.5 mt-3 pl-2.5 lg:pl-0">
                  <Image
                    src={"/flash.svg"}
                    width={28}
                    height={28}
                    alt="camoncorp"
                  />
                  <p className="text-2xl">{youtuber.name}</p>
                </div>
                <div className="ml-2.5 lg:ml-0 mt-4 rounded-full text-[#fff] px-3 text-sm w-fit">
                  {youtuber.videoTitle}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
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
              ))
            )}
          </div>
        </div>

        <div className="relative z-10 flex justify-center items-center h-[700px] lg:h-none">
          {footer.mediaType === "video" && footer.video ? (
            <video
              src={footer.video}
              className="w-full max-w-[800px] rounded-2xl"
              controls
            />
          ) : footer.mediaType === "image" && footer.image ? (
            <Image
              src={urlFor(footer.image).url()}
              alt="Footer Media"
              height={730}
              width={1920}
              className="object-cover h-full rounded-2xl"
            />
          ) : (
            <Image
              src="/footwer.png"
              alt="Fallback"
              height={730}
              width={1920}
              className="object-cover h-full"
            />
          )}
          <a href={header.cta} target="_blank" rel="noopener noreferrer">
            <div className="w-[225px] lg:w-fit  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm lg:text-base flex gap-2.5 items-center mt-[50px] px-2 lg:px-10 py-3 rounded-xl font-poppins lg:font-semibold bg-mainRed text-white border border-transparent hover:border-[#E50C00] hover:bg-white hover:text-mainRed transition-all duration-300 ease-in-out group">
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
              ))
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
          <Link target="_blank" href="https://la-landing.fr">
            Réalisé par <u>la-landing.fr</u>
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm font-poppins font-normal">
          <Link href="#missions">Missions</Link>
          <Link href="#realisations">Réalisations</Link>
          <Link href="#process">Process</Link>
          <Link href="#references">Références</Link>
          <Link href="#tarif">Tarifs</Link>
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
          <Link href="mailto:camille@camoncorp.co">
            <Image width={24} height={24} src={"mail.svg"} alt="mail" />
          </Link>
        </div>
      </div>

      <div className="pb-[100px] lg:pb-0 pt-8 px-3 flex flex-col lg:hidden rounded-t-2xl mt-12 bg-gradient-to-r from-beige via-peach to-red ">
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
          <Link target="_blank" href="https://la-landing.fr">
            Réalisé par <u>la-landing.fr</u>
          </Link>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col gap-2 text-sm font-poppins font-normal">
            <Link href="#missions">Missions</Link>
            <Link href="#realisations">Réalisations</Link>
            <Link href="#process">Process</Link>
            <Link href="#references">Références</Link>
            <Link href="#tarif">Tarifs</Link>
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
            <Link href="mailto:camille@camoncorp.co">
              <Image width={24} height={24} src={"mail.svg"} alt="mail" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
