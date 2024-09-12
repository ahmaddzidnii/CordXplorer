import { create } from "zustand";

interface UseCreateArtistModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCreateArtistModal = create<UseCreateArtistModal>((set) => ({
  open: false,
  setOpen: (open) => {
    set({ open });
  },
}));
