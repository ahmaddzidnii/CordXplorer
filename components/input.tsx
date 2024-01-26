"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const InputComponent = () => {
  return (
    <div className="flex gap-x-1">
      <Input
        placeholder="cari cord lagu kesukaan anda.."
        className="rounded-s-full"
      />
      <div>
        <Button
          variant="outline"
          className="rounded-e-full border-violet-600 hover:bg-violet-600 hover:shadow-2xl"
        >
          🔍
        </Button>
      </div>
    </div>
  );
};
