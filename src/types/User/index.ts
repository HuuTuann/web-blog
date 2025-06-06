import { UserKeys } from "@/constants";

export interface UserProfileResponse {
  [UserKeys.ID]: number;
  [UserKeys.FULLNAME]: string;
  [UserKeys.ROLE]: string;
  [UserKeys.EMAIL]: string;
  [UserKeys.IS_ACTIVE]: boolean;
  [UserKeys.CREATED_AT]: string;
  [UserKeys.UPDATED_AT]: string;
  [UserKeys.CREATED_BY]: string;
  [UserKeys.UPDATED_BY]: string;
}

export interface UserProfilePayload {
  [UserKeys.ID]: number;
  [UserKeys.FULLNAME]: string;
  [UserKeys.AVATAR]: string;
  [UserKeys.PASSWORD]: string;
}

export interface UserApplyFormPayload {
  [UserKeys.JOB_ID]: number;
  [UserKeys.FILE]: string;
}

export interface GenerateQuestionResponse {
  [UserKeys.QUESTION]: string;
  [UserKeys.JD_TEXT]: string;
}

export interface AnswerResponse {
  [UserKeys.EVALUATION]: string;
}
