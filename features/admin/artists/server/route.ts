import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyAuth } from "@hono/auth-js";
import { UserRole } from "@prisma/client";
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
  );

export default app;
