"use client";

import {
  FaPlay,
  FaPause,
  FaMusic,
  FaTextHeight,
  FaRotateLeft,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { memo, RefObject, useCallback, useEffect, useState } from "react";
import throttle from "lodash.throttle";
import ReactPlayer from "react-player";

import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

import { useMediaPlayer, usePlaybackControl } from "@/hooks/chord/use-media-player";
import { useTransposeSwitcher } from "@/hooks/use-transpose-switcher";
import { useTransposeState } from "@/hooks/use-tranpose-state";
import { dialogOptionsStore, usePreferenceStore } from "@/store/dialog-options-store";

interface PlayerRefProps {
  playerRef: RefObject<ReactPlayer>;
}
export const ControlPlayer = ({ playerRef }: PlayerRefProps) => {
  const { isOpen, setIsOpen } = dialogOptionsStore();

  const { preferences, setPreferences } = usePreferenceStore();

  const handleOpenDialog = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block fixed z-[97]  bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/70 dark:bg-[#1f1f1f]/50 ring-1 ring-foreground/25 shadow-lg w-[400px] h-[116px] rounded-lg ">
        <ButtonWrapper playerRef={playerRef} />
        <ButtonSwitcherTranpose />
        <div className="pt-7 px-4">
          <SliderControl playerRef={playerRef} />
        </div>
        <div className="py-1.5 px-4 w-full flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <Switch
              checked={preferences.isScrolling}
              onCheckedChange={(checked) => {
                setPreferences({ isScrolling: checked });
              }}
            />
            <RenderScrollType />
          </div>
          <button
            onClick={handleOpenDialog}
            className="flex gap-x-2 items-center"
          >
            <IoIosMore className="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>
      {/* Desktop */}

      {/* Device */}
      <div className="fixed h-24 w-[100vw] z-[97] left-0 rounded-t-lg backdrop-blur-md bg-white/70 dark:bg-[#1f1f1f]/50 ring-1 ring-foreground/25 shadow-lg bottom-0 md:hidden">
        <ButtonWrapper playerRef={playerRef} />
        <ButtonSwitcherTranpose />
        <div className="flex gap-x-3 items-center h-full px-4 py-1.5">
          <div className="shrink-0">
            <div className="flex flex-col gap-y-2 items-center">
              <Switch
                checked={preferences.isScrolling}
                onCheckedChange={(checked) => {
                  setPreferences({ isScrolling: checked });
                }}
              />
              <RenderScrollType />
            </div>
          </div>
          <div className="flex-1">
            <SliderControl playerRef={playerRef} />
          </div>
          <button
            onClick={handleOpenDialog}
            className="shrink-0"
          >
            <IoIosMore className="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>
      {/* Device */}
    </>
  );
};

function RenderScrollType() {
  const { preferences } = usePreferenceStore();

  const [isMounted, setIsMounted] = useState(false);

  const typeScroll = preferences.scrollType === "smart" ? "Smart" : "Page";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <span className="text-xs font-semibold">{typeScroll}&nbsp;scroll</span>;
}
RenderScrollType.displayName = "RenderScrollType";

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

function ButtonWrapper({ playerRef }: PlayerRefProps) {
  const { isTranpose } = useTransposeSwitcher();

  return (
    <>
      {isTranpose ? <ButtonControllerTranpose /> : <ButtonControllerPlayer playerRef={playerRef} />}
    </>
  );
}

const ButtonControllerPlayer = memo(({ playerRef }: PlayerRefProps) => {
  const { playbackControl, setPlaybackControl } = usePlaybackControl();

  const handlePlayPause = useCallback(() => {
    setPlaybackControl({ playing: !playbackControl.playing });
  }, [playbackControl.playing, setPlaybackControl]);

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
        disabled={!playbackControl.isReady}
        className="w-12 h-12 bg-primary rounded-full disabled:opacity-50 "
      >
        <div className="w-full h-full flex justify-center items-center">
          <TbPlayerTrackPrevFilled className="w-7 h-6 text-white" />
        </div>
      </button>
      <button
        role="button"
        onClick={handlePlayPause}
        disabled={!playbackControl.isReady || playbackControl.isBuffer}
        className="w-14 h-14 bg-primary rounded-full disabled:opacity-50"
      >
        <div className="w-full h-full flex justify-center items-center">
          {!playbackControl.isReady || playbackControl.isBuffer ? (
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
        disabled={!playbackControl.isReady}
        className="w-12 h-12 bg-primary rounded-full disabled:opacity-50"
      >
        <div className="w-full h-full flex justify-center items-center">
          <TbPlayerTrackNextFilled className="w-7 h-6 text-white" />
        </div>
      </button>
    </div>
  );
});

ButtonControllerPlayer.displayName = "ButtonControllerPlayer";

function ButtonControllerTranpose() {
  const { tranpose, increment, decrement, reset } = useTransposeState();

  const handleTranposeUp = useCallback(() => {
    increment();
  }, [increment]);

  const handleTranposeDown = useCallback(() => {
    decrement();
  }, [decrement]);

  const handleResetTranpose = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      {/* Reset Tranpose Key */}
      <button
        onClick={handleResetTranpose}
        className="flex items-center gap-x-3 absolute -top-6 left-5 w-10 h-10 bg-primary rounded-full justify-center"
      >
        <FaRotateLeft className="fill-white size-4" />
      </button>
      <p className="absolute mt-5 left-6 text-xs font-semibold">Reset</p>
      {/* Reset Tranpose Key */}

      {/* Tranpose Button */}
      <div className="flex items-center h-12 absolute -top-7 left-1/2 -translate-x-1/2">
        <button
          className="w-12 h-12 bg-primary rounded-s-full"
          onClick={handleTranposeDown}
        >
          <div className="w-full h-full flex justify-center items-center">
            <FaMinus className="fill-white size-4" />
          </div>
        </button>
        <div className="px-2 py-1.5 border-y h-full border-primary bg-background font-bold w-10 flex items-center justify-center text-xl">
          {tranpose}
        </div>
        <button
          className="w-12 h-12 bg-primary rounded-e-full"
          onClick={handleTranposeUp}
        >
          <div className="w-full h-full flex justify-center items-center">
            <FaPlus className="fill-white size-4" />
          </div>
        </button>
      </div>
      {/* Tranpose Button */}
    </>
  );
}
ButtonControllerTranpose.displayName = "ButtonControllerTranpose";

function ButtonSwitcherTranpose() {
  const { isTranpose, toggleTransposeSwitcher } = useTransposeSwitcher();
  const { tranpose } = useTransposeState();
  return (
    <>
      <button
        onClick={() => {
          toggleTransposeSwitcher();
        }}
        className="flex items-center gap-x-3 absolute -top-6 right-5 w-10 h-10 bg-primary rounded-full justify-center"
      >
        {isTranpose ? <MediaPlayerIcon /> : <TranposeIcon />}
      </button>
      {isTranpose ? (
        <p className="absolute mt-5 right-5 text-xs font-semibold">
          <span>Player</span>
        </p>
      ) : (
        <p className="absolute mt-5 right-2 text-xs font-semibold">
          <span>
            Tranpose : <span>{tranpose}</span>
          </span>
        </p>
      )}
    </>
  );
}
ButtonSwitcherTranpose.displayName = "ButtonSwitcherTranpose";

function TranposeIcon() {
  return <FaTextHeight className="fill-white size-4" />;
}
TranposeIcon.displayName = "TranposeIcon";
function MediaPlayerIcon() {
  return <FaMusic className="fill-white size-4" />;
}
MediaPlayerIcon.displayName = "MediaPlayerIcon";
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
Loader.displayName = "Loader";
