"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Loader } from "@/components/loader";
import { Triangle } from "@/components/triangle";
import { useGetGenres } from "@/features/admin/genres/api/use-get-genres";

export default function GenreAdminPage() {
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetGenres();

  const genreId = useMemo(() => data?.data[0]?.genre_id, [data]);

  useEffect(() => {
    if (genreId) {
      router.replace(`/admin/genres/${genreId}`);
    }
  }, [genreId, router]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (!genreId) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Triangle />
        <p className="text-xs">Data is empty</p>
      </div>
    );
  }

  return null;
}
