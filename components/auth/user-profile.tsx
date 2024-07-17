"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";

import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface UserProfileProps {
  showName?: boolean;
  showEmail?: boolean;
  className?: string;
  side?: "bottom" | "left" | "right" | "top";
}

const SkeletonLoader = ({ showEmail, showName }: UserProfileProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-10 aspect-square rounded-full" />
      {showName && <Skeleton className="h-8 flex-1 " />}
    </div>
  );
};

export const UserProfile = ({
  showEmail,
  showName = true,
  className,
  side = "right",
}: UserProfileProps) => {
  const { isLoading, user } = useUser();

  if (isLoading && user) {
    return (
      <SkeletonLoader
        showEmail={showEmail}
        showName={showName}
      />
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className={cn("flex items-center w-full gap-x-4", className)}>
          <Avatar className="size-10">
            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
            <AvatarFallback>
              <Skeleton className="size-10 aspect-square rounded-full" />
            </AvatarFallback>
          </Avatar>
          {showName && <p className="font-semibold truncate">{user?.name || "John Doe"}</p>}
        </div>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        className="shadow-primary shadow-sm"
      >
        <Button
          onClick={() => {
            signOut();
          }}
          variant="destructive"
        >
          logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};
