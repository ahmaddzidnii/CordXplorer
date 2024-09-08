"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useGetArtists } from "@/features/admin/artists/api/use-get-artists";

export default function ArtistAdminPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetArtists();

  const artistsId = useMemo(() => data?.data[0].id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (artistsId) {
      router.push(`/admin/artists/${artistsId}`);
    } else {
      // TODO: Open a modal to create a new artist
    }
  }, [isError, router, artistsId, isLoading]);
  return <></>;
}
