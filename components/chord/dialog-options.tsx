"use client";
import { Minus, Plus, X } from "lucide-react";
import Draggable from "react-draggable";
import { FaGear } from "react-icons/fa6";
import { SwitchValue } from "../switch/switch-value";
import { dialogOptionsStore, usePreferenceStore } from "@/store/dialog-options-store";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const DialogOptions = () => {
  const state = dialogOptionsStore();
  const { preferences, setPreferences, incrementScrollSpeed, decrementScrollSpeed } =
    usePreferenceStore();
  return (
    <>
      {state.isOpen && (
        <Draggable
          defaultPosition={{
            x: 0,
            y: 0,
          }}
          handle="h5"
          bounds="body"
        >
          <div className="fixed right-[20%] bottom-0 w-[230px] h-max z-[99] backdrop-blur-md bg-white/70  dark:bg-[#1f1f1f]/50 shadow-sm rounded-lg p-4 border-muted border-[1.5px]">
            <h5 className="flex gap-3 items-center text-lg font-extrabold mb-5 cursor-move">
              <FaGear className="size-5" /> Options
            </h5>
            <button
              onClick={() => {
                state.setIsOpen(false);
              }}
              className="ms-auto cursor-pointer absolute top-4 right-4"
            >
              <X />
            </button>
            <div className="flex flex-col font-bold">
              <div className="flex justify-between mb-3 ">
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
              <div className="flex justify-between mb-3">
                <span>Scroll speed</span>
                <div className="flex gap-2 w-24 justify-center ">
                  <button
                    onClick={() => {
                      decrementScrollSpeed();
                    }}
                    disabled={preferences.scrollSpeed === 0.1 || preferences.scrollType !== "page"}
                    className="bg-primary h-6 aspect-square rounded-md disabled:opacity-35"
                  >
                    <Minus className="text-background size-6" />
                  </button>
                  <div className={cn(preferences.scrollType === "smart" && "opacity-35")}>
                    {preferences.scrollSpeed.toFixed(1)}
                  </div>
                  <button
                    onClick={() => {
                      incrementScrollSpeed();
                    }}
                    disabled={preferences.scrollSpeed === 2.0 || preferences.scrollType !== "page"}
                    className="bg-primary  h-6 aspect-square rounded-md disabled:opacity-35"
                  >
                    <Plus className="text-background size-6" />
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
        </Draggable>
      )}
    </>
  );
};

DialogOptions.displayName = "DialogOptions";
