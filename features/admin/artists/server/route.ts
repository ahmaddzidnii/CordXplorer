import { z } from "zod";
import { Hono } from "hono";
import { UserRole } from "@prisma/client";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { ApiResponse } from "@/lib/response-api";

const app = new Hono()
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        artistName: z.string(),
        artistBio: z.string().optional(),
        artistImage: z.string(),
      }),
    ),

    async (c) => {
      try {
        const auth = c.get("authUser");

        if (!auth.session) {
          return c.json(ApiResponse.error("Unauthorized"), 401);
        }

        const { artistName, artistBio, artistImage } = c.req.valid("json");

        const role = auth?.token?.role as UserRole;

        if (!auth?.session || role !== "ADMIN") {
          return c.json(ApiResponse.error("Unauthorized"), 401);
        }

        const existingArtist = await prisma?.artist.findUnique({
          where: {
            artist_name: artistName.trim(),
          },
          select: {
            id: true,
          },
        });

        if (existingArtist) {
          return c.json(
            ApiResponse.error("Artist with this name already exists"),
            409,
          );
        }

        const data = await prisma?.artist.create({
          data: {
            artist_name: artistName,
            artist_image: artistImage,
            artist_bio: artistBio,
          },
        });

        return c.json({
          error: false,
          msg: "Artist created successfully",
          data,
        });
      } catch (error) {
        console.error(error);
        return c.json(ApiResponse.error("Internal server error"), 500);
      }
    },
  )
  .get("/", async (c) => {
    try {
      const artists = await prisma?.artist.findMany({
        orderBy: {
          created_at: "asc",
        },
      });

      return c.json(
        ApiResponse.success(artists, "Artists fetched successfully"),
      );
    } catch (error) {
      console.log(error);
      return c.json(ApiResponse.error("Internal server error"), 500);
    }
  })
  .get(
    "/:artistId",
    zValidator(
      "param",
      z.object({
        artistId: z.string(),
      }),
    ),
    async (c) => {
      const artistId = c.req.valid("param");
      try {
        const artist = await prisma?.artist.findUnique({
          where: {
            id: artistId.artistId,
          },
        });

        if (!artist) {
          return c.json(ApiResponse.error("Artist not found"), 404);
        }

        return c.json(
          ApiResponse.success(artist, "Artist fetched successfully"),
        );
      } catch (error) {
        console.log(error);
        return c.json(ApiResponse.error("Internal server error"), 500);
      }
    },
  )
  .patch(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        artistId: z.string(),
        artistName: z.string().optional(),
        artistBio: z.string().optional(),
        artistImage: z.string().optional(),
      }),
    ),
    async (c) => {
      try {
        const auth = c.get("authUser");

        if (!auth.session) {
          return c.json(ApiResponse.error("Unauthorized"), 401);
        }

        const { artistId, artistName, artistBio, artistImage } =
          c.req.valid("json");
        const artist = await prisma?.artist.findUnique({
          where: {
            id: artistId,
          },
          select: {
            id: true,
          },
        });

        if (!artist) {
          return c.json(ApiResponse.error("Artist not found"), 404);
        }

        await prisma?.artist.update({
          where: {
            id: artist.id,
          },
          data: {
            artist_name: artistName,
            artist_bio: artistBio,
            artist_image: artistImage,
          },
        });

        return c.json(ApiResponse.success(null, "Artist updated successfully"));
      } catch (error) {
        console.log(error);
        return c.json(ApiResponse.error("Internal server error"), 500);
      }
    },
  )
  .delete(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        artistId: z.string(),
      }),
    ),
    async (c) => {
      try {
        const { artistId } = c.req.valid("json");

        const artist = await prisma?.artist.findUnique({
          where: {
            id: artistId,
          },
          select: {
            id: true,
          },
        });

        if (!artist) {
          return c.json(ApiResponse.error("Artist not found"), 404);
        }

        await prisma?.artist.delete({
          where: {
            id: artist.id,
          },
        });

        return c.json(ApiResponse.success(null, "Artist deleted successfully"));
      } catch (error) {
        console.log(error);
        return c.json(ApiResponse.error("Internal server error"), 500);
      }
    },
  );

export default app;
