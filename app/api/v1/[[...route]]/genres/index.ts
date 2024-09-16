import { z } from "zod";
import { Hono } from "hono";
import { UserRole } from "@prisma/client";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { ApiResponse } from "@/utils/backend/structure-response";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const totalItems = await prisma?.genres.count();
    const PER_PAGE = 20;
    const CURRENT_PAGE = 1;
    const totalPages = Math.ceil(totalItems! / PER_PAGE);

    const genres = await prisma?.genres.findMany({
      orderBy: {
        created_at: "asc",
      },
    });

    return c.json(
      ApiResponse.success(200, genres, {
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
  const genre_id = c.req.param("id");
  try {
    const genre = await prisma?.genres.findUnique({
      where: {
        genre_id,
      },
    });

    if (!genre) {
      return c.json(ApiResponse.error(404, ["Genre not found"]), 404);
    }

    return c.json(ApiResponse.success(200, genre), 200);
  } catch (error) {
    console.log(error);
    return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
  }
});

app.post(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      genreName: z.string().min(2),
      genreDescription: z.string().optional(),
    }),
    (result, c) => {
      if (!result.success) {
        return c.json(ApiResponse.error(400, result.error.issues), 400);
      }
    },
  ),
  async (c) => {
    try {
      const { genreName, genreDescription } = c.req.valid("json");

      const auth = c.get("authUser");

      const role = auth?.token?.role as UserRole;

      if (!auth?.session || role !== "ADMIN") {
        return c.json(ApiResponse.error(401, ["Unauthorized"]), 401);
      }

      const existingGenre = await prisma?.genres.findUnique({
        where: {
          genre_name: genreName,
        },
        select: {
          genre_id: true,
        },
      });

      if (existingGenre) {
        return c.json(ApiResponse.error(409, ["Genre already exists"]), 409);
      }

      const data = await prisma?.genres.create({
        data: {
          genre_name: genreName,
          genre_description: genreDescription,
        },
      });

      return c.json(
        ApiResponse.success(201, {
          id: data?.genre_id,
        }),
        201,
      );
    } catch (error) {
      console.log(error);
      return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
    }
  },
);

app.patch(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      genreId: z.string(),
      genreName: z.string().optional(),
      genreDescription: z.string().optional(),
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

      const { genreId, genreDescription, genreName } = c.req.valid("json");

      if (genreName !== undefined && genreName.length < 3) {
        return c.json(
          ApiResponse.error(400, ["Genre name must be at least 3 characters"]),
          400,
        );
      }

      const existingGenre = await prisma?.genres.findUnique({
        where: {
          genre_id: genreId,
        },
        select: {
          genre_id: true,
        },
      });

      if (!existingGenre) {
        return c.json(ApiResponse.error(404, ["Genre not found"]), 404);
      }

      await prisma?.genres.update({
        where: {
          genre_id: genreId,
        },
        data: {
          genre_name: genreName,
          genre_description: genreDescription,
        },
      });

      return c.json(
        ApiResponse.success(200, ["Genre updated successfully"]),
        200,
      );
    } catch (error) {
      console.log(error);
      return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
    }
  },
);

app.delete(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    z.object({
      genreId: z.string(),
    }),
  ),
  async (c) => {
    try {
      const auth = c.get("authUser");

      const role = auth.token?.role as UserRole;

      if (!auth.session || role !== "ADMIN") {
        return c.json(ApiResponse.error(401, ["Unauthorized"]), 401);
      }

      const { genreId } = c.req.valid("json");

      const existingGenre = await prisma?.genres.findUnique({
        where: {
          genre_id: genreId,
        },
        select: {
          genre_id: true,
        },
      });

      if (!existingGenre) {
        return c.json(ApiResponse.error(404, ["Genre not found"]), 404);
      }

      await prisma?.genres.delete({
        where: {
          genre_id: genreId,
        },
      });

      return c.json(
        ApiResponse.success(200, {
          genreId: existingGenre.genre_id,
        }),
        200,
      );
    } catch (error) {
      console.log(error);
      return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
    }
  },
);

export default app;
