import { render, screen } from "@testing-library/react";
import DataTable from "../DataTable";
import { IDataTableColumn } from "../types/DataTable.types";

// 테스트용 데이터 타입 정의
interface TestUser {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

// 테스트용 샘플 데이터
const mockUsers: TestUser[] = [
  { id: 1, name: "김철수", email: "kim@example.com", status: "active" },
  { id: 2, name: "이영희", email: "lee@example.com", status: "inactive" },
];

// 기본 컬럼 정의
const basicColumns: IDataTableColumn<TestUser>[] = [
  { id: "name", title: "이름", accessor: "name" },
  { id: "email", title: "이메일", accessor: "email" },
  { id: "status", title: "상태", accessor: "status" },
];

describe("DataTable 컴포넌트", () => {
  it("기본 테이블이 렌더링된다", () => {
    render(<DataTable rows={mockUsers} columns={basicColumns} />);

    // 테이블 요소 확인
    expect(screen.getByRole("table")).toBeInTheDocument();

    // 헤더 확인
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("이메일")).toBeInTheDocument();
    expect(screen.getByText("상태")).toBeInTheDocument();

    // 데이터 확인
    expect(screen.getByText("김철수")).toBeInTheDocument();
    expect(screen.getByText("kim@example.com")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("빈 데이터일 때 emptyText가 표시된다", () => {
    render(<DataTable rows={[]} columns={basicColumns} emptyText="데이터가 없습니다" />);

    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("커스텀 render 함수가 작동한다", () => {
    const columnsWithRender: IDataTableColumn<TestUser>[] = [
      { id: "name", title: "이름", accessor: "name" },
      {
        id: "status",
        title: "상태",
        accessor: "status",
        render: row => (
          <span data-testid="status-badge">{row.status === "active" ? "활성" : "비활성"}</span>
        ),
      },
    ];

    render(<DataTable rows={mockUsers} columns={columnsWithRender} />);

    expect(screen.getByText("활성")).toBeInTheDocument();
    expect(screen.getByText("비활성")).toBeInTheDocument();
    expect(screen.getAllByTestId("status-badge")).toHaveLength(2);
  });

  it("정렬 클래스가 적용된다", () => {
    const alignedColumns: IDataTableColumn<TestUser>[] = [
      { id: "name", title: "이름", align: "left", accessor: "name" },
      { id: "email", title: "이메일", align: "center", accessor: "email" },
      { id: "status", title: "상태", align: "right", accessor: "status" },
    ];

    render(<DataTable rows={mockUsers} columns={alignedColumns} />);

    const headers = screen.getAllByRole("columnheader");
    expect(headers[0]).toHaveClass("text-left");
    expect(headers[1]).toHaveClass("text-center");
    expect(headers[2]).toHaveClass("text-right");
  });

  it("stickyHeader가 작동한다", () => {
    render(<DataTable rows={mockUsers} columns={basicColumns} stickyHeader={true} />);

    const thead = document.querySelector("thead");
    expect(thead).toHaveClass("sticky", "top-0", "z-10");
  });

  it("caption이 설정된다", () => {
    render(<DataTable rows={mockUsers} columns={basicColumns} caption="사용자 목록 테이블" />);

    const caption = document.querySelector("caption");
    expect(caption).toHaveTextContent("사용자 목록 테이블");
    expect(caption).toHaveClass("sr-only"); // 스크린 리더 전용
  });

  it("커스텀 className이 적용된다", () => {
    render(<DataTable rows={mockUsers} columns={basicColumns} className="custom-table" />);

    const tableWrapper = document.querySelector(".custom-table");
    expect(tableWrapper).toBeInTheDocument();
    expect(tableWrapper).toHaveClass("overflow-hidden", "rounded-xl", "border");
  });
});
