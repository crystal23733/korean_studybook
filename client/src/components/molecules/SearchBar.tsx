"use client";

import Input from "../atoms/Input/Input";

/**
 * 검색창 컴포넌트
 *
 * 텍스트 입력창과 안내 문구를 함께 표시한다.
 *
 * @component
 *
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.value - 현재 입력창에 표시되는 값 (검색어)
 * @param {(v:string) => void} props.onChange - 입력값이 바뀔 때 호출되는 함수
 *
 * @example
 * * 부모 컴포넌트에서 SearchBar 사용
 * const [searchValue, setSearchValue] = useState('');
 *
 * <SearchBar
 *  value = {searchValue}
 *  onChange={(newValue) => setSearchValue(newValue)}
 * />
 */
export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        placeholder="Search by email/name"
      />
      <span className="text-xs text-neutral-500">Type to filter</span>
    </div>
  );
}
