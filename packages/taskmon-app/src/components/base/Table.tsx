import React from "react";
import { FiInbox } from "react-icons/fi";
import { useTable, Column, useExpanded, Row } from "react-table";
import { Loading } from ".";

type TableProps<T extends object = {}> = {
  columns: ReadonlyArray<Column<T>>;
  data: readonly T[];
  loading?: boolean;
  renderRowSubComponent: (row: Row<T>) => React.ReactNode;
};

export function Table<T extends object = {}>({
  columns,
  data,
  loading,
  renderRowSubComponent,
}: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-48 space-y-4">
        <div className="p-6 rounded-full bg-slate-100">
          <FiInbox className="text-3xl" />
        </div>
        <span className="text-lg font-medium">No jobs found</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-48">
        <Loading />
      </div>
    );
  }

  return (
    <table {...getTableProps()} className="w-full min-w-full overflow-auto">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="border-b">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <React.Fragment key={row.getRowProps().key}>
              <tr className="border-t">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 text-sm whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
              {/* @ts-expect-error */}
              {row.isExpanded ? (
                <tr className="border-t">
                  <td colSpan={visibleColumns.length}>
                    {renderRowSubComponent(row)}
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
