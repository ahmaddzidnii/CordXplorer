import { H1 } from "@/components/typography/h1";
import { P } from "@/components/typography/p";
import { Separator } from "@/components/ui/separator";
import { PreventRefresh } from "@/utils/prevent-refersh";

export default function SongsAdminCreatePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="space-y-2">
        <H1 className="text-3xl font-bold tracking-tight">Add Music</H1>
        <P className="text-muted-foreground">Add a new music to the list chord.</P>
      </div>
      <Separator className="bg-primary h-[2px] my-5" />

      <PreventRefresh>{children}</PreventRefresh>
    </div>
  );
}
