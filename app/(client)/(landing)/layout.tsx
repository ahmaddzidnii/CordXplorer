import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { MobileNavbar } from "@/components/navbar/mobile-navbar";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <main className="pt-12">{children}</main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear().toString()} ChordXploler. All rights
          reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}
