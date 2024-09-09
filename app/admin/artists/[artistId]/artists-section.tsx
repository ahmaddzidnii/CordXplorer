import { useToggle } from "react-use";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArtistsSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

export const ArtistsSection = ({
  children,
  label,
  hint,
  onNew,
}: ArtistsSectionProps) => {
  const [on, toggle] = useToggle(true);
  return (
    <div className="mt-3 flex h-full flex-col gap-y-2 px-1">
      <div className="group flex items-center px-3.5">
        <Button
          onClick={toggle}
          className="size-6 shrink-0 p-0.5 text-sm text-foreground"
          variant="transparant"
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", on && "-rotate-90")}
          />
        </Button>
        <Button
          variant="transparant"
          size="sm"
          className="group h-[28px] justify-start overflow-hidden px-1.5 text-sm text-foreground"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant="transparant"
              className="ml-auto size-6 shrink-0 p-0.5 text-sm text-foreground opacity-0 transition-opacity group-hover:opacity-100"
              size="iconSm"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>

      {on && children}
    </div>
  );
};
