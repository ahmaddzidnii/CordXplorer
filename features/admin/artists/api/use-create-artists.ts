import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";

type RequestType = {
  artistName: string;
  artistBio?: string;
  artistImage: string;
};

type ResponseType = {
  data: {
    id: string;
  };
};

export const useCreateArtist = () => {
  const query = useMutation({
    mutationFn: async (data: RequestType) => {
      return await axiosInstance.post<ResponseType>(`/artists`, {
        artistName: data.artistName,
        artistImage: data.artistImage,
        artistBio: data.artistBio,
      });
    },
  });

  return query;
};
