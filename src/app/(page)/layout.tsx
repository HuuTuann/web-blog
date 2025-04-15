import { Icons } from "@/assets";
import { Paths } from "@/constants";
import { Navbar, SideBar } from "@/containers";
import { SideBarOptions } from "@/types";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sideBarOptions: SideBarOptions[] = [
    {
      path: Paths.WATER_INTAKE,
      label: "Water Intake",
      icon: <Icons.WaterIntake />,
    },
  ] as const;

  return (
    <div className="flex h-screen w-screen">
      <SideBar sideBarOptions={sideBarOptions} />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="flex flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
