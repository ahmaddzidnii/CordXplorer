"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next-nprogress-bar";
import { Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

import { FaPause, FaPlay } from "react-icons/fa";
import { IoMusicalNoteSharp } from "react-icons/io5";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/songs/create/rich-text-editor";
import { Button } from "@/components/ui/button";
import { MediaPlayerCreateSong } from "@/components/admin/songs/create/media-player";
import { useSongCreate } from "@/hooks/admin/songs/create";
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form";
import { form2Schema, Form2Type } from "@/components/admin/songs/create/schema";
import { MediaController } from "./media-controller";

export const StepTwo = () => {
  const { song, setSong } = useSongCreate();
  const router = useRouter();

  const playerRef = useRef<ReactPlayer>(null);
  useEffect(() => {
    if (!song.title) {
      router.replace("?step=1");
    }
  }, [song.title, router]);

  const form = useForm<Form2Type>({
    resolver: zodResolver(form2Schema),
    defaultValues: {
      sections:
        song.sections?.length > 0
          ? song.sections
          : [
              {
                nameSection: "",
                startTime: 0,
                endTime: 0,
                content: "",
              },
            ],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "sections",
    control: form.control,
    rules: { required: "Please add a section." },
  });

  function onSubmit(data: Form2Type) {
    setSong({
      ...song,
      sections: data.sections,
    });
    router.push("?step=3");
  }

  return (
    <div className="flex-col flex w-full">
      <h3 className="text-2xl font-bold tracking-tight">Add Section Song</h3>
      <p className="text-muted-foreground">Add a new section to the song.</p>
      <div className="my-5 space-y-5">
        <h1 className="font-bold text-lg">Preview Youtube :</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-5">
          <MediaPlayerCreateSong
            link={song.youtubeUrl}
            ref={playerRef}
          />
          <MediaController playerRef={playerRef} />
        </div>
        <p className="text-xl font-bold">Sections</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 mt-5">
              {fields.length > 0 ? (
                fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardContent className="space-y-5 p-5 relative">
                      <div
                        className="top-0 right-0 absolute p-3 "
                        role="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <X className="size-5" />
                      </div>
                      <FormField
                        control={form.control}
                        name={`sections.${index}.nameSection`}
                        render={() => (
                          <div>
                            <Label>Name</Label>
                            <FormControl>
                              <Input
                                placeholder="ex: Chorus"
                                {...form.register(`sections.${index}.nameSection`)}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        )}
                      />
                      <div className="flex gap-x-5 ">
                        <FormField
                          control={form.control}
                          name={`sections.${index}.startTime`}
                          render={() => (
                            <div>
                              <Label>Start time</Label>
                              <FormControl>
                                <Input
                                  placeholder="ex: 0"
                                  type="number"
                                  {...form.register(`sections.${index}.startTime`, {
                                    valueAsNumber: true,
                                  })}
                                />
                              </FormControl>
                              <FormMessage />
                            </div>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sections.${index}.endTime`}
                          render={() => (
                            <div>
                              <Label>End time</Label>
                              <FormControl>
                                <Input
                                  placeholder="ex: 10"
                                  type="number"
                                  {...form.register(`sections.${index}.endTime`, {
                                    valueAsNumber: true,
                                  })}
                                />
                              </FormControl>
                              <FormMessage />
                            </div>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`sections.${index}.content`}
                        render={() => (
                          <div>
                            <Label>Content</Label>
                            <FormControl>
                              <RichTextEditor
                                content={song.sections[index]?.content}
                                onChange={(v) => {
                                  form.setValue(`sections.${index}.content`, v);
                                }}
                                className="border-border border-2 dark:bg-input py-5 px-3 min-h-[10rem] rounded-2xl "
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <EmptyUI />
              )}
            </div>
            <div className="flex flex-col mt-5">
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  append({
                    endTime: 0,
                    nameSection: "",
                    startTime: 0,
                    content: "",
                  });
                }}
              >
                <Plus className="w-6 h-6 mr-2" /> Add Section
              </Button>
              <Button
                type="submit"
                className="mt-5 w-[100px]"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

function EmptyUI() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <IoMusicalNoteSharp className="w-12 h-12 fill-primary" />
        <h3 className="mt-4 text-lg font-semibold">No section added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any section. Add below.
        </p>
      </div>
    </div>
  );
}
