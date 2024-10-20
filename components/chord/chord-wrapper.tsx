"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { transpose as transposeFunc } from "@/features/client/transpose/constants/chord-index";
import { useTransposeState } from "@/features/client/transpose/store/use-tranpose-state";
import { usePreferenceStore } from "@/features/client/preferences/store/dialog-options-store";

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
      const originalChord = chord.getAttribute("data-origin")!;
      const transposedChord = transposeFunc(originalChord, 0, "flat");
      chord.setAttribute("data-origin", transposedChord);
      chord.textContent = transposedChord;
    });
  }, []);

  useEffect(() => {
    const chordElements = document.querySelectorAll(".c");
    chordElements.forEach((chordElement) => {
      const originalChord = chordElement.getAttribute("data-origin");

      const transposedChord = transposeFunc(
        originalChord!,
        tranpose,
        preferences.enharmonic,
      );
      chordElement.textContent = transposedChord;
    });
  }, [preferences.enharmonic, tranpose]);

  if (!isMounted) {
    return (
      <div className="min h-screen animate-pulse rounded-md bg-muted"></div>
    );
  }
  return <>{children}</>;
};
