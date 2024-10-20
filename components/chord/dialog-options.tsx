"use client";
import { Minus, Plus, X } from "lucide-react";
import Draggable from "react-draggable";
import { FaGear } from "react-icons/fa6";
import { SwitchValue } from "../switch/switch-value";
import {
  dialogOptionsStore,
  usePreferenceStore,
} from "@/features/client/preferences/store/dialog-options-store";
import { cn } from "@/lib/utils";

export const DialogOptions = () => {
  const state = dialogOptionsStore();
  const {
    preferences,
    setPreferences,
    incrementScrollSpeed,
    decrementScrollSpeed,
  } = usePreferenceStore();
  return (
    <>
      <Draggable
        defaultPosition={{
          x: 0,
          y: 0,
        }}
        handle="h5"
        bounds="body"
      >
        <div
          className={cn(
            "fixed bottom-0 right-[20%] z-[99] h-max w-[230px] rounded-lg border-[1.5px] border-muted bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-[#1f1f1f]/50",
            state.isOpen ? "visible" : "invisible",
          )}
        >
          <div
            className={cn(
              "transition-all duration-300 ease-in-out",
              state.isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <h5 className="mb-5 flex cursor-move items-center gap-3 text-lg font-extrabold">
              <FaGear className="size-5" /> Options
            </h5>
            <button
              onClick={() => {
                state.setIsOpen(false);
              }}
              className="absolute right-4 top-4 ms-auto cursor-pointer"
            >
              <X />
            </button>
            <div className="flex flex-col font-bold">
              <div className="mb-3 flex justify-between">
                <span>Scroll type</span>
                <SwitchValue
                  id="ScrollType"
                  value={preferences.scrollType === "smart" ? false : true}
                  onValueChange={(checked) => {
                    setPreferences({
                      ...preferences,
                      scrollType: checked ? "page" : "smart",
                    });
                  }}
                >
                  <span className="type off">Smart</span>
                  <span className="type on">Page</span>
                </SwitchValue>
              </div>
              <div className="mb-3 flex justify-between">
                <span>Scroll speed</span>
                <div className="flex w-24 justify-center gap-2">
                  <button
                    onClick={() => {
                      decrementScrollSpeed();
                    }}
                    disabled={
                      preferences.scrollSpeed === 0.1 ||
                      preferences.scrollType !== "page"
                    }
                    className="aspect-square h-6 rounded-md bg-primary disabled:opacity-35"
                  >
                    <Minus className="size-6 text-background" />
                  </button>
                  <div
                    className={cn(
                      preferences.scrollType === "smart" && "opacity-35",
                    )}
                  >
                    {preferences.scrollSpeed.toFixed(1)}
                  </div>
                  <button
                    onClick={() => {
                      incrementScrollSpeed();
                    }}
                    disabled={
                      preferences.scrollSpeed === 2.0 ||
                      preferences.scrollType !== "page"
                    }
                    className="aspect-square h-6 rounded-md bg-primary disabled:opacity-35"
                  >
                    <Plus className="size-6 text-background" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Enharmonic</span>
                <SwitchValue
                  id="Enharmonic"
                  value={preferences.enharmonic === "sharp" ? false : true}
                  onValueChange={(checked) => {
                    setPreferences({
                      ...preferences,
                      enharmonic: checked ? "flat" : "sharp",
                    });
                  }}
                >
                  <span className="type off">♯</span>
                  <span className="type on">♭</span>
                </SwitchValue>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};

DialogOptions.displayName = "DialogOptions";
