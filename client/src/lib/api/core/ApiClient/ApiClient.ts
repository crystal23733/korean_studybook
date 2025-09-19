import { IHttpClient } from "./types/IApiClient.types";

/**
 * Fetch API를 기반으로 구현된 기본 HTTP 클라이언트
 *
 * `IHTTPClient` 인터페이스를 구현하며,
 * `GET`, `POST`, `PUT`, `DELETE`요청을 JSON 기반으로 수행한다.
 *
 * - 모든 요청은 기본적으로 `Accept: application/json` 헤더를 포함
 * - `POST`, `PUT` 요청은 자동으로 `Content-Type: application/json`을 설정하고,
 *   body를 `JSON.stringify`하여 전송
 * - 응답 상태 코드가 200~299 범위가 아니면 `Error`를 발생
 * - 응답은 `JSON.parse`된 값을 제네릭 타입 `<T>`으로 반환
 */
export class FetchHttpClient implements IHttpClient {
  async get<T>(url: string, init?: Omit<RequestInit, "method">): Promise<T> {
    const res = await fetch(url, {
      ...(init ?? {}),
      method: "GET",
      headers: { Accept: "applicatio/json", ...(init?.headers ?? {}) },
    });
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
    return (await res.json()) as T;
  }

  async post<T>(
    url: string,
    body?: unknown,
    init?: Omit<RequestInit, "method" | "body">
  ): Promise<T> {
    const res = await fetch(url, {
      ...(init ?? {}),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
    return (await res.json()) as T;
  }

  async put<T>(
    url: string,
    body?: unknown,
    init?: Omit<RequestInit, "method" | "body">
  ): Promise<T> {
    const res = await fetch(url, {
      ...(init ?? {}),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
    return (await res.json()) as T;
  }

  async del<T>(url: string, init?: Omit<RequestInit, "method">): Promise<T> {
    const res = await fetch(url, {
      ...(init ?? {}),
      method: "DELETE",
      headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    });
    if (!res.ok) throw new Error(`DELETE ${url} -> ${res.status}`);
    return (await res.json()) as T;
  }
}
