import { MAX_CHORDS_INDEX } from "@/features/client/transpose/constants/chord-index";
import { create } from "zustand";

interface UseTransposeState {
  tranpose: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useTransposeState = create<UseTransposeState>((set) => ({
  tranpose: 0,
  increment: () =>
    set((state) => {
      if (state.tranpose === MAX_CHORDS_INDEX) {
        return { tranpose: 0 };
      } else {
        return { tranpose: state.tranpose + 1 };
      }
    }),
  decrement: () =>
    set((state) => {
      if (state.tranpose === -MAX_CHORDS_INDEX) {
        return { tranpose: 0 };
      } else {
        return { tranpose: state.tranpose - 1 };
      }
    }),
  reset: () => set({ tranpose: 0 }),
}));
