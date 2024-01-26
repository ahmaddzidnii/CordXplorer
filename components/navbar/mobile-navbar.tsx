"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavbar } from "@/hooks/use-navbar";
import { InputComponent } from "../input";
import { ToogleTheme } from "./toogle-theme";
import { FaGithub } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";

export const MobileNavbar = () => {
  const { isOpen, onClose } = useNavbar();
  return (
    <div className="!md:hidden">
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent>
          <div className="py-5">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-semibold">Search Song..</h1>
              <InputComponent />
            </div>
            <Separator className="my-5" />
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
    </div>
  );
};
