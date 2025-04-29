import { getJobDetail } from "@/apis";
import { QueryKey } from "@/constants";
import {
  GetJobDetailParams,
  JobDetailResponse,
  ResponseType,
  UseGetJobDetailParams,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetJobDetail = ({
  params,
  options,
}: UseGetJobDetailParams = {}) => {
  const { data, isLoading } = useQuery<
    ResponseType<JobDetailResponse>,
    Error,
    ResponseType<JobDetailResponse>
  >({
    queryKey: [QueryKey.GET_JOB_DETAIL, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getJobDetail(queryParams as GetJobDetailParams);
    },
    enabled: !!params?.jobPostId,
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateJobDetail = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_JOB_DETAIL, params],
    });
  };

  const { data: jobDetail } = data || {};

  return {
    jobDetail,
    isLoadingJobDetail: isLoading,
    handleInvalidateJobDetail,
  };
};
