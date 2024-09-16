import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { Genre } from "../types";

interface UseGetGenresByIdProps {
  id: string;
}

export const useGetGenresById = ({ id }: UseGetGenresByIdProps) => {
  const query = useQuery<
    Genre,
    AxiosError<{
      errors: string[];
    }>
  >({
    queryKey: ["genres", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/genres/${id}`);
      return data;
    },
    retry: 1,
  });

  return query;
};
