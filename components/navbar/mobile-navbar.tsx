"use client";

import { FaGithub } from "react-icons/fa";
import Link from "next/link";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useNavbar } from "@/hooks/use-navbar";
import { InputComponent } from "@/components/input";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const MobileNavbar = () => {
  const { isOpen, onClose } = useNavbar();
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
    >
      <SheetContent>
        <Logo />

        <div className="py-5">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold">Search Song..</h1>
            <InputComponent />
          </div>
          <Separator className="my-5 bg-violet-600" />
          <div className="flex flex-col my-5 gap-y-5 items-center">
            <Button
              asChild
              variant="ghost"
            >
              <Link
                target="_blank"
                href="https://github.com/ahmaddzidnii"
              >
                <FaGithub className="w-7 h-7" />
              </Link>
            </Button>
            <ToogleTheme />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
