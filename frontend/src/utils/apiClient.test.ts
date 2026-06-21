import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "./apiClient";

describe("apiClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("returns JSON data for GET requests", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn().mockResolvedValue({ message: "ok" }),
      text: vi.fn(),
    });

    const result = await apiClient.get<{ message: string }>("/users");
    expect(result).toEqual({ message: "ok" });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/api/users",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("returns plain text for GET when response is not JSON", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: () => "text/plain" },
      json: vi.fn(),
      text: vi.fn().mockResolvedValue("pong"),
    });

    const result = await apiClient.get<string>("/health");
    expect(result).toBe("pong");
  });

  it("throws parsed message for failed POST JSON response", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      headers: { get: () => "application/json" },
      text: vi.fn().mockResolvedValue(JSON.stringify({ message: "Bad data" })),
    });

    await expect(apiClient.post("/users/register", { a: 1 })).rejects.toThrow(
      "Bad data",
    );
  });

  it("returns nested data field for successful POST JSON response", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      text: vi
        .fn()
        .mockResolvedValue(JSON.stringify({ data: { token: "abc123" } })),
    });

    const result = await apiClient.post<
      { username: string },
      { token: string }
    >("/users/login", {
      username: "demo",
    });

    expect(result).toEqual({ token: "abc123" });
  });
});
