import { create } from "zustand";

interface UseCreateArtistModal {
  id: string | undefined;
  open: boolean;
  setOpen: (open: boolean, id: string | undefined) => void;
}

export const useCreateArtistsModal = create<UseCreateArtistModal>((set) => ({
  id: undefined,
  open: false,
  setOpen: (open, id) => set({ open, id }),
}));
