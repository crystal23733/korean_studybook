/**
 * 모더레이션 액션 타입
 */
export type ModerationAction = "approve" | "hide" | "remove";

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
