import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface H1Props extends React.HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const P = forwardRef<HTMLParagraphElement, H1Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-md font-normal lg:text-lg", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
