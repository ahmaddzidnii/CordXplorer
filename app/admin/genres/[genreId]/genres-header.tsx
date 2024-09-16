import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

import { useCreateGenreModal } from "@/features/admin/genres/store/use-create-genre-modal";

export const GenresHeader = () => {
  const { setOpen } = useCreateGenreModal();
  return (
    <>
      <div className="flex h-[49px] items-center justify-between gap-0.5 px-4">
        <div className="overflow-hidden">
          <p className="truncate text-lg font-semibold">Artists</p>
        </div>
        <div className="flex items-center gap-0.5">
          <Hint label="Search" side="bottom">
            <Button variant="transparant" size="iconSm">
              <Search className="size-4 text-foreground" />
            </Button>
          </Hint>
          <Hint label="Add genres" side="bottom">
            <Button
              variant="transparant"
              size="iconSm"
              onClick={() => setOpen(true)}
            >
              <Plus className="size-4 text-foreground" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
