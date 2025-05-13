import { ManagementBusinessKeys } from "@/constants";
import { BusinessDetailResponse } from "@/types";
import { z } from "zod";

const schema = z.object({
  [ManagementBusinessKeys.ID]: z.number().readonly(),
  [ManagementBusinessKeys.NAME]: z.string().nonempty({
    message: "Name is required",
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
  [ManagementBusinessKeys.WEBSITE]: z.string().nonempty({
    message: "Website is required",
  }),
  [ManagementBusinessKeys.CONTACT]: z.string().nonempty({
    message: "Contact is required",
  }),
  [ManagementBusinessKeys.BENEFITS]: z.string().nonempty({
    message: "Benefit is required",
  }),
  [ManagementBusinessKeys.IMAGE]: z.string().nonempty({
    message: "Image is required",
  }),
});

const initialValues: BusinessProfileFormSchema = {
  [ManagementBusinessKeys.ID]: 0,
  [ManagementBusinessKeys.NAME]: "",
  [ManagementBusinessKeys.DESCRIPTION]: "",
  [ManagementBusinessKeys.SIZE]: "",
  [ManagementBusinessKeys.NATIONALITY]: "",
  [ManagementBusinessKeys.SLOGAN]: "",
  [ManagementBusinessKeys.WEBSITE]: "",
  [ManagementBusinessKeys.CONTACT]: "",
  [ManagementBusinessKeys.BENEFITS]: "",
  [ManagementBusinessKeys.IMAGE]: "",
};

const getInitialValues = (
  business?: BusinessDetailResponse,
): BusinessProfileFormSchema => {
  return {
    ...initialValues,
    ...business,
  };
};

const BusinessProfileHelpers = {
  schema,
  initialValues,
  getInitialValues,
};

export default BusinessProfileHelpers;

export type BusinessProfileFormSchema = z.infer<typeof schema>;
