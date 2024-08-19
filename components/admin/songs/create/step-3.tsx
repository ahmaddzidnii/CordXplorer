"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next-nprogress-bar";

import parse from "html-react-parser";

import { H1 } from "@/components/typography/h1";
import { P } from "@/components/typography/p";
import { useSongCreate } from "@/hooks/admin/songs/create";
import { MediaPlayerCreateSong } from "./media-player";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";

const quicksand = Quicksand({
  weight: ["300", "400", "700", "500", "600"],
  subsets: ["latin"],
});

export const StepThree = () => {
  const { song } = useSongCreate();
  const router = useRouter();

  console.log(song);
  useEffect(() => {
    if (!song.title) {
      router.replace("?step=1");
      return;
    }
    if (song.sections.length === 0) {
      router.replace("?step=2");
      return;
    }
  }, [song, router]);
  return (
    <div className="space-y-5">
      <div>
        <H1 className="lg:text-3xl">Confirmation</H1>
        <P>
          Please review the information below and confirm the details before
          proceeding.
        </P>
      </div>
      <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
        <div className="relative flex h-[350px] w-full justify-center lg:w-[350px]">
          <Image
            fill
            src={song.coverImage as string}
            alt="Cover"
            className="aspect-square rounded-sm object-cover shadow-primary"
          />
        </div>
        <MediaPlayerCreateSong link={song.youtubeUrl} />
      </div>
      <div>
        <h1 className="mb-5 text-lg font-bold">General Information :</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Fields</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Title</TableCell>
              <TableCell>{song.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Key</TableCell>
              <TableCell>{song.key}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Artist</TableCell>
              <TableCell>
                {song.artists.map((artist) => artist.label).join(", ")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Genre</TableCell>
              <TableCell>{song.genre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Youtube Url</TableCell>
              <TableCell>{song.youtubeUrl}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Publisher</TableCell>
              <TableCell>{song.publisher}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Release Year</TableCell>
              <TableCell>{song.releaseYear}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <h1 className="mb-5 text-lg font-bold">Section :</h1>
        <ul className="space-y-5">
          {song.sections.map((section, index) => (
            <li key={index}>
              <Card>
                <CardHeader>
                  <h1 className="text-lg font-bold">{section.nameSection}</h1>
                  Seconds to {section.startTime} until {section.endTime}
                </CardHeader>
                <pre className={cn("p-6", quicksand.className)}>
                  {parse(section.content)}
                </pre>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          onClick={async () => {
            const submit = new Promise(() => {
              setTimeout(() => {
                toast.success("Song created successfully");
              }, 1000);
            });

            await submit;
            console.log(song);
          }}
        >
          Submit Chord
        </Button>
      </div>
    </div>
  );
};
