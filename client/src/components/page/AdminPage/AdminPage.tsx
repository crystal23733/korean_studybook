"use client";

import AdminLayout from "@/components/features/AdminLayout/AdminLayout";
import IAdminPageProps from "./type/AdminPage.types";
import KPI from "@/components/atoms/KPI/KPI";
import UserSearchPanel from "@/components/organisms/UserSearchPanel/UserSearchPanel";
import SessionsTable from "@/components/organisms/SessionTable/SessionTable";
import ChartPlaceholder from "@/components/molecules/ChartPlaceholder/ChartPlaceholder";
import ModerationQueue from "@/components/organisms/ModerationQueue/ModerationQueue";

/**
 * 관리자 대시보드 페이지
 * Next.js의 서버 컴포넌트에서 데이터를 불러와 주입하는 예시
 * @example
 * const users: IAdminUser[] = await fetchUsers();
 * const sessions: ISessionRow[] = await fetchRecentSessions();
 * const moderationQueue: IModerationItem[] = await fetchQueue();
 * return <AdminPage users={users} sessions={sessions} moderationQueue={moderationQueue} />;
 */
export function AdminPage({ users, sessions, moderationQueue }: IAdminPageProps) {
  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="지난 7일 요약"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Admin" }]}
      actions={
        <div className="flex gap-2">
          <button className="rounded-md bg-black px-3 py-1 text-white">Export</button>
          <button className="rounded-md bg-neutral-200 px-3 py-1 text-neutral-900 hover:bg-neutral-300 transition-colors">
            Settings
          </button>
        </div>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KPI title="New Users" value="324" note="↑ 12%" />
        <KPI title="Active Sessions" value="1,842" note="~ 12m avg" />
        <KPI title="Conversion" value="4.6%" note="Free → Paid" />
        <KPI title="Flags" value="18" note="need moderation" />
      </div>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section aria-label="user search and actions">
            <UserSearchPanel
              users={users}
              onView={id => console.log("view", id)}
              onBan={id => console.log("ban", id)}
              onUnban={id => console.log("unban", id)}
            />
          </section>

          <section aria-label="recent sessions">
            <SessionsTable
              rows={sessions}
              onOpen={sid => console.log("open session", sid)}
              caption="Recent Sessions (joined to users)"
            />
          </section>
        </div>

        <div className="space-y-4">
          <section aria-label="traffic">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-neutral-900">
                  Traffic (placeholder chart)
                </h3>
              </div>
              <ChartPlaceholder />
            </div>
          </section>

          <section aria-label="moderation queue">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-neutral-900">Moderation Queue</h3>
              </div>
              <ModerationQueue
                items={moderationQueue}
                onAction={(id, action) => console.log("moderate", id, action)}
              />
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
