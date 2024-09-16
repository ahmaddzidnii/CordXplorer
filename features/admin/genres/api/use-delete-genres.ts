import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";

type RequestType = {
  genreId: string;
};

type ResponseType = {
  data: {
    id: string;
  };
};

export const useDeleteGenres = () => {
  const query = useMutation({
    mutationFn: async ({ genreId }: RequestType) => {
      return await axiosInstance.delete<ResponseType>(`/genres`, {
        data: {
          genreId,
        },
      });
    },
  });

  return query;
};
