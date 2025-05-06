"use client";

import { UserOption, UserParams } from "@/constants";
import { useSearchParams } from "next/navigation";
import { DetailJob } from "./UserDetail.Job";
import { DetailBlog } from "./UserDetail.Blog";
import { DetailBusiness } from "./UserDetail.Business";

export const UserDetail = () => {
  const searchParams = useSearchParams();
  const currentOption = searchParams.get(UserParams.OPTION) || UserOption.BLOG;

  const renderDetail = () => {
    switch (currentOption) {
      case UserOption.BLOG:
        return <DetailBlog />;
      case UserOption.JOB:
        return <DetailJob />;
      case UserOption.BUSINESS:
        return <DetailBusiness />;
      default:
        return <DetailBlog />;
    }
  };

  return <div className="w-[1280px]">{renderDetail()}</div>;
};
