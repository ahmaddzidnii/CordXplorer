import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { TopLoaderBarProvider } from "@/providers/toploaderbar-provider";

const monsterrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CordXplorer",
    template: "%s | CordXplorer",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={monsterrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <TopLoaderBarProvider>{children}</TopLoaderBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
