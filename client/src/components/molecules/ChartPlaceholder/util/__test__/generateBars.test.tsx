import generateBars from "../generateBars";

describe("generateBar 함수", () => {
  it("지정된 갯수만큼 배열을 생성한다", () => {
    const result = generateBars(5, 42);
    expect(result).toHaveLength(5);

    const result10 = generateBars(10, 100);
    expect(result10).toHaveLength(10);

    const resultEmpty = generateBars(0, 50);
    expect(resultEmpty).toHaveLength(0);
  });

  it("모든 값이 10-109 범위 내에 있다", () => {
    const result = generateBars(100, 123);

    result.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThanOrEqual(109);
    });
  });

  it("동일한 seed로는 항상 같은 결과를 반환한다 (의사난수)", () => {
    const seed = 42;
    const count = 5;

    const result1 = generateBars(count, seed);
    const result2 = generateBars(count, seed);
    const result3 = generateBars(count, seed);

    expect(result1).toEqual(result2);
    expect(result2).toEqual(result3);
  });

  it("다른 seed로는 다른 결과를 반환한다", () => {
    const count = 10;

    const result1 = generateBars(count, 42);
    const result2 = generateBars(count, 100);
    const result3 = generateBars(count, 999);

    expect(result1).not.toEqual(result2);
    expect(result2).not.toEqual(result3);
    expect(result1).not.toEqual(result3);
  });

  it("음수 seed도 처리한다", () => {
    const result1 = generateBars(5, -42);
    const result2 = generateBars(5, 42);

    // 음수 seed는 Math.abs()로 양수로 변환되므로 42와 같은 결과
    expect(result1).toEqual(result2);

    // 다른 음수 seed는 다른 결과
    const result3 = generateBars(5, -100);
    expect(result1).not.toEqual(result3);
  });

  it("모든 값이 정수이다", () => {
    const result = generateBars(20, 456);

    result.forEach(value => {
      expect(Number.isInteger(value)).toBe(true);
    });
  });
});
