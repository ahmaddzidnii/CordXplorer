import { Hono } from "hono";
import { handle } from "hono/vercel";
import { initAuthConfig } from "@hono/auth-js";

import authConfig from "@/auth.config";

import songs from "@/features/admin/songs/server/route";
import artists from "@/features/admin/artists/server/route";

export const maxDuration = 25;

const app = new Hono().basePath("/api/v1/");

app.use(
  "*",
  initAuthConfig(() => {
    return authConfig;
  }),
);

const routes = app.route("/artists", artists).route("/songs", songs);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
