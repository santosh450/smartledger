const BASE_API_URL = "http://localhost:8080/api";
const REQUEST_TIMEOUT = 5000; // 5 seconds

const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - backend server not responding");
    }
    throw error;
  }
};

export const apiClient = {
  async get<TResponse>(endpoint: string): Promise<TResponse> {
    const response = await fetchWithTimeout(`${BASE_API_URL}${endpoint}`);

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
    const response = await fetchWithTimeout(`${BASE_API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = "Request failed";
      try {
        const errorJson = JSON.parse(responseText);
        errorMessage = errorJson.message || errorJson || "Request failed";
      } catch {
        errorMessage = responseText || "Request failed";
      }
      throw new Error(errorMessage);
    }

    // Handle JSON response
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = JSON.parse(responseText);
      // If response has a data field, return it; otherwise return the whole object
      return (json.data !== undefined ? json.data : json) as TResponse;
    }

    return responseText as TResponse;
  },
};

export default apiClient;
