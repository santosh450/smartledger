const BASE_API_URL = "http://localhost:8080/api";

export const apiClient = {
  async get<TResponse>(endpoint: string): Promise<TResponse> {
    const response = await fetch(`${BASE_API_URL}${endpoint}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return (await response.json()) as TResponse;
    }

    return (await response.text()) as TResponse;
  },

  async post<TRequest, TResponse = string>(
    endpoint: string,
    data: TRequest,
  ): Promise<TResponse> {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText || "Request failed");
    }

    return responseText as TResponse;
  },
};

export default apiClient;
