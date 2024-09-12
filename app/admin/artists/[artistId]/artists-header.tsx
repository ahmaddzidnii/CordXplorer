import { Search, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

import { useCreateArtistModal } from "@/features/admin/artists/store/use-create-artist-modal";

export const ArtistHeader = () => {
  const { setOpen } = useCreateArtistModal();
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
          <Hint label="Add artists" side="bottom">
            <Button
              variant="transparant"
              size="iconSm"
              onClick={() => setOpen(true)}
            >
              <SquarePen className="size-4 text-foreground" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
