import { getJobs } from "@/apis";
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

export const useGetJobs = ({
  defaultParams = initialPageParam,
  options,
}: UseGetJobParams = {}) => {
  const [params, setParams] = useState<TableParams>({
    ...defaultParams,
    isApprove: "true",
  });

  const { data, isLoading } = useQuery<
    PageResponseType<GetJobResponse>,
    Error,
    PageResponseType<GetJobResponse>
  >({
    queryKey: [QueryKey.GET_JOBS, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getJobs(queryParams as TableParams);
    },
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateJobs = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_JOBS, params],
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
