/**
 * 속성 인터페이스
 * @interface
 * @param {ReadonlyArray<number>} values - 막대 그래프의 원시 값 배열. 지정하면 이 값을 사용해 막대 높이를 계산한다. 값이 모두 0인 경우 최소 높이로 표시
 * @param {number} barCount - values가 없을 때 생성할 막대 개수
 * @param {number} seed - 의사난수 시드값(values가 없을 때만 사용)
 * @param {number} height - 컨테이너 높이
 * @param {number} minBarHeight - 막대의 최소 높이(px)
 * @param {number} maxBarHeight - 막대의 최대 높이
 */
export default interface IChartPlaceholderProps {
  values?: ReadonlyArray<number>;
  barCount?: number;
  seed?: number;
  height?: number;
  minBarHeight?: number;
  maxBarHeight?: number;
  className?: string;
}
