import { create } from "zustand";

interface UseTransposeSwitcher {
  isTranpose: boolean;
  toggleTransposeSwitcher: () => void;
}

export const useTransposeSwitcher = create<UseTransposeSwitcher>((set) => ({
  isTranpose: false,
  toggleTransposeSwitcher: () =>
    set((state) => ({ isTranpose: !state.isTranpose })),
}));
