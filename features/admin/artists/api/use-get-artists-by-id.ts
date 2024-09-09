import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";

interface UseGetArtistsByIdProps {
  id: string;
}

export interface Artist {
  status: number;
  data: Data;
}

export interface Data {
  id: string;
  artist_name: string;
  artist_image: string;
  artist_bio: any;
  created_at: string;
  updated_at: string;
}

export const useGetArtistsById = ({ id }: UseGetArtistsByIdProps) => {
  type ErrorResponse = {
    errors: string[];
  };
  const query = useQuery<Artist, AxiosError<ErrorResponse>>({
    queryKey: ["artists", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/artists/${id}`);
      return data;
    },
    retry: 1,
  });

  return query;
};
