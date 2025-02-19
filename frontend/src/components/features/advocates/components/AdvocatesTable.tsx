import { useState, useMemo, useEffect } from "react";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Select from "@/components/ui/Select";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { ColumnDef, ColumnSort } from "@tanstack/react-table";
import { Advocate } from "@/@types/advocate";
import TableRowSkeleton from "@/components/shared/loaders/TableRowSkeleton";

export type OnSortParam = { order: "asc" | "desc" | ""; key: string | number };

type Option = {
  value: number;
  label: string;
};

const { Tr, Th, Td, THead, TBody } = Table;

const pageSizeOption = [
  { value: 10, label: "10 / page" },
  { value: 20, label: "20 / page" },
  { value: 30, label: "30 / page" },
  { value: 40, label: "40 / page" },
  { value: 50, label: "50 / page" },
];

type AdvocatesTableProps = {
  data: Advocate[];
  loading?: boolean;
  onPaginationChange?: (page: number) => void;
  onSelectChange?: (num: number) => void;
  onSort?: (sort: OnSortParam) => void;
  pagingData?: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
};
const AdvocatesTable = (props: AdvocatesTableProps) => {
  const {
    data = [],
    loading = false,
    onPaginationChange,
    onSelectChange,
    onSort,
    pagingData = {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    },
  } = props;

  const { pageSize, pageIndex, total } = pagingData;
  const [sorting, setSorting] = useState<ColumnSort[] | null>(null);

  const columns = useMemo<ColumnDef<Advocate>[]>(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Years Of Experience",
        accessorKey: "yearsOfExperience",
      },
      {
        header: "Degree",
        accessorKey: "degree",
      },
      {
        header: "Location",
        accessorKey: "city",
        cell: (props) => {
          const data = props.row.original;
          return `${data.city}, ${data.state}`;
        },
      },
      {
        header: "Specialties",
        accessorKey: "specialties",
        style: { 'white-space': 'normal' },
        cell: (props) => {
          const data = props.row.original;

          if (!data.specialties) {
            return "";
          }

          const specialtiesString = data.specialties
            .map((s) => s.specialty.name)
            .join(", ");

          return (
            <div style={{wordBreak: "break-word", whiteSpace: "pre-wrap"}}>
                {specialtiesString}
            </div>
          );
        },
      },
    ],
    []
  );

  const handlePaginationChange = (page: number) => {
    if (!loading) {
      onPaginationChange?.(page);
    }
  };

  const handleSelectChange = (value?: number) => {
    if (!loading) {
      onSelectChange?.(Number(value));
    }
  };

  useEffect(() => {
    if (Array.isArray(sorting)) {
      const sortOrder =
        sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";
      const id = sorting.length > 0 ? sorting[0].id : "";
      onSort?.({ order: sortOrder, key: id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: (sorter) => {
      setSorting(sorter as ColumnSort[]);
    },
    state: {
      sorting: sorting as ColumnSort[],
    },
  });

  return (
    <div>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </THead>
        {loading && data.length === 0 ? (
          <TableRowSkeleton columns={columns.length} rows={pageSize} />
        ) : (
          <TBody>
            {table
              .getRowModel()
              .rows.slice(0, pageSize)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </TBody>
        )}
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Pagination
          pageSize={pageSize}
          currentPage={pageIndex}
          total={total}
          onChange={handlePaginationChange}
        />
        <div style={{ minWidth: 130 }}>
          <Select<Option>
            size="sm"
            isSearchable={false}
            value={pageSizeOption.filter((option) => option.value === pageSize)}
            options={pageSizeOption}
            onChange={(option) => handleSelectChange(option?.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvocatesTable;
