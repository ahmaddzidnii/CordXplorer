"use client";
import { Logo } from "@/components/logo";
import { ToogleTheme } from "./toogle-theme";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NavItem = () => {
  return (
    <div className="flex items-center gap-3">
      <ToogleTheme />
    </div>
  );
};
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="max-w-screen z-50 bg-background dark:bg-[#1f1f1f] sticky top-0  w-full p-6 border-b shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-[#1f1f1f]/60">
      <nav className="container flex items-center justify-between">
        <Logo />
        <div
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          className="transition  duration-700 "
        >
          <X
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-7 h-7 md:hidden cursor-pointer",
              !isOpen && "hidden"
            )}
          />
          <Menu className={cn("w-7 h-7 md:hidden", isOpen && "hidden")} />
        </div>
        <div className="hidden md:block">
          <NavItem />
        </div>
      </nav>
      <div
        className={cn(
          "md:hidden transition-all duration-700",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="flex-col flex items-center pt-5">
          <ToogleTheme />
        </div>
      </div>
    </header>
  );
};
