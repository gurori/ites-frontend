export default async function apiFetch(apiPath: string, init?: RequestInit) {
    const respone = await fetch(`https://localhost:64948${apiPath}`, init);

    return respone;
}