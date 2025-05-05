import { UserKeys } from "@/constants";
import { z } from "zod";

const schema = z.object({
  [UserKeys.JOB_ID]: z.number().readonly(),
  [UserKeys.FILE]: z.string().nonempty({
    message: "File is required",
  }),
});

const initialValues = {
  [UserKeys.JOB_ID]: 0,
  [UserKeys.FILE]: "",
};

const getInitialValues = (id: number) => {
  return {
    ...initialValues,
    [UserKeys.JOB_ID]: id,
  };
};

const ApplyHelpers = {
  schema,
  initialValues,
  getInitialValues,
};

export default ApplyHelpers;
