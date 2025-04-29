import { JobOpeningApprove, ManagementJobKeys } from "@/constants";
import { JobDetailResponse, JobFormPayload } from "@/types";
import { z } from "zod";

const schema = z.object({
  [ManagementJobKeys.ID]: z.number().readonly(),
  [ManagementJobKeys.TITLE]: z.string().nonempty({
    message: "Title is required",
  }),
  [ManagementJobKeys.YEAR_EXP]: z.string().nonempty({
    message: "Year of experience is required",
  }),
  [ManagementJobKeys.DESC]: z.string().nonempty({
    message: "Description is required",
  }),
  [ManagementJobKeys.PRICE_DESC]: z.string().nonempty({
    message: "Price description is required",
  }),
  [ManagementJobKeys.RECRUITMENT_PROG]: z.string().nonempty({
    message: "Recruitment program is required",
  }),
  [ManagementJobKeys.DEADLINE]: z.string().nonempty({
    message: "Deadline is required",
  }),
  [ManagementJobKeys.LEVEL_DES]: z.string().nonempty({
    message: "Level description is required",
  }),
  [ManagementJobKeys.LEVEL_CODE]: z.string().nonempty({
    message: "Level code is required",
  }),
  [ManagementJobKeys.TECH_STACK_DESC]: z.string().nonempty({
    message: "Tech stack description is required",
  }),
  [ManagementJobKeys.TYPE]: z.string().nonempty({
    message: "Type is required",
  }),
  [ManagementJobKeys.CONTRACT]: z.string().nonempty({
    message: "Contract is required",
  }),
  [ManagementJobKeys.BENEFIT]: z.string().nonempty({
    message: "Benefits are required",
  }),
  [ManagementJobKeys.QUANTITY_OPENING]: z.string().nonempty({
    message: "Quantity opening is required",
  }),
  [ManagementJobKeys.IS_OPENING]: z.string().nonempty({
    message: "Is opening is required",
  }),
  [ManagementJobKeys.IS_APPROVE]: z.string().nonempty({
    message: "Is approve is required",
  }),
});

const initialValues: JobFormPayload = {
  [ManagementJobKeys.ID]: 0,
  [ManagementJobKeys.TITLE]: "",
  [ManagementJobKeys.YEAR_EXP]: "",
  [ManagementJobKeys.DESC]: "",
  [ManagementJobKeys.PRICE_DESC]: "",
  [ManagementJobKeys.RECRUITMENT_PROG]: "",
  [ManagementJobKeys.DEADLINE]: "",
  [ManagementJobKeys.LEVEL_DES]: "",
  [ManagementJobKeys.LEVEL_CODE]: "",
  [ManagementJobKeys.TECH_STACK_DESC]: "",
  [ManagementJobKeys.TYPE]: "",
  [ManagementJobKeys.CONTRACT]: "",
  [ManagementJobKeys.BENEFIT]: "",
  [ManagementJobKeys.QUANTITY_OPENING]: "",
  [ManagementJobKeys.IS_OPENING]: "",
  [ManagementJobKeys.IS_APPROVE]: "",
};

const getInitialValues = (job?: JobDetailResponse) => {
  const { quantityOpening, isOpening, isApprove } = job || {};

  return {
    ...initialValues,
    ...job,
    [ManagementJobKeys.QUANTITY_OPENING]: quantityOpening?.toString() || "",
    [ManagementJobKeys.IS_OPENING]: isOpening
      ? JobOpeningApprove.ENABLE
      : JobOpeningApprove.DISABLE,
    [ManagementJobKeys.IS_APPROVE]: isApprove
      ? JobOpeningApprove.ENABLE
      : JobOpeningApprove.DISABLE,
  };
};

const openingApproveOptions = [
  { label: "Enable", value: JobOpeningApprove.ENABLE },
  { label: "Disable", value: JobOpeningApprove.DISABLE },
];

export const JobHelpers = {
  schema,
  initialValues,
  openingApproveOptions,
  getInitialValues,
};
