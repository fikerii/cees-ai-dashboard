import { Table } from "@tanstack/react-table";
import Select, { Option } from "../form/Select";
import Button from "../ui/button/Button";
import { useMemo } from "react";

const options: Option[] = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

type Props = {
  table: Table<any>;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
};

export default function Pagination({ table, pageIndex, setPageIndex, pageSize, setPageSize }: Props) {
  const totalPages = table.getPageCount();
  // Menentukan tombol halaman yang ditampilkan
  const getPageNumbers = (totalPages: number, pageIndex: number) => {
    let pages: (number | string)[] = [];
    const maxVisiblePages = 7; // Jumlah maksimal tombol angka yang ditampilkan

    if (totalPages <= maxVisiblePages) {
      // Jika total halaman lebih sedikit dari maxVisiblePages, tampilkan semua
      pages = Array.from({ length: totalPages }, (_, i) => i);
    } else {
      if (pageIndex < 2 || pageIndex > totalPages - 3) {
        pages = [0, 1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1];
      } else {
        pages = [];
        pages.push(0);
        if (pageIndex > 2 && pageIndex !== totalPages - 3) pages.push("...");
        if (pageIndex === totalPages - 3) pages.push(1, "...");
        pages.push(pageIndex - 1, pageIndex, pageIndex + 1);
        if (pageIndex < totalPages - 3 && pageIndex !== 2) pages.push("...");
        if (pageIndex === 2) pages.push("...", totalPages - 2);
        pages.push(totalPages - 1);
      }
    }
    return pages;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageNumbers = useMemo(() => getPageNumbers(totalPages, pageIndex) || [0], [table, pageIndex, totalPages]);

  return (
    <div className="flex justify-between items-center mt-4 text-white">
      <div className="flex items-center gap-2">
        <span>Show:</span>
        <Select
          options={options}
          onChange={(value) => {
            setPageSize(Number(value));
            setPageIndex(0);
          }}
          placeholder=""
          defaultValue="10"
          className="pr-4"
        />
      </div>

      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(Number(pageIndex) - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        {pageNumbers.map((page, i) => (
          <Button
            key={i}
            size="sm"
            variant={pageIndex === page ? "primary" : "none"}
            onClick={() => (typeof page === "number" ? setPageIndex(page) : null)}
          >
            {typeof page === "number" ? page + 1 : page}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPageIndex(Number(pageIndex) + 1)}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
