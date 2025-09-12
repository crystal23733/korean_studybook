// src/components/molecules/SearchBar/__test__/SearchBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar Component", () => {
  it("기본 레이블이 렌더링되는지 확인", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("커스텀 레이블이 정상적으로 표시되는지 확인", () => {
    render(<SearchBar value="" onChange={() => {}} label="이메일 검색" />);
    expect(screen.getByText("이메일 검색")).toBeInTheDocument();
  });

  it("helperText가 있을 경우 표시되는지 확인", () => {
    render(<SearchBar value="" onChange={() => {}} helperText="이름으로 검색 가능" />);
    expect(screen.getByText("이름으로 검색 가능")).toBeInTheDocument();
  });

  it("입력값이 변경될 때 onChange 콜백이 호출되는지 확인", () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "테스트" } });

    expect(handleChange).toHaveBeenCalledWith("테스트");
  });

  it("placeholder가 정상적으로 적용되는지 확인", () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="검색어 입력" />);
    expect(screen.getByPlaceholderText("검색어 입력")).toBeInTheDocument();
  });
});
