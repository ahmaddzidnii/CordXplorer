"use client";

import Image from "next/image";
import { Pen } from "lucide-react";

import { Hint } from "@/components/hint";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Triangle } from "@/components/triangle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetArtistsById } from "@/features/admin/artists/api/use-get-artists-by-id";

import { useArtistsId } from "@/hooks/use-artists-id";
import { ArtistDescription } from "./artists-description";
import { ArtistName } from "./artists-name";

export default function ArtistIdPage() {
  const artistId = useArtistsId();
  const { data, isLoading, isError, error } = useGetArtistsById({
    id: artistId,
  });

  const sampleSongs = Array.from({ length: 9 }, (_, index) => index);

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
    <div className="h-full space-y-16 overflow-auto scrollbar-none">
      <div className="flex flex-col items-center gap-x-2 md:flex-row">
        <Avatar className="size-48">
          <AvatarImage
            src={data.data.artist_image}
            alt={data.data.artist_name}
          />
          <AvatarFallback>
            {data.data.artist_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-2">
          <ArtistName initialName={data.data.artist_name} />
          <ArtistDescription description={data?.data.artist_bio} />
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold">
          {data.data.artist_name} Chordified music
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
  );
}
