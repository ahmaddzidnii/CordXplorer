import { toast } from "sonner";
import { Pen } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArtistsId } from "@/hooks/use-artists-id";

import { useUpdateArtists } from "@/features/admin/artists/api/use-update-artists";

export const ArtistName = ({ initialName }: { initialName: string }) => {
  const artistId = useArtistsId();

  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isPending } = useUpdateArtists({ artistId });

  const queryClient = useQueryClient();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
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

    if (name.trim() === initialName) {
      return;
    }

    mutate(
      { artistName: name },
      {
        onSuccess: () => {
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["artists", artistId],
            }),
            queryClient.invalidateQueries({
              queryKey: ["artists"],
            }),
          ]);
          toast.success("Name updated successfully");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Failed to update name");
          setName(initialName);
        },
      },
    );
  };

  useOnClickOutside(inputRef, handleClose);
  useEventListener("keydown", handleKeyDown);

  return (
    <div className="text-4xl font-bold">
      {isEditing ? (
        <form ref={formRef} onSubmit={onSubmit}>
          <Input
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
            minLength={1}
            maxLength={50}
          />
        </form>
      ) : (
        initialName
      )}
      {!isEditing && (
        <Hint label="Edit name" side="top" align="center">
          <Button
            disabled={isPending}
            onClick={handleEdit}
            variant="transparant"
            size="sm"
          >
            <Pen className="size-4 text-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
