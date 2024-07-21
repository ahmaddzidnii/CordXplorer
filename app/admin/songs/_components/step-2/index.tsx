"use client";
import { useSongCreate } from "@/hooks/admin/songs/create";
import { FormSection } from "../../create/_components/form-section/form-section";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

const Step2Component = () => {
  const { song } = useSongCreate();
  const router = useRouter();
  if (!song.title) {
    // router.replace("?step=1");
  }
  return (
    <div className="flex-col flex w-full">
      <h3 className="text-2xl font-bold tracking-tight">Add Section Song</h3>
      <p className="text-muted-foreground">Add a new section to the song.</p>
      <Card>
        <CardContent>tes</CardContent>
      </Card>
      <FormSection />
    </div>
  );
};

export default Step2Component;
