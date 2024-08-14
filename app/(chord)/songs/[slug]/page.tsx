import { GiMusicalScore } from "react-icons/gi";
import Image from "next/image";
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";
import { ChordPage } from "@/components/chord-page";
import { PlayerController } from "./player-controller";
import { CardWrapper } from "@/components/card/card-wrapper";
import { CardSong } from "@/components/card/card-song";
import { TextHeader } from "@/components/text-header";
import { AutoScrollWrapper } from "@/components/chord/auto-scroll-provider";
import { ChordWrapper } from "@/components/chord/chord-wrapper";

import { Song } from "@/data";
import { DekstopWrapper } from "@/wrapper/dekstop-wrapper";
import { MobileWrapper } from "@/wrapper/mobile-wrappers";

export default async function SongsPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/songs`, {});
  const data: Song = await response.json();
  return (
    <>
      <MobileWrapper>
        <div className="fixed left-0 top-[72px] z-0 mb-0 h-0 w-full pb-[100%]">
          <Image
            height={0}
            width={0}
            sizes="100vw"
            className="absolute left-1/2 top-1/2 z-[-1] h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-clip object-cover sepia-0"
            src={data.coverImage}
            alt=""
          />
        </div>
        <div className="z-1 relative left-0 mt-[calc(100vw-3.75rem)] min-h-screen w-full rounded-t-xl bg-background">
          <div className="flex flex-col space-y-3 p-3">
            <p className="text-2xl font-bold leading-5">{data.title}</p>
            <p>
              by &nbsp;
              {data.artists.map((artist, index) => {
                return (
                  artist.label + (index !== data.artists.length - 1 ? ", " : "")
                );
              })}
            </p>
            <div className="text-muted-foreground">
              <p className="text-sm">Released {data.releaseYear}</p>
              <p className="text-sm font-bold uppercase"> ℗ {data.publisher}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Album</p>
              <p className="text-sm">{data.album}</p>
            </div>
            <h3 className="text-lg font-bold leading-5">
              Song key{data.key.length > 1 && <b>&apos;s</b>}&nbsp;
            </h3>
            <p>
              {data.key.map((key, index) => {
                return (
                  <Fragment key={index}>
                    <span data-origin={key} className="c">
                      {key}
                    </span>
                    {index !== data.key.length - 1 && ","}&nbsp;
                  </Fragment>
                );
              })}
            </p>

            <p className="text-sm font-bold text-muted-foreground">
              Play along video
            </p>
            <PlayerController youtubeUrl={data.youtubeUrl} />

            <ChordWrapper>
              <article className="h-full rounded-lg bg-white p-5 shadow-lg dark:bg-black/40">
                <div className="mt-2 flex h-[40px] items-center">
                  <div className="w-[40%]">
                    <Separator className="bg-[#1f1f1f]/50 dark:bg-white/50" />
                  </div>
                  <div className="flex w-[20%] items-center justify-center">
                    <GiMusicalScore className="h-12 w-12 text-[#1f1f1f]/50 dark:text-white/50" />
                  </div>

                  <div className="w-[40%]">
                    <Separator className="bg-[#1f1f1f]/50 dark:bg-white/50" />
                  </div>
                </div>
                <AutoScrollWrapper>
                  <ChordPage data={data} />
                </AutoScrollWrapper>
              </article>
            </ChordWrapper>
          </div>
        </div>
      </MobileWrapper>
      <DekstopWrapper className="container">
        <section className="grid h-full grid-cols-12 gap-5 pt-4">
          <div className="col-span-12 md:col-span-3">
            <aside className="w-full">
              <div className="relative aspect-square">
                <Image
                  fill
                  priority={true}
                  src={data.coverImage}
                  alt=""
                  className="w-full rounded-xl shadow-md"
                />
              </div>
              <div className="my-3">
                <p className="text-sm text-muted-foreground">
                  Dirilis pada {data.releaseYear}
                </p>
                <p className="text-sm uppercase text-muted-foreground">
                  ℗ {data.publisher}
                </p>
              </div>
              <div className="my-3">
                <p className="text-sm font-bold text-muted-foreground">Album</p>
                <p className="text-sm text-muted-foreground">{data.album}</p>
              </div>
              <div className="my-3 w-full">
                <p className="mb-2 text-sm font-bold text-muted-foreground">
                  Video Music
                </p>
                <PlayerController youtubeUrl={data.youtubeUrl} />
              </div>
            </aside>
          </div>

          <div className="col-span-12 h-full md:col-span-9">
            <ChordWrapper>
              <article className="h-full rounded-lg bg-white p-5 shadow-lg dark:bg-black/40">
                <h1 className="my-2 text-3xl font-bold">{data.title}</h1>
                <div className="flex justify-between">
                  <p className="w-1/2">
                    {data.artists.map((artist, index) => {
                      return (
                        artist.label +
                        (index !== data.artists.length - 1 ? ", " : "")
                      );
                    })}
                  </p>

                  <p className="w-1/2 text-end" id="key">
                    Key{data.key.length > 1 && <b>&apos;s</b>}&nbsp;:&nbsp;
                    {data.key.map((key, index) => {
                      return (
                        <Fragment key={index}>
                          <span data-origin={key} className="c">
                            {key}
                          </span>
                          {index !== data.key.length - 1 && ","}&nbsp;
                        </Fragment>
                      );
                    })}
                  </p>
                </div>
                <div className="mt-2 flex h-[40px] w-full items-center">
                  <div className="w-[40%]">
                    <Separator className="bg-[#1f1f1f]/50 dark:bg-white/50" />
                  </div>
                  <div className="flex w-[20%] items-center justify-center">
                    <GiMusicalScore className="h-12 w-12 text-[#1f1f1f]/50 dark:text-white/50" />
                  </div>

                  <div className="w-[40%]">
                    <Separator className="bg-[#1f1f1f]/50 dark:bg-white/50" />
                  </div>
                </div>
                <AutoScrollWrapper>
                  <ChordPage data={data} />
                </AutoScrollWrapper>
              </article>
            </ChordWrapper>
          </div>
        </section>
      </DekstopWrapper>
      {/* <section className="pt-5">
        <TextHeader title="Related Song" />
        <CardWrapper>
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSong
              key={index}
              imageSrc="https://www.kawaiikakkoiisugoi.com/wp-content/uploads/2020/07/YOASOBI-Tabun-620x620.jpg"
              artist="Yoasobi"
              realeaseDate="2020"
              songTitle="Probably"
              youtubeName="Ayase"
              href="/songs/probably-yoasobi"
            />
          ))}
          <div className="mb-16" />
        </CardWrapper>
      </section>

      <section>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          Learning is attained by chance, it must be sought for with ardor and
          diligence.
        </blockquote>
      </section> */}
    </>
  );
}
