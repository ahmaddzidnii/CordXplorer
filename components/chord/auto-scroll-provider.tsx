"use client";

import { useEffect, useCallback, useRef } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import { usePreferenceStore } from "@/store/dialog-options-store";
import { usePlaybackControl } from "@/hooks/chord/use-media-player";

const INTERVAL_SPEED: Record<number, number> = {
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

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return (
    rect.top <= windowHeight / 2 && rect.top + rect.height >= windowHeight / 2
  );
}

function pageScroll() {
  window.scrollBy(0, PIXEL_PER_SCROLL);
}

export const AutoScrollWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const lastFocusedElementRef = useRef<Element | null>(null);

  const smartScroll = useCallback(() => {
    const elements = document.querySelectorAll(".focus");
    const element = elements[isMobile ? 0 : 1] as HTMLElement;

    if (!element) return;

    if (
      element !== lastFocusedElementRef.current ||
      !isElementInViewport(element)
    ) {
      console.log("scrolling");
      element.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      lastFocusedElementRef.current = element;
    }
  }, [isMobile]);

  const { preferences } = usePreferenceStore();
  const playing = usePlaybackControl((state) => state.playbackControl.playing);
  const { isScrolling, scrollSpeed, scrollType } = preferences;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isScrolling) {
      if (scrollType === "page" && INTERVAL_SPEED[scrollSpeed]) {
        intervalId = setInterval(pageScroll, INTERVAL_SPEED[scrollSpeed]);
      } else if (scrollType === "smart" && playing) {
        intervalId = setInterval(smartScroll, 1000);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isScrolling, scrollType, scrollSpeed, playing, smartScroll]);

  return <>{children}</>;
};
