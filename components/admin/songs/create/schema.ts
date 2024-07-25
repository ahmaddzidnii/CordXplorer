import { isValidYouTubeUrl } from "@/lib/validation/validation-url-youtube";
import { z } from "zod";

export const form1Schema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .refine((value) => {
      const regex = /^[^\d]*$/;
      return regex.test(value);
    }, "Name not be a number."),
  artists: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .refine(
      (value) => {
        return value.length > 0;
      },
      {
        message: "Artist is required.",
      }
    ),
  genre: z.string({
    required_error: "Genre is required.",
  }),
  youtubeUrl: z
    .string({
      required_error: "Youtube URL is required.",
    })
    .refine(
      (value) => {
        return isValidYouTubeUrl(value);
      },
      {
        message: "Invalid Youtube URL.",
      }
    ),
  key: z
    .string({
      required_error: "Key is required.",
    })
    .refine(
      (value) => {
        const regex = /^[A-G](#|b)?(m)?(,[A-G](#|b)?(m)?)*$/;
        return regex.test(value);
      },
      {
        message: "Invalid key format.",
      }
    ),
  publisher: z
    .string({
      required_error: "Publisher is required.",
    })
    .refine((value) => value.length > 0, {
      message: "Publisher is required.",
    }),
  releaseYear: z
    .string({
      required_error: "Release year is required.",
    })
    .refine(
      (value) => {
        const regex = /^\d{4}$/;
        return regex.test(value);
      },
      {
        message: "Invalid year format.",
      }
    ),
});
