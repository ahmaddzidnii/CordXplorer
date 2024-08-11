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
    <article className="col-span-12 md:col-span-6 lg:col-span-3 relative w-full h-full rounded-sm border  hover:shadow-lg hover:translate-y-[1px] transition-all ease-in">
      <Link
        href={href!}
        className="w-full h-full"
      >
        <div className="relative aspect-square">
          <Image
            fill
            quality={100}
            placeholder="empty"
            priority
            src={imageSrc as string}
            alt={songTitle as string}
            className="rounded-sm w-full h-full"
          />
        </div>
        <div className="absolute bottom-0 backdrop-blur rounded-b-sm bg-white/70 dark:bg-black/70 p-3 w-full">
          <div>
            <p className="font-bold text-[1.125rem]">{songTitle}</p>
            <p className="text-sm text-muted-foreground">by {artist}</p>
            <p className="text-sm text-muted-foreground">{youtubeName} Youtube Channel</p>
          </div>
          <div className="mt-3">
            <span className="text-xs text-muted-foreground">Dirilis Pada {realeaseDate}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
