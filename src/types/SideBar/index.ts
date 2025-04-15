import { Paths } from "@/constants";
import React from "react";

export interface SideBarOptions {
  path: (typeof Paths)[keyof typeof Paths];
  label: string;
  icon: React.ReactNode;
}
