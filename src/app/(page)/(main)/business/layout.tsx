import { Navbar } from "@/containers";

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      <div className="h-[calc(100%-76px)] p-4">{children}</div>
    </div>
  );
}
