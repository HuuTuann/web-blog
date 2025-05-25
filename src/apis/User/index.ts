import {
  ManagementBlogKeys,
  ManagementBusinessKeys,
  ManagementJobKeys,
} from "@/constants";
import { AnswerFormSchema } from "@/containers/User/UserInterview/AnswerForm/helpers";
import { GenerateQuestionFormSchema } from "@/containers/User/UserInterview/GenerateQuestionForm/helpers";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import {
  AnswerResponse,
  GenerateQuestionResponse,
  GetBlogDetailParams,
  GetBusinessDetailParams,
  GetJobDetailParams,
  ParamsType,
  UserApplyFormPayload,
  UserProfilePayload,
} from "@/types";

export const getBusinessUser = async (params: ParamsType) => {
  return httpService.get(`/home/business?${stringifyParams(params)}`);
};

export const getBusinessUserDetail = async (
  params: GetBusinessDetailParams,
) => {
  return httpService.get(
    `/home/business/${params?.[ManagementBusinessKeys.ID]}`,
  );
};

export const getBlogsUser = async (params: ParamsType) => {
  return httpService.get(`/home/blog?${stringifyParams(params)}`);
};

export const getBlogsUserDetail = async (params: GetBlogDetailParams) => {
  return httpService.get(`/home/blog/${params?.[ManagementBlogKeys.ID]}`);
};

export const getJobsUser = async (params: ParamsType) => {
  return httpService.get(`/home/jobpost?${stringifyParams(params)}`);
};

export const getJobUserDetail = async (params: GetJobDetailParams) => {
  return httpService.get(`/home/jobpost/${params?.[ManagementJobKeys.ID]}`);
};

export const getUserProfile = async () => {
  return httpService.get("/api/account");
};

export const updateUserProfile = async (payload: UserProfilePayload) => {
  return httpService.put("/api/account", payload);
};

export const applyCV = async (payload: UserApplyFormPayload) => {
  return httpService.post("/api/candidate/apply", payload);
};

export const generateQuestion = async (
  payload: GenerateQuestionFormSchema,
): Promise<GenerateQuestionResponse> => {
  return httpService.post("/jd/generate-question", payload, {
    baseURL: "http://localhost:3001",
  });
};

export const generateQuestionUpload = async (
  payload: GenerateQuestionFormSchema,
): Promise<GenerateQuestionResponse> => {
  const formData = new FormData();
  const { interviewLanguage, uploadFile } = payload;

  formData.append("interviewLanguage", interviewLanguage);
  formData.append("uploadFile", uploadFile);

  return httpService.post("/jd/generate-question", formData, {
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const answer = async (
  payload: AnswerFormSchema,
): Promise<AnswerResponse> => {
  return httpService.post("/jd/evaluate-answer", payload, {
    baseURL: "http://localhost:3001",
  });
};
