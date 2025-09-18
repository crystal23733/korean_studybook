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
      { id: "id", title: "Session", render: r => <span className="text-neutral-50">{r.id}</span> },
      {
        id: "user",
        title: "User",
        render: r => <span className="text-neutral-50 font-medium">{r.user}</span>,
      },
      {
        id: "start",
        title: "Start",
        align: "center",
        render: r => <span className="text-neutral-50">{r.start}</span>,
      },
      {
        id: "pages",
        title: "Pages",
        align: "center",
        render: r => <span className="text-neutral-50">{r.pages}</span>,
      },
      {
        id: "last",
        title: "Last Path",
        render: r => <span className="text-neutral-50">{r.last}</span>,
      },
    ];
    if (onOpen) {
      base.push({
        id: "actions",
        title: "Actions",
        align: "center",
        render: r => (
          <button
            type="button"
            className="rounded-md bg-neutral-900 px-2 py-1 text-sm text-white hover:bg-neutral-800 transition-colors"
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
