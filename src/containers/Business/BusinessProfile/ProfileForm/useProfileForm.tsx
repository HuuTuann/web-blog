import BusinessProfileHelpers, { BusinessProfileFormSchema } from "./helpers";
import { Toast, useDialog } from "@/hooks";
import { useGetBusinessProfile, useUpdateBusinessProfile } from "@/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";

const useProfileForm = () => {
  const { hideDialog } = useDialog();

  const {
    businessProfile,
    isLoadingBusinessProfile,
    handleInvalidateBusinessProfile,
  } = useGetBusinessProfile();

  const { isLoadingUpdateBusinessProfile, onUpdateBusinessProfile } =
    useUpdateBusinessProfile();

  const { handleSubmit, ...formReturns } = useForm<BusinessProfileFormSchema>({
    defaultValues: BusinessProfileHelpers.initialValues,
    values: businessProfile,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(BusinessProfileHelpers.schema),
  });

  const onValid = (values: BusinessProfileFormSchema) => {
    onUpdateBusinessProfile(values, {
      onSuccess: () => {
        hideDialog();
        handleInvalidateBusinessProfile();
        Toast.Success("Profile updated successfully");
      },
      onError: () => {
        Toast.Error("Error updating profile");
      },
    });
  };

  const onInvalid = (errors: FieldErrors<BusinessProfileFormSchema>) => {
    console.log("Form validation errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingAction: isLoadingBusinessProfile || isLoadingUpdateBusinessProfile,
    onSubmit: handleSubmit(onValid, onInvalid),
  };
};

export default useProfileForm;
