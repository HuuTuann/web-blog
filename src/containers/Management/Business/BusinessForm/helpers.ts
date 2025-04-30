import { ManagementBusinessKeys } from "@/constants";
import { BusinessDetailResponse, BusinessFormPayload } from "@/types";
import { z } from "zod";

const schema = z
  .object({
    [ManagementBusinessKeys.ID]: z.number().readonly(),
    [ManagementBusinessKeys.NAME]: z.string().nonempty({
      message: "This field is required",
    }),
    [ManagementBusinessKeys.DESCRIPTION]: z.string().nonempty({
      message: "Description is required",
    }),
    [ManagementBusinessKeys.SIZE]: z.string().nonempty({
      message: "Size is required",
    }),
    [ManagementBusinessKeys.NATIONALITY]: z.string().nonempty({
      message: "Nationality is required",
    }),
    [ManagementBusinessKeys.SLOGAN]: z.string().nonempty({
      message: "Slogan is required",
    }),
    [ManagementBusinessKeys.BENEFITS]: z.string().optional(),
    [ManagementBusinessKeys.IMAGE]: z.string().nonempty({
      message: "Image is required",
    }),
    [ManagementBusinessKeys.INDUSTRY]: z.string().optional(),
    [ManagementBusinessKeys.STREET]: z.string().optional(),
    [ManagementBusinessKeys.WARD]: z.string().optional(),
    [ManagementBusinessKeys.DISTRICT]: z.string().optional(),
    [ManagementBusinessKeys.CITY]: z.string().optional(),
    [ManagementBusinessKeys.WEBSITE]: z.string().nonempty({
      message: "Website is required",
    }),
    [ManagementBusinessKeys.CONTACT]: z.string().nonempty({
      message: "Contact is required",
    }),
  })
  .superRefine((data, ctx) => {
    const { businessId } = data;

    if (!businessId) {
      const requiredFields = [
        {
          key: ManagementBusinessKeys.BENEFITS,
          message: "Benefit is required",
        },
        {
          key: ManagementBusinessKeys.INDUSTRY,
          message: "Industry is required",
        },
        {
          key: ManagementBusinessKeys.STREET,
          message: "Street is required",
        },
        {
          key: ManagementBusinessKeys.WARD,
          message: "Ward is required",
        },
        {
          key: ManagementBusinessKeys.DISTRICT,
          message: "District is required",
        },
        {
          key: ManagementBusinessKeys.CITY,
          message: "City is required",
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

const initialValues: BusinessFormPayload = {
  [ManagementBusinessKeys.ID]: 0,
  [ManagementBusinessKeys.NAME]: "",
  [ManagementBusinessKeys.DESCRIPTION]: "",
  [ManagementBusinessKeys.SIZE]: "",
  [ManagementBusinessKeys.NATIONALITY]: "",
  [ManagementBusinessKeys.SLOGAN]: "",
  [ManagementBusinessKeys.BENEFITS]: "",
  [ManagementBusinessKeys.IMAGE]: "",
  [ManagementBusinessKeys.INDUSTRY]: "",
  [ManagementBusinessKeys.STREET]: "",
  [ManagementBusinessKeys.WARD]: "",
  [ManagementBusinessKeys.DISTRICT]: "",
  [ManagementBusinessKeys.CITY]: "",
  [ManagementBusinessKeys.WEBSITE]: "",
  [ManagementBusinessKeys.CONTACT]: "",
};

const getInitialValues = (
  business?: BusinessDetailResponse,
): BusinessFormPayload => {
  return {
    ...initialValues,
    ...business,
  };
};

export const BusinessHelpers = {
  schema,
  initialValues,
  getInitialValues,
};
