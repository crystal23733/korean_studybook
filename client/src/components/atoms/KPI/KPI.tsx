"use client";

/**
 * 시각화 카드 형태의 KPI(핵심 지표) 컴포넌트.
 *
 * - 굵은 글씨로 `value`를 강조하여 핵심 수치를 보여줍니다.
 * - 위에는 `title`(지표명), 아래에는 선택적으로 `note`(보조 설명/주석)를 표시합니다.
 * - 대시보드·관리자 페이지 등에서 간단한 지표요약 카드를 만들 때 사용합니다.
 *
 * @example
 * <KPI title="월간 활성 사용자" value="12,345명" note="전월 대비 +12%" />
 *
 * @param {object} props - KPI 컴포넌트 속성
 * @param {string} props.title - 지표명(라벨)
 * @param {string} props.value - 강조하여 표시할 핵심 수치
 * @param {string} [props.note] - 선택적 보조 설명/주석(없으면 미표시)
 * @returns {JSX.Element} KPI 카드 요소
 */
export default function KPI({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-neutral-500">{title}</div>
      <div className="mt-1 text-2xl font-bold text-neutral-900">{value}</div>
      {note && <div className="text-xs text-neutral-500">{note}</div>}
    </div>
  );
}
