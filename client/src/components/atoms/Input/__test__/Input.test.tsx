import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../Input";

describe("Input 컴포넌트", () => {
  it("기본적으로 렌더링되고 기본 클래스가 적용된다", () => {
    render(<Input placeholder="테스트" />);
    const input = screen.getByPlaceholderText("테스트");

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("w-full", "rounded-lg", "border", "px-3", "py-2");
  });

  it("사용자가 텍스트를 입력할 수 있다", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox");

    await user.type(input, "안녕하세요");
    expect(input).toHaveValue("안녕하세요");
  });

  it("추가 className이 기존 클래스와 함께 적용된다", () => {
    render(<Input className="bg-blue-100" placeholder="테스트" />);
    const input = screen.getByPlaceholderText("테스트");

    expect(input).toHaveClass("w-full", "rounded-lg", "border", "px-3", "py-2", "bg-blue-100");
  });
});
