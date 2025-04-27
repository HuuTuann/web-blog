import { ManagementBlogKeys } from "@/constants";
import { BlogDetailResponse, BlogFormPayload } from "@/types/ManagementBlog";
import { z } from "zod";

const schema = z.object({
  [ManagementBlogKeys.ID]: z.number().readonly(),
  [ManagementBlogKeys.TITLE]: z.string().nonempty({
    message: "Title is required",
  }),
  [ManagementBlogKeys.CONTENT]: z.string().nonempty({
    message: "Content is required",
  }),
  [ManagementBlogKeys.IMAGE]: z.string().nonempty({
    message: "Image is required",
  }),
});

const initialValues = {
  [ManagementBlogKeys.ID]: 0,
  [ManagementBlogKeys.TITLE]: "",
  [ManagementBlogKeys.CONTENT]: "",
  [ManagementBlogKeys.IMAGE]: "",
};

const getInitialValues = (blog?: BlogDetailResponse): BlogFormPayload => {
  return {
    ...initialValues,
    [ManagementBlogKeys.ID]: blog?.[ManagementBlogKeys.ID] ?? 0,
    [ManagementBlogKeys.TITLE]: blog?.[ManagementBlogKeys.TITLE] ?? "",
    [ManagementBlogKeys.CONTENT]: blog?.[ManagementBlogKeys.CONTENT] ?? "",
    [ManagementBlogKeys.IMAGE]: blog?.[ManagementBlogKeys.IMAGE] ?? "",
  };
};

export const blogHelpers = {
  schema,
  initialValues,
  getInitialValues,
};
