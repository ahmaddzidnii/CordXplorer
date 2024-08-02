"use client";

import { Root } from "@/app/(chord)/songs/[slug]/page";
import { useMediaPlayer } from "@/hooks/chord/use-media-player";
import { cn } from "@/lib/utils";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useRef } from "react";

export const ChordPage = ({ data }: { data: Root }) => {
  const { state } = useMediaPlayer();

  // console.log("chord page render");

  const isCurrentActive = (currentTime: number, startTime: number, endTime: number) => {
    console.log("inside func isCurrentActive");
    return currentTime >= startTime && currentTime <= endTime;
  };

  return (
    <div className="my-5">
      {data.sections.map((section, index) => {
        const isActived = isCurrentActive(state.progress!, section.startTime, section.endTime);
        return (
          <div
            key={index}
            className={cn("px-2 py-1.5 flex items-center", isActived && "active-section")}
          >
            <div className="w-full">
              <h1 className="font-bold text-primary mb-2">{section.nameSection}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: section.content,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
