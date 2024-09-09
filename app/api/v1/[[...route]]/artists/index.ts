import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { ApiResponse } from "@/utils/backend/structure-response";
import { verifyAuth } from "@hono/auth-js";
import { UserRole } from "@prisma/client";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const totalItems = await prisma?.artist.count();
    const PER_PAGE = 20;
    const CURRENT_PAGE = 1;
    const totalPages = Math.ceil(totalItems! / PER_PAGE);

    const artists = await prisma?.artist.findMany({
      orderBy: {
        created_at: "asc",
      },
    });

    return c.json(
      ApiResponse.success(200, artists, {
        currentPage: CURRENT_PAGE,
        totalPages,
        totalItems: totalItems!,
        hasNextPage: totalPages > CURRENT_PAGE,
        itemsPerPage: PER_PAGE,
      }),
      200,
    );
  } catch (error) {
    console.log(error);
    return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
  }
});

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const artist = await prisma?.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      return c.json(ApiResponse.error(404, ["Artist not found"]), 404);
    }

    return c.json(ApiResponse.success(200, artist), 200);
  } catch (error) {
    console.log(error);
    return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
  }
});

app.patch(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      artistId: z.string(),
      artistName: z.string().optional(),
      artistImage: z.string().optional(),
      artistBio: z.string().optional(),
    }),
    (result, c) => {
      if (!result.success) {
        return c.json(ApiResponse.error(400, result.error.issues), 400);
      }
    },
  ),
  async (c) => {
    try {
      const auth = c.get("authUser");

      const role = auth.token?.role as UserRole;

      if (!auth.session || role !== "ADMIN") {
        return c.json(ApiResponse.error(401, ["Unauthorized"]), 401);
      }

      const { artistId, artistName, artistImage, artistBio } =
        c.req.valid("json");

      if (artistName !== undefined && artistName.length < 3) {
        return c.json(
          ApiResponse.error(400, ["Artist name must be at least 3 characters"]),
          400,
        );
      }

      const existingArtist = await prisma?.artist.findUnique({
        where: {
          id: artistId,
        },
        select: {
          id: true,
        },
      });

      if (!existingArtist) {
        return c.json(ApiResponse.error(404, ["Artist not found"]), 404);
      }

      await prisma?.artist.update({
        where: {
          id: existingArtist.id,
        },
        data: {
          artist_name: artistName,
          artist_image: artistImage,
          artist_bio: artistBio,
        },
      });

      return c.json(
        ApiResponse.success(200, ["Artist updated successfully"]),
        200,
      );
    } catch (error) {
      console.log(error);
      return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
    }
  },
);

app.post(
  "/",
  zValidator("query", z.object({ name: z.string() }), (result, c) => {
    if (!result.success) {
      return c.json(ApiResponse.error(400, result.error.issues), 400);
    }
  }),
  zValidator(
    "json",
    z.object({
      name: z.string(),
      age: z.number(),
    }),
    (result, c) => {
      if (!result.success) {
        return c.json(ApiResponse.error(400, result.error.issues), 400);
      }
    },
  ),
  (c) => {
    return c.json({ message: "Success" });
  },
);

export default app;
