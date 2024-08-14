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

import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useMediaPlayer,
  usePlaybackControl,
} from "@/hooks/chord/use-media-player";
import { useTransposeSwitcher } from "@/hooks/use-transpose-switcher";
import { useTransposeState } from "@/hooks/use-tranpose-state";
import {
  dialogOptionsStore,
  usePreferenceStore,
} from "@/store/dialog-options-store";
import { SnackBar } from "../snack-bar";

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
      <div className="fixed bottom-6 left-1/2 z-[97] hidden h-[116px] w-[400px] -translate-x-1/2 rounded-lg bg-white/70 shadow-lg ring-1 ring-foreground/25 backdrop-blur-md dark:bg-[#1f1f1f]/50 md:block">
        <ButtonWrapper playerRef={playerRef} />
        <ButtonSwitcherTranpose />
        <SnackBar />
        <div className="px-4 pt-7">
          <SliderControl playerRef={playerRef} />
        </div>
        <div className="flex w-full items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-x-2">
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
            className="flex items-center gap-x-2"
          >
            <IoIosMore className="h-8 w-8 text-primary" />
          </button>
        </div>
      </div>
      {/* Desktop */}

      {/* Device */}
      <div className="fixed bottom-0 left-0 z-[97] h-28 w-full max-w-[inherit] rounded-t-lg bg-white/70 shadow-lg ring-1 ring-foreground/25 backdrop-blur-md dark:bg-[#1f1f1f]/50 md:hidden">
        <ButtonWrapper playerRef={playerRef} />
        <ButtonSwitcherTranpose />
        <SnackBar />
        <div className="mt-3 flex h-full items-center gap-x-3 px-4 py-1.5">
          <div className="shrink-0">
            <div className="flex flex-col items-center gap-y-2">
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
          <button onClick={handleOpenDialog} className="shrink-0">
            <IoIosMore className="h-8 w-8 text-primary" />
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

  return (
    <span className="text-xs font-semibold">{typeScroll}&nbsp;scroll</span>
  );
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
      {isTranpose ? (
        <ButtonControllerTranpose />
      ) : (
        <ButtonControllerPlayer playerRef={playerRef} />
      )}
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
    <div className="absolute -top-7 left-1/2 flex -translate-x-1/2 items-center gap-x-3">
      <button
        role="button"
        onClick={handleSeekPrev}
        disabled={!playbackControl.isReady}
        className="h-12 w-12 rounded-full bg-primary disabled:opacity-50"
      >
        <div className="flex h-full w-full items-center justify-center">
          <TbPlayerTrackPrevFilled className="h-6 w-7 text-white" />
        </div>
      </button>
      <button
        role="button"
        onClick={handlePlayPause}
        disabled={!playbackControl.isReady || playbackControl.isBuffer}
        className="h-14 w-14 rounded-full bg-primary disabled:opacity-50"
      >
        <div className="flex h-full w-full items-center justify-center">
          {!playbackControl.isReady || playbackControl.isBuffer ? (
            <Loader />
          ) : playbackControl.playing ? (
            <FaPause className="h-6 w-7 text-white" />
          ) : (
            <FaPlay className="h-6 w-7 text-white" />
          )}
        </div>
      </button>
      <button
        role="button"
        onClick={handleSeekNext}
        disabled={!playbackControl.isReady}
        className="h-12 w-12 rounded-full bg-primary disabled:opacity-50"
      >
        <div className="flex h-full w-full items-center justify-center">
          <TbPlayerTrackNextFilled className="h-6 w-7 text-white" />
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
        className="absolute -top-6 left-5 flex h-10 w-10 items-center justify-center gap-x-3 rounded-full bg-primary"
      >
        <FaRotateLeft className="size-4 fill-white" />
      </button>
      <p className="absolute left-6 mt-5 text-xs font-semibold">Reset</p>
      {/* Reset Tranpose Key */}

      {/* Tranpose Button */}
      <div className="absolute -top-7 left-1/2 flex h-12 -translate-x-1/2 items-center">
        <button
          className="h-12 w-12 rounded-s-full bg-primary"
          onClick={handleTranposeDown}
        >
          <div className="flex h-full w-full items-center justify-center">
            <FaMinus className="size-4 fill-white" />
          </div>
        </button>
        <div className="flex h-full w-10 items-center justify-center border-y border-primary bg-background px-2 py-1.5 text-xl font-bold">
          {tranpose}
        </div>
        <button
          className="h-12 w-12 rounded-e-full bg-primary"
          onClick={handleTranposeUp}
        >
          <div className="flex h-full w-full items-center justify-center">
            <FaPlus className="size-4 fill-white" />
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
        className="absolute -top-6 right-5 flex h-10 w-10 items-center justify-center gap-x-3 rounded-full bg-primary"
      >
        {isTranpose ? <MediaPlayerIcon /> : <TranposeIcon />}
      </button>
      {isTranpose ? (
        <p className="absolute right-5 mt-5 text-xs font-semibold">
          <span>Player</span>
        </p>
      ) : (
        <p className="absolute right-2 mt-5 text-xs font-semibold">
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
  return <FaTextHeight className="size-4 fill-white" />;
}
TranposeIcon.displayName = "TranposeIcon";
function MediaPlayerIcon() {
  return <FaMusic className="size-4 fill-white" />;
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
      <circle className="spinner_I8Q1" cx={4} cy={12} r="1.5" />
      <circle className="spinner_I8Q1 spinner_vrS7" cx={12} cy={12} r={3} />
      <circle className="spinner_I8Q1" cx={20} cy={12} r="1.5" />
    </svg>
  );
}
Loader.displayName = "Loader";
