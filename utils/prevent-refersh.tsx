"use client";

import { useEffect } from "react";

export const PreventRefresh = ({ children }: { children: React.ReactNode }) => {
  // useEffect(() => {
  //   const handleRefresh = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //   };
  //   window.addEventListener("beforeunload", handleRefresh);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleRefresh);
  //   };
  // }, []);

  return <>{children}</>;
};
