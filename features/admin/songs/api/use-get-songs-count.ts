import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.v1.songs.count)["$get"]
>;

export const useGetSongsCount = () => {
  return useQuery<ResponseType, Error>({
    queryKey: ["songs", "count"],
    queryFn: async () => {
      const response = await client.api.v1.songs.count["$get"]();

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.msg);
      }

      return jsonResponse;
    },
  });
};
