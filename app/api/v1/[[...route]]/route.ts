import { Hono } from "hono";
import { handle } from "hono/vercel";
import { initAuthConfig, verifyAuth } from "@hono/auth-js";
import authConfig from "@/auth.config";

import songs from "./songs";
import artists from "./artists";

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

app.route("/songs", songs);
app.route("/artists", artists);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
