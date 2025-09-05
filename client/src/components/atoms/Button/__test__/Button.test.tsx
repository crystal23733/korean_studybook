import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Button from "../Button";

describe("Button", () => {
  it("버튼 컴포넌트가 정상적으로 출력되는지 확인", () => {
    render(<Button variant="secondary">버튼!</Button>);
    expect(screen.getByText("버튼!"));
  });
});
