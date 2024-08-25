// authors.ts
import { Hono } from "hono";
import queryString from "query-string";

import { ApiResponse } from "@/utils/backend/structure-response";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

app.get("/", async (c) => {
  // const fetchToDb = new Promise<Song>((resolve) => {
  //   setTimeout(() => {
  //     resolve(song);
  //   }, 1000);
  // });

  try {
    const songs = await prisma?.songs.findMany({
      include: {
        sections: {
          select: {
            id: true,
            section_index: true,
            section_name: true,
            section_content: true,
            start_time: true,
            end_time: true,
          },
        },
        artists: {
          select: {
            artist: {
              select: {
                id: true,
                artist_name: true,
                artist_image: true,
              },
            },
          },
        },
      },
    });

    if (!songs) {
      return c.json(
        {
          message: "No songs found",
        },
        404,
      );
    }

    const data = songs.map((song) => {
      return {
        id: song.id,
        title: song.songs_title,
        slug: song.slug,
        artists: song.artists.map((artist) => {
          return {
            id: artist.artist.id,
            name: artist.artist.artist_name,
            image: artist.artist.artist_image,
          };
        }),
        coverImage: song.cover_image,
        genre: song.genre.trim().split(","),
        youtubeUrl: song.youtube_url,
        key: song.songs_key.trim().split(","),
        publisher: song.publisher.toUpperCase(),
        album: song.album,
        releaseYear: 2021,
        sections: song.sections.map((section) => {
          return {
            id: section.id,
            sectionIndex: section.section_index,
            sectionName: section.section_name,
            content: section.section_content,
            startTime: section.start_time,
            endTime: section.end_time,
          };
        }),
      };
    });

    console.log(c.req.url);
    return c.json(ApiResponse.success(200, data), 200);
  } catch (error) {
    console.log(error);
    return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
  }
});

// Define the structure of the song with optional 'artists' and 'sections'
interface SongWithOptionalDetails {
  id: string;
  slug: string;
  songs_title: string;
  cover_image: string;
  youtube_url: string;
  release_year: number;
  songs_key: string;
  album: string;
  genre: string;
  publisher: string;
  created_at: Date;
  updated_at: Date;
  artists?: {
    artist: {
      id: string;
      artist_name: string;
    };
  }[];
  sections?: {
    id: string;
    section_index: number;
    section_name: string;
    section_content: string;
    start_time: number;
    end_time: number;
  }[];
}

app.get(
  "/:id",
  zValidator(
    "query",
    z.object({
      full: z
        .string()
        .refine(
          (value) => {
            const truthy = ["true", "false"];
            return truthy.includes(value);
          },
          {
            message: "Query full must be a boolean.",
          },
        )
        .optional(),
    }),
    (result, c) => {
      if (!result.success) {
        return c.json(ApiResponse.error(400, result.error.issues), 400);
      }
    },
  ),
  async (c) => {
    try {
      const id = c.req.param("id");

      const parsed = queryString.parseUrl(c.req.url, {
        parseBooleans: true,
      });

      const { full } = parsed.query as any;

      const includeOptions = {
        artists: {
          select: {
            artist: {
              select: {
                id: true,
                artist_name: true,
              },
            },
          },
        },
        sections: {
          select: {
            id: true,
            section_index: true,
            section_name: true,
            section_content: true,
            start_time: true,
            end_time: true,
          },
        },
      };

      const song = (await prisma?.songs.findUnique({
        where: {
          id,
        },
        include: full ? includeOptions : undefined,
      })) as SongWithOptionalDetails;

      const response: any = {
        id: song?.id,
        title: song?.songs_title,
        slug: song?.slug,
        coverImage: song?.cover_image,
        genre: song?.genre.trim().split(","),
        youtubeUrl: song?.youtube_url,
        key: song?.songs_key.trim().split(","),
        publisher: song?.publisher.toUpperCase(),
        album: song?.album,
        releaseYear: song?.release_year,
      };

      if (full) {
        response.artists =
          song?.artists?.map((artist) => ({
            id: artist.artist.id,
            name: artist.artist.artist_name,
          })) || [];

        response.sections =
          song?.sections?.map((section) => ({
            id: section.id,
            sectionIndex: section.section_index,
            sectionName: section.section_name,
            content: section.section_content,
            startTime: section.start_time,
            endTime: section.end_time,
          })) || [];
      }

      return c.json(ApiResponse.success(200, response));
    } catch (error) {
      console.log(error);
      return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
    }
  },
);

export default app;
