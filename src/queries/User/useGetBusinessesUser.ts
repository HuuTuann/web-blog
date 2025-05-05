import { getBusinessUser } from "@/apis";
import { QueryKey } from "@/constants";
import {
  initialPageParam,
  ListBusinessResponse,
  PageResponseType,
  TableParams,
  UseGetBusinessParams,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useGetBusinessesUser = ({
  defaultParams = initialPageParam,
  options,
}: UseGetBusinessParams = {}) => {
  const [params, setParams] = useState<TableParams>(defaultParams);

  const { data, isLoading } = useQuery<
    PageResponseType<ListBusinessResponse>,
    Error,
    PageResponseType<ListBusinessResponse>
  >({
    queryKey: [QueryKey.GET_BUSINESSES_USER, params],
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return getBusinessUser(queryParams as TableParams);
    },
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateBusinesses = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_BUSINESSES_USER, params],
    });
  };

  const { data: businesses = [], totalPages = 1 } = data || {};

  return {
    businesses,
    businessesParams: params,
    isLoadingBusinesses: isLoading,
    totalPagesBusinesses: totalPages,
    handleInvalidateBusinesses,
    setBusinessesParams: setParams,
  };
};
