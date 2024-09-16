import { Loader } from "@/components/loader";
import { Triangle } from "@/components/triangle";
import { GenresHeader } from "./genres-header";
import { GenresSection } from "./genres-section";
import { GenreItem } from "./genres-item";

import { useGetGenres } from "@/features/admin/genres/api/use-get-genres";
import { CreateGenreModal } from "@/features/admin/genres/components/create-genre-modal";

export const GenresSidebar = () => {
  const {
    data: genres,
    isLoading: isLoadingGenres,
    isError: isErrorGenres,
    error,
  } = useGetGenres();

  if (isLoadingGenres) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isErrorGenres) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Triangle />{" "}
        <p className="text-sm">{error.response?.data.errors.map((s) => s)}</p>
      </div>
    );
  }

  if (!genres) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Triangle /> <p className="text-sm">Data is empty</p>
      </div>
    );
  }

  return (
    <>
      <CreateGenreModal />
      <div className="h-full w-full bg-[#481349]/20">
        <GenresHeader />
        {/* TODO: Add search UI */}
        <GenresSection label="List for genre" hint="Add genre">
          <div className="scroll flex h-full flex-col gap-y-2 scrollbar-none hover:overflow-y-scroll">
            {genres.data.length === 0 ? (
              <div className="mt-5 flex h-full flex-col items-center">
                <Triangle /> <p className="text-sm">Genre is empty</p>
              </div>
            ) : (
              genres.data.map((genre, i) => (
                <GenreItem
                  key={i}
                  id={genre.genre_id}
                  label={genre.genre_name}
                  variant={"default"}
                />
              ))
            )}
          </div>
        </GenresSection>
      </div>
    </>
  );
};
