import { render, screen } from "@testing-library/react";
import KPI from "../KPI";

describe("KPI", () => {
  it("title과 value를 렌더링한다", () => {
    render(<KPI title="월간 활성 사용자" value="12,345명" />);
    expect(screen.getByText("월간 활성 사용자")).toBeInTheDocument();
    expect(screen.getByText("12,345명")).toBeInTheDocument();
  });

  it("note가 주어지면 note도 렌더링한다", () => {
    render(<KPI title="전환율" value="3.2%" note="전주 대비 +0.4%p" />);
    expect(screen.getByText("전환율")).toBeInTheDocument();
    expect(screen.getByText("3.2%")).toBeInTheDocument();
    expect(screen.getByText("전주 대비 +0.4%p")).toBeInTheDocument();
  });

  it("note가 없으면 note 요소를 렌더링하지 않는다", () => {
    render(<KPI title="재방문율" value="41%" />);
    expect(screen.queryByText(/전주 대비/)).toBeNull();
  });
});
