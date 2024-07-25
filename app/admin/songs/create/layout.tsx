import { Separator } from "@/components/ui/separator";
import { PreventRefresh } from "@/utils/prevent-refersh";

export default function SongsAdminCreatePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className=" space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Music</h2>
        <p className="text-muted-foreground">Add a new music to the list chord.</p>
      </div>
      <Separator className="bg-primary h-[2px] my-5" />

      <PreventRefresh>{children}</PreventRefresh>
    </div>
  );
}
