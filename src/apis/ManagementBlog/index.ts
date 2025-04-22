import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import { ParamsType } from "@/types";
import { BlogFormPayload } from "@/types/ManagementBlog";

export const getBlogs = async (params: ParamsType) => {
  return httpService.get(`/api/blog/list-blog?${stringifyParams(params)}`);
};

export const getBlogDetail = async (id: number) => {
  return httpService.get(`/api/blog/detail-blog/${id}`);
};

export const createBlog = async (payload: BlogFormPayload) => {
  return httpService.post("/api/blog/add-blog", payload);
};
