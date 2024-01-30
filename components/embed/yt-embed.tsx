"use client";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Skeleton } from "../ui/skeleton";
import { useVideo } from "@/hooks/use-video";
import { ControlPlayer } from "../control-player";
import { OnProgressProps } from "react-player/base";

const YtEmbedSkeleton = () => {
  return <Skeleton className="w-full h-[190px] bg-neutral-300" />;
};
export const YtEmbed = () => {
  const [mounted, setMounted] = useState(false);

  const player = useRef<ReactPlayer>(null);
  const {
    setPlayed,
    setDuration,
    seeking,
    isPlaying,
    setIsPlaying,
    setSeeking,
  } = useVideo();

  const handleSeek = (value: number[]) => {
    setSeeking(true);
    setPlayed(value[0]);
  };

  const handleProgress = (state: OnProgressProps) => {
    if (!seeking) {
      setPlayed(Math.ceil(state.playedSeconds));
    }
  };

  const handleSeekMouseUp = (value: number[]) => {
    setSeeking(false);
    // console.log({ value: value[0] });
    player.current?.seekTo(value[0]);
  };

  const handleNextSeek = () => {
    player.current?.seekTo(player.current?.getCurrentTime() + 10);
  };
  const handlePrevSeek = () => {
    player.current?.seekTo(player.current?.getCurrentTime() - 10);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <YtEmbedSkeleton />;

  return (
    <>
      <ControlPlayer
        onSeek={handleSeek}
        onSeekMouseUp={handleSeekMouseUp}
        prevSeek={handlePrevSeek}
        nextSeek={handleNextSeek}
      />
      <div className="relative pt-[56.25%] rounded-md">
        <ReactPlayer
          ref={player}
          controls
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
          url="https://youtu.be/5g12MLvunm0?si=70SHy00GsBqRP1i4"
          onDuration={(duration) => {
            setDuration(duration);
          }}
          onEnded={() => {
            setIsPlaying(false);
            console.log("end");
          }}
          onPlay={() => {
            setIsPlaying(true);
            console.log("play");
          }}
          onPause={() => {
            setIsPlaying(false);
            console.log("pause");
          }}
          onProgress={handleProgress}
        />
      </div>
    </>
  );
};
