"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { usePreferenceStore } from "@/store/dialog-options-store";

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

export const AutoScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const { preferences, setPreferences } = usePreferenceStore();

  const { isScrolling, scrollSpeed, scrollType } = preferences;

  const { inView, ref: bottomRef } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && isScrolling) {
      setPreferences({
        ...preferences,
        isScrolling: false,
      });
    }
  }, [inView]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const scroll = () => {
      window.scrollBy(0, PIXEL_PER_SCROLL);
    };

    if (isScrolling && scrollType === "page" && INTERVAL_SPEED[scrollSpeed]) {
      intervalId = setInterval(scroll, INTERVAL_SPEED[scrollSpeed]);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isScrolling, scrollType, scrollSpeed]);
  return (
    <div className="relative">
      {children}
      <div
        ref={bottomRef}
        className="absolute -bottom-[200px]"
      />
    </div>
  );
};
