import { useWindowWidth } from "@react-hook/window-size";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IoIosArrowDropright } from "react-icons/io";

import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menu-admin-items";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { isActive } from "@/app/admin/_components/is-active";
import { UserProfile } from "@/components/auth/user-profile";
import Image from "next/image";

export const SidebarMobile = ({ className }: { className?: string }) => {
  const { isOpen, onClose, onOpen } = useSidebar();

  const router = useRouter();
  const pathname = usePathname();
  const width = useWindowWidth();

  useEffect(() => {
    const isMobile = width < 768;
    if (!isMobile) {
      onClose();
    }
  }, [width, onClose]);

  return (
    <>
      {/* Sheet Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left">
          {/* TODO: add navbar in sheet */}
        </SheetContent>
      </Sheet>

      {/* Sheet Sidebar */}

      <aside
        className={cn(
          "sticky top-0 flex max-h-screen w-16 flex-col items-center justify-between border-e pt-5",
          className,
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <div>
            <Button
              variant="ghost"
              onClick={() => {
                onOpen();
              }}
            >
              <IoIosArrowDropright className="h-7 w-7" />
            </Button>
          </div>
          <div>
            <Image
              src="/logo.svg"
              alt="logo"
              className="aspect-square"
              width={32}
              height={32}
            />
          </div>
          {menuItems.map((item, id) => (
            <div
              key={id}
              className={cn(
                "flex w-full",
                isActive(item.href, pathname) && "sidebar-admin-active",
              )}
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
          <UserProfile showName={false} popoverClassName="ml-5" />
        </div>
      </aside>
    </>
  );
};
