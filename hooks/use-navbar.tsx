import { create } from "zustand";

interface NavbarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNavbar = create<NavbarState>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
