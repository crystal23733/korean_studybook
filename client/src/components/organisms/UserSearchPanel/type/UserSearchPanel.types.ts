/**
 * 관리자 패널에서 사용하는 사용자 상태 타입
 */
export type UserStatus = "active" | "banned";

/**
 * 관리자 검색 패널에서 사용하는 사용자 도메인 인터페이스
 * @interface
 * @param {string} id -
 */
export interface IAdminUser {
  id: string;
  email: string;
  name?: string;
  status: UserStatus;
}

/**
 * 컴포넌트 속성
 * @interface
 * @param {ReadonlyArray<IAdminUser>} users - 표시할 사용자 목록(불변 배열 권장)
 * @param {(userId: string) => void} onView - "상세 보기" 버튼 클릭 시 호출
 * @param {(userId: string) => void} onBan - "벤" 버튼 클릭 시 호출
 * @param {(userId: string) => void} onUnban - "해제 버튼 클릭 시 호출"
 * @param {string} initialQuery - 초기 검색어(옵션)
 */
export default interface IUserSearchPanelProps {
  users: ReadonlyArray<IAdminUser>;
  onView: (userId: string) => void;
  onBan: (userId: string) => void;
  onUnban: (userId: string) => void;
  initialQuery?: string;
  className?: string;
}
