const API_BASE_URL = "/api";

export const fetchInstance = async (endpoint: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData;
  const defaultHeaders = isFormData
    ? {}
    : {
        "Content-Type": "application/json",
      };

  const finalOptions: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    } as HeadersInit,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, finalOptions);
  const data = await response.json();

  if (!response.ok) {
    const detailMsg = data?.details
      ?.map((d: { message?: string }) => d.message)
      .filter(Boolean)
      .join(", ");
    const error = new Error(
      detailMsg || data?.msg || data?.message || "Unknown error",
    ) as Error & { response?: Response; data?: unknown };
    error.response = response;
    error.data = data;
    throw error;
  }

  return data;
};
