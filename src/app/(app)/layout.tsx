import AppLayout from "@/components/layout/AppLayout";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}

export default Layout;
