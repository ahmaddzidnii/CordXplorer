"use client";

import ReactPlayer from "react-player/lazy";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export const MediaPlayerAdmin = () => {
  const [link, setLink] = useState("");
  const formLink = useRef<HTMLInputElement>(null);

  function isValidYouTubeUrl(url: string): boolean {
    if (typeof url !== "string") return false;

    // Pola regex untuk URL YouTube
    const patterns = [
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}(&\S*)?$/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}(\?\S*)?$/,
      /^(https?:\/\/)?youtu\.be\/[\w-]{11}(\?\S*)?$/,
    ];

    // Cek apakah URL cocok dengan salah satu pola
    const isMatch = patterns.some((pattern) => pattern.test(url));

    if (!isMatch) return false;

    // Ekstrak ID video
    let videoId: string | null | undefined = null;
    try {
      const urlObj = new URL(url);
      if (url.includes("youtube.com/watch")) {
        videoId = urlObj.searchParams.get("v");
      } else if (url.includes("youtube.com/embed/")) {
        videoId = urlObj.pathname.split("/").pop();
      } else if (url.includes("youtu.be/")) {
        videoId = urlObj.pathname.split("/").pop();
      }
    } catch (error) {
      return false; // URL tidak valid
    }
    // Periksa apakah ID video valid (11 karakter)
    if (videoId?.length !== 11) return false;

    return true;
  }

  return (
    <div className="space-y-5">
      <h1 className="font-bold text-lg">Preview Youtube :</h1>
      <div className="relative aspect-video rounded-sm overflow-hidden">
        <ReactPlayer
          className="react-player"
          url={link}
          controls
          width="100%"
          height="100%"
        />
      </div>
      <div className="flex gap-x-3">
        <Input
          ref={formLink}
          type="text"
          id="link-youtube"
          placeholder="Link Youtube"
          className="border border-primary rounded-lg p-2 w-full"
        />

        <Button
          onClick={() => {
            if (!isValidYouTubeUrl(formLink.current?.value as string)) {
              toast.error("Invalid Youtube URL");
              return;
            }
            setLink(formLink.current?.value as string);
          }}
        >
          Load Video
        </Button>
      </div>
    </div>
  );
};
