"use client";

import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";
import { useRef, useState } from "react";

interface MediaPlayerAdminProps extends ReactPlayerProps {
  link: string;
}
export const MediaPlayerAdmin = ({ link, onError, onProgress, onReady }: MediaPlayerAdminProps) => {
  const [currentSecond, setCurrentSecond] = useState(0);

  return (
    <div className="space-y-5">
      <h1 className="font-bold text-lg">Preview Youtube :</h1>
      <div className="relative aspect-video shadow-primary shadow-[0_3px_10px] rounded-sm overflow-hidden">
        <ReactPlayer
          className="react-player"
          url={link}
          controls
          width="100%"
          height="100%"
          onProgress={(state) => {
            setCurrentSecond(state.playedSeconds);
          }}
          onError={(error, data) => {
            onError && onError(error, data);
          }}
          onReady={(player) => {
            onReady && onReady(player);
          }}
        />
      </div>
      <div>{!!link && <p>Current seconds: {currentSecond.toFixed(0)}</p>}</div>
    </div>
  );
};
