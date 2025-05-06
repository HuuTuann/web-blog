import { JobOpeningApprove, ManagementJobKeys } from "@/constants";
import { JobDetailResponse } from "@/types";
import { z } from "zod";

const schema = z
  .object({
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
    [ManagementJobKeys.LEVEL_DES]: z.string().optional(),
    [ManagementJobKeys.LEVEL_CODE]: z.string().optional(),
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
  })
  .superRefine((data, ctx) => {
    const { jobPostId } = data;

    if (!jobPostId) {
      const requiredFields = [
        {
          key: ManagementJobKeys.LEVEL_DES,
          message: "Level description is required",
        },
        {
          key: ManagementJobKeys.LEVEL_CODE,
          message: "Level code is required",
        },
      ];

      requiredFields.forEach(({ key, message }) => {
        if (!(data as Record<string, unknown>)[key]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message,
            path: [key],
          });
        }
      });
    }
  });

const initialValues: JobFormSchema = {
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
};

const parseDate = (date: string) => {
  // const [day, month, year] = date.split("/");
  // return `${year}-${month}-${day}`;

  return date.split("T")?.[0];
};

const getInitialValues = (job?: JobDetailResponse): JobFormSchema => {
  const { quantityOpening, isOpening, deadline } = job || {};

  return {
    ...initialValues,
    ...job,
    [ManagementJobKeys.QUANTITY_OPENING]: quantityOpening?.toString() || "",
    [ManagementJobKeys.IS_OPENING]: isOpening
      ? JobOpeningApprove.ENABLE
      : JobOpeningApprove.DISABLE,
    [ManagementJobKeys.DEADLINE]: deadline ? parseDate(deadline) : "",
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

export type JobFormSchema = z.infer<typeof schema>;
