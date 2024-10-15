import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<(typeof client.api.v1.artists)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.v1.artists)["$post"]>;

export const useCreateArtist = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.v1.artists["$post"]({
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

// import { useMutation } from "@tanstack/react-query";

// import { axiosInstance } from "@/lib/axios";

// type RequestType = {
//   artistName: string;
//   artistBio?: string;
//   artistImage: string;
// };

// type ResponseType = {
//   data: {
//     id: string;
//   };
// };

// export const useCreateArtist = () => {
//   const query = useMutation({
//     mutationFn: async (data: RequestType) => {
//       return await axiosInstance.post<ResponseType>(`/artists`, {
//         artistName: data.artistName,
//         artistImage: data.artistImage,
//         artistBio: data.artistBio,
//       });
//     },
//   });

//   return query;
// };
