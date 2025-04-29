"use client";

import { Button } from "@/components";
import { ManagementJobKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { useDeleteJob, useGetJobs } from "@/queries";
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
import { JobForm } from "./JobForm";

export const ManagementJob = () => {
  const { showDialog, hideDialog } = useDialog();
  const {
    jobs,
    totalPagesJobs,
    jobsParams,
    setJobsParams,
    handleInvalidateJobs,
  } = useGetJobs();

  const { onDeleteJob } = useDeleteJob();

  const handlePageSizeChange = (keys: SharedSelection) => {
    const pageSize = Number(Array.from(keys)[0]);
    setJobsParams((prev) => ({
      ...prev,
      pageSize,
    }));
  };

  const handlePageNoChange = (pageNo: number) => {
    setJobsParams((prev) => ({
      ...prev,
      pageNo: pageNo - 1,
    }));
  };

  const handleCreateBlog = () => {
    showDialog({
      title: "Create Business",
      content: <JobForm />,
      options: {
        size: "5xl",
        hideActions: true,
      },
    });
  };

  const handleUpdateBusiness = (id: number) => {
    showDialog({
      title: "Update Business",
      content: <JobForm id={id} />,
      options: {
        size: "5xl",
        hideActions: true,
      },
    });
  };

  const handleDeleteBusiness = (id: number) => {
    showDialog({
      title: "Delete Business",
      content: `Are you sure you want to delete this business?`,
      options: {
        onOk: () => {
          onDeleteJob(
            { [ManagementJobKeys.ID]: id },
            {
              onSuccess: () => {
                hideDialog();
                handleInvalidateJobs();
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
                column.key === ManagementJobKeys.ACTIONS ? "center" : "start"
              }
              width={column.key === ManagementJobKeys.ACTIONS ? 80 : undefined}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found">
          {jobs.map((job) => (
            <TableRow key={job[ManagementJobKeys.ID]}>
              {(columnKey) => (
                <TableCell className="overflow-hidden text-ellipsis text-nowrap">
                  {renderCell(
                    job,
                    columnKey,
                    handleUpdateBusiness,
                    handleDeleteBusiness,
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
          defaultSelectedKeys={[jobsParams?.pageSize?.toString() ?? "10"]}
          onSelectionChange={handlePageSizeChange}
        >
          <SelectItem key={"10"}>10</SelectItem>
          <SelectItem key={"20"}>20</SelectItem>
          <SelectItem key={"15"}>15</SelectItem>
        </Select>
        <Pagination
          aria-label="page-no"
          showControls
          initialPage={jobsParams?.pageNo}
          total={totalPagesJobs}
          onChange={handlePageNoChange}
        />
      </div>
    </div>
  );
};
