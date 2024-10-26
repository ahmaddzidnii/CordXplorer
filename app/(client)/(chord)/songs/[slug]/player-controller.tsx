"use client";

import { useRef } from "react";
import ReactPlayer from "react-player";

import { ControlPlayer } from "@/features/client/youtube-player/components/control-player";
import { YoutubePlayer } from "@/features/client/youtube-player/components/youtube-player";

export const PlayerController = ({ youtubeUrl }: { youtubeUrl: string }) => {
  const playerRef = useRef<ReactPlayer>(null);
  return (
    <>
      <YoutubePlayer playerRef={playerRef} youtubeUrl={youtubeUrl} />
      <ControlPlayer playerRef={playerRef} />
    </>
  );
};
