"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { transpose as transposeFunc } from "@/constants/chord-index";
import { useTransposeState } from "@/hooks/use-tranpose-state";
import { usePreferenceStore } from "@/store/dialog-options-store";
import { Loader } from "lucide-react";

export const ChordWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  const { tranpose } = useTransposeState();
  const { preferences } = usePreferenceStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    const cordsDom = document.querySelectorAll("span.c");
    cordsDom.forEach((chord) => {
      chord.removeAttribute("chord");
      const originalChord = chord.getAttribute("data-origin")!;
      const transposedChord = transposeFunc(originalChord, 0, "sharp");
      chord.setAttribute("data-origin", transposedChord);
      chord.textContent = transposedChord;
    });
  }, []);

  useEffect(() => {
    const chordElements = document.querySelectorAll(".c");
    chordElements.forEach((chordElement) => {
      const originalChord = chordElement.getAttribute("data-origin");

      const transposedChord = transposeFunc(originalChord!, tranpose, preferences.enharmonic);
      chordElement.textContent = transposedChord;
    });
  }, [preferences.enharmonic, tranpose]);

  if (!isMounted) {
    return <div className="min h-screen bg-muted animate-pulse rounded-md"></div>;
  }
  return <>{children}</>;
};
