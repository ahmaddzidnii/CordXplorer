import { ApiResponse } from "@/utils/backend/structure-response";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const artists = await prisma?.artist.findMany({
      include: {
        songs: {
          select: {
            song: true,
          },
        },
      },
    });

    return c.json(ApiResponse.success(200, artists), 200);
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
