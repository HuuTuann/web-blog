"use client";

import { Paths } from "@/constants";
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
    <div className="flex h-[76px] w-full items-center border-b-2 border-slate-300 p-4">
      <h1 className="text-2xl font-bold text-slate-950">{getHeaderTitle()}</h1>
    </div>
  );
};
