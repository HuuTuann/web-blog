import { JobOpeningApprove, ManagementJobKeys } from "@/constants";
import { Toast, useDialog } from "@/hooks";
import { formatDate } from "@/lib";
import {
  useCreateJobOfBusiness,
  useGetJobDetailOfBusiness,
  useGetJobOfBusiness,
  useUpdateJobOfBusiness,
} from "@/queries";
import { JobFormPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { JobFormSchema, JobHelpers } from "./helpers";

type Props = {
  id?: number;
};

export const useJobForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();

  const { jobDetail, handleInvalidateJobDetail } = useGetJobDetailOfBusiness({
    ...(id ? { params: { [ManagementJobKeys.ID]: id } } : {}),
  });
  const formValues = JobHelpers.getInitialValues(jobDetail);

  const { handleInvalidateJobs } = useGetJobOfBusiness();
  const { isLoadingCreateJob, onCreateJob } = useCreateJobOfBusiness();
  const { isLoadingUpdateJob, onUpdateJob } = useUpdateJobOfBusiness();

  const { handleSubmit, ...formReturns } = useForm<JobFormSchema>({
    defaultValues: JobHelpers.initialValues,
    values: formValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(JobHelpers.schema),
  });

  const onValid = (values: JobFormSchema) => {
    const { isOpening, deadline } = values;

    const payload = {
      ...values,
      [ManagementJobKeys.IS_OPENING]: isOpening === JobOpeningApprove.ENABLE,
      [ManagementJobKeys.DEADLINE]: formatDate(deadline),
    };

    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { levelDes, levelCode, ...rest } = payload;
      onUpdateJob(rest, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateJobs();
          handleInvalidateJobDetail();
          Toast.Success("Job updated successfully");
        },
        onError: (error) => {
          Toast.Error("Error updating job. Please try again.");
          console.error("Error updating job:", error);
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { jobPostId, ...rest } = payload;

      onCreateJob(rest, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateJobs();
          Toast.Success("Job created successfully");
        },
        onError: (error) => {
          Toast.Error("Error creating job. Please try again.");
          console.error("Error creating job:", error);
        },
      });
    }
  };

  const onInValid = (errors: FieldErrors<JobFormPayload>) => {
    console.log("🚀 ~ inValid ~ errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingAction: isLoadingCreateJob || isLoadingUpdateJob,
    onSubmit: handleSubmit(onValid, onInValid),
  };
};
