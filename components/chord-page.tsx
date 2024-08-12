"use client";

import parse from "html-react-parser";

import { Root } from "@/app/(chord)/songs/[slug]/page";
import { useMediaPlayer } from "@/hooks/chord/use-media-player";
import { cn } from "@/lib/utils";

export const ChordPage = ({ data }: { data: Root }) => {
  const { state } = useMediaPlayer();

  const isCurrentActive = (currentTime: number, startTime: number, endTime: number) => {
    const tolerance = 0.5;

    const adjustedStartTime = startTime - tolerance;
    const adjustedEndTime = endTime + tolerance;

    return currentTime >= adjustedStartTime && currentTime <= adjustedEndTime;
  };

  return (
    <>
      {data.sections.map((section, index) => {
        const isActived = isCurrentActive(state.progress!, section.startTime, section.endTime);
        return (
          <div
            key={index}
            className={cn("px-2 py-3 whitespace-pre text-nowrap my-3", isActived && "focus")}
          >
            <p className=" mb-3">
              <b>{section.nameSection}</b>
            </p>
            {parse(section.content)}
          </div>
        );
      })}
    </>
  );
};
