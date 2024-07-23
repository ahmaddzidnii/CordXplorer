import { z } from "zod";

import { isValidYouTubeUrl } from "@/lib/validation/validation-url-youtube";

export const SongsCreateDtoSchema = z.object({
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

  youtubeUrl: z
    .string({
      required_error: "Youtube URL is required.",
    })
    .refine((value) => {
      return isValidYouTubeUrl(value);
    }, "Invalid Youtube URL"),
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
  publisher: z.string({
    required_error: "Publisher is required.",
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
  sections: z.array(
    z.object({
      nameSection: z
        .string({ required_error: "Please enter a name for the section." })
        .min(1, "Please enter a name for the section."),
      startTime: z
        .number({
          required_error: "Please enter a start time.",
          invalid_type_error: "Please enter a valid number.",
        })
        .min(0, "Please enter a valid number."),
      endTime: z
        .number({
          required_error: "Please enter an end time.",
          invalid_type_error: "Please enter a valid number.",
        })
        .min(0, "Please enter a valid number."),
      content: z.string({ required_error: "Please enter a content." }),
    })
  ),
});

export type SongsCreateDto = z.infer<typeof SongsCreateDtoSchema>;
