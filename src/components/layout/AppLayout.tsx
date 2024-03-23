import Footer from "@/views/sections/Footer";
import Navbar from "@/views/sections/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
