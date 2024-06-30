"use client";

import { FaGithub } from "react-icons/fa";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { useNavbar } from "@/hooks/use-navbar";
import { InputComponent } from "@/components/input";

const NavItem = () => {
  return (
    <div
      className="flex iCordXplorer

tems-center gap-3"
    >
      <FaGithub className="w-7 h-7 text-neutral-800 dark:text-neutral-100" />
      <ToogleTheme />
    </div>
  );
};
export const Navbar = () => {
  const { onOpen } = useNavbar();
  return (
    <header className="max-w-screen h-[72px]  z-50 bg-background sticky top-0  w-full p-6 border-b shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/90 dark:supports-[backdrop-filter]:bg-background/60">
      <nav className="container-navbar h-full  flex items-center ">
        <Logo />
        <div className="mx-auto w-[310px] hidden md:block">
          <InputComponent />
        </div>
        <div
          className="ms-auto md:hidden"
          onClick={() => onOpen()}
        >
          <Menu className="w-7 h-7 md:w-10 md:h-10 text-primary cursor-pointer" />
        </div>
        <div className="hidden md:block ms-auto">
          <NavItem />
        </div>
      </nav>
    </header>
  );
};
