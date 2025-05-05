import { ManagementJobKeys } from "@/constants";
import { UseQueryOptions } from "@tanstack/react-query";
import { PageResponseType, ResponseType, TableParams } from "../Base";

export interface GetJobResponse {
  [ManagementJobKeys.ID]: number;
  [ManagementJobKeys.TITLE]: string;
  [ManagementJobKeys.YEAR_EXP]: string;
  [ManagementJobKeys.TYPE]: string;
  [ManagementJobKeys.CONTRACT]: string;
  [ManagementJobKeys.IS_OPENING]: string;
  [ManagementJobKeys.IS_APPROVE]: string;
  [ManagementJobKeys.QUANTITY_OPENING]: number;
  [ManagementJobKeys.LEVEL_DES]: string;
  [ManagementJobKeys.TECH_STACK_DESC]: string;
  [ManagementJobKeys.DESC]: string;
  [ManagementJobKeys.PRICE_DESC]: string;
  [ManagementJobKeys.USER_CV]: string;
  [ManagementJobKeys.CREATED_AT]: string;
  [ManagementJobKeys.MODIFIED_AT]: string;
  [ManagementJobKeys.CREATED_BY]: string;
  [ManagementJobKeys.MODIFIED_BY]: string;
}

export interface UseGetJobParams {
  defaultParams?: TableParams;
  options?: UseQueryOptions<
    PageResponseType<GetJobResponse>,
    Error,
    PageResponseType<GetJobResponse>
  >;
}

export interface JobFormPayload {
  [ManagementJobKeys.ID]: number;
  [ManagementJobKeys.TITLE]: string;
  [ManagementJobKeys.YEAR_EXP]: string;
  [ManagementJobKeys.DESC]: string;
  [ManagementJobKeys.PRICE_DESC]: string;
  [ManagementJobKeys.RECRUITMENT_PROG]: string;
  [ManagementJobKeys.DEADLINE]: string;
  [ManagementJobKeys.LEVEL_DES]: string;
  [ManagementJobKeys.LEVEL_CODE]: string;
  [ManagementJobKeys.TECH_STACK_DESC]: string;
  [ManagementJobKeys.TYPE]: string;
  [ManagementJobKeys.CONTRACT]: string;
  [ManagementJobKeys.BENEFIT]: string;
  [ManagementJobKeys.QUANTITY_OPENING]: string;
  [ManagementJobKeys.IS_OPENING]: boolean;
  [ManagementJobKeys.IS_APPROVE]: boolean;
}

export interface JobDetailResponse {
  [ManagementJobKeys.ID]: number;
  [ManagementJobKeys.TITLE]: string;
  [ManagementJobKeys.DESC]: string;
  [ManagementJobKeys.YEAR_EXP]: string;
  [ManagementJobKeys.TYPE]: string;
  [ManagementJobKeys.CONTRACT]: string;
  [ManagementJobKeys.DEADLINE]: string;
  [ManagementJobKeys.QUANTITY_OPENING]: number;
  [ManagementJobKeys.IS_OPENING]: boolean;
  [ManagementJobKeys.IS_APPROVE]: boolean;
  [ManagementJobKeys.RECRUITMENT_PROG]: string;
  [ManagementJobKeys.LEVEL_DES]: string;
  [ManagementJobKeys.TECH_STACK_DESC]: string;
  [ManagementJobKeys.PRICE_DESC]: string;
  [ManagementJobKeys.BENEFIT]: string;
}

export interface GetJobDetailParams {
  [ManagementJobKeys.ID]: number;
}

export interface UseGetJobDetailParams {
  params?: GetJobDetailParams;
  options?: UseQueryOptions<
    ResponseType<JobDetailResponse>,
    Error,
    ResponseType<JobDetailResponse>
  >;
}

export type DeleteJobPayload = GetJobDetailParams;

export type ApproveJobPayload = GetJobDetailParams;
