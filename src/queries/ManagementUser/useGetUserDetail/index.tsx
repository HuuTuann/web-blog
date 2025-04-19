import { getUserDetail } from "@/apis";
import { QueryKey } from "@/constants";
import {
  GetUserDetailParams,
  ResponseType,
  UseGetUserDetailParams,
  UserDetailResponse,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserDetail = ({
  params,
  options,
}: UseGetUserDetailParams = {}) => {
  const { data, isLoading } = useQuery<
    ResponseType<UserDetailResponse>,
    Error,
    ResponseType<UserDetailResponse>
  >({
    queryKey: [QueryKey.GET_USER_DETAIL, params],
    queryFn: ({ queryKey }) => {
      const [_, queryParams] = queryKey;
      return getUserDetail(queryParams as GetUserDetailParams);
    },
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateUserDetail = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_USER_DETAIL, params],
    });
  };

  const { data: userDetail } = data || {};

  return {
    userDetail,
    isLoadingUserDetail: isLoading,
    handleInvalidateUserDetail,
  };
};
