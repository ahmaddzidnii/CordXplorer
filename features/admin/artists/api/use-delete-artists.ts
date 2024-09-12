import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";

type RequestType = {
  artistId: string;
};

type ResponseType = {
  data: {
    artistId: string;
  };
};

export const useDeleteArtists = () => {
  const query = useMutation({
    mutationFn: async (data: RequestType) => {
      return await axiosInstance.delete<ResponseType>(`/artists`, {
        data: {
          artistId: data.artistId,
        },
      });
    },
  });

  return query;
};
