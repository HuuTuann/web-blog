import { getBlogs } from "@/apis";
import { QueryKey } from "@/constants";
import { initialPageParam, PageResponseType, TableParams } from "@/types";
import { ListBlogsResponse, UseGetBlogParams } from "@/types/ManagementBlog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useGetBlogs = ({
  defaultParams = initialPageParam,
  options,
}: UseGetBlogParams = {}) => {
  const [params, setParams] = useState<TableParams>(defaultParams);

  const { data, isLoading } = useQuery<
    PageResponseType<ListBlogsResponse>,
    Error,
    PageResponseType<ListBlogsResponse>
  >({
    queryKey: [QueryKey.GET_BLOGS, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getBlogs(queryParams as TableParams);
    },
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateBlogs = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_BLOGS, params],
    });
  };

  const { data: blogs = [], totalPages = 1 } = data || {};

  return {
    blogs,
    blogsParams: params,
    isLoadingBlogs: isLoading,
    totalPagesBlogs: totalPages,
    handleInvalidateBlogs,
    setBlogsParams: setParams,
  };
};
