"use client";
import { signOut, useSession } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface UserProfileProps {
  showName?: boolean;
  showEmail?: boolean;
  className?: string;
  side?: "bottom" | "left" | "right" | "top";
  modal?: boolean;
  popoverClassName?: string;
}

const SkeletonLoader = ({ showEmail, showName }: UserProfileProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="aspect-square size-10 rounded-full" />
      {showName && <Skeleton className="h-8 flex-1" />}
    </div>
  );
};

export const UserProfile = ({
  showEmail,
  showName = true,
  className,
  side = "top",
  modal = true,
  popoverClassName,
}: UserProfileProps) => {
  const session = useSession();

  const onSignOut = () => {
    signOut();
  };

  if (session.status === "loading") {
    return <SkeletonLoader showEmail={showEmail} showName={showName} />;
  }

  const user = session.data?.user;

  return (
    <DropdownMenu modal={modal}>
      <DropdownMenuTrigger>
        <div className={cn("flex w-full items-center gap-x-4", className)}>
          <Avatar className="size-10 border-[4px] border-muted">
            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {showName && (
            <p className="truncate font-semibold">{user?.name || "John Doe"}</p>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        className={cn(
          "z-[101] w-[300px] px-0 shadow-sm shadow-primary",
          popoverClassName,
        )}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-x-2 p-5">
            <Avatar className="size-10 border-[4px] border-muted">
              <AvatarImage
                src={user?.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                <Skeleton className="aspect-square size-10 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="line-clamp-1 text-balance text-lg font-bold">
                {user?.name}
              </p>
              <p className="truncate text-balance text-sm font-semibold text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="px-3">
            {session.data?.user.role === "ADMIN" && (
              <Link href="/admin">Dashboard Admin</Link>
            )}
          </div>
          <DropdownMenuSeparator />
          <div className="px-1.5">
            <Button
              className="w-full justify-start p-1.5"
              variant="ghost"
              onClick={onSignOut}
            >
              <IoIosLogOut className="mr-3 h-6 w-6" />
              Sign Out
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
