"use client";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next-nprogress-bar";
import { Plus, X } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/songs/create/rich-text-editor";
import { Button } from "@/components/ui/button";
import { MediaPlayerCreateSong } from "@/components/admin/songs/create/media-player";
import { useSongCreate } from "@/hooks/admin/songs/create";
import { Form, FormControl, FormField, FormMessage } from "@/components/ui/form";

const step2AddMusicSchema = z.object({
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

type Step2AddMusicValues = z.infer<typeof step2AddMusicSchema>;

export const StepTwo = () => {
  const { song, setSong } = useSongCreate();
  const router = useRouter();
  if (!song.title) {
    router.replace("?step=1");
  }

  const form = useForm<Step2AddMusicValues>({
    resolver: zodResolver(step2AddMusicSchema),
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

  function onSubmit(data: Step2AddMusicValues) {
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
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <MediaPlayerCreateSong link={song.youtubeUrl} />
        </div>
        <p className="text-xl font-bold">Sections</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 mt-5">
              {fields.map((field, index) => (
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
                    <div className="flex gap-x-5">
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
              ))}
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
                className="mt-10 w-[100px]"
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
