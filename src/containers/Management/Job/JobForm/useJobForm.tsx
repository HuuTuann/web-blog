import { JobOpeningApprove, ManagementJobKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { formatDate } from "@/lib";
import {
  useCreateJob,
  useGetJobDetail,
  useGetJobs,
  useUpdateJob,
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

  const { jobDetail, handleInvalidateJobDetail } = useGetJobDetail({
    ...(id ? { params: { [ManagementJobKeys.ID]: id } } : {}),
  });
  const formValues = JobHelpers.getInitialValues(jobDetail);

  const { handleInvalidateJobs } = useGetJobs();
  const { isLoadingCreateJob, onCreateJob } = useCreateJob();
  const { isLoadingUpdateJob, onUpdateJob } = useUpdateJob();

  const { handleSubmit, ...formReturns } = useForm<JobFormSchema>({
    defaultValues: JobHelpers.initialValues,
    values: formValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(JobHelpers.schema),
  });

  const onValid = (values: JobFormSchema) => {
    const { isOpening, isApprove, deadline } = values;

    const payload = {
      ...values,
      [ManagementJobKeys.IS_OPENING]: isOpening === JobOpeningApprove.ENABLE,
      [ManagementJobKeys.IS_APPROVE]: isApprove === JobOpeningApprove.ENABLE,
      [ManagementJobKeys.DEADLINE]: formatDate(deadline),
    };

    if (id) {
      onUpdateJob(payload, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateJobs();
          handleInvalidateJobDetail();
        },
        onError: (error) => {
          console.error("Error updating job:", error);
        },
      });
    } else {
      onCreateJob(payload, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateJobs();
        },
        onError: (error) => {
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
