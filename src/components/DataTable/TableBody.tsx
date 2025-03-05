import { Fragment } from "react";
import { HeaderGroup, Row, RowModel, flexRender } from "@tanstack/react-table";

export const TableBody = <T,>({ tableRow, tableHeader, rowExpand }: { tableRow: RowModel<T>; tableHeader: HeaderGroup<T>[]; rowExpand?: (row: Row<T>) => React.ReactNode }) => {
  return (
    <>
      {tableRow.rows.length > 0 ? (
        tableRow.rows.map((row) => (
          <Fragment key={row.id}>
            <tr
              key={row.id}
              // className="border-b border-blue-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {rowExpand &&
              row.getIsExpanded() &&
              tableHeader.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <td colSpan={headerGroup.headers.length}>{rowExpand(row)}</td>
                </tr>
              ))}
          </Fragment>
        ))
      ) : (
        <>
          {tableHeader.map((headerGroup) => (
            <tr key={headerGroup.id}>
              <td
                colSpan={headerGroup.headers.length}
                className="text-gray-500 text-theme-xl dark:text-gray-400 p-4 text-center"
              >
                Data Tidak Tersedia
              </td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};
