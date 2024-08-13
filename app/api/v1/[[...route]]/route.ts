import { Hono } from "hono";
import { handle } from "hono/vercel";
import { initAuthConfig, verifyAuth } from "@hono/auth-js";

import authConfig from "@/auth.config";
import { Song, song } from "@/data";

export const maxDuration = 25;

const app = new Hono().basePath("/api/v1/");

app.use(
  "*",
  initAuthConfig(() => {
    return authConfig;
  }),
);

// app.use("*", verifyAuth());

app.get("/verify", verifyAuth(), async (c) => {
  try {
    const auth = c.get("authUser");
    return c.json({ session: auth.session });
  } catch (error) {
    console.log(error);
    return c.json({
      message: "Error",
    });
  }
});

app.get("/songs", async (c) => {
  const fetchToDb = new Promise<Song>((resolve) => {
    setTimeout(() => {
      resolve(song);
    }, 2000);
  });

  try {
    const data = await fetchToDb;
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json({
      message: "Error",
    });
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
