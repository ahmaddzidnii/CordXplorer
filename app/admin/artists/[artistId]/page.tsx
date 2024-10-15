"use client";

import Image from "next/image";
import { Trash } from "lucide-react";

import { Hint } from "@/components/hint";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Triangle } from "@/components/triangle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useDeleteArtists } from "@/features/admin/artists/api/use-delete-artists";
import { useGetArtistsById } from "@/features/admin/artists/api/use-get-artists-by-id";

import { useArtistsId } from "@/hooks/use-artists-id";
import { ArtistDescription } from "./artists-description";
import { ArtistName } from "./artists-name";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ArtistIdPage() {
  const artistId = useArtistsId();
  const [ModalConfirm, confirm] = useConfirm(
    "Are you sure you want to delete this artist?",
    "Action can't be undone",
  );
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetArtistsById({
    id: artistId,
  });

  const { mutate: deleteArtist, isPending: isPendingDeleteArtist } =
    useDeleteArtists();

  const handleDeleteArtist = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    deleteArtist(
      { artistId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["artists"],
          });
          toast.success("Artist deleted successfully");
          router.replace("/admin/artists");
        },
        onError: () => {
          toast.error("Failed to delete artist");
        },
      },
    );
  };

  const sampleSongs = Array.from({ length: 4 }, (_, index) => index);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Triangle />
        <p className="text-xs">{error?.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Triangle />
        <p className="text-xs">Data is empty</p>
      </div>
    );
  }

  return (
    <>
      <ModalConfirm />
      <div className="h-full space-y-16 overflow-auto scrollbar-none">
        <div className="flex flex-col items-center gap-x-2 md:flex-row">
          <div>
            <Avatar className="size-48">
              <AvatarImage
                src={data.data?.artist_image}
                alt={data.data?.artist_name}
              />
              <AvatarFallback className="bg-sky-500 text-6xl font-bold text-white">
                {data.data?.artist_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full items-center justify-center gap-x-2.5">
              <Button className="mt-2" size="sm">
                Edit Image
              </Button>
              <Button
                onClick={handleDeleteArtist}
                disabled={isPendingDeleteArtist}
                className="mt-2"
                size="sm"
              >
                <Trash className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <ArtistName initialName={data.data!!.artist_name} />
            <ArtistDescription description={data.data?.artist_bio as string} />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {data.data?.artist_name} Chordified music
            <span>&#40;{sampleSongs.length}&#41;</span>
          </h1>

          <div className="mt-5 grid w-full grid-cols-12">
            {sampleSongs.map((_, index) => (
              <div
                className="col-span-12 p-1.5 md:col-span-6 lg:col-span-3"
                key={index}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="https://lh3.googleusercontent.com/C-MwOHQ0ETWVJEyChYQQ5WMmvqXNslA8BbVEcePS4v1Gr0uFrkUfJ68qrQokptO9XaRBr_XCG9vnPOR6"
                    fill
                    objectFit="cover"
                    alt="Chordified music"
                  />
                </div>
                <div className="p-1.5">
                  <h1 className="line-clamp-1 text-lg font-semibold">
                    Lagu Pernikahan Kita
                  </h1>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    Arsy Widianto, Tiara Andini
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
