import { useDialog } from "@/hooks";
import { useCreateBlog, useGetBlogs } from "@/queries/ManagementBlog";
import { BlogFormPayload } from "@/types/ManagementBlog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { blogHelpers } from "./helpers";

type Props = {
  id?: number;
};

export const useBlogForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();
  const formValues = blogHelpers.getInitialValues();

  const { handleInvalidateBlogs } = useGetBlogs();
  const { isLoadingCreateBlog, onCreateBlog } = useCreateBlog();

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
    onCreateBlog(values, {
      onSuccess: () => {
        hideDialog();
        handleInvalidateBlogs();
      },
      onError: (error) => {
        console.error("Error creating blog:", error);
      },
    });
  };

  const onInValid = (errors: FieldErrors<BlogFormPayload>) => {
    console.log("🚀 ~ inValid ~ errors:", errors);
  };

  return {
    ...formReturns,
    isLoadingCreateBlog,
    onSubmit: handleSubmit(onValid, onInValid),
  };
};
