export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-950">
      {children}
    </div>
  );
}
