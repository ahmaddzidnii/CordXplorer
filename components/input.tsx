"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const InputComponent = () => {
  return (
    <div className="flex gap-x-2">
      <Input
        placeholder="cari cord lagu kesukaan anda.."
        className="rounded-s-full border-primary focus:shadow-xl"
      />
      <div>
        <Button
          variant="outline"
          className="rounded-e-full border-primary hover:shadow-2xl"
        >
          🔍
        </Button>
      </div>
    </div>
  );
};
