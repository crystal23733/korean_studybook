import { useMemo } from "react";
import IChartPlaceholderProps from "./types/ChartPlaceholder.types";
import generateBars from "./util/generateBars";

/**
 * 단순 막대 차트 형태의 플레이스홀더를 렌더링한다.
 * @example
 * 1) 기본
 * <ChartPlaceholder />
 *
 * 2) 고정 데이터로 사용
 * <ChartPlaceholder values={[3, 6, 2, 9, 5]} height={120} />
 *
 * 3) 의사난수 + 막대 개수 커스텀
 * <ChartPlaceholder barCount={32} seed={97} />
 */
export default function ChartPlaceholder({
  values,
  barCount = 20,
  seed = 13,
  height = 160,
  minBarHeight = 8,
  maxBarHeight,
  className = "",
}: IChartPlaceholderProps) {
  const maxH: number = maxBarHeight ?? Math.max(minBarHeight + 1, height - 24);

  const bars = useMemo<number[]>(() => {
    const base: number[] = values && values.length > 0 ? [...values] : generateBars(barCount, seed);

    const max = Math.max(...base, 0);
    const min = Math.min(...base, 0);
    const span = max - min;

    // 0으로만 구성돼 있으면 모두 최소 높이로 표시
    if (span === 0) {
      return base.map(() => minBarHeight);
    }

    // min..max를 0..1로 정규화 후 min~maxBarHeight로 스케일링
    return base.map(v => {
      const norm = (v - min) / span;
      const h = Math.round(minBarHeight + norm * (maxH - minBarHeight));
      return Math.max(minBarHeight, Math.min(maxH, h));
    });
  }, [values, barCount, seed, minBarHeight, maxH]);

  return (
    <div
      role="img"
      aria-label="placeholder chart"
      className={`flex items-end gap-1 rounded-xl border bg-neutral-50 p-3 ${className}`}
      style={{ height }}
    >
      {bars.map((h, i) => (
        <div key={i} className="w-3 flex-1 rounded-t bg-neutral-300" style={{ height: h }} />
      ))}
    </div>
  );
}
