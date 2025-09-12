"use client";

import { ChangeEvent, forwardRef, useId } from "react";
import Input from "../../atoms/Input/Input";
import ISearchBarProps from "./type/SearchBar.types";

/**
 * 검색 입력 컴포넌트
 *
 * @example
 * ```tsx
 * const [q, setQ] = useState('');
 * <SearchBar
 *   value={q}
 *   onChange={setQ}
 *   placeholder="Search by email/name"
 *   helperText="Type to filter"
 * />
 * ```
 */
const SearchBar = forwardRef<HTMLInputElement, ISearchBarProps>(function SearchBar(props, ref) {
  const {
    value,
    onChange,
    label = "Search",
    helperText,
    className = "",
    id,
    placeholder,
    ...rest
  } = props;

  const autoId = useId();
  const inputId = id ?? `searchbar-${autoId}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.currentTarget.value);
  };

  return (
    <div role="search" className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Input
          id={inputId}
          value={value}
          ref={ref}
          onChange={handleChange}
          placeholder={placeholder ?? "Search"}
          aria-label={label}
          className="w-full max-w-md"
          {...rest}
        />
        {helperText && <span className="text-xs text-neutral-500">{helperText}</span>}
      </div>
    </div>
  );
});

export default SearchBar;
