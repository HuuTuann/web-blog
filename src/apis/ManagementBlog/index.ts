import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import { ParamsType } from "@/types";

export const getBlogs = async (params: ParamsType) => {
  return httpService.get(`/api/blog/list-blog?${stringifyParams(params)}`);
};
