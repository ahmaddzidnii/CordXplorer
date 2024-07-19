import { cookies } from "next/headers";

export const getToken = async () => {
  const token = cookies().get("authjs.session-token")?.value;

  return token;
};
