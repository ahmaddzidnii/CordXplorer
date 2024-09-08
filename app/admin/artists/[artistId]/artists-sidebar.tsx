import { Loader } from "@/components/loader";
import { ArtistsItems } from "./artists-item";
import { ArtistHeader } from "./artists-header";
import { ArtistsSection } from "./artists-section";
import { Triangle } from "@/components/triangle";
import { useArtistsId } from "@/hooks/use-artists-id";

import { useGetArtists } from "@/features/admin/artists/api/use-get-artists";

export const ArtistsSidebar = () => {
  const artistId = useArtistsId();

  const {
    data: artists,
    isLoading: isLoadingArtits,
    isError: isErrorArtists,
  } = useGetArtists();

  if (isLoadingArtits) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isErrorArtists || !artists) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Triangle /> <p className="text-sm">Failed to load artists</p>
      </div>
    );
  }
  return (
    <div className="h-full w-full bg-[#481349]/20">
      <ArtistHeader />
      {/* TODO: Add search UI */}
      <ArtistsSection label="List for artists" hint="Add Artists">
        <div className="scroll scrollbar-none flex h-full flex-col gap-y-2 hover:overflow-y-scroll">
          {artists.data.map((artist, i) => (
            <ArtistsItems
              key={i}
              id={artist.id}
              image={artist.artist_image}
              label={artist.artist_name}
              variant={artist.id === artistId ? "active" : "default"}
            />
          ))}
        </div>
      </ArtistsSection>
    </div>
  );
};
