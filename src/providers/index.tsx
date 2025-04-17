"use client";

import { DialogProvider } from "@/hooks";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import QueryProvider from "./QueryClient";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <HeroUIProvider validationBehavior="aria">
        <ToastProvider placement="top-right" />
        <DialogProvider>{children}</DialogProvider>
      </HeroUIProvider>
    </QueryProvider>
  );
};

export default Providers;
