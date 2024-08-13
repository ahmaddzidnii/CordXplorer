"use client";

import { useWindowWidth } from "@react-hook/window-size";

import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { useNavbar } from "@/hooks/use-navbar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { InputComponent } from "@/components/input";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const MobileNavbar = () => {
  const { isOpen, onClose } = useNavbar();

  const width = useWindowWidth({
    wait: 200,
  });

  useEffect(() => {
    if (width > 768) {
      onClose();
    }
  }, [width, onClose]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTitle>
        <VisuallyHidden.Root>Mobile Navbar</VisuallyHidden.Root>
      </SheetTitle>
      <SheetDescription>
        <VisuallyHidden.Root>Mobile Navbar</VisuallyHidden.Root>
      </SheetDescription>
      <SheetContent className="z-[102]">
        <Logo />
        <div className="py-5">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold">Search Song..</h1>
            <InputComponent />
          </div>
          <Separator className="my-5 bg-violet-600" />
          <div className="my-5 flex flex-col items-center gap-y-5">
            <Button asChild variant="ghost">
              <Link target="_blank" href="https://github.com/ahmaddzidnii">
                <FaGithub className="h-7 w-7" />
              </Link>
            </Button>
            <ToogleTheme />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
