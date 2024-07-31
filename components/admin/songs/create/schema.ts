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
  coverImage: z
    .string()
    .refine(
      (value) => {
        const regex = /^(https:\/\/)?(www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(\/.*)?$/; // regex for url

        if (value === "") {
          return true;
        }

        return regex.test(value);
      },
      { message: "URl must be over HTTPS." }
    )
    .optional(),
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

export type Form1Type = z.infer<typeof form1Schema>;

export const form2Schema = z.object({
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

export type Form2Type = z.infer<typeof form2Schema>;
