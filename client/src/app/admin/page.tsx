"use client";

import { IModerationItem } from "@/components/organisms/ModerationQueue/type/ModerationQueue.types";
import { ISessionRow } from "@/components/organisms/SessionTable/type/SessionTable.types";
import { IAdminUser } from "@/components/organisms/UserSearchPanel/type/UserSearchPanel.types";
import { AdminPage } from "@/components/page/AdminPage/AdminPage";

export default function Page() {
  const users: ReadonlyArray<IAdminUser> = [
    { id: "u_1", email: "hana@example.com", name: "Hana", status: "active" },
    { id: "u_2", email: "alex@world.com", name: "Alex", status: "active" },
    { id: "u_3", email: "li@cn.cn", name: "Li", status: "banned" },
  ];

  const sessions: ReadonlyArray<ISessionRow> = Array.from({ length: 6 }).map((_, i) => ({
    id: `s_${100 + i}`,
    user: i % 2 ? "Alex" : "Hana",
    start: `${8 + i}:0${i}`,
    pages: 2 + (i % 5),
    last: i % 2 ? "/course/intro" : "/community",
    utm: i % 3 === 0 ? "google/brand" : undefined,
  }));

  const moderationQueue: ReadonlyArray<IModerationItem> = [
    { id: "p_1", title: "은행 계좌 개설 팁", author: "Hana", flags: 3 },
    { id: "p_2", title: "체류지 변경 후기", author: "Alex", flags: 2 },
    { id: "p_3", title: "병원 접수 표현", author: "Li", flags: 5 },
  ];

  return <AdminPage users={users} sessions={sessions} moderationQueue={moderationQueue} />;
}
