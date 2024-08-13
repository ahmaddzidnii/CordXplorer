import { PreventRefresh } from "@/utils/prevent-refersh";

export default function SongsAdminCreatePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PreventRefresh>{children}</PreventRefresh>
    </div>
  );
}
