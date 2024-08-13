"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import throttle from "lodash.throttle";

import { Skeleton } from "@/components/ui/skeleton";
import { OnProgressProps } from "react-player/base";
import {
  useMediaPlayer,
  usePlaybackControl,
} from "@/hooks/chord/use-media-player";

const YtEmbedSkeleton = () => {
  return <Skeleton className="h-[190px] w-full bg-neutral-300" />;
};
export const YtEmbed = ({
  playerRef,
  youtubeUrl,
}: {
  playerRef: any;
  youtubeUrl: string;
}) => {
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
  const onBufferStart = () => {
    setPlaybackControl({ isBuffer: true });
  };
  const onBufferEnd = () => {
    setPlaybackControl({ isBuffer: false });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <YtEmbedSkeleton />;

  return (
    <>
      <div className="aspect-video overflow-hidden rounded-sm shadow-sm shadow-primary">
        <ReactPlayer
          ref={playerRef}
          controls
          playing={playbackControl.playing}
          fallback={<YtEmbedSkeleton />}
          width="100%"
          height="100%"
          url={youtubeUrl}
          onDuration={onDuration}
          onPlay={onPlay}
          onPause={onPause}
          onProgress={handleProgress}
          onReady={onReady}
          onEnded={onEnded}
          onBuffer={onBufferStart}
          onBufferEnd={onBufferEnd}
        />
      </div>
    </>
  );
};
