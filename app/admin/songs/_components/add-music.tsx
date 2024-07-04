"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";

export const AddMusic = () => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      className="text-white"
      onClick={() => {
        router.push("/admin/songs/create");
      }}
    >
      <Plus className="w-5 h-5 mr-2" /> Add Music
    </Button>
  );
};
