import { getUserProfile } from "@/apis";
import { QueryKey } from "@/constants";
import { ResponseType, UserProfileResponse } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  const { data, isLoading } = useQuery<
    ResponseType<UserProfileResponse>,
    Error,
    ResponseType<UserProfileResponse>
  >({
    queryKey: [QueryKey.GET_USER_PROFILE],
    queryFn: getUserProfile,
  });

  const queryClient = useQueryClient();
  const handleInvalidateUserProfile = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_USER_PROFILE],
    });
  };

  const { data: userProfile } = data || {};

  return {
    userProfile,
    isLoadingUserProfile: isLoading,
    handleInvalidateUserProfile,
  };
};
