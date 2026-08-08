export default async function apiFetch(apiPath: string, init: RequestInit = {}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, {
        ...init,
        credentials: "include",
    });

    return response;
}