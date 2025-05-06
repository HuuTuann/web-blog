import { getJobDetailOfBusiness } from "@/apis";
import { QueryKey } from "@/constants";
import {
  GetJobDetailParams,
  JobDetailResponse,
  ResponseType,
  UseGetJobDetailParams,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetJobDetailOfBusiness = ({
  params,
  options,
}: UseGetJobDetailParams = {}) => {
  const { data, isLoading } = useQuery<
    ResponseType<JobDetailResponse>,
    Error,
    ResponseType<JobDetailResponse>
  >({
    queryKey: [QueryKey.GET_JOB_OF_BUSINESS_DETAIL, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getJobDetailOfBusiness(queryParams as GetJobDetailParams);
    },
    enabled: !!params?.jobPostId,
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateJobDetail = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_JOB_OF_BUSINESS_DETAIL, params],
    });
  };

  const { data: jobDetail } = data || {};

  return {
    jobDetail,
    isLoadingJobDetail: isLoading,
    handleInvalidateJobDetail,
  };
};
