"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import throttle from "lodash.throttle";

import { Skeleton } from "@/components/ui/skeleton";
import { OnProgressProps } from "react-player/base";
import { useMediaPlayer, usePlaybackControl } from "@/hooks/chord/use-media-player";

const YtEmbedSkeleton = () => {
  return <Skeleton className="w-full h-[190px] bg-neutral-300" />;
};
export const YtEmbed = ({ playerRef }: { playerRef: any }) => {
  const [mounted, setMounted] = useState(false);

  const { setState } = useMediaPlayer();
  const { playbackControl, setPlaybackControl } = usePlaybackControl();

  const handleProgress = throttle((state: OnProgressProps) => {
    setState({ progress: Math.floor(state.playedSeconds) });
  }, 1000);

  const onPause = () => {
    setPlaybackControl({ playing: false });
  };

  const onPlay = () => {
    setPlaybackControl({ playing: true });
  };

  const onDuration = (duration: number) => {
    setState({ duration: Math.floor(duration) });
  };
  const onReady = () => {
    setPlaybackControl({ isReady: true });
  };

  const onEnded = () => {
    setPlaybackControl({ isEnded: true, playing: false });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <YtEmbedSkeleton />;

  return (
    <>
      <div className="aspect-video rounded-sm overflow-hidden shadow-sm shadow-primary">
        <ReactPlayer
          ref={playerRef}
          controls
          playing={playbackControl.playing}
          fallback={<YtEmbedSkeleton />}
          width="100%"
          height="100%"
          url="https://www.youtube.com/watch?v=QhubX_VQogk"
          onDuration={onDuration}
          onPlay={onPlay}
          onPause={onPause}
          onProgress={handleProgress}
          onReady={onReady}
          onEnded={onEnded}
        />
      </div>
    </>
  );
};
