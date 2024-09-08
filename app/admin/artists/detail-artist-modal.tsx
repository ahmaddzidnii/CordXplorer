import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateArtistsModal } from "@/store/modal/use-create-artists-modal";

export const DetailArtistModal = () => {
  const { id, open, setOpen } = useCreateArtistsModal();
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false, undefined);
      }}
    >
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle> {id}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
