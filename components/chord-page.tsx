"use client";

import parse from "html-react-parser";

import { Root } from "@/app/(chord)/songs/[slug]/page";
import { useMediaPlayer } from "@/hooks/chord/use-media-player";
import { cn } from "@/lib/utils";
import { ChordWrapper } from "@/components/chord/chord-wrapper";

export const ChordPage = ({ data }: { data: Root }) => {
  const { state } = useMediaPlayer();

  const isCurrentActive = (currentTime: number, startTime: number, endTime: number) => {
    return currentTime >= startTime && currentTime <= endTime;
  };

  return (
    <div className="my-5 h-[129vh]">
      {data.sections.map((section, index) => {
        const isActived = isCurrentActive(state.progress!, section.startTime, section.endTime);
        return (
          <div
            key={index}
            className={cn(
              "px-2 py-1.5 whitespace-pre text-nowrap",
              isActived && state.playing && "focus"
            )}
          >
            <strong className=" mb-2">{section.nameSection}</strong>
            {parse(section.content)}
          </div>
        );
      })}
    </div>
  );
};
