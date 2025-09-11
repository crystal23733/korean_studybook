"use client";

import { ALIGN_CLASS, IDataTableProps } from "./types/DataTable.types";

/**
 * 접근성 친화적이고 타입 안정적인 테이블 컴포넌트
 *
 * @example
 * <DataTable<User>
 *  rows={users}
 *  columns={columns}
 *  rowKey={u=>u.id}
 *  caption='User list'
 * />
 */
export default function DataTable<T extends object>(props: IDataTableProps<T>) {
  const {
    rows,
    columns,
    rowKey,
    caption,
    emptyText = "No Data",
    stickyHeader = false,
    className = "",
  } = props;

  return (
    <div className={`overflow-hidden rounded-xl border ${className}`}>
      <table className="w-full text-sm" role="table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className={`bg-neutral-50 ${stickyHeader ? "sticky top-0 z-10" : ""}`}>
          <tr>
            {columns.map(c => (
              <th
                key={String(c.key)}
                scope="col"
                className={`px-3 py-2 ${ALIGN_CLASS[c.align ?? "left"]}`}
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-3 py-4 text-center text-neutral-500" colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => {
              const k = rowKey ? rowKey(row, i) : String(i);
              return (
                <tr key={k} className="border-t">
                  {columns.map(c => {
                    const alignCls = ALIGN_CLASS[c.align ?? "left"];
                    const content =
                      c.render !== undefined
                        ? c.render(row, i)
                        : ((row as Record<string, unknown>)[c.key as string] as React.ReactNode);

                    return (
                      <td
                        key={String(c.key)}
                        className={`px-3 py-2 ${alignCls} ${c.className ?? ""}`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
