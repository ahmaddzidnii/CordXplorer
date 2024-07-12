import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { IoMusicalNoteSharp } from "react-icons/io5";

interface ButtonAddSectionProps {
  isSectionEmpty: boolean;
}

const AddSection = ({ isSectionEmpty }: { isSectionEmpty?: boolean }) => {
  return (
    <div className={cn(" w-full  mx-auto", !isSectionEmpty && "xl:w-[512px]")}>
      <Button className="w-full">
        <Plus className="w-6 h-6 mr-4" />
        Add Section Song
      </Button>
    </div>
  );
};

export const ButtonAddSection = ({ isSectionEmpty }: ButtonAddSectionProps) => {
  if (isSectionEmpty) {
    return (
      <div className="flex h-[450px] shrink-0 items-center justify-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <IoMusicalNoteSharp className="w-12 h-12 fill-primary" />
          <h3 className="mt-4 text-lg font-semibold">No section added</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            You have not added any section. Add below.
          </p>
          <AddSection isSectionEmpty={isSectionEmpty} />
        </div>
      </div>
    );
  }
  return <AddSection />;
};
