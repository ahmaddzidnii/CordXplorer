import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menu-admin-items";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { isActive } from "@/app/admin/_components/is-active";
import { UserProfile } from "@/components/auth/user-profile";

export const SidebarDekstop = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 max-h-screen w-56 flex-col items-center justify-between px-4 pt-5 shadow-sm shadow-primary",
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div>
          <Logo />
        </div>
        {menuItems.map((item, id) => (
          <div
            key={id}
            className={cn(
              "flex w-full rounded-lg",
              isActive(item.href, pathname) && "sidebar-admin-active",
            )}
          >
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={() => {
                router.push(item.href);
              }}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Button>
          </div>
        ))}
      </div>
      <div className="w-full space-y-4 pb-5">
        <div className="flex items-center gap-x-4">
          <ToogleTheme />
          <p className="font-semibold">Theme mode</p>
        </div>
        <UserProfile popoverClassName="ml-5" />
      </div>
    </aside>
  );
};
