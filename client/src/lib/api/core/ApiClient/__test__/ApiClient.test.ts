import { ApiClient, AuthenticatedApiClient, FetchHttpClient } from "../ApiClient";
import { IHttpClient, ITokenProvider } from "../types/IApiClient.types";

global.fetch = jest.fn();

describe("FetchHttpClient", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it("GET 요청을 보낸다", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    const client = new FetchHttpClient();
    const res = await client.get<{ ok: boolean }>("/test");

    expect(fetch).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({ Accept: "application/json" }),
      })
    );
    expect(res.ok).toBe(true);
  });

  it("POST 요청을 JSON body와 함께 보낸다", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    const client = new FetchHttpClient();
    const res = await client.post<{ id: number }>("/test", { name: "kim" });

    expect(fetch).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "kim" }),
      })
    );
    expect(res.id).toBe(1);
  });

  it("응답이 실패하면 에러를 던진다", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const client = new FetchHttpClient();
    await expect(client.get("/fail")).rejects.toThrow("GET /fail -> 500");
  });
});

describe("ApiClient", () => {
  class PublicApi extends ApiClient {
    constructor(http: IHttpClient) {
      super({ baseUrl: "/api", httpClient: http });
    }
    health() {
      return this.get<{ ok: boolean }>("/health");
    }
  }

  it("baseUrl을 포함하여 GET 요청을 보낸다", async () => {
    const mockHttp: IHttpClient = {
      get: jest.fn().mockResolvedValue({ ok: true }),
      post: jest.fn(),
      put: jest.fn(),
      del: jest.fn(),
    };

    const api = new PublicApi(mockHttp);
    const res = await api.health();

    expect(mockHttp.get).toHaveBeenCalledWith("/api/health");
    expect(res.ok).toBe(true);
  });
});

describe("AuthenticatedApiClient", () => {
  class AdminApi extends AuthenticatedApiClient {
    constructor(http: IHttpClient, tokenProvider: ITokenProvider) {
      super({ baseUrl: "/api/admin", httpClient: http, tokenProvider });
    }
    listUsers() {
      return this.authedGet<{ users: string[] }>("/users");
    }
  }

  it("Authorization 헤더를 추가한다", async () => {
    const mockHttp: IHttpClient = {
      get: jest.fn().mockResolvedValue({ users: ["kim"] }),
      post: jest.fn(),
      put: jest.fn(),
      del: jest.fn(),
    };
    const mockTokenProvider: ITokenProvider = {
      getAccessToken: jest.fn().mockResolvedValue("abc123"),
    };

    const api = new AdminApi(mockHttp, mockTokenProvider);
    const res = await api.listUsers();

    expect(mockHttp.get).toHaveBeenCalledWith(
      "/api/admin/users",
      expect.objectContaining({
        headers: { Authorization: "Bearer abc123" },
      })
    );
    expect(res.users).toEqual(["kim"]);
  });

  it("토큰이 null이면 Authorization 헤더 없이 요청한다", async () => {
    const mockHttp: IHttpClient = {
      get: jest.fn().mockResolvedValue({ users: [] }),
      post: jest.fn(),
      put: jest.fn(),
      del: jest.fn(),
    };
    const mockTokenProvider: ITokenProvider = {
      getAccessToken: jest.fn().mockResolvedValue(null),
    };

    const api = new AdminApi(mockHttp, mockTokenProvider);
    await api.listUsers();

    expect(mockHttp.get).toHaveBeenCalledWith(
      "/api/admin/users",
      expect.objectContaining({ headers: {} })
    );
  });
});
