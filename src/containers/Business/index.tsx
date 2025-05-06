"use client";

import { ManagementBusinessKeys } from "@/constants";
import { Toast, useDialog } from "@/hooks";
import { useDeleteBusiness, useGetBusinessesBusiness } from "@/queries";
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

export const Business = () => {
  const { showDialog, hideDialog } = useDialog();
  const {
    businesses,
    businessesParams,
    totalPagesBusinesses,
    setBusinessesParams,
    handleInvalidateBusinesses,
  } = useGetBusinessesBusiness();

  const { onDeleteBusiness } = useDeleteBusiness();

  const handlePageSizeChange = (keys: SharedSelection) => {
    const pageSize = Number(Array.from(keys)[0]);
    setBusinessesParams((prev) => ({
      ...prev,
      pageSize,
    }));
  };

  const handlePageNoChange = (pageNo: number) => {
    setBusinessesParams((prev) => ({
      ...prev,
      pageNo,
    }));
  };

  const handleCreateJob = () => {};

  const handleDeleteBusiness = (id: number) => {
    showDialog({
      title: "Delete Business",
      content: `Are you sure you want to delete this business?`,
      options: {
        onOk: () => {
          onDeleteBusiness(
            { [ManagementBusinessKeys.ID]: id },
            {
              onSuccess: () => {
                hideDialog();
                handleInvalidateBusinesses();
                Toast.Success("Business deleted successfully");
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
                column.key === ManagementBusinessKeys.ACTIONS
                  ? "center"
                  : "start"
              }
              width={
                column.key === ManagementBusinessKeys.ACTIONS ? 80 : undefined
              }
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found">
          {businesses.map((business) => (
            <TableRow key={business[ManagementBusinessKeys.ID]}>
              {(columnKey) => (
                <TableCell className="overflow-hidden text-ellipsis text-nowrap">
                  {renderCell(business, columnKey, handleDeleteBusiness)}
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
          defaultSelectedKeys={[businessesParams?.pageSize?.toString() ?? "10"]}
          onSelectionChange={handlePageSizeChange}
        >
          <SelectItem key={"10"}>10</SelectItem>
          <SelectItem key={"20"}>20</SelectItem>
          <SelectItem key={"15"}>15</SelectItem>
        </Select>
        <Pagination
          key={`pagination-${totalPagesBusinesses}-${businessesParams?.pageNo}`}
          aria-label="page-no"
          showControls
          initialPage={businessesParams?.pageNo}
          total={totalPagesBusinesses}
          onChange={handlePageNoChange}
        />
      </div>
    </div>
  );
};
