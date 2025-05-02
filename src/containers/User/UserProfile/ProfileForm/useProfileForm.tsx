import { Toast, useDialog } from "@/hooks";
import { useGetUserProfile, useUpdateUserProfile } from "@/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import ProfileHelpers, { ProfileFormSchema } from "./helpers";

const useProfileForm = () => {
  const { hideDialog } = useDialog();

  const { userProfile, isLoadingUserProfile, handleInvalidateUserProfile } =
    useGetUserProfile();
  const formValues = ProfileHelpers.getInitialValues(userProfile);

  const { isLoadingUpdateUserProfile, onUpdateUserProfile } =
    useUpdateUserProfile();

  const { handleSubmit, ...formReturns } = useForm<ProfileFormSchema>({
    defaultValues: ProfileHelpers.initialValues,
    values: formValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(ProfileHelpers.schema),
  });

  const onValid = (values: ProfileFormSchema) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...restValues } = values;

    onUpdateUserProfile(restValues, {
      onSuccess: () => {
        hideDialog();
        handleInvalidateUserProfile();
        Toast.Success("Profile updated successfully");
      },
      onError: () => {
        Toast.Error("Error updating profile");
      },
    });
  };

  const onInvalid = (errors: FieldErrors<ProfileFormSchema>) => {
    console.log("Form validation errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingAction: isLoadingUserProfile || isLoadingUpdateUserProfile,
    onSubmit: handleSubmit(onValid, onInvalid),
  };
};

export default useProfileForm;
