"use client";

import { Button } from "@/components";
import { Paths } from "@/constants";
import { removeCookie } from "@/services";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { headerTitleMap } from "./helpers";

export const Navbar = () => {
  const pathname = usePathname();

  const getHeaderTitle = useCallback(() => {
    if (Object.values(Paths).includes(pathname as Paths)) {
      return headerTitleMap[pathname as Paths];
    }
  }, [pathname]);

  return (
    <div className="flex h-[76px] w-full items-center justify-between border-b-2 border-slate-300 p-4">
      <h1 className="text-2xl font-bold text-slate-950">{getHeaderTitle()}</h1>
      <Button variant="ioLight" isIconOnly onPress={removeCookie}>
        <LogOut />
      </Button>
    </div>
  );
};
