"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const TopLoaderBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <ProgressBar
        color="#f472b6"
        height="4px"
        shallowRouting
        options={{ easing: "ease", speed: 500, showSpinner: false }}
      />

      {children}
    </div>
  );
};
