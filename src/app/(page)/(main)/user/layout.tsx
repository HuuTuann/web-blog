import { Navbar } from "@/containers";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
