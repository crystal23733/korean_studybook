// __tests__/ChartPlaceholder.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ChartPlaceholder from "../ChartPlaceholder";

// describe로 테스트 그룹 정의
describe("ChartPlaceholder", () => {
  it("기본 렌더링이 정상적으로 이루어진다", () => {
    render(<ChartPlaceholder />);
    // 접근성 role을 기반으로 찾기
    expect(screen.getByRole("img", { name: /placeholder chart/i })).toBeInTheDocument();
  });

  it("고정 values로 막대 높이가 설정된다", () => {
    const values = [0, 5, 10];
    render(<ChartPlaceholder values={values} />);
    const bars = screen.getByRole("img").querySelectorAll("div > div");
    expect(bars.length).toBe(values.length);
  });

  it("values가 전부 0이면 최소 높이로 표시된다", () => {
    const minBarHeight = 8;
    render(<ChartPlaceholder values={[0, 0, 0]} minBarHeight={minBarHeight} />);
    const bars = screen.getByRole("img").querySelectorAll("div > div");
    bars.forEach(bar => {
      expect(parseInt((bar as HTMLElement).style.height)).toBe(minBarHeight);
    });
  });

  it("className 속성이 잘 반영된다", () => {
    const customClass = "bg-red-500";
    render(<ChartPlaceholder className={customClass} />);
    const container = screen.getByRole("img");
    expect(container.className).toContain(customClass);
  });

  it("barCount와 seed가 변경되면 막대 개수도 바뀐다", () => {
    const { rerender } = render(<ChartPlaceholder barCount={5} seed={1} />);
    let bars = screen.getByRole("img").querySelectorAll("div > div");
    expect(bars.length).toBe(5);

    rerender(<ChartPlaceholder barCount={10} seed={1} />);
    bars = screen.getByRole("img").querySelectorAll("div > div");
    expect(bars.length).toBe(10);
  });
});
