export default async function apiFetch(apiPath: string, init?: RequestInit) {
    const respone = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, init);

    return respone;
}