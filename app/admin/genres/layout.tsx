"use client";

import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { GenresSidebar } from "./[genreId]/genres-sidebar";

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup direction="horizontal" autoSaveId="ce-ahmad">
      <ResizablePanel
        maxSize={20}
        minSize={15}
        className="min-w-[150px] max-w-[300px]"
        defaultSize={15}
        defaultValue={15}
      >
        <GenresSidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={75}
        defaultValue={75}
        className="m-3.5 min-w-[400px]"
      >
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
