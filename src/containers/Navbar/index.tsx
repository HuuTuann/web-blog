"use client";

import { Button } from "@/components";
import { Paths, RootPaths } from "@/constants";
import { removeCookie } from "@/services";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import UserProfile from "../User/UserProfile";
import NavbarHelpers from "./helpers";

export const Navbar = () => {
  const pathname = usePathname();

  const getHeaderTitle = useCallback(() => {
    if (Object.values(Paths).includes(pathname as Paths)) {
      return NavbarHelpers.titleMap[pathname as Paths];
    }
  }, [pathname]);

  const handleLogout = useCallback(() => {
    removeCookie();
    window.open(`${process.env.NEXT_PUBLIC_WEB_URL}/login`, "_self");
  }, []);

  const isUser = pathname.startsWith(RootPaths.USER);

  return (
    <div className="flex h-[76px] w-full items-center justify-between border-b-2 border-slate-300 p-4">
      <h1 className="text-2xl font-bold text-slate-950">{getHeaderTitle()}</h1>
      <div className="flex items-center gap-2">
        {isUser && <UserProfile />}
        <Button variant="ioLight" isIconOnly onPress={handleLogout}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
};
