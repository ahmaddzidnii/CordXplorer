import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface H1Props extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const H1 = forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          "text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
