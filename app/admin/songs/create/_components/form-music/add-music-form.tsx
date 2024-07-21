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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MediaPlayerAdmin } from "../media-player";

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
});

export type MainInformationMusicForm = z.infer<typeof addMusicFormSchema>;

export const AccountForm = () => {
  const router = useRouter();
  const youtubeUrlRef = useRef<HTMLInputElement | null>(null);
  const [link, setLink] = useState("");
  const { song, setSong } = useSongCreate();

  const defaultValues: Partial<MainInformationMusicForm> = {
    title: song.title,
    youtubeUrl: song.youtubeUrl,
  };

  const form = useForm<MainInformationMusicForm>({
    resolver: zodResolver(addMusicFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: MainInformationMusicForm) {
    console.log(data);
    setSong(data);
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
                  placeholder="Your name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtubeUrl"
          render={({ field }) => (
            <FormItem>
              <div className="max-w-lg">
                <MediaPlayerAdmin link={link} />
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
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};
