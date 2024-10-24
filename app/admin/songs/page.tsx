"use client";
import { Users, PlusCircle } from "lucide-react";

import { useGetSongs } from "@/features/admin/songs/api/use-get-songs";
import { useGetSongsCount } from "@/features/admin/songs/api/use-get-songs-count";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Triangle } from "@/components/triangle";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { CreateSongModal } from "@/features/admin/songs/modal/create-song-modal";
import { useCreateSongModal } from "@/features/admin/songs/store/use-create-song-modal";

export default function ArtistAdminPage() {
  const {
    data: songs,
    isLoading: isLoadingSongs,
    isError: isErrorSongs,
    error: errorSongs,
  } = useGetSongs();

  const songs_tabel = songs?.data?.map((song) => ({
    id: song.id,
    cover_image: song.cover_image,
    songs_title: song.songs_title,
    artists: song.artists.map((artist) => artist.artist_name).join(", "),
    release_year: song.release_year,
    album: song.album,
    publisher: song.publisher,
  }));

  const {
    data: songsCount,
    isLoading: isLoadingCount,
    isError: isErrorCount,
    error: errorCount,
    refetch: refetchCount,
  } = useGetSongsCount();

  const { onOpen } = useCreateSongModal();

  return (
    <>
      <CreateSongModal />
      <main className="mx-auto max-w-[1920px] flex-1 overflow-auto p-3 md:p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="overflow-hidden truncate text-3xl font-bold">
            Song Management
          </h1>
          <Button onClick={onOpen}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Song
          </Button>
        </header>

        <div className="mb-6 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Song</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingCount ? (
                <Skeleton className="h-9 w-16" />
              ) : isErrorCount ? (
                <div className="flex items-center gap-x-2 text-xs">
                  <Triangle />
                  {errorCount.message}
                  <button className="underline" onClick={() => refetchCount()}>
                    Refetch
                  </button>
                </div>
              ) : (
                <p className="text-3xl font-bold">{songsCount?.data}</p>
              )}
            </CardContent>
          </Card>
        </div>
        {isLoadingSongs || !songs_tabel ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : isErrorSongs ? (
          <div className="flex h-full flex-col items-center justify-center">
            <Triangle />
            <p className="text-xs">{errorSongs.message}</p>
          </div>
        ) : (
          <DataTable columns={columns} data={songs_tabel} />
        )}
      </main>
    </>
  );
}
