import Footer from "@/views/sections/Footer";
import Navbar from "@/views/sections/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen">
      <div className="container">
        <Navbar />
        <main className="flex flex-col items-center justify-center w-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
