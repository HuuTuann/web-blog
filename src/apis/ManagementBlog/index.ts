import { ManagementBlogKeys } from "@/constants";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import { ParamsType } from "@/types";
import {
  BlogFormPayload,
  DeleteBlogPayload,
  GetBlogDetailParams,
} from "@/types/ManagementBlog";

export const getBlogs = async (params: ParamsType) => {
  return httpService.get(`/api/blog/list-blog?${stringifyParams(params)}`);
};

export const getBlogDetail = async (params: GetBlogDetailParams) => {
  return httpService.get(
    `/api/blog/find-id/${params?.[ManagementBlogKeys.ID]}`,
  );
};

export const createBlog = async (payload: BlogFormPayload) => {
  return httpService.post("/api/blog/add-blog", payload);
};

export const updateBlog = async (payload: BlogFormPayload) => {
  return httpService.put("/api/blog/update-blog", payload);
};

export const deleteBlog = async (payload: DeleteBlogPayload) => {
  return httpService.delete(
    `/api/blog/delete-blog/${payload?.[ManagementBlogKeys.ID]}`,
  );
};
