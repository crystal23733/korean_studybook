import { render, screen, fireEvent, within } from "@testing-library/react";
import { IBreadcrumbItem } from "../type/AdminLayout.types";
import AdminLayout from "../AdminLayout";

describe("AdminLayout", () => {
  const breadcrumbs: IBreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Admin" }];

  it("제목/부제, 헤더/메인 역할이 올바르게 렌더링된다", () => {
    render(
      <AdminLayout title="Admin Dashboard" subtitle="지난 7일 요약">
        <div>contents</div>
      </AdminLayout>
    );

    // 제목/부제
    expect(screen.getByRole("heading", { name: "Admin Dashboard" })).toBeInTheDocument();
    expect(screen.getByText("지난 7일 요약")).toBeInTheDocument();

    // 접근성 역할
    expect(screen.getByRole("banner", { name: /admin header/i })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: /admin content/i })).toBeInTheDocument();

    // 메인 콘텐츠
    expect(screen.getByText("contents")).toBeInTheDocument();
  });

  it("브레드크럼을 렌더링하고 마지막 항목은 aria-current='page'로 표시한다", () => {
    render(
      <AdminLayout title="Admin" breadcrumbs={breadcrumbs}>
        <div />
      </AdminLayout>
    );

    const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();

    // 첫 항목은 링크, 두 번째(마지막)는 span + aria-current='page'
    const ol = within(nav).getByRole("list");
    const items = within(ol).getAllByRole("listitem");
    expect(items).toHaveLength(2);

    // 첫 번째 항목: 링크
    expect(within(items[0]).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");

    // 두 번째 항목: 현재 페이지(span)
    const last = within(items[1]).getByText("Admin");
    expect(last.tagName.toLowerCase()).toBe("span");
    expect(last).toHaveAttribute("aria-current", "page");

    // 구분자 개수 = 항목수 - 1
    const separators = within(ol).getAllByText("›");
    expect(separators).toHaveLength(breadcrumbs.length - 1);
  });

  it("onBack이 전달되면 'Go back' 버튼을 렌더링하고 클릭 시 콜백을 호출한다", () => {
    const handleBack = jest.fn();

    render(
      <AdminLayout title="Admin" onBack={handleBack}>
        <div />
      </AdminLayout>
    );

    const backBtn = screen.getByRole("button", { name: /go back/i });
    expect(backBtn).toBeInTheDocument();

    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it("actions 영역을 우측 상단에 렌더링한다", () => {
    render(
      <AdminLayout
        title="Admin"
        actions={
          <div>
            <button type="button">New</button>
            <button type="button">Export</button>
          </div>
        }
      >
        <div />
      </AdminLayout>
    );

    expect(screen.getByRole("button", { name: "New" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
  });

  it("onBack이 전달되면 'Go back' 버튼을 렌더링하고 클릭 시 콜백을 호출한다", () => {
    const handleBack = jest.fn();

    render(
      <AdminLayout title="Admin" onBack={handleBack}>
        <div />
      </AdminLayout>
    );

    const backBtn = screen.getByRole("button", { name: /go back/i });
    expect(backBtn).toBeInTheDocument();

    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it("actions 영역을 우측 상단에 렌더링한다", () => {
    render(
      <AdminLayout
        title="Admin"
        actions={
          <div>
            <button type="button">New</button>
            <button type="button">Export</button>
          </div>
        }
      >
        <div />
      </AdminLayout>
    );

    expect(screen.getByRole("button", { name: "New" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
  });
});
