import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
}

export default Layout;
