"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useGetArtists } from "@/features/admin/artists/api/use-get-artists";

import { Loader } from "@/components/loader";
import { Triangle } from "@/components/triangle";

export default function ArtistAdminPage() {
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetArtists();

  const artistsId = useMemo(() => data?.data[0]?.id, [data]);

  useEffect(() => {
    if (artistsId) {
      router.replace(`/admin/artists/${artistsId}`);
    }
  }, [artistsId, router]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    JSON.stringify(error);
  }

  if (!artistsId) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Triangle />
        <p className="text-xs">Data is empty</p>
      </div>
    );
  }

  return null;
}
