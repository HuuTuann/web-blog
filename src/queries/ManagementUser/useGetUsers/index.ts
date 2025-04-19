import { getUsers } from "@/apis";
import { QueryKey } from "@/constants";
import {
  initialPageParam,
  PageResponseType,
  TableParams,
  UseGetUserParams,
} from "@/types";
import { ListUsersResponse } from "@/types/ManagementUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useGetUsers = ({
  defaultParams = initialPageParam,
  options,
}: UseGetUserParams = {}) => {
  const [params, setParams] = useState<TableParams>(defaultParams);

  const { data, isLoading } = useQuery<
    PageResponseType<ListUsersResponse>,
    Error,
    PageResponseType<ListUsersResponse>
  >({
    queryKey: [QueryKey.GET_USERS, params],
    queryFn: ({ queryKey }) => {
      const [_, queryParams] = queryKey;
      return getUsers(queryParams as TableParams);
    },
    ...options,
  });

  const queryClient = useQueryClient();
  const handleInvalidateUsers = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKey.GET_USERS, params],
    });
  };

  const { data: users = [], totalPages = 1 } = data || {};

  return {
    users,
    usersParams: params,
    isLoadingUsers: isLoading,
    totalPagesUsers: totalPages,
    handleInvalidateUsers,
    setUsersParams: setParams,
  };
};
