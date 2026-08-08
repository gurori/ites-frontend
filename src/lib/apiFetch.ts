export default function apiFetch(
  apiPath: string,
  init: RequestInit = {},
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  return fetch(`${apiUrl}${apiPath}`, {
    ...init,
    credentials: "include",
  });
}
