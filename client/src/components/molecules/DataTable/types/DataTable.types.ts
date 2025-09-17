/**
 * 열 정렬 방향
 */
export type Align = "left" | "center" | "right";

export const ALIGN_CLASS: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * 테이블 컬럼 정의 인터페이스
 *
 * @template T - 행(row)의 타입
 * @param {string} id - React Key로 사용하는 고유 식별자
 * @param {string} title - 헤더에 표시될 제목
 * @param {Align} align - 정렬 방향
 * @param {keyof T} accessor - 셀 값으로 사용할 행의 필드 키(선택). 제공하면 해당 필드를 기본 표시값으로 사용
 * @param {React.ReactNode} render - 커스텀 셀 렌더러
 * @example
 * const columns:IDataTableColumn<User>[] = [
 *  {key: 'email', title: 'Email'},
 *  {key: 'status', title: 'Status', render: (u) => <Badge>{u.status}</Badge>}
 * ]
 */
export interface IDataTableColumn<T extends object> {
  id: string;
  title: string;
  align?: Align;
  accessor?: keyof T;
  render?: (row: Readonly<T>, rowIndex: number) => React.ReactNode;
  className?: string;
}

/**
 * DataTable 컴포넌트 속성
 * @param {ReadonlyArray<T>} rows - 렌더링할 행 목록(읽기 전용 배열)
 * @param {ReadonlyArray<IDataTableColumn<T>>} columns - 컬럼 정의 목록(읽기 전용 배열)
 * @param {(row:Readonly<T>, index:number) => string} rowKey - 각 행의 고유 키 생성기(안주면 index 사용)
 * @param {string} caption - 테이블 캡션(접근성 및 설명용
 * @param {string} emptyText - 행이 없을 때 표시할 문구(기본: 'No Data')
 * @param {boolean} stickyHeader - thead를 sticky로 만들지 여부
 */
export interface IDataTableProps<T extends object> {
  rows: ReadonlyArray<T>;
  columns: ReadonlyArray<IDataTableColumn<T>>;
  rowKey?: (row: Readonly<T>, index: number) => string;
  caption?: string;
  emptyText?: string;
  stickyHeader?: boolean;
  className?: string;
}
