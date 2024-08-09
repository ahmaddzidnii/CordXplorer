"use client";
import { useEffect, useLayoutEffect } from "react";

import { transpose as transposeFunc } from "@/constants/chord-index";
import { useTransposeState } from "@/hooks/use-tranpose-state";
import { usePreferenceStore } from "@/store/dialog-options-store";

export const ChordWrapper = ({ children }: { children: React.ReactNode }) => {
  const { tranpose } = useTransposeState();
  const { preferences } = usePreferenceStore();

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

  return <>{children}</>;
};
