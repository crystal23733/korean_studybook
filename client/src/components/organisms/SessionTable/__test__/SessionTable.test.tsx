import { render, screen, fireEvent, within } from "@testing-library/react";
import { ISessionRow } from "../type/SessionTable.types";
import SessionsTable from "../SessionTable";

describe("SessionTable", () => {
  const rows: ISessionRow[] = [
    {
      id: "s_101",
      user: "Hana",
      start: "09:12",
      pages: 7,
      last: "/course/intro",
      utm: "google/brand",
    },
    { id: "s_102", user: "Alex", start: "14:03", pages: 3, last: "/community" },
  ];

  it("기본 열과 행이 렌더링되고, 캡션이 표시된다", () => {
    render(<SessionsTable rows={rows} caption="Recent sessions" />);

    // 캡션
    expect(screen.getByText("Recent sessions")).toBeInTheDocument();

    // 열 헤더 (Actions는 onOpen 없으면 나타나지 않음
    expect(screen.getByText("Session")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Pages")).toBeInTheDocument();
    expect(screen.getByText("Last Path")).toBeInTheDocument();
    expect(screen.queryByText("Actions")).toBeNull();

    // 행 데이터 (일부 셀 텍스트 확인)
    expect(screen.getByText("Hana")).toBeInTheDocument();
    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByText("09:12")).toBeInTheDocument();
    expect(screen.getByText("14:03")).toBeInTheDocument();
    expect(screen.getByText("/course/intro")).toBeInTheDocument();
    expect(screen.getByText("/community")).toBeInTheDocument();
    // pages는 숫자이므로 텍스트로도 나타나야 함
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("onOpen이 주어지면 Actions 열과 Open 버튼이 렌더링되고 클릭 시 콜백이 호출된다", () => {
    const handleOpen = jest.fn();
    render(<SessionsTable rows={rows} onOpen={handleOpen} />);

    // Actions 헤더와 각 행의 Open 버튼 존재
    expect(screen.getByText("Actions")).toBeInTheDocument();

    // 각 행에 Open 버튼이 하나씩
    const openButtons = screen.getAllByRole("button", { name: /open/i });
    expect(openButtons).toHaveLength(rows.length);

    // 첫 번째 행의 버튼 클릭 -> 첫 번째 id로 콜백 호출
    fireEvent.click(openButtons[0]);
    expect(handleOpen).toHaveBeenCalledWith("s_101");

    // 접근성 라벨도 부여됨
    expect(screen.getByLabelText(`Open session ${rows[0].id}`)).toBeInTheDocument();
  });

  it("특정 행 내부에서 셀 텍스트를 찾을 수 있다(행 범위 검색 예시)", () => {
    render(<SessionsTable rows={rows} />);

    // "Hana"가 포함된 행을 찾아 그 안에서만 검증
    const hanaCell = screen.getByText("Hana");
    const hanaRow = hanaCell.closest("tr");
    expect(hanaRow).not.toBeNull();

    // 해당 행 내부에서 pages=7 과 last=/course/intro 를 확인
    const scope = within(hanaRow as HTMLTableRowElement);
    expect(scope.getByText("7")).toBeInTheDocument();
    expect(scope.getByText("/course/intro")).toBeInTheDocument();
  });
});
