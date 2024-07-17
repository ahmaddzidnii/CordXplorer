import { useSession } from "next-auth/react";

export const useUser = () => {
  let isLoading, user, isLoggedIn;
  const session = useSession();

  if (session.status === "loading") {
    isLoading = true;
  } else if (session.status === "unauthenticated") {
    isLoggedIn = false;
  } else if (session.status === "authenticated") {
    isLoggedIn = true;
  }

  isLoading = false;

  if (!session.data?.user) {
    user = null;
  } else {
    user = session.data.user;
  }

  return {
    user,
    isLoading,
    isLoggedIn,
  };
};
