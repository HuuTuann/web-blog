"use client";

import { ManagementJobKeys } from "@/constants";
import { Toast, useDialog } from "@/hooks";
import {
  useApproveJobOfBusiness,
  useDeleteJobOfBusiness,
  useGetJobOfBusiness,
} from "@/queries";
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
import { Button } from "@/components";
import { JobForm } from "./JobForm";

export const JobOfBusiness = () => {
  const { showDialog, hideDialog } = useDialog();
  const {
    jobs,
    totalPagesJobs,
    jobsParams,
    setJobsParams,
    handleInvalidateJobs,
  } = useGetJobOfBusiness();

  const { onDeleteJob } = useDeleteJobOfBusiness();
  const { onApproveJob } = useApproveJobOfBusiness();

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
      pageNo,
    }));
  };

  const handleDeleteJob = (id: number) => {
    showDialog({
      title: "Delete Job",
      content: `Are you sure you want to delete this job?`,
      options: {
        onOk: () => {
          onDeleteJob(
            { [ManagementJobKeys.ID]: id },
            {
              onSuccess: () => {
                hideDialog();
                handleInvalidateJobs();
                Toast.Success("Job deleted successfully");
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

  const handleApproveJob = (id: number) => {
    showDialog({
      title: "Approve Business",
      content: "Are you sure you want to approve this business?",
      options: {
        onOk: () => {
          onApproveJob(
            { [ManagementJobKeys.ID]: id },
            {
              onSuccess: () => {
                hideDialog();
                handleInvalidateJobs();
                Toast.Success("Job approved successfully");
              },
              onError: (error) => {
                console.error("Error approving business:", error);
              },
            },
          );
        },
      },
    });
  };

  const handleCreateJob = () => {
    showDialog({
      title: "Create Job",
      content: <JobForm />,
      options: {
        size: "5xl",
        hideActions: true,
      },
    });
  };

  const handleUpdateJob = (id: number) => {
    showDialog({
      title: "Update Job",
      content: <JobForm id={id} />,
      options: {
        size: "5xl",
        hideActions: true,
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full justify-end">
        <Button variant="ioSolid" onPress={() => handleCreateJob()}>
          Create Job
        </Button>
      </div>
      <Table
        aria-label="Example table with dynamic content"
        isHeaderSticky
        isVirtualized
        classNames={{
          base: "h-[calc(100%-96px)]",
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
                    handleApproveJob,
                    handleUpdateJob,
                    handleDeleteJob,
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
          key={`pagination-${totalPagesJobs}-${jobsParams?.pageNo}`}
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
