import { ManagementBlogKeys } from "@/constants";
import { UseQueryOptions } from "@tanstack/react-query";
import { PageResponseType, ResponseType, TableParams } from "../Base";

export interface ListBlogsResponse {
  [ManagementBlogKeys.ID]: number;
  [ManagementBlogKeys.MODIFIED_AT]: string;
  [ManagementBlogKeys.MODIFIED_BY]: string;
  [ManagementBlogKeys.CREATE_AT]: string;
  [ManagementBlogKeys.CREATE_BY]: string;
  [ManagementBlogKeys.TITLE]: string;
  [ManagementBlogKeys.CONTENT]: string;
}

export interface UseGetBlogParams {
  defaultParams?: TableParams;
  options?: UseQueryOptions<
    PageResponseType<ListBlogsResponse>,
    Error,
    PageResponseType<ListBlogsResponse>
  >;
}

export interface BlogFormPayload {
  [ManagementBlogKeys.ID]: number;
  [ManagementBlogKeys.CONTENT]: string;
  [ManagementBlogKeys.TITLE]: string;
  [ManagementBlogKeys.IMAGE]: string;
}

export interface BlogDetailResponse extends ListBlogsResponse {
  [ManagementBlogKeys.IMAGE]: string;
}

export interface GetBlogDetailParams {
  [ManagementBlogKeys.ID]: number;
}

export interface UseGetBlogDetailParams {
  params?: GetBlogDetailParams;
  options?: UseQueryOptions<
    ResponseType<BlogDetailResponse>,
    Error,
    ResponseType<BlogDetailResponse>
  >;
}

export interface DeleteBlogPayload {
  [ManagementBlogKeys.ID]: number;
}
