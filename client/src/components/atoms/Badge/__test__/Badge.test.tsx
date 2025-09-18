import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

describe("Badge 컴포넌트 렌더링 테스트", () => {
  it("Badge 컴포넌트 텍스트 렌더링", () => {
    render(<Badge tone="ok">정상</Badge>);
    expect(screen.getByText("정상")).toHaveClass("bg-emerald-100 text-emerald-700");
  });
});
