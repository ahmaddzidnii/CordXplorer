"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useGetArtists } from "@/features/admin/artists/api/use-get-artists";

import { Loader } from "@/components/loader";
import { Triangle } from "@/components/triangle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Users,
  DollarSign,
  Music,
  PlusCircle,
  Search,
  Music4Icon,
} from "lucide-react";
import { useCreateArtistModal } from "@/features/admin/artists/store/use-create-artist-modal";
import { CreateArtistModal } from "@/features/admin/artists/components/create-artist-modal";

export default function ArtistAdminPage() {
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetArtists();
  const { setOpen } = useCreateArtistModal();

  // if (isLoading) {
  //   return (
  //     <div className="flex h-full items-center justify-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="flex h-full flex-col items-center justify-center">
  //       <Triangle />
  //       <p className="text-xs">Failed to load data artist</p>
  //     </div>
  //   );
  // }

  const handleClickRow = (id: string) => {
    router.push(`/admin/artists/${id}`);
  };

  return (
    <>
      <CreateArtistModal />
      <main className="mx-auto max-w-[1920px] flex-1 overflow-auto p-1 md:p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="overflow-hidden truncate text-3xl font-bold">
            Artist Management
          </h1>
          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Artist
          </Button>
        </header>

        {/* Metrics */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Artists
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
              <Music4Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10k</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}

        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="flex h-full flex-col items-center justify-center">
            <Triangle />
            <p className="text-xs">{error.message}</p>
          </div>
        ) : (
          <div className="rounded-lg p-2 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Artists</h2>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search artists" className="pl-8" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Songs count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data!!.map((artist, i) => (
                  <TableRow
                    key={artist.id}
                    onClick={() => handleClickRow(artist.id)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarImage src={artist.artist_image} />
                          <AvatarFallback>
                            {artist.artist_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {artist.artist_name}
                      </div>
                    </TableCell>
                    <TableCell>{i + 10}</TableCell>
                    <TableCell>
                      <span>{artist.artist_bio}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </>
  );
}
