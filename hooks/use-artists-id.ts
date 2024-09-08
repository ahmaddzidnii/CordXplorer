import { useParams } from "next/navigation";

export const useArtistsId = () => {
  const params = useParams();
  return params.artistId;
};
