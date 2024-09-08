"use client";

import { useArtistsId } from "@/hooks/use-artists-id";

export default function ArtistIdPage() {
  const artistId = useArtistsId();
  return (
    <div>
      <h1>{artistId}</h1>
    </div>
  );
}
