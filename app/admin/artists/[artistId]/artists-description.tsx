import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateArtists } from "@/features/admin/artists/api/use-update-artists";
import { useArtistsId } from "@/hooks/use-artists-id";

export const ArtistDescription = ({ description }: { description: string }) => {
  const artistId = useArtistsId();
  const [bio, setBio] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isPending } = useUpdateArtists({ artistId });

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

    if (bio === description) {
      return;
    }

    mutate(
      { artistBio: bio },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["artists", artistId],
          });
          toast.success("Bio updated successfully");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Failed to update bio");
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
            className="w-full resize-none bg-transparent p-0 scrollbar-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </form>
      ) : (
        <p>{description ? description : "No bio available"}</p>
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
