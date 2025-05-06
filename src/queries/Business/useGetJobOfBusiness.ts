import { getJobOfBusiness } from "@/apis";
import { QueryKey } from "@/constants";
import {
  GetJobResponse,
  initialPageParam,
  PageResponseType,
  TableParams,
  UseGetJobParams,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useGetJobOfBusiness = ({
  defaultParams = initialPageParam,
  options,
}: UseGetJobParams = {}) => {
  const [params, setParams] = useState<TableParams>({
    ...defaultParams,
  });

  const { data, isLoading } = useQuery<
    PageResponseType<GetJobResponse>,
    Error,
    PageResponseType<GetJobResponse>
  >({
    queryKey: [QueryKey.GET_JOB_OF_BUSINESS, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getJobOfBusiness(queryParams as TableParams);
    },
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateJobs = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_JOB_OF_BUSINESS, params],
    });
  };

  const { data: jobs = [], totalPages = 1 } = data || {};

  return {
    jobs,
    jobsParams: params,
    isLoadingJobs: isLoading,
    totalPagesJobs: totalPages,
    handleInvalidateJobs,
    setJobsParams: setParams,
  };
};
