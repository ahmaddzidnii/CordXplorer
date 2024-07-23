"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next-nprogress-bar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MediaPlayerCreateSong } from "@/components/admin/songs/create/media-player";

import { isValidYouTubeUrl } from "@/lib/validation/validation-url-youtube";
import { useSongCreate } from "@/hooks/admin/songs/create";

const addMusicFormSchema = z.object({
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
});

export type MainInformationMusicForm = z.infer<typeof addMusicFormSchema>;

export const StepOne = () => {
  const router = useRouter();
  const youtubeUrlRef = useRef<HTMLInputElement | null>(null);
  const [link, setLink] = useState("");
  const { song, setSong } = useSongCreate();

  const defaultValues: Partial<MainInformationMusicForm> = {
    title: song.title,
    youtubeUrl: song.youtubeUrl,
    key: song.key,
    publisher: song.publisher,
    releaseYear: song.releaseYear,
  };

  const form = useForm<MainInformationMusicForm>({
    resolver: zodResolver(addMusicFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: MainInformationMusicForm) {
    setSong({
      ...data,
      sections: song.sections,
    });
    router.push("?step=2");
  }

  const handleLoadButtonClick = () => {
    const url = youtubeUrlRef.current?.value;
    if (isValidYouTubeUrl(url as string)) {
      setLink(url as string);
    } else {
      toast.error("Invalid Youtube URL");
      return;
    }
  };
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Add Information About Song</h3>
        <p className="text-muted-foreground"> Please enter the information about the song.</p>
      </div>
      <div className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Song title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Key"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    If more than one or there is modulation in the song, then separate them with a
                    comma &#40;for example A,B&#41;.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="releaseYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex 2021"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Year of release of the music.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Song publisher"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    The label that published the music and please list it correctly.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="max-w-lg">
                    <MediaPlayerCreateSong link={link} />
                  </div>
                  <FormLabel>Youtube url</FormLabel>
                  <FormControl>
                    <div className="flex gap-x-3 max-w-xl">
                      <Input
                        // autoComplete="off"
                        placeholder="ex: https://youtu.be/QhubX_VQogk"
                        {...field}
                        ref={(e: HTMLInputElement | null) => {
                          youtubeUrlRef.current = e;
                          field.ref(e);
                        }}
                      />
                      <Button
                        onClick={handleLoadButtonClick}
                        type="button"
                      >
                        Load
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
