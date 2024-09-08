"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaGithub } from "react-icons/fa";
import { Menu } from "lucide-react";
import { IoLogIn } from "react-icons/io5";

import { Logo } from "@/components/logo";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { useNavbar } from "@/hooks/use-navbar";
import { InputComponent } from "@/components/input";
import { UserProfile } from "@/components/auth/user-profile";

const NavItem = () => {
  const session = useSession();
  const pathname = usePathname();

  const encodedCallbackUrl = encodeURIComponent(pathname);

  return (
    <div className="iCordXplorer tems-center flex gap-3">
      <FaGithub className="h-8 w-8 text-neutral-800 dark:text-neutral-100" />
      <ToogleTheme />
      {session.status === "authenticated" ? (
        <UserProfile
          showName={false}
          side="left"
          popoverClassName="mt-[48px]"
        />
      ) : (
        <Link
          href={`/auth/login?redirect_back=${encodedCallbackUrl}`}
          className="btn btn-primary"
        >
          <IoLogIn className="size-10" />
        </Link>
      )}
    </div>
  );
};
export const Navbar = () => {
  const { onOpen } = useNavbar();
  return (
    <header className="fixed top-0 z-[100] h-[72px] w-full border-b bg-background p-6 backdrop-blur-lg">
      <nav className="container-navbar flex h-full items-center">
        <Logo />
        <div className="mx-auto hidden w-[310px] md:block">
          <InputComponent />
        </div>
        <div className="ms-auto md:hidden" onClick={() => onOpen()}>
          <Menu className="h-7 w-7 cursor-pointer text-primary md:h-10 md:w-10" />
        </div>
        <div className="ms-auto hidden md:block">
          <NavItem />
        </div>
      </nav>
    </header>
  );
};
