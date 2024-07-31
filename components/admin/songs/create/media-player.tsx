"use client";

import { produce } from "immer";
import React, { forwardRef } from "react";
import ReactPlayer from "react-player/lazy";
import { create } from "zustand";
interface StateHook {
  state: State;
  setState: (state: State) => void;
}

type State = {
  playing?: boolean;
  played?: number;
  loaded?: number;
  duration?: number;
  progress?: number;
};

export const mediaPlayerAdminState = create<StateHook>((set) => ({
  state: {
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0,
    progress: 0,
  },
  setState: (newState) =>
    set(
      produce((draft: { state: State }) => {
        Object.assign(draft.state, newState);
      })
    ),
}));
interface MediaPlayerAdminProps {
  link: string;
}
const MediaPlayerCreateSongComponent = forwardRef<ReactPlayer, MediaPlayerAdminProps>(
  ({ link }, ref) => {
    console.log("MediaPlayerCreateSongComponent");
    const { state, setState } = mediaPlayerAdminState();

    const handleDuration = (duration: number) => {
      setState({ duration });
    };

    const handleProgress = (progress: { playedSeconds: number }) => {
      setState({ progress: Math.floor(progress.playedSeconds) });
    };

    return (
      <div className="space-y-5">
        <div className="relative aspect-video shadow-primary shadow-[0_3px_10px] rounded-sm overflow-hidden">
          <ReactPlayer
            ref={ref}
            className="react-player"
            playing={state.playing}
            url={link}
            controls
            width="100%"
            height="100%"
            onDuration={handleDuration}
            onProgress={handleProgress}
            onPlay={() => setState({ playing: true })}
            onPause={() => setState({ playing: false })}
          />
        </div>
      </div>
    );
  }
);

// Tambahkan displayName untuk debugging
MediaPlayerCreateSongComponent.displayName = "MediaPlayerCreateSong";

// Bungkus dengan React.memo
const MediaPlayerCreateSong = React.memo(MediaPlayerCreateSongComponent);

export { MediaPlayerCreateSong };
