import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<(typeof client.api.v1.artists)["$patch"]>;
type ResponseType = InferResponseType<(typeof client.api.v1.artists)["$patch"]>;

export const useUpdateArtists = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.v1.artists["$patch"]({
        json,
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

  return mutation;
};
