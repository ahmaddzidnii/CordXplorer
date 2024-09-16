import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateGenres } from "@/features/admin/genres/api/use-create-genres";
import { useCreateGenreModal } from "@/features/admin/genres/store/use-create-genre-modal";

export const CreateGenreModal = () => {
  const [genreName, setGenreName] = useState("");
  const [genreDescription, setGenreDescription] = useState("");

  const { mutate, isPending } = useCreateGenres();

  const router = useRouter();

  const { open, setOpen } = useCreateGenreModal();

  const queryClient = useQueryClient();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        genreName,
        genreDescription,
      },
      {
        onSuccess: (data) => {
          router.replace(data.data.data.id);
          queryClient.invalidateQueries({
            queryKey: ["genres"],
          });
          toast.success("Genre created successfully");

          setGenreName("");
          setGenreDescription("");

          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to create genre");
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Genre</DialogTitle>
        </DialogHeader>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Genre Name</Label>
              <Input
                id="name"
                disabled={isPending}
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
                placeholder="Genre name"
                required
                maxLength={100}
                minLength={2}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Genre Description</Label>
              <Input
                id="descirption"
                disabled={isPending}
                value={genreDescription}
                onChange={(e) => setGenreDescription(e.target.value)}
                placeholder="Genre bio"
              />
            </div>
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button disabled={isPending}>Create</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
