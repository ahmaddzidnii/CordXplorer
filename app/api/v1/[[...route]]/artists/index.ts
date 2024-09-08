import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { ApiResponse } from "@/utils/backend/structure-response";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const artists = await prisma?.artist.findMany({
      orderBy: {
        created_at: "asc",
      },
    });

    return c.json(
      ApiResponse.success(200, artists, {
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        hasNextPage: false,
        itemsPerPage: 1,
      }),
      200,
    );
  } catch (error) {
    console.log(error);
    return c.json(ApiResponse.error(500, ["Internal Server Error"]), 500);
  }
});

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
