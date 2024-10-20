import { toast } from "sonner";
import { FormEvent, useState } from "react";
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

import { useCreateArtistModal } from "@/features/admin/artists/store/use-create-artist-modal";
import { useCreateArtist } from "@/features/admin/artists/api/use-create-artists";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export const CreateArtistModal = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateArtist();
  const { open, setOpen } = useCreateArtistModal();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        json: {
          artistName: name,
          artistBio: bio,
          artistImage: image,
        },
      },
      {
        onSuccess: (data) => {
          toast.success(data.msg);
          router.replace(`/admin/artists/${data.data?.id!!}`);
          queryClient.invalidateQueries({
            queryKey: ["artists"],
          });
          setName("");
          setBio("");
          setImage("");

          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Artist</DialogTitle>
        </DialogHeader>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Artist Name</Label>
              <Input
                id="name"
                disabled={isPending}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Artist name"
                required
                maxLength={100}
                minLength={2}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Artist Bio</Label>
              <Textarea
                id="bio"
                disabled={isPending}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Artist bio"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Artist Image</Label>
              <Input
                id="picture"
                disabled={isPending}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Artist image"
                required
                minLength={2}
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
