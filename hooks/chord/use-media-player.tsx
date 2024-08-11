import { produce } from "immer";
import { create } from "zustand";

interface MediaPlayerHook {
  state: State;
  setState: (state: State) => void;
}

type State = {
  playing?: boolean;
  loaded?: number;
  duration?: number;
  progress?: number;
  isReady?: boolean;
};

export const useMediaPlayer = create<MediaPlayerHook>((set) => ({
  state: {
    playing: false,
    loaded: 0,
    duration: 0,
    progress: 0,
    isReady: false,
  },
  setState: (newState) =>
    set(
      produce((draft: { state: State }) => {
        Object.assign(draft.state, newState);
      })
    ),
}));

interface PlaybackControlState {
  playbackControl: {
    playing: boolean;
    isReady: boolean;
    isEnded?: boolean;
    isBuffer?: boolean;
  };
  setPlaybackControl: (playbackControl: Record<string, boolean>) => void;
}

export const usePlaybackControl = create<PlaybackControlState>((set) => ({
  playbackControl: {
    playing: false,
    isReady: false,
    isEnded: false,
    isBuffer: false,
  },
  setPlaybackControl: (newState) =>
    set(
      produce((draft) => {
        Object.assign(draft.playbackControl, newState);
      })
    ),
}));
