"use client";

import { useMemo, useState } from "react";
import IUserSearchPanelProps, { IAdminUser } from "./type/UserSearchPanel.types";
import { IDataTableColumn } from "@/components/molecules/DataTable/types/DataTable.types";
import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Button/Button";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import DataTable from "@/components/molecules/DataTable/DataTable";

/**
 * 사용자 검색/목록/액션 패널
 *
 * @example
 * <UserSearchPanel
 *   users={users}
 *   onView={(id) => console.log('view', id)}
 *   onBan={(id) => console.log('ban', id)}
 *   onUnban={(id) => console.log('unban', id)}
 *   initialQuery=""
 * />
 */
export default function UserSearchPanel({
  users,
  onView,
  onBan,
  onUnban,
  initialQuery = "",
  className = "",
}: IUserSearchPanelProps) {
  const [q, setQ] = useState<string>(initialQuery);

  /**
   * 메모이즈된 사용자 검색 결과 배열
   *
   * 현재 검색어 `q`를 기반으로 이메일과 이름 필드를 소문자 비교하여 필터링한다.
   * 검색어가 비어 있으면 전체 사용자 목록을 반환한다.
   *
   * @constant
   * @type {ReadonlyArray<IAdminUser>}
   *
   * @example
   * 검색어가 "alice"일 때
   * const result = filtered;
   * => email이나 name에 "alice"가 포함된 사용자만 반환
   */
  const filtered: ReadonlyArray<IAdminUser> = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length === 0) return users;
    return users.filter(u => [u.email, u.name ?? ""].join(" ").toLowerCase().includes(needle));
  }, [q, users]);

  /**
   * 관리자 사용자 테이블의 컬럼 정의
   *
   * 이름, 이메일, 상태, 액션 버튼(View / Ban / Unban) 네 가지 컬럼을 정의한다.
   * 상태(Status)는 Badge로 표시되며, Actions 컬럼은 사용자 상태에 따라 Ban/Unban 버튼이 다르게 렌더링된다.
   *
   * @constant
   * @type {ReadonlyArray<IDataTableColumn<IAdminUser>>}
   *
   * @example
   * DataTable 컴포넌트에 사용
   * <DataTable rows={users} columns={columns} rowKey={u => u.id} />
   */
  const columns: ReadonlyArray<IDataTableColumn<IAdminUser>> = useMemo(
    () => [
      {
        id: "user",
        title: "User",
        align: "left",
        render: u => <span className="text-neutral-50 font-medium">{u.name ?? u.email}</span>,
      },
      {
        id: "email",
        title: "Email",
        align: "left",
        render: u => <span className="text-neutral-50">{u.email}</span>,
      },
      {
        id: "status",
        title: "Status",
        align: "center",
        render: u => <Badge tone={u.status === "banned" ? "error" : "ok"}>{u.status}</Badge>,
      },
      {
        id: "actions",
        title: "Actions",
        align: "center",
        render: u => (
          <div className="flex justify-center gap-2">
            <Button variant="primary" onClick={() => onView(u.id)}>
              View
            </Button>
            {u.status === "active" ? (
              <Button variant="danger" onClick={() => onBan(u.id)}>
                Ban
              </Button>
            ) : (
              <Button variant="warning" onClick={() => onUnban(u.id)}>
                Unban
              </Button>
            )}
          </div>
        ),
      },
    ],
    [onView, onBan, onUnban]
  );
  return (
    <div className={`space-y-3 ${className}`}>
      <SearchBar
        value={q}
        onChange={setQ}
        placeholder="Search by email/name"
        helperText="Type to filter"
        label="Search users"
      />
      <DataTable<IAdminUser>
        rows={filtered}
        columns={columns}
        rowKey={u => u.id}
        caption="Admin user list"
        stickyHeader
      />
    </div>
  );
}
