import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar";

// * input 컴포넌트 mock으로 만들기
jest.mock("../../../atoms/Input/Input", () => {
  return function MockInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} data-testid="search-input" />;
  };
});

describe("SearchBar 컴포넌트", () => {
  it("기본 요소들이 렌더링된다", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByText("Type to filter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search by email/name")).toBeInTheDocument();
  });

  it("value prop이 Input에 전달된다", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="테스트 검색어" onChange={mockOnChange} />);

    const input = screen.getByTestId("search-input");
    expect(input).toHaveValue("테스트 검색어");
  });

  it("사용자가 입력하면 onChange가 올바른 값으로 호출된다", async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByTestId("search-input");
    await user.type(input, "a");

    // onChange가 호출되었는지 확인
    expect(mockOnChange).toHaveBeenCalled();
    // 마지막 호출에서 올바른 값이 전달되었는지 확인
    expect(mockOnChange).toHaveBeenLastCalledWith("a");
  });
});
