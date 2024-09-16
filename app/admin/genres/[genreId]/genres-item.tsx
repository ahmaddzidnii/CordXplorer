import Link from "next/link";
import { FaHashtag } from "react-icons/fa6";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const genreItemVariants = cva(
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

interface GenresItemsProps {
  id: string;
  label?: string;
  variant?: VariantProps<typeof genreItemVariants>["variant"];
}

export const GenreItem = ({
  id,
  label = "Member",
  variant,
}: GenresItemsProps) => {
  return (
    <Button
      variant="transparant"
      className={cn(genreItemVariants({ variant }), "group")}
      size="sm"
      asChild
    >
      <Link href={`/admin/genres/${id}`}>
        <Avatar className="mr-1 size-5 rounded-md">
          <AvatarFallback className="font-bold text-white">
            <FaHashtag />
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-sm font-semibold text-foreground">
          {label}
        </span>
      </Link>
    </Button>
  );
};
