"use client";

import { ManagementBlogKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { useGetBlogs } from "@/queries/ManagementBlog";
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

export const ManagementBlog = () => {
  const { showDialog, hideDialog } = useDialog();
  const {
    blogs,
    totalPagesBlogs,
    blogsParams,
    setBlogsParams,
    handleInvalidateBlogs,
  } = useGetBlogs();

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

  const handleUpdateBlog = (id: number) => {};
  const handleDeleteBlog = (id: number) => {};

  return (
    <div className="flex h-full w-full flex-col gap-4">
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
