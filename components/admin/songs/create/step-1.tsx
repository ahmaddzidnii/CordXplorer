"use client";

import ReactSelect from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useMemo, useRef, useState } from "react";
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
import { form1Schema, Form1Type } from "@/components/admin/songs/create/schema";
import { PreviewImage } from "./preview-image";

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

export const StepOne = () => {
  const router = useRouter();
  const youtubeUrlRef = useRef<HTMLInputElement | null>(null);
  const previewImageRef = useRef<HTMLInputElement | null>(null);

  const [link, setLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const { song, setSong } = useSongCreate();
  const imageLinkArray = useMemo(() => (imageLink ? [imageLink] : []), [imageLink]);

  const defaultValues: Partial<Form1Type> = {
    title: song.title,
    coverImage: song.coverImage,
    youtubeUrl: song.youtubeUrl,
    key: song.key,
    publisher: song.publisher,
    releaseYear: song.releaseYear,
  };

  const form = useForm<Form1Type>({
    resolver: zodResolver(form1Schema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: Form1Type) {
    setSong({
      ...data,
      sections: song.sections,
    });
    router.push("?step=2");
  }

  const handleLoadImage = () => {
    const regex = /^(https:\/\/)?(www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(\/.*)?$/;
    const urlImage = previewImageRef.current?.value;

    if (regex.test(urlImage as string)) {
      setImageLink(urlImage as string);
    } else {
      toast.error("Invalid image URL");
    }
  };

  const handleLoadButtonClick = () => {
    const url = youtubeUrlRef.current?.value;

    if (isValidYouTubeUrl(url as string)) {
      setLink(url as string);
    } else {
      toast.error("Invalid Youtube URL");
    }
  };

  const handleImageError = useCallback(() => {
    form.resetField("coverImage");
    form.setValue("coverImage", "");
    toast.error("Image not found!");
  }, [form]);

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
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover</FormLabel>
                  <PreviewImage
                    images={imageLinkArray}
                    onError={handleImageError}
                  />
                  <FormControl>
                    <div className="flex gap-x-5">
                      <Input
                        placeholder="ex https://image.com/image.jpg"
                        {...field}
                        ref={(e: HTMLInputElement | null) => {
                          previewImageRef.current = e;
                          field.ref(e);
                        }}
                      />
                      <Button
                        onClick={handleLoadImage}
                        type="button"
                      >
                        Load
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription> Now only supported image via URL </FormDescription>
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
                    closeMenuOnSelect={false}
                    placeholder="Select artist"
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
                  <div className="max-w-lg mb-5">
                    <MediaPlayerCreateSong link={link} />
                  </div>
                  <FormLabel>Youtube url</FormLabel>
                  <FormControl>
                    <div className="flex gap-x-3 max-w-xl">
                      <Input
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
