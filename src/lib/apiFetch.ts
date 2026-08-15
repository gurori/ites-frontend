export interface ApiFetchRequestInit extends RequestInit {
  token?: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_PROTOCOL
  ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}${process.env.NEXT_PUBLIC_API_PORT ? `:${process.env.NEXT_PUBLIC_API_PORT}` : ""}`
  : "https://gurori.ru";

const getBaseUrl = (endpoint: string) => {
  if (typeof window !== "undefined") {
    return "";
  }

  return BACKEND_URL;
};

export default function apiFetch(
  endpoint: string,
  init: ApiFetchRequestInit = {},
) {
  const url = `${getBaseUrl(endpoint)}${endpoint}`;
  const { token, ...fetchInit } = init;
  const headers = new Headers(fetchInit.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    credentials: "include",
    ...fetchInit,
    headers,
  });
}
