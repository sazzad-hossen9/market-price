"use client";

import { HeroUIProvider } from "@heroui/system";

export function Providers({ children }) {
  return (
    <HeroUIProvider className="min-h-screen flex flex-col flex-1">
      {children}
    </HeroUIProvider>
  );
}
