"use client";

import { Button } from "@/components";
import { SideBarOptions } from "@/types";
import { Image } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
  sideBarOptions: SideBarOptions[];
};

export const SideBar = ({ sideBarOptions }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="flex h-full flex-col gap-1 border-r-2 border-slate-300 p-2">
      <div onClick={handleLogoClick} className="flex cursor-pointer">
        <Image src="/logo.svg" alt="Infinite One" className="h-16" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {sideBarOptions.map((option) => {
          const { path, label, icon } = option;

          return (
            <Button
              key={path}
              variant="ioLight"
              className={twMerge(
                "w-full justify-start p-0 pl-4 text-lg font-medium",
                path === pathname && "bg-slate-200",
              )}
              startContent={icon}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
