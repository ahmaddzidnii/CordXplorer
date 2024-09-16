import { useParams } from "next/navigation";

export const useGenreId = () => {
  const params = useParams();
  return params.genreId as string;
};
