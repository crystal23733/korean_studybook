import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdminPage } from "../AdminPage";

// ---- 타입 임포트 (any 사용 금지) ----
import { IAdminUser } from "@/components/organisms/UserSearchPanel/type/UserSearchPanel.types";
import { ISessionRow } from "@/components/organisms/SessionTable/type/SessionTable.types";
import {
  IModerationItem,
  IModerationQueueProps,
} from "@/components/organisms/ModerationQueue/type/ModerationQueue.types";
import { IAdminLayoutProps } from "@/components/features/AdminLayout/type/AdminLayout.types";
import IUserSearchPanelProps from "@/components/organisms/UserSearchPanel/type/UserSearchPanel.types";
import ISessionTableProps from "@/components/organisms/SessionTable/type/SessionTable.types";

// ---- 자식 컴포넌트 목(mock) 정의 ----

// AdminLayout: title/subtitle/children만 보여주는 가벼운 목
jest.mock("@/components/features/AdminLayout/AdminLayout", () => {
  const Mock: React.FC<IAdminLayoutProps> = ({ title, subtitle, children }) => (
    <div data-testid="admin-layout">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      <div data-testid="admin-layout-children">{children}</div>
    </div>
  );
  return { __esModule: true, default: Mock };
});

// KPI: 단순 존재 확인용 목
jest.mock("@/components/atoms/KPI/KPI", () => {
  const Mock: React.FC<{ title: string; value: string; note?: string }> = ({
    title,
    value,
    note,
  }) => (
    <div data-testid={`kpi-${title}`}>
      {value}
      {note ? `(${note})` : ""}
    </div>
  );
  return { __esModule: true, default: Mock };
});

// UserSearchPanel: 패널 표시 + onView/onBan/onUnban 테스트용 버튼 제공
jest.mock("@/components/organisms/UserSearchPanel/UserSearchPanel", () => {
  const Mock: React.FC<IUserSearchPanelProps> = props => (
    <div data-testid="user-search-panel">
      <button onClick={() => props.onView("u1")}>mock-view</button>
      <button onClick={() => props.onBan("u1")}>mock-ban</button>
      <button onClick={() => props.onUnban("u1")}>mock-unban</button>
    </div>
  );
  return { __esModule: true, default: Mock };
});

// SessionsTable: 테이블 표시 + onOpen 테스트용 버튼 제공
jest.mock("@/components/organisms/SessionTable/SessionTable", () => {
  const Mock: React.FC<ISessionTableProps> = props => (
    <div data-testid="sessions-table">
      <button onClick={() => props.onOpen?.("s1")}>mock-open-session</button>
    </div>
  );
  return { __esModule: true, default: Mock };
});

// ChartPlaceholder: 단순 존재 확인
jest.mock("@/components/molecules/ChartPlaceholder/ChartPlaceholder", () => {
  const Mock: React.FC = () => <div data-testid="chart-placeholder" />;
  return { __esModule: true, default: Mock };
});

// ModerationQueue: 큐 표시 + onAction 테스트용 버튼 제공
jest.mock("@/components/organisms/ModerationQueue/ModerationQueue", () => {
  const Mock: React.FC<IModerationQueueProps> = props => (
    <div data-testid="moderation-queue">
      <button onClick={() => props.onAction("m1", "approve")}>mock-moderate</button>
    </div>
  );
  return { __esModule: true, default: Mock };
});

describe("AdminPage", () => {
  const users: ReadonlyArray<IAdminUser> = [
    { id: "u1", email: "alice@example.com", name: "Alice", status: "active" },
    { id: "u2", email: "bob@example.com", name: "Bob", status: "banned" },
  ];

  const sessions: ReadonlyArray<ISessionRow> = [
    { id: "s1", user: "Alice", start: "09:12", pages: 5, last: "/home" },
    { id: "s2", user: "Bob", start: "10:20", pages: 3, last: "/settings" },
  ];

  const moderationQueue: ReadonlyArray<IModerationItem> = [
    { id: "m1", title: "스팸 게시물", author: "Eve", flags: 4 },
  ];

  // console.log 스파이: AdminPage 내부 콜백(onView/onBan/onUnban/onOpen/onAction)이 제대로 호출되는지 확인
  const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  afterEach(() => {
    logSpy.mockClear();
  });

  it("AdminLayout, KPI, UserSearchPanel, SessionsTable, ChartPlaceholder, ModerationQueue가 렌더링된다", () => {
    render(<AdminPage users={users} sessions={sessions} moderationQueue={moderationQueue} />);

    // 레이아웃/헤더
    expect(screen.getByTestId("admin-layout")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Admin Dashboard" })).toBeInTheDocument();
    expect(screen.getByText("지난 7일 요약")).toBeInTheDocument();

    // KPI 4개 (testid로 확인)
    expect(screen.getByTestId("kpi-New Users")).toBeInTheDocument();
    expect(screen.getByTestId("kpi-Active Sessions")).toBeInTheDocument();
    expect(screen.getByTestId("kpi-Conversion")).toBeInTheDocument();
    expect(screen.getByTestId("kpi-Flags")).toBeInTheDocument();

    // 나머지 섹션
    expect(screen.getByTestId("user-search-panel")).toBeInTheDocument();
    expect(screen.getByTestId("sessions-table")).toBeInTheDocument();
    expect(screen.getByTestId("chart-placeholder")).toBeInTheDocument();
    expect(screen.getByTestId("moderation-queue")).toBeInTheDocument();
  });

  it("UserSearchPanel 내부 액션이 AdminPage 콜백(= console.log)으로 전달된다", () => {
    render(<AdminPage users={users} sessions={sessions} moderationQueue={moderationQueue} />);

    // view/ban/unban 각각 트리거
    fireEvent.click(screen.getByText("mock-view"));
    fireEvent.click(screen.getByText("mock-ban"));
    fireEvent.click(screen.getByText("mock-unban"));

    // AdminPage에서 정의한 콜백: console.log('view'|'ban'|'unban', id)
    expect(logSpy).toHaveBeenCalledWith("view", "u1");
    expect(logSpy).toHaveBeenCalledWith("ban", "u1");
    expect(logSpy).toHaveBeenCalledWith("unban", "u1");
  });

  it("SessionsTable의 onOpen이 AdminPage 콜백(= console.log)으로 연결된다", () => {
    render(<AdminPage users={users} sessions={sessions} moderationQueue={moderationQueue} />);

    fireEvent.click(screen.getByText("mock-open-session"));
    expect(logSpy).toHaveBeenCalledWith("open session", "s1");
  });

  it("ModerationQueue의 onAction이 AdminPage 콜백(= console.log)으로 연결된다", () => {
    render(<AdminPage users={users} sessions={sessions} moderationQueue={moderationQueue} />);

    fireEvent.click(screen.getByText("mock-moderate"));
    expect(logSpy).toHaveBeenCalledWith("moderate", "m1", "approve");
  });
});
