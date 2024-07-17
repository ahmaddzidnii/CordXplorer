import { Separator } from "@/components/ui/separator";
import { MusicEmptyPlaceholder } from "./_components/music-empty-placeholder";
import { AddMusic } from "./_components/add-music";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function SongsAdminPage() {
  return (
    <div className="flex-col flex w-full">
      <div className="flex-1 space-y-4 pt-6">
        <div className=" space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">List Music</h2>
          <p className="text-muted-foreground">
            A list of music that has been searched for chords.
          </p>
        </div>
        <Separator className="bg-primary h-[2px]" />
        <div className="w-full flex justify-end">
          <AddMusic />
        </div>
        <div className="space-y-5">
          <MusicEmptyPlaceholder />
          <div className="flex flex-col gap-y-2">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Link
                href={`/admin/songs/${index}`}
                key={index}
                className="bg-background p-4 rounded-lg  flex items-center hover:border-secondary-foreground hover:border"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="flex-shrink-0 w-16 h-16 aspect-square rounded-lg"
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
    <div className="bg-background p-4 rounded-lg  flex items-center w-full">
      <div className="flex items-center space-x-4 w-full">
        <Skeleton className="flex-shrink-0 w-16 h-16 aspect-square rounded-lg" />
        <div className="w-full space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    </div>
  );
};
