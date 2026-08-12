export interface ApiFetchRequestInit extends RequestInit {
  token?: string;
}

export default function apiFetch(
  apiPath: string,
  init: ApiFetchRequestInit = {},
) {
  const { token, ...fetchInit } = init;
  const headers = new Headers(fetchInit.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(apiPath, {
    credentials: "include",
    ...fetchInit,
    headers,
  });
}
