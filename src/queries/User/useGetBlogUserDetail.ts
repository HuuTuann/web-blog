import { getBlogsUserDetail } from "@/apis";
import { QueryKey } from "@/constants";
import {
  BlogDetailResponse,
  GetBlogDetailParams,
  ResponseType,
  UseGetBlogDetailParams,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBlogUserDetail = ({
  params,
  options,
}: UseGetBlogDetailParams = {}) => {
  const { data, isLoading } = useQuery<
    ResponseType<BlogDetailResponse>,
    Error,
    ResponseType<BlogDetailResponse>
  >({
    queryKey: [QueryKey.GET_BUSINESS_USER_DETAIL, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getBlogsUserDetail(queryParams as GetBlogDetailParams);
    },
    enabled: !!params?.blogId,
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateBlogDetail = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_BUSINESS_USER_DETAIL, params],
    });
  };

  const { data: blogDetail } = data || {};

  return {
    blogDetail,
    isLoadingBlogDetail: isLoading,
    handleInvalidateBlogDetail,
  };
};
