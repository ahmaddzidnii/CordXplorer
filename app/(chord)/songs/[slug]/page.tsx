import { GiMusicalScore } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";

import { ChordPage } from "@/components/chord-page";
import Test from "./test";

export default function SongsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen relative">
      <section className="h-full grid grid-cols-12 pt-4 gap-5">
        <div className="col-span-12 md:col-span-3">
          <aside className="w-full md:sticky md:top-20">
            <div>
              <img
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
              <Test />
            </div>
          </aside>
        </div>
        <div className="col-span-12 md:col-span-9">
          <article className="bg-white dark:bg-[#282828]/80 p-5 shadow-lg rounded-lg min-h-screen">
            <h1 className="text-3xl font-bold my-2">Cintanya Aku</h1>
            <div className="flex justify-between">
              <p>Arsy Widianto, Tiara Andini</p>
              <p>
                Key&nbsp;:&nbsp;<span className="c">Bb</span>
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
            <ChordPage />
          </article>
        </div>
      </section>
    </div>
  );
}
