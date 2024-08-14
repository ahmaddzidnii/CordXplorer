"use client";
import { cn } from "@/lib/utils";
import { useWindowWidth } from "@react-hook/window-size";

interface MobileWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MobileWrapper = ({ children, className }: MobileWrapperProps) => {
  const width = useWindowWidth({
    wait: 100,
  });

  if (width >= 768) {
    return null;
  }

  return <div className={cn("md:hidden", className)}>{children}</div>;
};
