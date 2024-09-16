"use client";

import { toast } from "sonner";
import Image from "next/image";
import { Trash } from "lucide-react";
import { FaHashtag } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { GenresName } from "./genres-name";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Triangle } from "@/components/triangle";
import { useConfirm } from "@/hooks/use-confirm";
import { useGenreId } from "@/hooks/use-genre-id";
import { GenresDescription } from "./genres-description";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useGetGenresById } from "@/features/admin/genres/api/use-get-genres-by-id";
import { useDeleteGenres } from "@/features/admin/genres/api/use-delete-genres";

export default function GenreIdPage() {
  const genreId = useGenreId();
  const [ModalConfirm, confirm] = useConfirm(
    "Are you sure you want to delete this artist?",
    "Action can't be undone",
  );
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetGenresById({
    id: genreId,
  });

  const { mutate: deleteGenre, isPending: isPendingDeleteGenre } =
    useDeleteGenres();

  const handleDeleteGenre = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    deleteGenre(
      { genreId: genreId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["genres"],
          });
          toast.success("Genre deleted successfully");
          router.replace("/admin/genres");
        },
        onError: () => {
          toast.error("Failed to delete genre");
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
        <p className="text-xs">{error?.response?.data.errors.map((e) => e)}</p>
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
              <AvatarFallback className="bg-sky-500 text-6xl font-bold text-white">
                <FaHashtag />
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full items-center justify-center gap-x-2.5">
              <Button
                onClick={handleDeleteGenre}
                disabled={isPendingDeleteGenre}
                className="mt-2"
                size="sm"
              >
                <Trash className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <GenresName initialName={data.data.genre_name} />
            <GenresDescription
              initiaDescription={data.data.genre_description}
            />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            #{data.data.genre_name} music
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
