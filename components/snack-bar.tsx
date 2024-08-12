"use client";

import { useTransposeState } from "@/hooks/use-tranpose-state";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
        "transition-all ease-in-out duration-100 fixed left-1/2 shadow-sm -translate-x-1/2 -top-20 bg-muted rounded-md backdrop-blur-sm min-w-[200px] text-center font-semibold p-2",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {key}
    </div>
  );
};
