const getBaseUrl = () => import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    const message = data?.message || data?.error || "Request failed";
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path, options = {}) => request(path, { ...options, method: "GET" }),
  post: (path, body, options = {}) =>
    request(path, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (path, body, options = {}) =>
    request(path, { ...options, method: "PUT", body: JSON.stringify(body) }),
  del: (path, options = {}) => request(path, { ...options, method: "DELETE" }),
};

export function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}
