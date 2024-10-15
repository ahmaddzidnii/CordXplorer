import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.v1.artists)["$get"]>;

export const useGetArtists = () => {
  return useQuery<ResponseType, Error>({
    queryKey: ["artists"],
    queryFn: async () => {
      const response = await client.api.v1.artists["$get"]();

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          `Error code ${response.status} with reason: ${jsonResponse.msg}`,
        );
      }

      return jsonResponse;
    },
  });
};
