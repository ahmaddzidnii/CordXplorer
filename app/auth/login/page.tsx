import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { signIn } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/logo";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: {
    redirect_back: string;
  };
}) {
  const callbackUrl = searchParams.redirect_back;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="w-full h-full flex items-center justify-center">
        <Card className="text-center w-[calc(100%-60px)] md:w-[350px] lg:[500px]">
          <CardHeader>
            <h1 className="text-lg md:text-2xl text-balance font-semibold">Welcome Back to</h1>
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
                className="group h-10 md:h-12 px-6 border-2 border-gray-300 rounded-full transition duration-100 hover:border-blue-400 "
              >
                <div className=" flex items-center space-x-4 justify-center">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className=" w-5"
                    alt="google logo"
                  />
                  <span className="block  w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-100 group-hover:text-blue-600 sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="bg-muted-foreground/5 p-5 hidden md:flex items-center justify-center">
        <img
          src="/svg-ui/svg-login-light.svg"
          alt="svg-login"
          className="dark:hidden"
        />
        <img
          src="/svg-ui/svg-login-dark.svg"
          alt="svg-login"
          className="hidden dark:block"
        />
      </div>
    </div>
  );
}
