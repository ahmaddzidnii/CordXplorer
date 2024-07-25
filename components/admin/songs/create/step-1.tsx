"use client";

import { z } from "zod";
import ReactSelect from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next-nprogress-bar";

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
import { form1Schema } from "./schema";

const options = [
  {
    value: "1",
    label: "Arsy Widianto",
  },
  {
    value: "2",
    label: "Tiara Andini",
  },
];

const genresOptions = [
  {
    value: "1",
    label: "Pop",
  },
  {
    value: "2",
    label: "Rock",
  },
  {
    value: "3",
    label: "Hip Hop",
  },
  {
    value: "4",
    label: "R&B",
  },
  {
    value: "5",
    label: "Country",
  },
  {
    value: "6",
    label: "Romance",
  },
  {
    value: "7",
    label: "J-Pop",
  },
];

export type MainInformationMusicForm = z.infer<typeof form1Schema>;

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
    resolver: zodResolver(form1Schema),
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
              name="artists"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select artist</FormLabel>
                  <ReactSelect
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    isMulti
                    options={options}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select genre</FormLabel>
                  <ReactSelect
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    placeholder="Select genre"
                    options={genresOptions}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption?.value);
                    }}
                  />
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
              className="w-[100px]"
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