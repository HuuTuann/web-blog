import { ManagementBusinessKeys } from "@/constants";
import { BusinessDetailResponse, BusinessFormPayload } from "@/types";
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
  [ManagementBusinessKeys.BENEFITS]: z.string().nonempty({
    message: "Benefits are required",
  }),
  [ManagementBusinessKeys.IMAGE]: z.string().nonempty({
    message: "Image is required",
  }),
  [ManagementBusinessKeys.INDUSTRY]: z.string().nonempty({
    message: "Industry is required",
  }),
  [ManagementBusinessKeys.STREET]: z.string().nonempty({
    message: "Street is required",
  }),
  [ManagementBusinessKeys.WARD]: z.string().nonempty({
    message: "Ward is required",
  }),
  [ManagementBusinessKeys.DISTRICT]: z.string().nonempty({
    message: "District is required",
  }),
  [ManagementBusinessKeys.CITY]: z.string().nonempty({
    message: "City is required",
  }),
  [ManagementBusinessKeys.WEBSITE]: z.string().nonempty({
    message: "Website is required",
  }),
  [ManagementBusinessKeys.CONTACT]: z.string().nonempty({
    message: "Contact is required",
  }),
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
