import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const artistItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481439] bg-white/50 hover:bg-white/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ArtistsItemsProps {
  id: string;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof artistItemVariants>["variant"];
}

export const ArtistsItems = ({
  id,
  image,
  label = "Member",
  variant,
}: ArtistsItemsProps) => {
  const avatarFallback = label.charAt(0).toUpperCase();
  return (
    <Button
      variant="transparant"
      className={cn(artistItemVariants({ variant }))}
      size="sm"
      asChild
    >
      <Link href={`/admin/artists/${id}`}>
        <Avatar className="mr-1 size-5 rounded-md">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-xs text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-sm font-semibold text-foreground">
          {label}
        </span>
      </Link>
    </Button>
  );
};
