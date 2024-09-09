import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface UseUpdateArtists {
  artistId: string;
}

type RequestType = {
  artistName?: string;
  artistBio?: string;
  artistImage?: string;
};

export const useUpdateArtists = ({ artistId }: UseUpdateArtists) => {
  const query = useMutation({
    mutationFn: async (data: RequestType) => {
      return await axiosInstance.patch(`/artists`, {
        artistId: artistId,
        artistName: data.artistName,
        artistImage: data.artistImage,
        artistBio: data.artistBio,
      });
    },
  });

  return query;
};
