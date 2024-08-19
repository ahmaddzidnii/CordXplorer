"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import { useModal } from "@/hooks/use-modal";

export const AddMusic = () => {
  const router = useRouter();
  const modal = useModal();
  return (
    <Button
      size="sm"
      className="text-white"
      onClick={() => {
        modal.onOpen();
        // router.push("/admin/songs/create?step=1");
      }}
    >
      <Plus className="mr-2 h-5 w-5" /> Add Music
    </Button>
  );
};
