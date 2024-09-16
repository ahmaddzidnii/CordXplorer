import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";

type RequestType = {
  genreName: string;
  genreDescription?: string;
};

type ResponseType = {
  data: {
    id: string;
  };
};

export const useCreateGenres = () => {
  const query = useMutation({
    mutationFn: async ({ genreName, genreDescription }: RequestType) => {
      return await axiosInstance.post<ResponseType>(`/genres`, {
        genreName,
        genreDescription,
      });
    },
  });

  return query;
};
