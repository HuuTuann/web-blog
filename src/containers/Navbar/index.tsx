"use client";

import { Button, Link } from "@/components";
import { Paths, RootPaths } from "@/constants";
import { Toast } from "@/hooks";
import { getCookie, removeCookie } from "@/services";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import UserProfile from "../User/UserProfile";
import NavbarHelpers from "./helpers";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getHeaderTitle = useCallback(() => {
    if (Object.values(Paths).includes(pathname as Paths)) {
      return NavbarHelpers.titleMap[pathname as Paths];
    }
  }, [pathname]);

  const handleLogout = useCallback(() => {
    removeCookie();
    Toast.Success("Logout successfully!");
    window.open(`${process.env.NEXT_PUBLIC_WEB_URL}/login`, "_self");
  }, []);

  const isLoggedIn = !!getCookie();

  const isUser = pathname.startsWith(RootPaths.USER);

  return (
    <div className="flex h-[76px] w-full items-center justify-between border-b-2 border-slate-300 p-4">
      <h1 className="text-2xl font-bold text-slate-950">{getHeaderTitle()}</h1>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            {isUser && <UserProfile />}
            <Button variant="ioLight" isIconOnly onPress={handleLogout}>
              <LogOut />
            </Button>
          </>
        ) : (
          <>
            <Link isBlock color="io" onPress={() => router.push("/register")}>
              Register
            </Link>
            <Button
              type="submit"
              variant="ioSolid"
              onPress={() => router.push("/login")}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
