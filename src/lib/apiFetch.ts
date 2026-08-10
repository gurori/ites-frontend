export default function apiFetch(
  apiPath: string,
  init: RequestInit = {},
) {
  return fetch(apiPath, {
    ...init,
    credentials: "include",
  });
}
