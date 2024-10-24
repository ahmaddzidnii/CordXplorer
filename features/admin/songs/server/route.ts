import { z } from "zod";
import { Hono } from "hono";
import { UserRole } from "@prisma/client";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { ApiResponse } from "@/lib/response-api";

const app = new Hono()
  .get("/", async (c) => {
    const songs = await prisma?.songs.findMany({
      include: {
        artists: {
          select: {
            artist_id: true,
            artist: {
              select: {
                artist_name: true,
                artist_image: true,
              },
            },
          },
        },
      },
    });

    const data = songs?.map((song) => {
      return {
        ...song,
        artists: song.artists.map((artist) => ({
          artist_id: artist.artist_id,
          artist_name: artist.artist.artist_name,
          artist_image: artist.artist.artist_image,
        })),
      };
    });

    return c.json(ApiResponse.success(data, "Songs fetched successfully"));
  })
  .get("/count", async (c) => {
    const count = await prisma?.songs.count();
    return c.json(
      ApiResponse.success(count, "Songs count fetched successfully"),
    );
  });

export default app;
