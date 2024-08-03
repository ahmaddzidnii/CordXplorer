"use client";

import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { memo, RefObject, useCallback } from "react";
import throttle from "lodash.throttle";
import ReactPlayer from "react-player";

import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useMediaPlayer, usePlaybackControl } from "@/hooks/chord/use-media-player";

interface PlayerRefProps {
  playerRef: RefObject<ReactPlayer>;
}
export const ControlPlayer = ({ playerRef }: PlayerRefProps) => {
  return (
    <>
      <div className="hidden md:block fixed z-[99999]  bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-background dark:bg-[#1f1f1f]/50 ring-1 ring-foreground/25 shadow-lg w-[400px] h-[116px] rounded-lg ">
        <ButtonController playerRef={playerRef} />
        <ButtonTranspose />
        <div className="pt-7 px-4">
          <SliderControl playerRef={playerRef} />
        </div>
        <div className="py-1.5 px-4 w-full flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <Switch />
            <span className="text-xs font-semibold">⚡Scroll</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <IoIosMore className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Device */}
      <div className="fixed h-24 w-[100vw] left-0 z-[99999] rounded-t-lg backdrop-blur-xl bg-background dark:bg-[#1f1f1f]/50 ring-1 ring-foreground/25 shadow-lg bottom-0 md:hidden">
        <ButtonController playerRef={playerRef} />
        <ButtonTranspose />
        <div className="flex gap-x-3 items-center h-full px-4 py-1.5">
          <div className="shrink-0">
            <div className="flex flex-col gap-y-2 items-center">
              <Switch />
              <span className="text-xs font-semibold"> ⚡Scroll</span>
            </div>
          </div>
          <div className="flex-1">
            <SliderControl playerRef={playerRef} />
          </div>
          <div className="shrink-0">
            <IoIosMore className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>
      {/* Device */}
    </>
  );
};

function SliderControl({ playerRef }: PlayerRefProps) {
  const { state, setState } = useMediaPlayer();

  const onValueChange = throttle(([value]: number[]) => {
    playerRef?.current?.getInternalPlayer().pauseVideo();
    setState({ progress: value });
  }, 100);

  const onValueCommit = ([value]: number[]) => {
    playerRef?.current?.seekTo(value, "seconds");
    playerRef?.current?.getInternalPlayer().playVideo();
  };

  return (
    <div className="mt-8">
      <Slider
        className="cursor-pointer py-1"
        value={[state.progress!]}
        defaultValue={[0]}
        max={state.duration! - 1}
        step={1}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
      />
    </div>
  );
}

const ButtonController = memo(({ playerRef }: PlayerRefProps) => {
  const { playbackControl, setPlaybackControl } = usePlaybackControl();
  console.log("button render");
  const handlePlayPause = useCallback(() => {
    setPlaybackControl({ playing: !playbackControl.playing });
  }, [playbackControl.playing]);

  const handleSeekPrev = throttle(() => {
    const currentTime = playerRef?.current?.getCurrentTime();
    if (currentTime! - 10 < 0) {
      playerRef?.current?.seekTo(0, "seconds");
      playerRef?.current?.getInternalPlayer().playVideo();
      return;
    }
    playerRef?.current?.seekTo(currentTime! - 10, "seconds");
    playerRef?.current?.getInternalPlayer().playVideo();
  }, 100);

  const handleSeekNext = throttle(() => {
    const currentTime = playerRef?.current?.getCurrentTime()!;
    const duration = playerRef?.current?.getDuration()!;
    if (currentTime! + 10 > duration) {
      playerRef?.current?.seekTo(duration, "seconds");
      playerRef?.current?.getInternalPlayer().playVideo();
      return;
    }
    playerRef?.current?.seekTo(currentTime + 10, "seconds");
    playerRef?.current?.getInternalPlayer().playVideo();
  }, 100);

  return (
    <div className="flex items-center gap-x-3 absolute -top-7 left-1/2 -translate-x-1/2">
      <button
        role="button"
        onClick={handleSeekPrev}
        className="w-12 h-12 bg-primary rounded-full "
      >
        <div className="w-full h-full flex justify-center items-center">
          <TbPlayerTrackPrevFilled className="w-7 h-6 text-white" />
        </div>
      </button>
      <button
        role="button"
        onClick={handlePlayPause}
        disabled={!playbackControl.isReady}
        className="w-14 h-14 bg-primary rounded-full"
      >
        <div className="w-full h-full flex justify-center items-center">
          {!playbackControl.isReady ? (
            <Loader />
          ) : playbackControl.playing ? (
            <FaPause className="w-7 h-6 text-white" />
          ) : (
            <FaPlay className="w-7 h-6 text-white" />
          )}
        </div>
      </button>
      <button
        role="button"
        onClick={handleSeekNext}
        className="w-12 h-12 bg-primary rounded-full"
      >
        <div className="w-full h-full flex justify-center items-center">
          <TbPlayerTrackNextFilled className="w-7 h-6 text-white" />
        </div>
      </button>
    </div>
  );
});

function ButtonTranspose() {
  return (
    <>
      <button className="flex items-center gap-x-3 absolute -top-6 right-5 w-10 h-10 bg-primary rounded-full justify-center">
        <span className="text-3xl font-bold text-white">T</span>
      </button>
      <p className="absolute mt-5 right-2 text-xs font-semibold">
        Tranpose : <span>0</span>
      </p>
    </>
  );
}

function Loader() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-9 fill-white"
    >
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".spinner_I8Q1{animation:spinner_qhi1 .75s linear infinite}.spinner_vrS7{animation-delay:-.375s}@keyframes spinner_qhi1{0%,100%{r:1.5px}50%{r:3px}}",
        }}
      />
      <circle
        className="spinner_I8Q1"
        cx={4}
        cy={12}
        r="1.5"
      />
      <circle
        className="spinner_I8Q1 spinner_vrS7"
        cx={12}
        cy={12}
        r={3}
      />
      <circle
        className="spinner_I8Q1"
        cx={20}
        cy={12}
        r="1.5"
      />
    </svg>
  );
}
