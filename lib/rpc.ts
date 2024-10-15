import { hc } from "hono/client";

import { AppType } from "@/app/api/v1/[[...route]]/route";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const client = hc<AppType>(baseUrl);
