/**
 * 브레드크럼 항목 모델
 * @interface
 * @param {string} label - 표시 텍스트
 * @param {string} href - 링크 URL (없으면 단순 텍스트)
 */
export interface IBreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * 컴포넌트 속성
 * @interface
 * @param {string} title - 페이지 상단의 큰 제목
 * @param {string} subtitle - 보조 설명
 * @param {React.ReactNode} action - 우측 상단 액션 영역에 렌더할 노드(버튼 그룹 등, 옵션
 * @param {ReadonlyArray<IBreadcrumbItem>} breadcrumbs - 브레드크럼 목록(옵션)
 * @param {(ev:React.MouseEvent<HTMLButtonElement>) => void} onBack
 * 상단 좌측에 "뒤로가기" 아이콘/버튼이 필요할 때 콜백 제공(옵션)
 * ev: 클릭 이벤트
 * @param {React.ReactNode} children - 본 콘텐츠
 * @param {boolean} withContainer - 내부 컨테이너를 사용할지 여부
 */
export interface IAdminLayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: ReadonlyArray<IBreadcrumbItem>;
  onBack?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  withContainer?: boolean;
  className?: string;
}
