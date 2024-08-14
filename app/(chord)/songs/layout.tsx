import { DialogOptions } from "@/components/chord/dialog-options";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { MobileNavbar } from "@/components/navbar/mobile-navbar";

export default function SongsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <DialogOptions />
      <main className="min-h-[100dvh] pt-20">{children}</main>
      <Footer />
    </>
  );
}
