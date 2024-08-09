import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

interface DialogOptionsStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const dialogOptionsStore = create<DialogOptionsStore>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));

interface PreferencesStore {
  preferences: {
    scrollType: "smart" | "page";
    scrollSpeed: number;
    enharmonic: "sharp" | "flat";
  };
  setPreferences: (value: Partial<PreferencesStore["preferences"]>) => void;
  incrementScrollSpeed: () => void;
  decrementScrollSpeed: () => void;
}

export const usePreferenceStore = create<PreferencesStore>()(
  devtools(
    persist(
      (set, get) => ({
        preferences: {
          scrollType: "smart",
          scrollSpeed: 1.0,
          enharmonic: "sharp",
        },
        setPreferences(value) {
          set((state) => ({
            preferences: { ...state.preferences, ...value },
          }));
        },
        incrementScrollSpeed() {
          set((state) => {
            if (state.preferences.scrollSpeed === 2.0) {
              return { preferences: state.preferences };
            }
            return {
              preferences: {
                ...state.preferences,
                scrollSpeed: Number((state.preferences.scrollSpeed + 0.1).toFixed(1)),
              },
            };
          });
        },
        decrementScrollSpeed() {
          set((state) => {
            if (state.preferences.scrollSpeed === 0.1) {
              return { preferences: state.preferences };
            }

            return {
              preferences: {
                ...state.preferences,
                scrollSpeed: Number((state.preferences.scrollSpeed - 0.1).toFixed(1)),
              },
            };
          });
        },
      }),
      { name: "preference" }
    )
  )
);
