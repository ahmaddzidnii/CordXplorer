import { create } from "zustand";

interface PlayerRefState {
  playerRef: any;
  setPlayerRef: (ref: any) => void;
}

export const usePlayerRef = create<PlayerRefState>((set) => ({
  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),
}));
