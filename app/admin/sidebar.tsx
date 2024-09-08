import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaMicrophoneLines } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMusicalNoteSharp } from "react-icons/io5";

import { SidebarButton } from "./sidebar-button";
import { UserProfile } from "@/components/auth/user-profile";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { isActive } from "./_components/is-active";
import Image from "next/image";

export const SidebarAdmin = () => {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#481349] pb-4 pt-[9px]">
      <div className="mt-3 flex aspect-square items-center justify-center rounded-full">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <SidebarButton
          icon={MdDashboard}
          label="Dashboard"
          href="/admin"
          isActive={isActive("/admin", pathname)}
        />
        <SidebarButton
          icon={IoMusicalNoteSharp}
          label="Music"
          href="/admin/songs"
          isActive={isActive("/admin/songs", pathname)}
        />
        <SidebarButton
          icon={BiSolidCategoryAlt}
          label="Genres"
          href="/admin/genres"
          isActive={isActive("/admin/genres", pathname)}
        />
        <SidebarButton
          icon={FaMicrophoneLines}
          label="Artists"
          href="/admin/artists"
          isActive={isActive("/admin/artists", pathname)}
        />
      </div>
      <div className="mt-auto flex flex-col items-center justify-center gap-y-2.5">
        <ToogleTheme />
        <UserProfile showName={false} />
      </div>
    </aside>
  );
};
