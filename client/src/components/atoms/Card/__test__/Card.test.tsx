import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card 컴포넌트가 렌더링된다.", () => {
  it("title과 children이 올바르게 렌더링된다", () => {
    render(
      <Card title="타이틀">
        <div>내용</div>
      </Card>
    );

    expect(screen.getByText("타이틀")).toBeInTheDocument();
    expect(screen.getByText("내용")).toBeInTheDocument();
  });

  it("기본 스타일이 잘 렌더링 되는지 확인한다", () => {
    const { container } = render(
      <Card title="테스트">
        <div>내용</div>
      </Card>
    );

    const cardSection = container.querySelector("section");
    expect(cardSection).toHaveClass("rounded-2xl", "border", "bg-white", "p-4", "shadow-sm");
  });

  it("복잡한 children 내용도 렌더링된다", () => {
    render(
      <Card title="복잡한 카드">
        <div>
          <button>버튼</button>
          <span>텍스트</span>
        </div>
      </Card>
    );

    expect(screen.getByText("복잡한 카드")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "버튼" })).toBeInTheDocument();
    expect(screen.getByText("텍스트")).toBeInTheDocument();
  });
});
