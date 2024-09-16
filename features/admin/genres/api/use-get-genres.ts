import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { Genres } from "../types";
import { AxiosError } from "axios";

export const useGetGenres = () => {
  return useQuery<Genres, AxiosError<{ errors: string[] }>>({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("genres");
      return data;
    },
  });
};
