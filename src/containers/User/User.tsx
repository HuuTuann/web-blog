"use client";

import { UserOption, UserParams } from "@/constants";
import { useDebounce } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import UserBody from "./UserBody";
import UserSearch from "./UserSearch";
import { Button } from "@/components";

export const User = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentOption = searchParams.get(UserParams.OPTION) || UserOption.BLOG;
  const debouncedSearch = useDebounce(
    searchParams.get(UserParams.SEARCH) || "",
    500,
  );

  const getUserBody = () => {
    switch (currentOption) {
      case UserOption.BLOG:
        return <UserBody.Blog searchParams={debouncedSearch} />;
      case UserOption.BUSINESS:
        return <UserBody.Business searchParams={debouncedSearch} />;
      case UserOption.JOB:
        return <UserBody.Job searchParams={debouncedSearch} />;
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-5 px-20 pt-10">
      <div className="flex w-full justify-end">
        <Button variant="ioSolid" onClick={() => router.push("user/interview")}>
          Interview
        </Button>
      </div>
      <UserSearch />
      {getUserBody()}
    </div>
  );
};
