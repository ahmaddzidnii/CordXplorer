import Image from "next/image";
import { Fragment } from "react";
import { GiMusicalScore } from "react-icons/gi";

import { AutoScrollWrapper } from "@/features/client/auto-scroll/providers/auto-scroll-provider";
import { TransposeChordProvider } from "@/features/client/transpose/providers/transpose-chord-provider";

import { ChordPage } from "@/components/chord-page";
import { Separator } from "@/components/ui/separator";
import { TextHeader } from "@/components/text-header";
import { CardSong } from "@/components/card/card-song";
import { CardWrapper } from "@/components/card/card-wrapper";

import "@/app/(client)/(chord)/songs/[slug]/chordpage.css";

import { PlayerController } from "./player-controller";

const data = {
  title: "Tabun",
  artists: [
    {
      label: "Yoasobi",
      href: "/artists/yoasobi",
    },
  ],
  releaseYear: "2020",
  publisher: "Sony Music Entertainment",
  album: "The Book",
  sections: [
    {
      nameSection: "INTRO",
      startTime: 0,
      endTime: 8,
      content:
        '<p> |&nbsp;<span class="c" data-origin="C">C</span>  <span class="c" data-origin="G/B">G/B</span> <span class="c" data-origin="Am7">Am7</span>&nbsp;|</p>',
    },
    {
      nameSection: "VERSE 1",
      startTime: 9,
      endTime: 36,
      content:
        '<p><span class="c" chord="C" data-origin="C">C</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="G/B" data-origin="G/B">G/B</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Am7" data-origin="Am7">Am7</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="E/G#" data-origin="E/G#">E/G#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Aku tepat ada di sampingmu</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="F" data-origin="F">F</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="C/E" data-origin="C/E">C/E</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Dm7" data-origin="Dm7">Dm7</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="G" data-origin="G">G</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Bertahan, menunggu satunya cintaku</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="C" data-origin="C">C</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="G/B" data-origin="G/B">G/B</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Am7" data-origin="Am7">Am7</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="E/G#" data-origin="E/G#">E/G#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Mengapa dulu kauragukan aku?</p><p>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="F" data-origin="F">F</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="C/E" data-origin="C/E">C/E</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Dm7" data-origin="Dm7">Dm7</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Gsus2" data-origin="Gsus2">Gsus2</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Sesali diriku melangkah dengannya</p>',
    },
    {
      nameSection: "CHORUS 1",
      startTime: 37,
      endTime: 74,
      content:
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Am" data-origin="Am">Am</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Dm" data-origin="Dm">Dm</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Sungguhkah aku untukmu?</p><p>&nbsp;<span class="c" chord="G" data-origin="G">G</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="C" data-origin="C">C</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Kenyataan masih untuknya </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="F" data-origin="F">F</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="E" data-origin="E">E</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Ku cemburu, namun, hanya sebatas itu </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Am" data-origin="Am">Am</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Dm" data-origin="Dm">Dm</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Ke mana hati kaubawa? </p><p>&nbsp;&nbsp;&nbsp;<span class="c" chord="G" data-origin="G">G</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="C" data-origin="C">C</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Tanpa pernah jelas akhirnya </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="F" data-origin="F">F</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="E" data-origin="E">E</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Ku menunggu, kenyataannya kau di sana </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="F" data-origin="F">F</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="G" data-origin="G">G</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c" chord="Csus4" data-origin="Csus4">Csus4</span>&nbsp;&nbsp;&nbsp;<span class="c" chord="C" data-origin="C">C</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Adakah hatimu masih hatiku?</p>',
    },
  ],
  key: ["G", "D"],
  youtubeUrl: "https://youtu.be/lvUHkfgrUTM",
  coverImage:
    "https://www.kawaiikakkoiisugoi.com/wp-content/uploads/2020/07/YOASOBI-Tabun-620x620.jpg",
};

export default async function SongsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <AutoScrollWrapper>
      <section className="main-page">
        <aside className="col-span-12 md:col-span-3">
          <>
            <div className="is-dekstop relative aspect-square">
              <Image
                fill
                priority={true}
                src={data?.coverImage}
                alt=""
                className="w-full rounded-xl shadow-md"
              />
            </div>
            <div className="is-mobile fixed left-0 top-[72px] z-0 mb-0 h-0 w-full pb-[100%]">
              <Image
                height={0}
                width={0}
                priority
                sizes="100vw"
                className="absolute left-1/2 top-1/2 z-[-1] h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-clip object-cover sepia-0"
                src={data?.coverImage}
                alt=""
              />
            </div>
            <div className="content">
              <p className="is-mobile text-2xl font-bold leading-5">
                {data?.title}
              </p>
              <p className="is-mobile">
                by &nbsp;
                {data?.artists.map((artist, index) => {
                  return (
                    artist.label +
                    (index !== data?.artists.length - 1 ? ", " : "")
                  );
                })}
              </p>
              <div className="my-3">
                <p className="text-sm text-muted-foreground">
                  Dirilis pada {data?.releaseYear}
                </p>
                <p className="text-sm uppercase text-muted-foreground">
                  ℗ {data?.publisher}
                </p>
              </div>
              <div className="my-3">
                <p className="text-sm font-bold text-muted-foreground">Album</p>
                <p className="text-sm text-muted-foreground">{data?.album}</p>
              </div>
              <h3 className="is-mobile text-lg font-bold leading-5">
                Song key{data.key.length > 1 && <b>&apos;s</b>}&nbsp;
              </h3>
              <p className="is-mobile">
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
              <div className="my-3">
                <p className="mb-2 text-sm font-bold text-muted-foreground">
                  Video Music
                </p>
                <PlayerController youtubeUrl={data.youtubeUrl} />
              </div>

              <article className="is-mobile h-full rounded-lg bg-white p-3 shadow-lg dark:bg-black/40">
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

                <TransposeChordProvider>
                  <ChordPage data={data} />
                </TransposeChordProvider>
              </article>

              <section className="is-mobile pt-5">
                <TextHeader title="Related Song" />
                <CardWrapper>
                  {Array.from({ length: 4 }).map((_, index) => (
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
            </div>
          </>
        </aside>
        <div className="is-dekstop h-full md:col-span-9">
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

            <ChordPage data={data} />
          </article>
        </div>
      </section>

      <section className="is-dekstop container pt-5">
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
    </AutoScrollWrapper>
  );
}
