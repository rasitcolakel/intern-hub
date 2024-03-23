"use client";
import type { ReactNode } from "react";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";

type LayoutProps = {
  children: ReactNode;
};

function RootLayout({ children }: LayoutProps) {
  return (
    <Provider>
      <DevTools />
      {children}
    </Provider>
  );
}

export default RootLayout;
