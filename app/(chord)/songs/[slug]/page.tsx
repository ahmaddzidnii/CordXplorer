export interface Root {
  title: string;
  artists: Artist[];
  coverImage: string;
  genre: string;
  youtubeUrl: string;
  key: string;
  publisher: string;
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

import { Separator } from "@/components/ui/separator";
import { ChordPage } from "@/components/chord-page";
import { PlayerController } from "./player-controller";
import { CardWrapper } from "@/components/card/card-wrapper";
import { CardSong } from "@/components/card/card-song";
import { TextHeader } from "@/components/text-header";
import Image from "next/image";

export default async function SongsPage({ params }: { params: { slug: string } }) {
  const file = await fs.readFile(process.cwd() + "/dummy.json", "utf8");
  const data: Root = JSON.parse(file);
  return (
    <div className="min-h-screen  space-y-5">
      <section className="h-full grid grid-cols-12 pt-4 gap-5">
        <div className="col-span-12 md:col-span-3">
          <aside className="w-full md:top-20 md:sticky  md:z-[98]">
            <div className="relative aspect-square">
              <Image
                fill
                src="https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA"
                alt=""
                className="rounded-xl shadow-md w-full"
              />
            </div>
            <div className="my-3">
              <p className="text-sm text-muted-foreground">Dirilis pada 2021</p>
              <p className="text-sm text-muted-foreground uppercase">℗ Universal Music Indonesia</p>
            </div>
            <div className="my-3">
              <p className="text-sm text-muted-foreground font-bold">Album</p>
              <p className="text-sm text-muted-foreground">ArTi</p>
            </div>
            <div className="my-3 w-full">
              <p className="text-sm text-muted-foreground font-bold mb-2">Video Music</p>
              <PlayerController />
            </div>
          </aside>
        </div>
        <div className="col-span-12 md:col-span-9 h-full">
          <article className="bg-white dark:bg-black/40 p-5 shadow-lg rounded-lg h-full">
            <h1 className="text-3xl font-bold my-2">Cintanya Aku</h1>
            <div className="flex justify-between">
              <p>Arsy Widianto, Tiara Andini</p>
              <p>
                Key&nbsp;:&nbsp;
                <span
                  data-origin="Bb"
                  className="c"
                >
                  Bb
                </span>
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
            <ChordPage data={data} />
          </article>
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
