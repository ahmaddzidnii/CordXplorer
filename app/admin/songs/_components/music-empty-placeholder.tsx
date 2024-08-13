import { IoMusicalNoteSharp } from "react-icons/io5";
import { AddMusic } from "./add-music";

export const MusicEmptyPlaceholder = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <IoMusicalNoteSharp className="h-12 w-12 fill-primary" />
        <h3 className="mt-4 text-lg font-semibold">No music added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any music. Add one below.
        </p>
        <AddMusic />
      </div>
    </div>
  );
};
