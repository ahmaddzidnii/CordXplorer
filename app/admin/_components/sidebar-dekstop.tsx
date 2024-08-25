import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menu-admin-items";
import { Logo } from "@/components/logo";
import { isActive } from "@/app/admin/_components/is-active";

export const SidebarDekstop = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 max-h-screen w-64 flex-col items-center border bg-primary-foreground px-4 pt-5",
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
              isActive(item.href, pathname) && "bg-secondary",
            )}
          >
            <div
              className="flex w-full cursor-pointer items-center rounded-lg p-3"
              onClick={() => {
                router.push(item.href);
              }}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
