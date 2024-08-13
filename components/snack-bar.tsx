"use client";

import { useEffect, useState } from "react";

import { useTransposeState } from "@/hooks/use-tranpose-state";
import { cn } from "@/lib/utils";

// Debounce function to limit the rate of updates
const useDebounce = (value: number, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export const SnackBar = () => {
  const { tranpose } = useTransposeState();
  const [key, setKey] = useState<string | undefined | null>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedTranpose = useDebounce(tranpose, 100);

  useEffect(() => {
    const keyElement = document.querySelector("#key");
    if (keyElement) {
      setIsOpen(true);
      setKey(keyElement.textContent || "");
    }

    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [debouncedTranpose]);

  return (
    <div
      className={cn(
        "fixed -top-20 left-1/2 z-[99] min-w-[200px] -translate-x-1/2 rounded-md border-[1.5px] border-muted bg-white bg-white/70 p-2 text-center font-semibold shadow-lg backdrop-blur-sm transition-all duration-100 ease-in-out dark:bg-[#1f1f1f]/70",
        isOpen ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      {key}
    </div>
  );
};
