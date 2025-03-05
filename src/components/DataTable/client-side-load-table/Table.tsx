import { useMemo, useState } from "react";
import { ColumnDef, ExpandedState, Row, SortingState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { TableHeader } from "../TableHeader";
import { TableBody } from "../TableBody";
import {
  Table as UITable,
  // TableBody as UITableBody,
  // TableCell,
  // TableHeader as UITableHeader,
  // TableRow,
} from "../../ui/table";
import Pagination from "../Pagination";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";

// ✅ Type untuk format data tabel
type TableProps<T> = {
  data: T[]; // Semua data di-load terlebih dahulu
  columns: ColumnDef<T>[]; // Definisi kolom yang bisa berubah-ubah
  isLoading?: boolean; // Status loading
  search?: string; // Nilai pencarian (filter global)
  setSearch?: (value: string) => void; // Fungsi untuk mengubah nilai pencarian
  rowExpand?: (row: Row<T>) => React.ReactNode; // Fungsi untuk expandable row
  pagination?: boolean; // Aktifkan fitur pagination
  searchBar?: boolean; // Aktifkan fitur pencarian
};

const Table = <T,>({ data, columns, isLoading, search, setSearch, rowExpand, pagination = false, searchBar = false }: TableProps<T>) => {
  // ✅ State untuk sorting, expanding row, dan jumlah data per halaman
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pageSize, setPageSize] = useState<number>(10); // Default 10 item per halaman
  const [pageIndex, setPageIndex] = useState<number>(0);

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <div className="placeholder w-full h-4 bg-gray-300 animate-pulse"></div>,
          }))
        : columns,
    [isLoading, columns]
  );

  // ✅ Gunakan TanStack Table untuk memproses data di client
  const table = useReactTable({
    data, // Semua data dimuat ke tabel
    columns: tableColumns,
    state: {
      sorting,
      expanded,
      globalFilter: search, // Filtering dilakukan di client-side
      pagination: {
        pageSize,
        pageIndex,
      }, // Sesuaikan jumlah item per halaman
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Aktifkan fitur filter bawaan
    getPaginationRowModel: getPaginationRowModel(), // Aktifkan fitur pagination bawaan
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setSearch,
    manualPagination: false, // 🚀 Semua data sudah di-load, jadi pagination dilakukan di client
    manualExpanding: true, // Expand row tetap manual
  });

  return (
    <div className="overflow-x-auto">
      {/* ✅ Input pencarian */}
      {searchBar && setSearch && (
        <div className="w-1/4">
          <div>
            <Label>Search</Label>
            <Input
              type="text"
              className="p-2 mb-4"
              placeholder="Cari data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ✅ Render tabel */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <UITable className="">
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableHeader headerGroups={table.getHeaderGroups()} />
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                <TableBody
                  tableRow={table.getRowModel()}
                  tableHeader={table.getHeaderGroups()}
                  rowExpand={rowExpand}
                />
              </tbody>
            </UITable>
          </div>
        </div>
      </div>

      {/* ✅ Pagination Controls */}
      {pagination && (
        <Pagination
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
          table={table}
        />
      )}
    </div>
  );
};

export default Table;
