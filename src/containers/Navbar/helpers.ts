import { Paths } from "@/constants";

const titleMap = {
  [Paths.MANAGEMENT_USER]: "Management User",
  [Paths.MANAGEMENT_BLOG]: "Management Blog",
  [Paths.MANAGEMENT_BUSINESS]: "Management Business",
  [Paths.MANAGEMENT_JOB]: "Management Job",

  [Paths.USER]: "BestCV",
  [Paths.USER_DETAIL]: "BestCV",
} as const;

const NavbarHelpers = {
  titleMap,
};

export default NavbarHelpers;
