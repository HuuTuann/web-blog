import { ManagementBusinessKeys } from "@/constants";
import { useDialog } from "@/hooks";
import {
  useCreateBusiness,
  useGetBusinessDetail,
  useGetBusinesses,
  useUpdateBusiness,
} from "@/queries";
import { BusinessFormPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { BusinessHelpers } from "./helpers";

type Props = {
  id?: number;
};
export const useBusinessForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();

  const { businessDetail, handleInvalidateBusinessDetail } =
    useGetBusinessDetail({
      ...(id ? { params: { [ManagementBusinessKeys.ID]: id } } : {}),
    });
  const formValues = BusinessHelpers.getInitialValues(businessDetail);

  const { handleInvalidateBusinesses } = useGetBusinesses();
  const { isLoadingCreateBusiness, onCreateBusiness } = useCreateBusiness();
  const { isLoadingUpdateBusiness, onUpdateBusiness } = useUpdateBusiness();

  const { handleSubmit, ...formReturns } = useForm<BusinessFormPayload>({
    defaultValues: BusinessHelpers.initialValues,
    values: formValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(BusinessHelpers.schema),
  });

  const onValid = (values: BusinessFormPayload) => {
    console.log("Form values:", values);
    if (id) {
      onUpdateBusiness(values, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateBusinesses();
          handleInvalidateBusinessDetail();
        },
        onError: (error) => {
          console.error("Error updating business:", error);
        },
      });
    } else {
      onCreateBusiness(values, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateBusinesses();
        },
        onError: (error) => {
          console.error("Error creating business:", error);
        },
      });
    }
  };

  const onInValid = (errors: FieldErrors<BusinessFormPayload>) => {
    console.log("🚀 ~ inValid ~ errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingAction: isLoadingCreateBusiness || isLoadingUpdateBusiness,
    onSubmit: handleSubmit(onValid, onInValid),
  };
};
