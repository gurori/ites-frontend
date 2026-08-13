import { redirect } from "next/navigation";
import apiFetch from "../apiFetch";
import { getToken } from "./user";

export async function fetchServerApi<T>(endpoint: string): Promise<T> {
  const token = getToken();

  const response = await apiFetch(endpoint, {
    token: token ?? undefined,
  });

  if ([401, 404, 204, 403].includes(response.status)) {
    redirect("/login");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }

  return (await response.json()) as T;
}
