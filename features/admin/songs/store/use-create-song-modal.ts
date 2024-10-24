import { create } from "zustand";

interface UseCreateSongModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateSongModal = create<UseCreateSongModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
