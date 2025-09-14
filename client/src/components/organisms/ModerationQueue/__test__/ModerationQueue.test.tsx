import { render, screen, fireEvent } from "@testing-library/react";
import { IModerationItem } from "../type/ModerationQueue.types";
import ModerationQueue from "../ModerationQueue";

describe("ModerationQueue", () => {
  const items: IModerationItem[] = [
    { id: "p_1", title: "은행 계좌 개설 팁", author: "Hana", flags: 3 },
    { id: "p_2", title: "체류지 변경 후기", author: "Alex", flags: 2 },
  ];

  it("빈 리스트일 경우 emptyText를 출력한다", () => {
    render(<ModerationQueue items={[]} onAction={jest.fn()} />);
    expect(screen.getByText("No pending items")).toBeInTheDocument();
  });

  it("아이템이 있을 경우 제목/작성자/flags가 표시된다", () => {
    render(<ModerationQueue items={items} onAction={jest.fn()} />);
    expect(screen.getByText("은행 계좌 개설 팁")).toBeInTheDocument();
    expect(screen.getByText(/by Hana · flags 3/)).toBeInTheDocument();
    expect(screen.getByText("체류지 변경 후기")).toBeInTheDocument();
  });

  it("Approve 버튼 클릭 시 onAction이 호출된다", () => {
    const mockAction = jest.fn();
    render(<ModerationQueue items={items} onAction={mockAction} />);
    fireEvent.click(screen.getByRole("button", { name: /Approve 은행 계좌 개설 팁/ }));
    expect(mockAction).toHaveBeenCalledWith("p_1", "approve");
  });

  it("Hide/Remove 버튼도 각각 올바른 액션을 전달한다", () => {
    const mockAction = jest.fn();
    render(<ModerationQueue items={items} onAction={mockAction} />);
    fireEvent.click(screen.getByRole("button", { name: /Hide 은행 계좌 개설 팁/ }));
    fireEvent.click(screen.getByRole("button", { name: /Remove 체류지 변경 후기/ }));
    expect(mockAction).toHaveBeenCalledWith("p_1", "hide");
    expect(mockAction).toHaveBeenCalledWith("p_2", "remove");
  });
});
