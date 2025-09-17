import { IModerationItem } from "@/components/organisms/ModerationQueue/type/ModerationQueue.types";
import { ISessionRow } from "@/components/organisms/SessionTable/type/SessionTable.types";
import { IAdminUser } from "@/components/organisms/UserSearchPanel/type/UserSearchPanel.types";

/**
 * 관리자 대시보드 페이지에 주입할 초기 데이터 인터페이스
 * @interface
 * @param {ReadonlyArray<IAdminUser>} users - 사용자 목록(검색/벤/해제 대상)
 * @param {ReadonlyArray<ISessionRow>} sessions - 최근 세션 목록(간이 표기)
 * @param {ReadonlyArray<IModerationItem>} moderationQueue - 모더레이션 큐(승인/숨김/삭제 대상)
 */
export default interface IAdminPageProps {
  users: ReadonlyArray<IAdminUser>;
  sessions: ReadonlyArray<ISessionRow>;
  moderationQueue: ReadonlyArray<IModerationItem>;
}
