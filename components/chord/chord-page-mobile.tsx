"use client";

import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";
import { ChordPage } from "../chord-page";

export const ChordPageMobile = ({ data }: { data: any }) => {
  const [isMounted, setIsMounted] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (width > 768) {
    return null;
  }

  return <ChordPage data={data} />;
};
