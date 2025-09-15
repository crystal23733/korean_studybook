/**
 * 모더레이션 액션 타입
 */
export type ModerationAction = 'approve' | 'hide' | 'remove';

/**
 * 모더레이션 큐 아이템 도메인 모델
 * @param {string} id - 고유 식별자
 * @param {string} title - 게시물(또는 신고 대상) 제목
 * @param {string} author - 작성자 표시명
 * @param {number} flags - 누적 플래그/신고 횟수
 */
export interface IModerationItem {
  id: string;
  title: string;
  author: string;
  flags: number;
}

/**
 * 컴포넌트 속성
 * @param {ReadonlyArray<IModerationItem>} items - 화면에 표시할 모더레이션 아이템 목록, 읽기 전용 배열을 권장
 * @param {(id:string, action:ModerationAction) => void} onAction - 각 아이템에 대한 액션 콜백, id - 대상 아이템의 식별자, action - 수행할 액션
 * @param {string} emptyText - 항목이 없을 때 표시할 문구
 */
export interface IModerationQueueProps {
  items: ReadonlyArray<IModerationItem>;
  onAction: (id:string, action:ModerationAction) => void;
  emptyText?: string;
  className?: string;
}