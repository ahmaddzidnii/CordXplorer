import { useWindowWidth } from "@react-hook/window-size";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IoIosArrowDropright } from "react-icons/io";

import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menu-admin-items";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { isActive } from "@/app/admin/_components/is-active";
import { UserProfile } from "@/components/auth/user-profile";

export const SidebarMobile = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const width = useWindowWidth();

  useEffect(() => {
    const isMobile = width < 768;
    if (!isMobile) {
      onClose();
    }
  }, [width]);

  const { isOpen, onClose, onOpen } = useSidebar();
  return (
    <>
      {/* Sheet Sidebar */}
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent side="left">{/* TODO: add navbar in sheet */}</SheetContent>
      </Sheet>

      {/* Sheet Sidebar */}

      <aside
        className={cn(
          "w-16 pt-5 shadow-sm shadow-primary sticky top-0 max-h-screen flex flex-col items-center justify-between",
          className
        )}
      >
        <div className="space-y-4 flex flex-col items-center">
          <div>
            <Button
              variant="ghost"
              onClick={() => {
                onOpen();
              }}
            >
              <IoIosArrowDropright className="w-7 h-7" />
            </Button>
          </div>
          <div>
            <img
              src="/logo.svg"
              alt="logo"
              className="w-8 h-8 aspect-square"
            />
          </div>
          {menuItems.map((item, id) => (
            <div
              key={id}
              className={cn("flex w-full", isActive(item.href, pathname) && "sidebar-admin-active")}
            >
              <Button
                className="items-center justify-center hover:bg-transparent"
                variant="ghost"
                onClick={() => {
                  router.push(item.href);
                }}
              >
                {item.icon}
              </Button>
            </div>
          ))}
        </div>
        <div className="space-y-4 pb-5">
          <ToogleTheme />
          <UserProfile showName={false} />
        </div>
      </aside>
    </>
  );
};
