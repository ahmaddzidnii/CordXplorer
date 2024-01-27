import { YtEmbed } from "@/components/embed/yt-embed";
import { Separator } from "@/components/ui/separator";
import { GiMusicalScore } from "react-icons/gi";
export default function SongsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      {/* song = {params.slug} */}
      <section className="min-h-screen grid grid-cols-12 pt-4 gap-5">
        <div className="col-span-12 md:col-span-3">
          <aside className="w-full">
            <div>
              <img
                src="https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA"
                alt=""
                className="rounded-xl shadow-md"
              />
            </div>
            <div className="my-3">
              <p className="text-sm text-muted-foreground">Dirilis pada 2021</p>
              <p className="text-sm text-muted-foreground uppercase">
                ℗ Universal Music Indonesia
              </p>
            </div>
            <div className="my-3">
              <p className="text-sm text-muted-foreground font-bold">Album</p>
              <p className="text-sm text-muted-foreground">ArTi</p>
            </div>
            <div className="my-3 w-full">
              <p className="text-sm text-muted-foreground font-bold">
                Video Music
              </p>
              <YtEmbed />
            </div>
          </aside>
        </div>

        <div className="col-span-12 md:col-span-9">
          <article className="bg-white dark:bg-[#1f1f1f] p-5 shadow-lg rounded-lg min-h-screen">
            <h1 className="text-3xl font-bold my-2">Cintanya Aku</h1>
            <div className="flex justify-between">
              <p>Arsy Widianto, Tiara Andini</p>
              <p>Bb</p>
            </div>
            <div className="flex items-center w-full h-[40px] mt-2">
              <div className="w-[40%]">
                <Separator className="dark:bg-white" />
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <GiMusicalScore className="w-12 h-12" />
              </div>

              <div className="w-[40%]">
                <Separator className="dark:bg-white" />
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
