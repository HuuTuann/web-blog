"use client";

import { Button } from "@/components";
import { ManagementBlogKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { useDeleteBlog, useGetBlogs } from "@/queries";
import {
  Pagination,
  Select,
  SelectItem,
  SharedSelection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { allColumnsForTable, renderCell } from "./allColumns";
import { BlogForm } from "./BlogForm";

export const ManagementBlog = () => {
  const { showDialog, hideDialog } = useDialog();
  const {
    blogs,
    totalPagesBlogs,
    blogsParams,
    setBlogsParams,
    handleInvalidateBlogs,
  } = useGetBlogs();

  const { onDeleteBlog } = useDeleteBlog();

  const handlePageSizeChange = (keys: SharedSelection) => {
    const pageSize = Number(Array.from(keys)[0]);
    setBlogsParams((prev) => ({
      ...prev,
      pageSize,
    }));
  };

  const handlePageNoChange = (pageNo: number) => {
    setBlogsParams((prev) => ({
      ...prev,
      pageNo: pageNo - 1,
    }));
  };

  const handleCreateBlog = () => {
    showDialog({
      title: "Create Blog",
      content: <BlogForm />,
      options: {
        hideActions: true,
      },
    });
  };

  const handleUpdateBlog = (id: number) => {
    showDialog({
      title: "Update Blog",
      content: <BlogForm id={id} />,
      options: {
        hideActions: true,
      },
    });
  };

  const handleDeleteBlog = (id: number) => {
    showDialog({
      title: "Delete Blog",
      content: "Are you sure you want to delete this blog?",
      options: {
        onOk: () => {
          onDeleteBlog(
            { [ManagementBlogKeys.ID]: id },
            {
              onSuccess: () => {
                hideDialog();
                handleInvalidateBlogs();
              },
              onError: (error) => {
                console.error("Error deleting blog:", error);
              },
            },
          );
        },
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full justify-end">
        <Button variant="ioBordered" onPress={handleCreateBlog}>
          Create
        </Button>
      </div>
      <Table
        aria-label="Example table with dynamic content"
        isHeaderSticky
        isVirtualized
        classNames={{
          base: "h-[calc(100%-56px)]",
          wrapper: "!h-full",
        }}
      >
        <TableHeader columns={allColumnsForTable}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={
                column.key === ManagementBlogKeys.ACTIONS ? "center" : "start"
              }
              width={column.key === ManagementBlogKeys.ACTIONS ? 80 : undefined}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found">
          {blogs.map((blog) => (
            <TableRow key={blog[ManagementBlogKeys.ID]}>
              {(columnKey) => (
                <TableCell className="overflow-hidden text-ellipsis text-nowrap">
                  {renderCell(
                    blog,
                    columnKey,
                    handleUpdateBlog,
                    handleDeleteBlog,
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center gap-2">
        <Select
          aria-label="page-size"
          variant="bordered"
          className="w-24"
          disallowEmptySelection
          defaultSelectedKeys={[blogsParams?.pageSize?.toString() ?? "10"]}
          onSelectionChange={handlePageSizeChange}
        >
          <SelectItem key={"10"}>10</SelectItem>
          <SelectItem key={"20"}>20</SelectItem>
          <SelectItem key={"15"}>15</SelectItem>
        </Select>
        <Pagination
          aria-label="page-no"
          showControls
          initialPage={blogsParams?.pageNo}
          total={totalPagesBlogs}
          onChange={handlePageNoChange}
        />
      </div>
    </div>
  );
};
