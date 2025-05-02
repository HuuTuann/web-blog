import { ManagementBlogKeys } from "@/constants";
import { Toast, useDialog } from "@/hooks";
import {
  useCreateBlog,
  useGetBlogDetail,
  useGetBlogs,
  useUpdateBlog,
} from "@/queries";
import { BlogFormPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { blogHelpers } from "./helpers";

type Props = {
  id?: number;
};

export const useBlogForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();

  const { blogDetail, handleInvalidateBlogDetail } = useGetBlogDetail({
    ...(id ? { params: { [ManagementBlogKeys.ID]: id } } : {}),
  });
  const formValues = blogHelpers.getInitialValues(blogDetail);

  const { handleInvalidateBlogs } = useGetBlogs();
  const { isLoadingCreateBlog, onCreateBlog } = useCreateBlog();
  const { isLoadingUpdateBlog, onUpdateBlog } = useUpdateBlog();

  const { handleSubmit, ...formReturns } = useForm<BlogFormPayload>({
    defaultValues: blogHelpers.initialValues,
    values: formValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(blogHelpers.schema),
  });

  const onValid = (values: BlogFormPayload) => {
    console.log("Form values:", values);
    if (id) {
      onUpdateBlog(values, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateBlogs();
          handleInvalidateBlogDetail();
          Toast.Success("Blog updated successfully");
        },
        onError: (error) => {
          Toast.Error("Error updating blog. Please try again.");
          console.error("Error updating blog:", error);
        },
      });
    } else {
      onCreateBlog(values, {
        onSuccess: () => {
          hideDialog();
          handleInvalidateBlogs();
          Toast.Success("Blog created successfully");
        },
        onError: (error) => {
          console.error("Error creating blog:", error);
        },
      });
    }
  };

  const onInValid = (errors: FieldErrors<BlogFormPayload>) => {
    console.log("🚀 ~ inValid ~ errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingAction: isLoadingCreateBlog || isLoadingUpdateBlog,
    onSubmit: handleSubmit(onValid, onInValid),
  };
};
