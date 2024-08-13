"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { usePreferenceStore } from "@/store/dialog-options-store";
import { usePlaybackControl } from "@/hooks/chord/use-media-player";

const INTERVAL_SPEED: {
  [key: number]: number;
} = {
  0.1: 200,
  0.2: 190,
  0.3: 181,
  0.4: 171,
  0.5: 161,
  0.6: 151,
  0.7: 142,
  0.8: 132,
  0.9: 122,
  1: 112,
  1.1: 103,
  1.2: 93,
  1.3: 83,
  1.4: 73,
  1.5: 64,
  1.6: 55,
  1.7: 44,
  1.8: 34,
  1.9: 25,
  2: 15,
};

const PIXEL_PER_SCROLL = 1;

function smartScroll() {
  console.log("harus scroll!!");
  const element = document.querySelector(".focus");

  element?.scrollIntoView({
    block: "center",
    behavior: "smooth",
  });
}

function pageScroll() {
  window.scrollBy(0, PIXEL_PER_SCROLL);
}

export const AutoScrollWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { preferences } = usePreferenceStore();

  const playing = usePlaybackControl((state) => state.playbackControl.playing);

  const { isScrolling, scrollSpeed, scrollType } = preferences;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isScrolling) {
      if (scrollType === "page" && INTERVAL_SPEED[scrollSpeed]) {
        intervalId = setInterval(pageScroll, INTERVAL_SPEED[scrollSpeed]);
      } else if (scrollType === "smart" && playing) {
        intervalId = setInterval(smartScroll, 500);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isScrolling, scrollType, scrollSpeed, playing]);

  return <>{children}</>;
};
