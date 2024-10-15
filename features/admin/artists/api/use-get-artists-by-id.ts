import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.v1.artists)[":artistId"]["$get"]
>;

interface UseGetArtistsByIdProps {
  id: string;
}

export const useGetArtistsById = ({ id }: UseGetArtistsByIdProps) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["artists", id],
    queryFn: async () => {
      const response = await client.api.v1.artists[":artistId"]["$get"]({
        param: {
          artistId: id,
        },
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          `Error code ${response.status} with reason: ${jsonResponse.msg}`,
        );
      }

      return jsonResponse;
    },
  });

  return query;
};
