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
import { convertTimeToMilitary } from "@/lib/format/format-second";

interface PlayerRefProps {
  playerRef: RefObject<ReactPlayer>;
}
export const ControlPlayer = ({ playerRef }: PlayerRefProps) => {
  return (
    <>
      <div className="hidden md:block md:fixed  bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-background dark:bg-[#1f1f1f]/50 ring-1 ring-foreground/25 shadow-lg w-[400px] h-[116px] rounded-lg ">
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
    <div>
      <span className="text-xs font-semibold text-primary ">
        {convertTimeToMilitary(state.progress!)}
      </span>
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
            <div className="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
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
    <div className="flex items-center gap-x-3 absolute -top-6 right-5 w-10 h-10 bg-primary rounded-full justify-center">
      <span className="text-3xl font-bold text-white ">T</span>
    </div>
  );
}
