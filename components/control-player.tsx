"use client";

import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useVideo } from "@/hooks/use-video";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

interface ControlPlayerProps {
  onSeek?: (value: number[]) => void;
  onSeekMouseUp?: (value: number[]) => void;
  prevSeek?: () => void;
  nextSeek?: () => void;
}
export const ControlPlayer = ({
  onSeek,
  onSeekMouseUp,
  nextSeek,
  prevSeek,
}: ControlPlayerProps) => {
  const {
    duration,
    played,
    isPlaying,
    setAutoScroll,
    togglePlayPause,
    setIsPlaying,
  } = useVideo();
  // console.log({
  //   duration,
  //   played,
  // });

  const handlePlayButton = () => {
    togglePlayPause();
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[60]">
      <div className=" relative backdrop-blur-xl bg-background dark:bg-[#1f1f1f]/50 ring-1 ring-foreground/25 shadow-lg w-[300px] h-[116px] rounded-lg ">
        <div
          role="button"
          onClick={handlePlayButton}
          className="w-14 h-14 bg-violet-600 rounded-full absolute -top-7 left-1/2 -translate-x-1/2 "
        >
          <div className="w-full h-full flex justify-center items-center">
            {isPlaying ? (
              <FaPause className="w-7 h-6 text-white" />
            ) : (
              <FaPlay className="w-7 h-6 text-white" />
            )}
          </div>
        </div>

        {/* Before */}
        <div
          role="button"
          onClick={prevSeek}
          className="w-12 h-12 bg-violet-600 rounded-full absolute -top-6 left-1/4 -translate-x-1/4 "
        >
          <div className="w-full h-full flex justify-center items-center">
            <TbPlayerTrackPrevFilled className="w-7 h-6 text-white" />
          </div>
        </div>

        {/* Next */}
        <div
          role="button"
          onClick={nextSeek}
          className="w-12 h-12 bg-violet-600 rounded-full absolute -top-6 right-1/4 translate-x-1/4 "
        >
          <div className="w-full h-full flex justify-center items-center">
            <TbPlayerTrackNextFilled className="w-7 h-6 text-white" />
          </div>
        </div>
        <div className="pt-7 px-4">
          <div className="">
            <span className="text-xs font-semibold text-violet-600 ">
              {formatTime(played)}
            </span>
          </div>
          <Slider
            className="cursor-pointer py-1"
            max={duration}
            step={1}
            value={[played]}
            onValueChange={onSeek}
            onValueCommit={onSeekMouseUp}
          />
        </div>
        <div className="pt-6 px-4 w-full flex justify-between items-center">
          <div className="w-1/2">{/* TODO: implement Tranpose */}</div>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(cheked) => {
                if (cheked) {
                  setAutoScroll(true);
                  setIsPlaying(cheked);
                } else {
                  setAutoScroll(false);
                }
              }}
            />
            <span className="text-sm">Auto Scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
};
