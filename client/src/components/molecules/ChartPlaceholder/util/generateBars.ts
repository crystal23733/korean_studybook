/**
 * 의사난수 기반 막대 값 배열을 생성합니다.
 *
 * @param count - 생성할 원소 개수
 * @param seed - 의사난수 시드
 * @example
 * generateBars(5,42); // [예: 12, 97 ...]
 */
export default (count: number, seed: number): number[] => {
  let x = Math.abs(seed) % 2147483647 || 13;
  const m = 2147483647;
  const a = 48271;

  const out: number[] = [];
  for (let i = 0; i < count; i += 1) {
    x = (a * x) % m;
    // 0 ..1 -> 10..110 범위의 값으로 변환
    const v = 10 + Math.floor((x / m) * 100);
    out.push(v);
  }
  return out;
};
