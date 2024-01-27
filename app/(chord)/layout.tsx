import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { MobileNavbar } from "@/components/navbar/mobile-navbar";

export default function ChordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}
