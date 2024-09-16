import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface UseUpdateGenres {
  genreId: string;
}

type RequestType = {
  genreName?: string;
  genreDescription?: string;
};

export const useUpdateGenres = ({ genreId }: UseUpdateGenres) => {
  const query = useMutation({
    mutationFn: async ({ genreName, genreDescription }: RequestType) => {
      return await axiosInstance.patch(`/genres`, {
        genreId,
        genreName,
        genreDescription,
      });
    },
  });

  return query;
};
