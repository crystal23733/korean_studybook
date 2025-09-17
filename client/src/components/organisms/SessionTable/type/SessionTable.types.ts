/**
 * 세션 행 도메인 모델
 *
 * @interface
 * @param {string} id - 세션 식별자
 * @param {string} user - 사용자 표시명
 * @param {string} start - 시작 시각
 * @param {number} pages - 페이지뷰 수
 * @param {string} last - 마지막 페이지 경로
 * @param {string} utm - UTM 정보
 */
export interface ISessionRow {
  id: string;
  user: string;
  start: string;
  pages: number;
  last: string;
  utm?: string;
}

/**
 * 컴포넌트 속성
 *
 * @interface
 * @param {ReadonlyArray<ISessionRow>} rows - 렌더링할 세션 행 목록(불변 배열 권장)
 * @param {(sessionId:string) => void} onOpen - 세션 행 클릭(열기) 콜백. 제공 시 Actions열이 노출된다. 선택된 세션의 ID
 * @param {string} caption - 테이블 캡션(접근성용)
 */
export default interface ISessionTableProps {
  rows: ReadonlyArray<ISessionRow>;
  onOpen?: (sessionId: string) => void;
  caption?: string;
  className?: string;
}
