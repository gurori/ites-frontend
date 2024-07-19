import { apiUrl } from "./constants";

export default async function apiFetch(apiPath: string, init?: RequestInit) {
    const respone = await fetch(`${apiUrl}${apiPath}`, init);

    return respone;
}