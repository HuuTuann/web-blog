import { useGetUserDetail, useUpdateUser } from "@/queries";
import { UpdateUserPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getInitialValues, initialValues, updateUserSchema } from "./helpers";

type Props = {
  id: string;
};

export const useUpdateUserForm = ({ id }: Props) => {
  const { userDetail } = useGetUserDetail({
    params: {
      user_id: id,
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

  const handleUpdateUser = (values: UpdateUserPayload) => {
    onUpdateUser(values);
  };

  return {
    ...formReturns,
    isLoadingUpdateUser,
    onSubmit: handleSubmit(handleUpdateUser),
  };
};
