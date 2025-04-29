import { ManagementBusinessKeys } from "@/constants";
import { UseQueryOptions } from "@tanstack/react-query";
import { PageResponseType, ResponseType, TableParams } from "../Base";

export interface ListBusinessResponse {
  [ManagementBusinessKeys.ID]: number;
  [ManagementBusinessKeys.NAME]: string;
  [ManagementBusinessKeys.DESCRIPTION]: string;
  [ManagementBusinessKeys.SIZE]: string;
  [ManagementBusinessKeys.NATIONALITY]: string;
  [ManagementBusinessKeys.SLOGAN]: string;
  [ManagementBusinessKeys.INDUSTRY]: string;
  [ManagementBusinessKeys.ADDRESS]: string;
  [ManagementBusinessKeys.CREATED_AT]: string;
  [ManagementBusinessKeys.MODIFIED_AT]: string;
  [ManagementBusinessKeys.CREATED_BY]: string;
  [ManagementBusinessKeys.MODIFIED_BY]: string;
}

export interface UseGetBusinessParams {
  defaultParams?: TableParams;
  options?: UseQueryOptions<
    PageResponseType<ListBusinessResponse>,
    Error,
    PageResponseType<ListBusinessResponse>
  >;
}

export interface BusinessFormPayload {
  [ManagementBusinessKeys.ID]: number;
  [ManagementBusinessKeys.NAME]: string;
  [ManagementBusinessKeys.DESCRIPTION]: string;
  [ManagementBusinessKeys.SIZE]: string;
  [ManagementBusinessKeys.NATIONALITY]: string;
  [ManagementBusinessKeys.SLOGAN]: string;
  [ManagementBusinessKeys.BENEFITS]: string;
  [ManagementBusinessKeys.IMAGE]: string;
  [ManagementBusinessKeys.INDUSTRY]: string;
  [ManagementBusinessKeys.STREET]: string;
  [ManagementBusinessKeys.WARD]: string;
  [ManagementBusinessKeys.DISTRICT]: string;
  [ManagementBusinessKeys.CITY]: string;
  [ManagementBusinessKeys.WEBSITE]: string;
  [ManagementBusinessKeys.CONTACT]: string;
}

export interface BusinessDetailResponse {
  [ManagementBusinessKeys.ID]: number;
  [ManagementBusinessKeys.NAME]: string;
  [ManagementBusinessKeys.DESCRIPTION]: string;
  [ManagementBusinessKeys.SIZE]: string;
  [ManagementBusinessKeys.NATIONALITY]: string;
  [ManagementBusinessKeys.SLOGAN]: string;
  [ManagementBusinessKeys.WEBSITE]: string;
  [ManagementBusinessKeys.IMAGE]: string;
  [ManagementBusinessKeys.CONTACT]: string;
  [ManagementBusinessKeys.BENEFITS]: string;
}

export interface GetBusinessDetailParams {
  [ManagementBusinessKeys.ID]: number;
}

export interface UseGetBusinessDetailParams {
  params?: GetBusinessDetailParams;
  options?: UseQueryOptions<
    ResponseType<BusinessDetailResponse>,
    Error,
    ResponseType<BusinessDetailResponse>
  >;
}

export type DeleteBusinessPayload = GetBusinessDetailParams;
