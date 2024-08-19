"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useEffect, useRef, useState } from "react";
import { MediaPlayerCreateSong } from "../admin/songs/create/media-player";
import { DisplayImage } from "../admin/songs/create/display-image";
import { set, z } from "zod";
import { isValidYouTubeUrl } from "@/lib/validation/validation-url-youtube";
import { isDraft } from "immer";
import { Checkbox } from "../ui/checkbox";

const schema = z.object({
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
    .string({
      required_error: "Artist is required.",
    })
    .refine((value) => value.length > 0, {
      message: "Publisher is required.",
    }),
  genre: z
    .string({
      required_error: "Genre is required.",
    })
    .refine((value) => value.length > 0, {
      message: "Publisher is required.",
    }),
  coverImage: z.string().refine(
    (value) => {
      const regex =
        /^(https:\/\/)?(www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(\/.*)?$/; // regex for url

      return regex.test(value);
    },
    { message: "URl must be over HTTPS." },
  ),
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
      },
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
      },
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
      },
    ),
  isDraft: z.boolean(),
});

type TypeFromSchema = z.infer<typeof schema>;

export const CreateSongModal = () => {
  const { isOpen, onClose } = useModal();

  const [imageLink, setImageLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const ref = useRef<HTMLFormElement>(null);

  const inputImageUrl = useRef<any>(null);
  const inputYoutubeUrl = useRef<any>(null);

  const form = useForm<TypeFromSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      artists: "",
      genre: "",
      coverImage: "",
      youtubeUrl: "",
      key: "",
      releaseYear: "",
      publisher: "",
      isDraft: true,
    },
  });

  function onSubmit(data: TypeFromSchema) {
    console.log(data);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
        className="px-0 py-3"
      >
        <div className="flex items-center justify-between px-3">
          <VisuallyHidden.Root>
            <DialogDescription>
              This action will add a new song to the list.
            </DialogDescription>
          </VisuallyHidden.Root>
          <DialogTitle className="text-xl font-bold">Add Songs</DialogTitle>
          <div>
            <Button
              variant="ghost"
              onClick={() => {
                form.reset();
                setImageLink("");
                setYoutubeLink("");
                onClose();
              }}
            >
              <X />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex h-[250px] flex-col gap-4 overflow-y-auto sm:h-[350px] lg:h-[500px] lg:flex-row">
          <div className="me-3 flex-1 lg:me-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 ps-3"
                ref={ref}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Song title" {...field} />
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
                      <FormLabel>Artist</FormLabel>
                      <FormControl>
                        <Input placeholder="Artist" {...field} />
                      </FormControl>
                      <FormDescription>
                        If more than one artist, separate them with a comma
                        &#40;for example A,B&#41;.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input placeholder="Genre" {...field} />
                      </FormControl>
                      <FormDescription>
                        If more than one genre, separate them with a comma
                        &#40;for example A,B&#41;.
                      </FormDescription>
                      <FormMessage />
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
                        <Input placeholder="ex 2021" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Year of release of the music.
                      </FormDescription>
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
                        <Input placeholder="Song publisher" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        The label that published the music and please list it
                        correctly.
                      </FormDescription>
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
                        <Input placeholder="Key" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        If more than one or there is modulation in the song,
                        then separate them with a comma &#40;for example
                        A,B&#41;.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover</FormLabel>
                      <FormControl>
                        <div className="flex gap-x-5">
                          <Input
                            placeholder="ex https://image.com/image.jpg"
                            {...field}
                            ref={(e: HTMLInputElement | null) => {
                              inputImageUrl.current = e;
                              field.ref(e);
                            }}
                          />
                          <Button
                            onClick={() => {
                              if (inputImageUrl.current.value.trim() !== "") {
                                setImageLink(inputImageUrl.current.value);
                              }
                            }}
                            type="button"
                          >
                            Load
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Now only supported image via URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-5"></div>
                      <FormLabel>Youtube url</FormLabel>
                      <FormControl>
                        <div className="flex gap-x-3">
                          <Input
                            placeholder="ex: https://youtu.be/QhubX_VQogk"
                            {...field}
                            ref={(e: HTMLInputElement | null) => {
                              inputYoutubeUrl.current = e;
                              field.ref(e);
                            }}
                          />
                          <Button
                            onClick={() => {
                              if (inputYoutubeUrl.current.value.trim() !== "") {
                                setYoutubeLink(inputYoutubeUrl.current.value);
                              }
                            }}
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
                <FormField
                  control={form.control}
                  name="isDraft"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          <span>Is Draft</span>
                        </FormLabel>
                        <FormDescription>
                          If checked, this song will be saved as a draft.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="top-0 h-full w-full space-y-2 pe-3 ps-3 lg:sticky lg:w-1/4">
            <h3 className="text-base font-bold">Preview image:</h3>
            <DisplayImage imgUrl={imageLink} />
            <h3 className="text-base font-bold">Preview youtube:</h3>
            <MediaPlayerCreateSong link={youtubeLink} />
          </div>
        </div>

        <Separator />
        <div className="flex items-center justify-between px-3">
          <DialogDescription></DialogDescription>
          <div className="flex">
            <Button
              className="mr-3 w-24 rounded-3xl"
              variant="destructive"
              onClick={() => {
                form.reset();
              }}
            >
              Reset form
            </Button>
            <Button
              className="mr-5 w-24 rounded-3xl"
              variant="default"
              onClick={() => {
                ref.current?.requestSubmit();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
