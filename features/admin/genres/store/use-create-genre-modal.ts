import { create } from "zustand";

interface UseCreateGenreModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCreateGenreModal = create<UseCreateGenreModal>((set) => ({
  open: false,
  setOpen: (open) => {
    set({ open });
  },
}));
