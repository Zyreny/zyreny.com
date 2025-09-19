const apiUrl = `${import.meta.env.VITE_API_URL}/zyruls/list`;

interface UrlMeta {
    title: string | null;
    description: string | null;
    image: string | null;
}

export interface UrlItem {
    code: string;
    url: string;
    createdAt: string;
    hasPassword: boolean;
    exp: string | null;
    meta: UrlMeta;
}

interface ListUrlsResponse {
    success: boolean;
    urls: UrlItem[];
    total: number;
}

export default async function listUrls(): Promise<ListUrlsResponse> {
    const res = await fetch(apiUrl);
    return await res.json();
}
