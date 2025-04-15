"use client";

import { Button, PixelTrail } from "@/components";
import { Paths } from "@/constants";
import { Image } from "@heroui/react";
import { useRouter } from "next/navigation";

export const Home = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push(Paths.WATER_INTAKE);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute z-50 flex flex-col items-center justify-center gap-10 rounded-3xl bg-slate-50 p-10">
        <Image src="logo.svg" alt="Infinite One" className="w-96" />
        <Button
          size="lg"
          variant="ioSolid"
          className="w-2/3 py-0"
          onPress={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
      <PixelTrail
        gridSize={50}
        trailSize={0.1}
        maxAge={250}
        interpolate={5}
        color="#1d4ed8"
        gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
        className="z-40"
      />
    </div>
  );
};
