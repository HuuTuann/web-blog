"use client";

import { Button } from "@/components";
import { ManagementBusinessKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { useDeleteBusiness, useGetBusinesses } from "@/queries";
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
import { BusinessForm } from "./BusinessForm";

export const ManagementBusiness = () => {
  const { showDialog, hideDialog } = useDialog();
  const {
    businesses,
    totalPagesBusinesses,
    businessesParams,
    setBusinessesParams,
    handleInvalidateBusinesses,
  } = useGetBusinesses();

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
      pageNo: pageNo - 1,
    }));
  };

  const handleCreateBlog = () => {
    showDialog({
      title: "Create Business",
      content: <BusinessForm />,
      options: {
        size: "5xl",
        hideActions: true,
      },
    });
  };

  const handleUpdateBusiness = (id: number) => {
    showDialog({
      title: "Update Business",
      content: <BusinessForm id={id} />,
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
          onDeleteBusiness(
            { [ManagementBusinessKeys.ID]: id },
            {
              onSuccess: () => {
                hideDialog();
                handleInvalidateBusinesses();
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
                  {renderCell(
                    business,
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
          defaultSelectedKeys={[businessesParams?.pageSize?.toString() ?? "10"]}
          onSelectionChange={handlePageSizeChange}
        >
          <SelectItem key={"10"}>10</SelectItem>
          <SelectItem key={"20"}>20</SelectItem>
          <SelectItem key={"15"}>15</SelectItem>
        </Select>
        <Pagination
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
