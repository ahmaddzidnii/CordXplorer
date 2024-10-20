"use client";
import { Users, PlusCircle } from "lucide-react";

import { useGetArtists } from "@/features/admin/artists/api/use-get-artists";
import { useGetArtistsCount } from "@/features/admin/artists/api/use-get-artists-count";
import { CreateArtistModal } from "@/features/admin/artists/components/create-artist-modal";
import { useCreateArtistModal } from "@/features/admin/artists/store/use-create-artist-modal";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Triangle } from "@/components/triangle";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ArtistAdminPage() {
  const {
    data: artists,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
    error: errorArtists,
  } = useGetArtists();
  const {
    data: artistCount,
    isLoading: isLoadingCount,
    isError: isErrorCount,
    error: errorCount,
    refetch: refetchCount,
  } = useGetArtistsCount();

  const { setOpen } = useCreateArtistModal();

  return (
    <>
      <CreateArtistModal />
      <main className="mx-auto max-w-[1920px] flex-1 overflow-auto p-3 md:p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="overflow-hidden truncate text-3xl font-bold">
            Artist Management
          </h1>
          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Artist
          </Button>
        </header>

        <div className="mb-6 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Artists
              </CardTitle>
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
                <p className="text-3xl font-bold">{artistCount?.data}</p>
              )}
            </CardContent>
          </Card>
        </div>
        {isLoadingArtists || !artists?.data ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : isErrorArtists ? (
          <div className="flex h-full flex-col items-center justify-center">
            <Triangle />
            <p className="text-xs">{errorArtists.message}</p>
          </div>
        ) : (
          <DataTable columns={columns} data={artists?.data} />
        )}
      </main>
    </>
  );
}
