"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <main className="flex min-h-screen  items-center justify-center gap-x-5">
      <Button
        onClick={() => {
          setTheme("dark");
        }}
      >
        Dark
      </Button>
      <Button
        onClick={() => {
          setTheme("light");
        }}
      >
        Light
      </Button>
    </main>
  );
}
