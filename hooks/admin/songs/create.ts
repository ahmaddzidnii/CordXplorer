import { create } from "zustand";

import { SongsCreateDto } from "@/dto/admin/songs/create";
interface SongCreateState {
  song: SongsCreateDto;
  setSong: (song: SongsCreateDto) => void;
}

export const useSongCreate = create<SongCreateState>((set) => ({
  song: {
    title: "",
    youtubeUrl: "",
    key: "",
    publisher: "",
    releaseYear: "",
    genre: "",
    artists: [],
    sections: [],
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
