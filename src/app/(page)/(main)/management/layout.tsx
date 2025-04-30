import { Paths } from "@/constants";
import { Navbar, SideBar } from "@/containers";
import { SideBarOptions } from "@/types";
import { UserRoundCog } from "lucide-react";

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sideBarOptions: SideBarOptions[] = [
    {
      path: Paths.MANAGEMENT_USER,
      label: "Management User",
      icon: <UserRoundCog />,
    },
    {
      path: Paths.MANAGEMENT_BLOG,
      label: "Management Blog",
      icon: <UserRoundCog />,
    },
    {
      path: Paths.MANAGEMENT_BUSINESS,
      label: "Management Business",
      icon: <UserRoundCog />,
    },
    {
      path: Paths.MANAGEMENT_JOB,
      label: "Management Job",
      icon: <UserRoundCog />,
    },
  ] as const;

  return (
    <div className="flex h-screen w-screen">
      <SideBar sideBarOptions={sideBarOptions} />
      <div className="flex h-full w-full flex-1 flex-shrink flex-col overflow-hidden">
        <Navbar />
        <div className="h-[calc(100%-76px)] p-4">{children}</div>
      </div>
    </div>
  );
}
