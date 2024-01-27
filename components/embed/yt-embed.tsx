"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Skeleton } from "../ui/skeleton";

const YtEmbedSkeleton = () => {
  return <Skeleton className="w-full h-[190px] bg-neutral-300" />;
};
export const YtEmbed = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <YtEmbedSkeleton />;

  return (
    <div className="relative pt-[56.25%] rounded-md">
      <ReactPlayer
        fallback={<YtEmbedSkeleton />}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "2px",
        }}
        width="100%"
        height="100%"
        url="https://www.youtube.com/embed/sfuq3y_zuGw?si=TlN2qloc1SYZwEyn"
      />
    </div>
  );
};
