import { Separator } from "@/components/ui/separator";
import { MediaPlayerAdmin } from "./_components/media-player";
import FormAddMusic from "./_components/form-music";
import { FormSection } from "./_components/form-section/form-section";

export const metadata = {
  title: "Add Music",
};

export default function SongsAdminCreatePage() {
  return (
    <div className="flex-col flex w-full">
      <div className="flex-1 space-y-5 pt-6">
        <div className=" space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add Music</h2>
          <p className="text-muted-foreground">Add a new music to the list chord.</p>
        </div>
        <Separator className="bg-primary h-[2px]" />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="space-y-5">
            <MediaPlayerAdmin />
          </div>
          <div className="space-y-5 order-first">
            <FormAddMusic />
          </div>
        </div>

        {/* Section Add Song */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Add Section Song</h3>
          <p className="text-muted-foreground">Add a new section to the song.</p>
          <FormSection />
        </div>
        {/* Section Add Song */}
      </div>
    </div>
  );
}
