import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import UserSearchPanel from "../UserSearchPanel";
import { IAdminUser } from "../type/UserSearchPanel.types";

describe("UserSearchPanel", () => {
  const users: IAdminUser[] = [
    { id: "u1", email: "alice@example.com", name: "Alice", status: "active" },
    { id: "u2", email: "bob@example.com", name: "Bob", status: "banned" },
    { id: "u3", email: "carol@sample.net", name: "Carol", status: "active" },
  ];

  it("검색바와 테이블이 렌더링되고, 캡션이 보인다", () => {
    render(<UserSearchPanel users={users} onView={() => {}} onBan={() => {}} onUnban={() => {}} />);

    // SearchBar 라벨/보조문구
    expect(screen.getByText("Search users")).toBeInTheDocument();
    expect(screen.getByText("Type to filter")).toBeInTheDocument();

    // DataTable 캡션 텍스트
    expect(screen.getByText("Admin user list")).toBeInTheDocument();

    // 일부 사용자 텍스트가 보이는지 (테이블 내부 텍스트 확인)
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.getByText("carol@sample.net")).toBeInTheDocument();
  });

  it("초기 검색어(initialQuery)가 있으면 필터된 상태로 시작한다", () => {
    render(
      <UserSearchPanel
        users={users}
        onView={() => {}}
        onBan={() => {}}
        onUnban={() => {}}
        initialQuery="bob"
      />
    );

    // bob만 보이고 alice/carol은 숨겨져야 함
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.queryByText("alice@example.com")).toBeNull();
    expect(screen.queryByText("carol@sample.net")).toBeNull();
  });

  it("검색바 입력에 따라 이메일/이름 기준으로 필터링한다(대소문자 무시)", () => {
    render(<UserSearchPanel users={users} onView={() => {}} onBan={() => {}} onUnban={() => {}} />);

    const input = screen.getByRole("textbox", { name: "Search users" });
    fireEvent.change(input, { target: { value: "ALICE" } });

    // Alice만 보이고 나머지는 사라짐
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.queryByText("bob@example.com")).toBeNull();
    expect(screen.queryByText("carol@sample.net")).toBeNull();
  });

  it("View 버튼 클릭 시 onView가 사용자 id로 호출된다", () => {
    const onView = jest.fn();
    render(<UserSearchPanel users={users} onView={onView} onBan={() => {}} onUnban={() => {}} />);

    // 첫 번째 행의 View를 누른다고 가정(사용자 u1)
    const viewBtn = screen.getAllByRole("button", { name: "View" })[0];
    fireEvent.click(viewBtn);
    expect(onView).toHaveBeenCalledWith("u1");
  });

  it("status가 active면 Ban 버튼, banned면 Unban 버튼을 보여주고 콜백을 호출한다", () => {
    const onBan = jest.fn();
    const onUnban = jest.fn();
    render(<UserSearchPanel users={users} onView={() => {}} onBan={onBan} onUnban={onUnban} />);

    // active 사용자(u1)의 Ban 버튼 클릭
    const banBtn = screen.getAllByRole("button", { name: "Ban" })[0];
    fireEvent.click(banBtn);
    expect(onBan).toHaveBeenCalledWith("u1");

    // banned 사용자(u2)의 Unban 버튼 클릭
    const unbanBtn = screen.getByRole("button", { name: "Unban" });
    fireEvent.click(unbanBtn);
    expect(onUnban).toHaveBeenCalledWith("u2");
  });

  it("외부 className이 루트 래퍼에 반영된다", () => {
    const { container } = render(
      <UserSearchPanel
        users={users}
        onView={() => {}}
        onBan={() => {}}
        onUnban={() => {}}
        className="my-extra-class"
      />
    );

    // 루트 div는 첫 번째 자식일 가능성이 높음
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("my-extra-class");
  });

  it("상태 텍스트(active/banned)가 표시된다", () => {
    render(<UserSearchPanel users={users} onView={() => {}} onBan={() => {}} onUnban={() => {}} />);

    // Badge의 tone은 스타일이라 직접 단정하기 어려우니 텍스트로 검증
    const rowAlice = screen.getByText("alice@example.com").closest("tr")!;
    expect(within(rowAlice).getByText(/^active$/i)).toBeInTheDocument();

    const rowBob = screen.getByText("bob@example.com").closest("tr")!;
    expect(within(rowBob).getByText(/^banned$/i)).toBeInTheDocument();
  });
});
