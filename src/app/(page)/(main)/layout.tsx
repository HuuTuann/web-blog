import { Paths } from "@/constants";
import { Navbar, SideBar } from "@/containers";
import { SideBarOptions } from "@/types";
import { UserRoundCog } from "lucide-react";

export default function MainLayout({
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
  ] as const;

  return (
    <div className="flex h-screen w-screen">
      <SideBar sideBarOptions={sideBarOptions} />
      <div className="flex max-w-full flex-1 flex-shrink flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
