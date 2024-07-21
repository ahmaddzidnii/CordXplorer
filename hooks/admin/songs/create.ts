import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { MainInformationMusicForm } from "@/app/admin/songs/create/_components/form-music/add-music-form";
import { title } from "process";
import { set } from "zod";

interface SongCreateState {
  song: MainInformationMusicForm;
  setSong: (song: MainInformationMusicForm) => void;
}

export const useSongCreate = create<SongCreateState>((set) => ({
  song: {
    title: "",
    youtubeUrl: "",
  },
  setSong: (song) => set({ song }),
}));

// export const useSongCreate = create(
//   persist<SongCreateState>(
//     (set) => ({
//       song: {
//         title: "",
//         youtubeUrl: "",
//       },
//       setSong: (song) => set({ song }),
//     }),
//     {
//       name: "song-create", // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
//   )
// );
