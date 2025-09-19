/**
 * HTTP 요청을 추상화하는 클라이언트 인터페이스
 *
 * 네트워크 요청의 공통 계약을 정의
 * 이를 통해 구현체를 교체하거나 테스트 시 모킹하기 용이
 */
export interface IHttpClient {
  /**
   * GET 요청
   *
   * @template T - 응답 데이터 타입
   * @param {string} url - 요청할 리소스의 URL
   * @param {Omit<RequestInit, 'method'>} [init] - 추가 fetch 옵션 (method 제외)
   * @returns {Promise<T>} 응답 데이터를 Promise로 변환
   */
  get<T>(url: string, init?: Omit<RequestInit, "method">): Promise<T>;

  /**
   * POST 요청을 수행합니다.
   *
   * @template T - 응답 데이터 타입
   * @param {string} url - 요청할 리소스의 URL
   * @param {unknown} [body] - 요청 본문(JSON 등)
   * @param {Omit<RequestInit, 'method' | 'body'>} [init] - 추가 fetch 옵션 (method/body 제외)
   * @returns {Promise<T>} 응답 데이터를 Promise로 반환
   */
  post<T>(url: string, body?: unknown, init?: Omit<RequestInit, "method" | "body">): Promise<T>;

  /**
   * PUT 요청을 수행합니다.
   *
   * @template T - 응답 데이터 타입
   * @param {string} url - 요청할 리소스의 URL
   * @param {unknown} [body] - 요청 본문(JSON 등)
   * @param {Omit<RequestInit, 'method' | 'body'>} [init] - 추가 fetch 옵션 (method/body 제외)
   * @returns {Promise<T>} 응답 데이터를 Promise로 반환
   */
  put<T>(url: string, body?: unknown, init?: Omit<RequestInit, "method" | "body">): Promise<T>;

  /**
   * DELETE 요청을 수행합니다.
   *
   * @template T - 응답 데이터 타입
   * @param {string} url - 요청할 리소스의 URL
   * @param {Omit<RequestInit, 'method'>} [init] - 추가 fetch 옵션 (method 제외)
   * @returns {Promise<T>} 응답 데이터를 Promise로 반환
   */
  del<T>(url: string, init?: Omit<RequestInit, "method">): Promise<T>;
}

/**
 * 액세스 토큰을 제공하는 인터페이스
 */
export interface ITokenProvider {
  /**
   * 유효한 액세스 토큰(JWT 등)을 반환. 없으면 null
   */
  getAccessToken(): Promise<string | null>;
}

/**
 * 현재 로그인 사용자 최소 프로필
 */
export interface ICurrentUser {
  id: string;
  email: string;
  name?: string;
  locale?: string;
  roles: ReadonlyArray<"learner" | "admin" | "tutor">;
}
