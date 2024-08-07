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
        "w-56 pt-5 px-4 sticky top-0  max-h-screen shadow-sm shadow-primary flex-col items-center justify-between",
        className
      )}
    >
      <div className="space-y-4 flex flex-col items-center">
        <div>
          <Logo />
        </div>
        {menuItems.map((item, id) => (
          <div
            key={id}
            className={cn(
              "flex w-full rounded-lg",
              isActive(item.href, pathname) && "sidebar-admin-active"
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
      <div className="space-y-4 pb-5 w-full">
        <div className="flex items-center gap-x-4">
          <ToogleTheme />
          <p className="font-semibold">Theme mode</p>
        </div>
        <UserProfile popoverClassName="ml-5" />
      </div>
    </aside>
  );
};
