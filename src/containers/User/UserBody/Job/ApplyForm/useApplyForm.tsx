import { Toast, useDialog } from "@/hooks";
import { UserApplyFormPayload } from "@/types";
import { FieldErrors, useForm } from "react-hook-form";
import ApplyHelpers from "./helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplyCV, useGetJobsUser } from "@/queries";

type Props = {
  id: number;
};

const useApplyForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();

  const formValues = ApplyHelpers.getInitialValues(id);
  const { handleInvalidateJobs } = useGetJobsUser();

  const { isLoadingApplyCV, onApplyCV } = useApplyCV();

  const { handleSubmit, ...formReturns } = useForm<UserApplyFormPayload>({
    values: formValues,
    defaultValues: ApplyHelpers.initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(ApplyHelpers.schema),
  });

  const onValid = (values: UserApplyFormPayload) => {
    console.log("Form values:", values);
    onApplyCV(values, {
      onSuccess: () => {
        hideDialog();
        handleInvalidateJobs();
        Toast.Success("CV applied successfully");
      },
      onError: (error) => {
        Toast.Error("Error applying CV. Please try again.");
        console.error("Error applying CV:", error);
      },
    });
  };

  const onInvalid = (errors: FieldErrors<UserApplyFormPayload>) => {
    console.log("Form errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingAction: isLoadingApplyCV,
    onSubmit: handleSubmit(onValid, onInvalid),
  };
};

export default useApplyForm;
