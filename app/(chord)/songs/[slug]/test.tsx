"use client";

import { ControlPlayer } from "@/components/embed/control-player";
import { YtEmbed } from "@/components/embed/yt-embed";
import { useRef } from "react";
import ReactPlayer from "react-player";

const Test = () => {
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <>
      <YtEmbed playerRef={playerRef} />
      <div>
        <ControlPlayer playerRef={playerRef} />
      </div>
    </>
  );
};

export default Test;
