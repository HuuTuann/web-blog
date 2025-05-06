import { getBusinessUserDetail } from "@/apis";
import { QueryKey } from "@/constants";
import {
  BusinessDetailResponse,
  GetBusinessDetailParams,
  ResponseType,
  UseGetBusinessDetailParams,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBusinessUserDetail = ({
  params,
  options,
}: UseGetBusinessDetailParams = {}) => {
  const { data, isLoading } = useQuery<
    ResponseType<BusinessDetailResponse>,
    Error,
    ResponseType<BusinessDetailResponse>
  >({
    queryKey: [QueryKey.GET_BUSINESS_DETAIL, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getBusinessUserDetail(queryParams as GetBusinessDetailParams);
    },
    enabled: !!params?.businessId,
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateBusinessDetail = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_BUSINESS_DETAIL, params],
    });
  };

  const { data: businessDetail } = data || {};

  return {
    businessDetail,
    isLoadingBusinessDetail: isLoading,
    handleInvalidateBusinessDetail,
  };
};
