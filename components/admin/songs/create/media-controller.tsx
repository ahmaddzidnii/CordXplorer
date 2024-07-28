"use client";

import ReactPlayer from "react-player";
import { RefObject, useEffect, useState } from "react";
import throttle from "lodash.throttle";

import { FaPause, FaPlay } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";

import { mediaPlayerAdminState } from "./media-player";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { convertTimeToMilitary } from "@/lib/format/format-second";

export const MediaController = ({ playerRef }: { playerRef: RefObject<ReactPlayer> }) => {
  const { state, setState } = mediaPlayerAdminState();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleSkipBack = () => {
    playerRef.current?.seekTo(state.progress! - 10, "seconds");
  };
  const handleSkipForward = () => {
    playerRef.current?.seekTo(state.progress! + 10, "seconds");
  };

  const debouncedOnValueChange = throttle(([value]: number[]) => {
    console.log(value, "change");
    setState({ progress: value, playing: false });
  }, 300);

  const onValueChangeCommit = ([value]: number[]) => {
    playerRef.current?.seekTo(value, "seconds");
    setState({ progress: value, playing: true });
  };

  if (!isMounted) return null;

  return (
    <div className="border-2 rounded-md p-3 space-y-5 h-max">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-3">
        Youtube Controller
      </h1>
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between my-3">
            <span className="text-muted-foreground font-semibold text-sm md:text-lg">
              {convertTimeToMilitary(state.progress!)}
            </span>
            <span className=" text-muted-foreground font-semibold text-sm md:text-lg">
              {convertTimeToMilitary(state.duration!)}
            </span>
          </div>
          <Slider
            defaultValue={[0]}
            value={[state.progress!]}
            max={state.duration}
            step={1}
            onValueChange={debouncedOnValueChange}
            onValueCommit={onValueChangeCommit}
          />
        </div>
        <div className="flex gap-x-5 justify-center">
          <Button
            className="rounded-full aspect-square p-0"
            onClick={handleSkipBack}
          >
            <IoPlaySkipBackSharp />
          </Button>
          <Button
            className="rounded-full aspect-square p-0"
            onClick={handlePlayPause}
          >
            {state.playing ? <FaPause /> : <FaPlay />}
          </Button>
          <Button
            className="rounded-full aspect-square p-0"
            onClick={handleSkipForward}
          >
            <IoPlaySkipForward />
          </Button>
        </div>
      </div>
      <div>
        <p className="text-muted-foreground text-sm font-semibold">
          Current time: {state.progress}
        </p>
      </div>
    </div>
  );
};
