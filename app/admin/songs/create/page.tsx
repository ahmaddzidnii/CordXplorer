import { Separator } from "@/components/ui/separator";
import { MediaPlayerAdmin } from "./_components/media-player";

export const metadata = {
  title: "Add Music",
};

export default function SongsAdminCreatePage() {
  return (
    <div className="flex-col flex w-full">
      <div className="flex-1 space-y-4 pt-6">
        <div className=" space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add Music</h2>
          <p className="text-muted-foreground">Add a new music to the list chord.</p>
        </div>
        <Separator className="bg-primary h-[2px]" />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-5">
            <MediaPlayerAdmin />
          </div>
          <div className="space-y-5">TODO: add forms as needed</div>
        </div>
      </div>
    </div>
  );
}
