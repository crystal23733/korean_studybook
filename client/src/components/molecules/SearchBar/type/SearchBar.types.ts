/**
 * 컴포넌트 속성
 * @interface
 * @param {string} value - 현재 검색어(제어 컴포넌트)
 * @param {(value:string)=>void} - 검색어 변경 콜백
 * @param {string} label - 시각적 레이블 텍스트(기본: 'Search')
 * @param {string} helperText - 입력 하단에 표시할 보조 텍스트(예: 힌트/설명)
 */
export default interface ISearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
}
