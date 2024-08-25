import { Separator } from "@/components/ui/separator";
import { MusicEmptyPlaceholder } from "./_components/music-empty-placeholder";
import { AddMusic } from "./_components/add-music";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function SongsAdminPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <div className="space-y-5">
          <MusicEmptyPlaceholder />
          <div className="flex flex-col gap-y-2">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Link
                href={`/admin/songs/${index}`}
                key={index}
                className="flex items-center rounded-lg bg-background hover:border hover:border-secondary-foreground"
              >
                <div className="flex items-center space-x-4 p-4">
                  <Image
                    width={64}
                    height={64}
                    alt="music"
                    className="aspect-square flex-shrink-0 rounded-lg"
                    src="https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA"
                  />

                  <div className="w-full">
                    <h3 className="text-lg font-semibold">Title</h3>
                    <p className="text-muted-foreground">Artist</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <ListMusicSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ListMusicSkeleton = () => {
  return (
    <div className="flex w-full items-center rounded-lg bg-background p-4">
      <div className="flex w-full items-center space-x-4">
        <Skeleton className="aspect-square h-16 w-16 flex-shrink-0 rounded-lg" />
        <div className="w-full space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    </div>
  );
};
