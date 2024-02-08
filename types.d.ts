type SongMetadata = {
  slug: string;
  song_info: {
    title: string;
    artist: string;
    album: string;
    release_date: string;
    label: string;
    cover_image: string;
    youtube_url: string;
  };
};

type SongSection = {
  id: string;
  type: string;
  text_uppercase: string;
  start_time: number;
  end_time: number;
  content: {
    type: string;
    content: string;
    margin_top: boolean;
  }[];
};

type SongData = {
  key: string;
  sections: SongSection[];
};

export interface ResponseSong {
  metadata: SongMetadata;
  data: SongData;
}
