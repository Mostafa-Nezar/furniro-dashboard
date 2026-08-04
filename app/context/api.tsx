const BACKEND_URL = "https://furniro-back.vercel.app/api";

const buildUrl = (endpoint: string) => `${BACKEND_URL}${endpoint}`;

export const fetchInstance = async (endpoint: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData;
  const defaultHeaders = isFormData
    ? {}
    : {
        "Content-Type": "application/json",
      };

  const token: string | null = localStorage.getItem("adminToken");
  const headers = new Headers({
    ...defaultHeaders,
    ...(options.headers || {}),
  } as HeadersInit);

  if (token) {
    headers.set("x-auth-token", token);
  }

  const finalOptions: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(buildUrl(endpoint), finalOptions);
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
