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

import { Separator } from "@/components/ui/separator";
import { ChordPage } from "@/components/chord-page";
import { PlayerController } from "./player-controller";
import { CardWrapper } from "@/components/card/card-wrapper";
import { CardSong } from "@/components/card/card-song";
import { TextHeader } from "@/components/text-header";
import { AutoScrollWrapper } from "@/components/chord/auto-scroll-provider";
import { ChordWrapper } from "@/components/chord/chord-wrapper";
import React from "react";

export default async function SongsPage({ params }: { params: { slug: string } }) {
  const file = await fs.readFile(process.cwd() + "dummy.json", "utf8");
  const data: Root = JSON.parse(file);
  return (
    <div className="min-h-screen space-y-5">
      <section className="h-full grid grid-cols-12 pt-4 gap-5">
        <div className="col-span-12 md:col-span-3">
          <aside className="w-full md:top-20 md:sticky  md:z-[98]">
            <div className="relative aspect-square">
              <Image
                fill
                priority={true}
                src={data.coverImage}
                alt=""
                className="rounded-xl shadow-md w-full"
              />
            </div>
            <div className="my-3">
              <p className="text-sm text-muted-foreground">Dirilis pada {data.releaseYear}</p>
              <p className="text-sm text-muted-foreground uppercase">℗ {data.publisher}</p>
            </div>
            <div className="my-3">
              <p className="text-sm text-muted-foreground font-bold">Album</p>
              <p className="text-sm text-muted-foreground">{data.album}</p>
            </div>
            <div className="my-3 w-full">
              <p className="text-sm text-muted-foreground font-bold mb-2">Video Music</p>
              <PlayerController youtubeUrl={data.youtubeUrl} />
            </div>
          </aside>
        </div>
        <div className="col-span-12 md:col-span-9 h-full">
          <ChordWrapper>
            <article className="bg-white dark:bg-black/40 p-5 shadow-lg rounded-lg h-full">
              <h1 className="text-3xl font-bold my-2">{data.title}</h1>
              <div className="flex justify-between">
                <p className="w-1/2">
                  {data.artists.map((artist, index) => {
                    return artist.label + (index !== data.artists.length - 1 ? ", " : "");
                  })}
                </p>

                <p
                  className="w-1/2 text-end"
                  id="key"
                >
                  Key{data.key.length > 1 && <b>&apos;s</b>}&nbsp;:&nbsp;
                  {data.key.map((key, index) => {
                    return (
                      <React.Fragment key={index}>
                        <span
                          data-origin={key}
                          className="c"
                        >
                          {key}
                        </span>
                        {index !== data.key.length - 1 && ","}&nbsp;
                      </React.Fragment>
                    );
                  })}
                </p>
              </div>
              <div className="flex items-center w-full h-[40px] mt-2">
                <div className="w-[40%]">
                  <Separator className="bg-[#1f1f1f]/50 dark:bg-white/50" />
                </div>
                <div className="w-[20%] flex items-center justify-center">
                  <GiMusicalScore className="w-12 h-12 text-[#1f1f1f]/50 dark:text-white/50" />
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
          Learning is attained by chance, it must be sought for with ardor and diligence.
        </blockquote>
      </section>
    </div>
  );
}
