export interface Root {
  title: string;
  artists: Artist[];
  coverImage: string;
  genre: string;
  youtubeUrl: string;
  key: string[];
  publisher: string;
  album: string;
  releaseYear: string;
  sections: Section[];
}

export interface Artist {
  value: string;
  label: string;
}

export interface Section {
  nameSection: string;
  startTime: number;
  endTime: number;
  content: string;
}

import { GiMusicalScore } from "react-icons/gi";
import { promises as fs } from "fs";
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

export default async function SongsPage({
  params,
}: {
  params: { slug: string };
}) {
  const file = await fs.readFile(
    process.cwd() + "/app/data/dummy.json",
    "utf8",
  );
  const data: Root = JSON.parse(file);
  return (
    <div className="min-h-screen space-y-5">
      <section className="grid h-full grid-cols-12 gap-5 pt-4">
        <div className="col-span-12 md:col-span-3">
          <aside className="w-full md:sticky md:top-20 md:z-[98]">
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
      <section className="pt-5">
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
      </section>
    </div>
  );
}
