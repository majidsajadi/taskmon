import { useState } from "react";
import { FiMinusSquare, FiPlus, FiPlusSquare } from "react-icons/fi";

type Column<T> = {
  label: string;
  accessor: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  rowKey: string;
  expandedRowRender?: (row: T) => React.ReactNode;
};

export function Table<T = Record<string, any>>({
  columns,
  rows,
  loading,
  rowKey,
  expandedRowRender,
}: Props<T>) {
  const [expanded, setExpanded] = useState(["6"]);

  const handleExpand = (key: any) => {
    if (expanded.includes(key)) {
      setExpanded(expanded.filter((k) => k !== key));
    } else {
      setExpanded([...expanded, key]);
    }
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {expandedRowRender && <th className="w-4 px-6 py-3" />}
        {columns.map((col) => (
          // TODO: generate id here
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody className="border-b">
      {rows.map((row) => {
        /* @ts-ignore */
        const isExpanded = expanded.includes(row[rowKey]);

        return (
          // TODO: generate id here
          <>
            <tr className="border-t">
              {expandedRowRender && (
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {isExpanded ? (
                    /* @ts-ignore */
                    <FiMinusSquare onClick={() => handleExpand(row[rowKey])} />
                  ) : (
                    /* @ts-ignore */
                    <FiPlusSquare onClick={() => handleExpand(row[rowKey])} />
                  )}
                </td>
              )}
              {columns.map((col) => (
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
            {expandedRowRender && isExpanded && (
              <tr className="border-t">
                <td colSpan={columns.length + 1}>{expandedRowRender(row)}</td>
              </tr>
            )}
          </>
        );
      })}
    </tbody>
  );

  return (
    <table className="w-full min-w-full overflow-auto">
      {renderTableHeader()}
      {renderTableBody()}
    </table>
  );
}
