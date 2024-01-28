import { create } from "zustand";

interface VideoState {
  duration: number;
  played: number;
  isPlaying: boolean;
  seeking: boolean;
  setDuration: (duration: number) => void;
  setPlayed: (played: number) => void;
  togglePlayPause: () => void;
  setIsPlaying: (end: boolean) => void;
  setSeeking: (sheeking: boolean) => void;
}

export const useVideo = create<VideoState>((set) => ({
  duration: 0,
  played: 0,
  isPlaying: false,
  seeking: false,
  setDuration: (duration) => set({ duration }),
  setPlayed: (played) => set({ played: played }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSeeking: (seeking) => set({ seeking }),
}));
