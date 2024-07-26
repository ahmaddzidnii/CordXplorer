"use client";

import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";

interface MediaPlayerAdminProps extends ReactPlayerProps {
  link: string;
}
export const MediaPlayerCreateSong = ({
  link,
  onError,
  onProgress,
  onReady,
}: MediaPlayerAdminProps) => {
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
          onProgress={onProgress}
          onError={onError}
          onReady={onReady}
        />
      </div>
    </div>
  );
};
