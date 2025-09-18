"use client";

import { IDataTableColumn } from "@/components/molecules/DataTable/types/DataTable.types";
import ISessionTableProps, { ISessionRow } from "./type/SessionTable.types";
import { useMemo } from "react";
import DataTable from "@/components/molecules/DataTable/DataTable";

/**
 * 관리자용 세션 목록 테이블
 * @example
 * const rows: ISessionRow[] = [
 *  { id: 's_101', user: 'Hana', start: '09:12', pages: 7, last: '/course/intro', utm: 'google/brand' },
 *  { id: 's_102', user: 'Alex', start: '14:03', pages: 3, last: '/community' },
 * ];
 *
 * <SessionsTable
 *   rows={rows}
 *   onOpen={(id) => console.log('open session', id)}
 *   caption="Recent sessions"
 * />
 */
export default function SessionsTable({
  rows,
  onOpen,
  caption = "User sessions",
  className = "",
}: ISessionTableProps) {
  const columns: ReadonlyArray<IDataTableColumn<ISessionRow>> = useMemo(() => {
    const base: IDataTableColumn<ISessionRow>[] = [
      { id: "id", title: "Session", accessor: 'id' },
      { id: "user", title: "User", accessor: 'user' },
      { id: "start", title: "Start", align: "center", accessor: 'start' },
      { id: "pages", title: "Pages", align: "center", accessor: 'pages' },
      { id: "last", title: "Last Path", accessor: 'last' },
    ];
    if (onOpen) {
      base.push({
        id: "id",
        title: "Actions",
        align: "center",
        render: r => (
          <button
            type="button"
            className="rounded-md bg-neutral-900 px-2 py-1 text-sm"
            onClick={() => onOpen(r.id)}
            aria-label={`Open session ${r.id}`}
          >
            Open
          </button>
        ),
      });
    }
    return base;
  }, [onOpen]);
  return (
    <div className={className}>
      <DataTable<ISessionRow>
        rows={rows}
        columns={columns}
        rowKey={r => r.id}
        caption={caption}
        stickyHeader
      />
    </div>
  );
}
