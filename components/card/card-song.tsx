import Image from "next/image";
import Link from "next/link";

interface CardSongProps {
  imageSrc?: string;
  songTitle?: string;
  artist?: string;
  youtubeName?: string;
  realeaseDate?: string;
  href?: string;
}
export const CardSong = ({
  artist,
  realeaseDate,
  songTitle,
  youtubeName,
  imageSrc,
  href,
}: CardSongProps) => {
  return (
    <article className="relative col-span-12 h-full w-full rounded-sm border transition-all ease-in hover:translate-y-[1px] hover:shadow-lg md:col-span-6 lg:col-span-3">
      <Link href={href!} className="h-full w-full">
        <div className="relative aspect-square">
          <Image
            fill
            quality={100}
            placeholder="empty"
            priority
            src={imageSrc as string}
            alt={songTitle as string}
            className="h-full w-full rounded-sm"
          />
        </div>
        <div className="absolute bottom-0 w-full rounded-b-sm bg-white/70 p-3 backdrop-blur dark:bg-black/70">
          <div>
            <p className="text-[1.125rem] font-bold">{songTitle}</p>
            <p className="text-sm text-muted-foreground">by {artist}</p>
            <p className="text-sm text-muted-foreground">
              {youtubeName} Youtube Channel
            </p>
          </div>
          <div className="mt-3">
            <span className="text-xs text-muted-foreground">
              Dirilis Pada {realeaseDate}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};
