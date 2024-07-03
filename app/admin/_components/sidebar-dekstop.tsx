import { useWindowWidth } from "@react-hook/window-size/throttled";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menu-admin-items";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";

export const SidebarDekstop = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "w-56 pt-5 px-4 sticky top-0 border-e-2 max-h-screen shadow-lg flex-col items-center justify-between",
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
            className={cn("flex w-full rounded-lg", pathname === item.href && "bg-fuchsia-300")}
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
      <div className="space-y-4 pb-5">
        <div className="flex items-center gap-x-4">
          <ToogleTheme />
          <p className="font-semibold">Theme</p>
        </div>
        <div className="flex items-center gap-x-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-semibold">Admin</p>
        </div>
      </div>
    </aside>
  );
};
