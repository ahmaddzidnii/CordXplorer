"use client";

import { ControlPlayer } from "@/components/embed/control-player";
import { YtEmbed } from "@/components/embed/yt-embed";

import { useRef } from "react";
import ReactPlayer from "react-player";

export const PlayerController = ({ youtubeUrl }: { youtubeUrl: string }) => {
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <>
      <YtEmbed playerRef={playerRef} youtubeUrl={youtubeUrl} />
      <ControlPlayer playerRef={playerRef} />
    </>
  );
};
