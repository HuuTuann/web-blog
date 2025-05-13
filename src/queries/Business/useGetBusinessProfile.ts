import { getBusinessProfile } from "@/apis";
import { QueryKey } from "@/constants";
import { BusinessDetailResponse, ResponseType } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBusinessProfile = () => {
  const { data, isLoading } = useQuery<
    ResponseType<BusinessDetailResponse>,
    Error,
    ResponseType<BusinessDetailResponse>
  >({
    queryKey: [QueryKey.GET_BUSINESS_PROFILE],
    queryFn: getBusinessProfile,
  });

  const queryClient = useQueryClient();
  const handleInvalidateBusinessProfile = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_BUSINESS_PROFILE],
    });
  };

  const { data: businessProfile } = data || {};

  return {
    businessProfile,
    isLoadingBusinessProfile: isLoading,
    handleInvalidateBusinessProfile,
  };
};
