import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.v1.artists.count)["$get"]
>;

export const useGetArtistsCount = () => {
  return useQuery<ResponseType, Error>({
    queryKey: ["artists", "count"],
    queryFn: async () => {
      const response = await client.api.v1.artists.count["$get"]();

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.msg);
      }

      return jsonResponse;
    },
  });
};
