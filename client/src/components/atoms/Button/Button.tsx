import { base, Props, variants } from "./Button.interface";

/**
 * @param param0
 * @returns 버튼 컴포넌트
 */
export default function Button({
  variant = "secondary",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
