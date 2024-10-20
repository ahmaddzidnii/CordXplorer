import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<(typeof client.api.v1.artists)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.v1.artists)["$post"]>;

export const useCreateArtist = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.v1.artists["$post"]({
        json,
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.msg);
      }

      return jsonResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artists", "count"],
      });
    },
  });

  return mutation;
};
