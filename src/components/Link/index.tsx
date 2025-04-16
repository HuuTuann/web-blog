import { Link as Core, extendVariants } from "@heroui/react";

export const Link = extendVariants(Core, {
  variants: {
    color: {
      io: "text-slate-950 hover:bg-slate-950/10 rounded-lg cursor-pointer",
    },
  },
});
