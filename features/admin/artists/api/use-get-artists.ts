import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { ArtistsResponse } from "@/app/api/v1/[[...route]]/artists/types";

export const useGetArtists = () => {
  return useQuery<ArtistsResponse>({
    queryKey: ["artists"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("artists");
      return data;
    },
  });
};
