import { getBlogDetail } from "@/apis";
import { QueryKey } from "@/constants";
import {
  BlogDetailResponse,
  GetBlogDetailParams,
  ResponseType,
  UseGetBlogDetailParams,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBlogDetail = ({
  params,
  options,
}: UseGetBlogDetailParams = {}) => {
  const { data, isLoading } = useQuery<
    ResponseType<BlogDetailResponse>,
    Error,
    ResponseType<BlogDetailResponse>
  >({
    queryKey: [QueryKey.GET_BLOG_DETAIL, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getBlogDetail(queryParams as GetBlogDetailParams);
    },
    enabled: !!params?.blogId,
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateBlogDetail = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_BLOG_DETAIL, params],
    });
  };

  const { data: blogDetail } = data || {};

  return {
    blogDetail,
    isLoadingBlogDetail: isLoading,
    handleInvalidateBlogDetail,
  };
};
