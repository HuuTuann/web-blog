import { ManagementUserKeys } from "@/constants";
import { Toast, useDialog } from "@/hooks";
import { useGetUserDetail, useGetUsers, useUpdateUser } from "@/queries";
import { UpdateUserPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { getInitialValues, initialValues, updateUserSchema } from "./helpers";

type Props = {
  id: number;
};

export const useUpdateUserForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();
  const { handleInvalidateUsers } = useGetUsers();
  const { userDetail, handleInvalidateUserDetail } = useGetUserDetail({
    params: {
      [ManagementUserKeys.ID]: id,
    },
  });

  const { isLoadingUpdateUser, onUpdateUser } = useUpdateUser();

  const formValues = getInitialValues(userDetail);

  const { handleSubmit, ...formReturns } = useForm<UpdateUserPayload>({
    defaultValues: initialValues,
    values: formValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(updateUserSchema),
  });

  const onValid = (values: UpdateUserPayload) => {
    onUpdateUser(values, {
      onSuccess: () => {
        hideDialog();
        handleInvalidateUsers();
        handleInvalidateUserDetail();
        Toast.Success("User updated successfully");
      },
      onError: (error) => {
        Toast.Error("Error updating user. Please try again.");
        console.error("Error updating user:", error);
      },
    });
  };

  const onInValid = (errors: FieldErrors<UpdateUserPayload>) => {
    console.log("🚀 ~ inValid ~ errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingUpdateUser,
    onSubmit: handleSubmit(onValid, onInValid),
  };
};
