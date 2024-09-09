"use client";

import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ArtistsSidebar } from "./[artistId]/artists-sidebar";

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
        defaultValue={15}
      >
        <ArtistsSidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultValue={75} className="m-3.5 min-w-[400px]">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
