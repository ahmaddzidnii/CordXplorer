"use client";

import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useVideo } from "@/hooks/use-video";
export const ControlPlayer = () => {
  const { duration, played, isPlaying, togglePlayPause, setPlayed } =
    useVideo();
  console.log({
    duration,
    played,
  });

  const handlePlayButton = () => {
    togglePlayPause();
    console.log("play");
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[60]">
      <div className=" relative backdrop-blur-xl bg-background dark:bg-[#1f1f1f]/50 ring-1 ring-foreground/25 shadow-lg w-[350px] h-[150px] rounded-lg ">
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
        <div className="pt-16 px-4">
          <Slider
            className="cursor-pointer"
            max={duration}
            step={1}
            value={[played]}
            onValueChange={(value) => setPlayed(value[0])}
          />
        </div>
        <div className="pt-7 px-4 w-full flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <Switch />
            <span className="text-sm">Auto Scroll</span>
          </div>
          {/* TODO: implement Tranpose */}
        </div>
      </div>
    </div>
  );
};
