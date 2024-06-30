import { SidebarWrapper } from "./_components/sidebar-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}