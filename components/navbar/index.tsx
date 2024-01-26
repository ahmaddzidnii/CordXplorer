"use client";

import { FaGithub } from "react-icons/fa";

import { Logo } from "@/components/logo";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Menu } from "lucide-react";
import { useNavbar } from "@/hooks/use-navbar";
import { InputComponent } from "@/components/input";
import { Button } from "../ui/button";

const NavItem = () => {
  return (
    <div className="flex iCordXplorer

tems-center gap-3">
      <FaGithub className="w-7 h-7 text-neutral-800 dark:text-neutral-100" />
      <ToogleTheme />
    </div>
  );
};
export const Navbar = () => {
  const { onOpen } = useNavbar();
  return (
    <header className="max-w-screen h-16 z-50 bg-background dark:bg-[#1f1f1f] sticky top-0  w-full p-6 border-b shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/90 dark:supports-[backdrop-filter]:bg-[#1f1f1f]/60">
      <nav className="container h-full flex items-center ">
        <Logo />
        <div className="mx-auto w-[310px] hidden md:block">
          <InputComponent />
        </div>
        <div
          className="ms-auto md:hidden  "
          onClick={() => onOpen()}
        >
          <Button variant="ghost">
            <Menu className="w-7 h-7 " />
          </Button>
        </div>
        <div className="hidden md:block ms-auto">
          <NavItem />
        </div>
      </nav>
    </header>
  );
};
