import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { signIn } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import Image from "next/image";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: {
    redirect_back: string;
  };
}) {
  const callbackUrl = searchParams.redirect_back;
  return (
    <div className="grid h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="flex h-full w-full items-center justify-center">
        <Card className="lg:[500px] w-[calc(100%-60px)] text-center md:w-[350px]">
          <CardHeader>
            <h1 className="text-balance text-lg font-semibold md:text-2xl">
              Welcome Back to
            </h1>
            <Logo />
          </CardHeader>
          <CardContent>
            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
                });
              }}
            >
              <button
                type="submit"
                className="group h-10 rounded-full border-2 border-gray-300 px-6 transition duration-100 hover:border-blue-400 md:h-12"
              >
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="aspect-square"
                    alt="google logo"
                    width={20}
                    height={20}
                  />
                  <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-100 group-hover:text-blue-600 dark:text-white sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden items-center justify-center bg-muted-foreground/5 p-5 md:flex">
        <div className="relative hidden h-full w-full items-center dark:flex">
          <Image fill src="/svg-ui/svg-login-dark.svg" alt="svg-login" />
        </div>
        <div className="relative flex h-full w-full items-center dark:hidden">
          <Image fill src="/svg-ui/svg-login-light.svg" alt="svg-login" />
        </div>
      </div>
    </div>
  );
}
