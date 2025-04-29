import { ManagementBlogKeys } from "@/constants";
import { formatDate } from "@/lib";
import { ListBlogsResponse } from "@/types";
import { Button } from "@heroui/react";
import { UserPen, UserRoundX } from "lucide-react";

export const allColumnsForTable = [
  {
    key: ManagementBlogKeys.TITLE,
    label: "Title",
  },
  {
    key: ManagementBlogKeys.CONTENT,
    label: "Content",
  },
  {
    key: ManagementBlogKeys.CREATE_BY,
    label: "Created By",
  },
  {
    key: ManagementBlogKeys.MODIFIED_BY,
    label: "Modified By",
  },
  {
    key: ManagementBlogKeys.ACTIONS,
    label: "Actions",
  },
];

export const renderCell = (
  managementBlog: ListBlogsResponse,
  columnKey: React.Key,
  handleUpdateBlog: (id: number) => void,
  handleDeleteBlog: (id: number) => void,
) => {
  const cellValue = managementBlog[columnKey as keyof ListBlogsResponse];

  switch (columnKey) {
    case ManagementBlogKeys.TITLE:
      return cellValue;
    case ManagementBlogKeys.CONTENT:
      return cellValue;
    case ManagementBlogKeys.CREATE_BY:
      const createdAt = managementBlog[ManagementBlogKeys.CREATE_AT];
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {formatDate(createdAt)}
          </p>
        </div>
      );
    case ManagementBlogKeys.MODIFIED_BY:
      const modifiedAt = managementBlog[ManagementBlogKeys.MODIFIED_AT];
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {formatDate(modifiedAt)}
          </p>
        </div>
      );
    case ManagementBlogKeys.ACTIONS:
      const id = managementBlog[ManagementBlogKeys.ID];

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => handleUpdateBlog(id)}
          >
            <UserPen className="text-slate-400" size={24} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onPress={() => handleDeleteBlog(id)}
          >
            <UserRoundX className="text-red-400" size={24} />
          </Button>
        </div>
      );

    default:
      return (
        <p className="overflow-hidden text-ellipsis">{cellValue as string}</p>
      );
  }
};
