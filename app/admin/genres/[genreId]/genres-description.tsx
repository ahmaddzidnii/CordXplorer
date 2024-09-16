import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useGenreId } from "@/hooks/use-genre-id";
import { useUpdateGenres } from "@/features/admin/genres/api/use-update-genres";

export const GenresDescription = ({
  initiaDescription,
}: {
  initiaDescription: string;
}) => {
  const genreId = useGenreId();
  const [description, setDescription] = useState(initiaDescription);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isPending } = useUpdateGenres({ genreId });

  const queryClient = useQueryClient();

  const formRef = useRef<ElementRef<"form">>(null);
  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const handleClose = () => {
    formRef.current?.requestSubmit();
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }

    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (description.trim() === initiaDescription) return;

    mutate(
      { genreDescription: description },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["genres", genreId],
          });
          toast.success("Description updated successfully");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Failed to update description");
        },
      },
    );
  };

  useOnClickOutside(textAreaRef, handleClose);
  useEventListener("keydown", handleKeyDown);

  return (
    <div className="group relative rounded-xl bg-muted-foreground/15 p-3.5 md:w-[768px]">
      {isEditing ? (
        <form ref={formRef} onSubmit={onSubmit}>
          <Textarea
            disabled={isPending}
            ref={textAreaRef}
            className="w-full resize-none bg-transparent p-0 scrollbar-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      ) : (
        <p>{description ? description : "No description available"}</p>
      )}

      {!isEditing && (
        <Hint label="Edit bio" side="top" align="center">
          <Button
            disabled={isPending}
            onClick={handleEdit}
            variant="transparant"
            className="invisible absolute right-0 top-0 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
            size="sm"
          >
            <Pen className="size-4 text-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
