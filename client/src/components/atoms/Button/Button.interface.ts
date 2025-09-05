/**
 * @type
 * @description 버튼의 속성값으로 스타일을 정의한다.
 */
export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "warning";
};

/**
 * 버튼의 기본 디자인
 */
export const base = "rounded-md px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * 버튼의 디자인
 */
export const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-neutral-900 text-white",
  secondary: "bg-neutral-200 text-neutral-900",
  danger: "bg-rose-600 text-white",
  warning: "bg-amber-500 text-white",
};
