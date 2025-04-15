import { Button as Core, extendVariants } from "@heroui/react";

export const Button = extendVariants(Core, {
  variants: {
    variant: {
      ioSolid: "text-slate-100 bg-slate-900 hover:bg-slate-900/90",
      ioLight: "text-slate-900 bg-transparent hover:bg-slate-300",
    },
    size: {
      sm: "text-sm px-4 py-2",
      md: "text-base px-5 py-3",
      lg: "text-lg px-6 py-4",
    },
  },
});
