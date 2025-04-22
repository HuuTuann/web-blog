import { ManagementBlogKeys } from "@/constants";
import { UseQueryOptions } from "@tanstack/react-query";
import { PageResponseType, TableParams } from "../Base";

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

// export interface UpdateBlogPayload {
//   [ManagementBlogKeys.ID]: number;
//   [ManagementBlogKeys.FULL_NAME]: string;
//   [ManagementBlogKeys.PASSWORD]: string;
//   [ManagementBlogKeys.AVATAR]?: string;
// }

export type BlogDetailResponse = ListBlogsResponse;

export interface GetBlogDetailParams {
  [ManagementBlogKeys.TITLE]: string;
}

// export interface UseGetBlogDetailParams {
//   params?: GetBlogDetailParams;
//   options?: UseQueryOptions<
//     ResponseType<BlogDetailResponse>,
//     Error,
//     ResponseType<BlogDetailResponse>
//   >;
// }

// export interface DeleteBlogPayload {
//   [ManagementBlogKeys.ID]: number;
// }
