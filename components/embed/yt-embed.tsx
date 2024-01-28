"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Skeleton } from "../ui/skeleton";
import { useVideo } from "@/hooks/use-video";

const YtEmbedSkeleton = () => {
  return <Skeleton className="w-full h-[190px] bg-neutral-300" />;
};
export const YtEmbed = () => {
  const [mounted, setMounted] = useState(false);

  const player = useRef<ReactPlayer>(null);
  const { setPlayed, setDuration, isPlaying, setIsPlaying } = useVideo();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <YtEmbedSkeleton />;

  return (
    <div className="relative pt-[56.25%] rounded-md">
      <ReactPlayer
        ref={player}
        playing={isPlaying}
        fallback={<YtEmbedSkeleton />}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "2px",
        }}
        width="100%"
        height="100%"
        url="https://www.youtube.com/embed/sfuq3y_zuGw?si=TlN2qloc1SYZwEyn"
        onDuration={(duration) => {
          setDuration(duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          console.log("end");
        }}
        onPlay={() => console.log("play")}
        onPause={() => console.log("pause")}
        onProgress={(progress) => {
          setPlayed(Math.ceil(progress.playedSeconds));
        }}
      />
    </div>
  );
};
