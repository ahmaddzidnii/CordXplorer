"use client";

import { cn } from "@/lib/utils";
import { useWindowWidth } from "@react-hook/window-size";

interface DekstopWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DekstopWrapper = ({
  children,
  className,
}: DekstopWrapperProps) => {
  const width = useWindowWidth({
    wait: 100,
  });

  if (width < 768) {
    return null;
  }
  return <div className={cn("hidden md:block", className)}>{children}</div>;
};
