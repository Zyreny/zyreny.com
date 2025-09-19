const apiUrl = `${import.meta.env.VITE_API_URL}/zyruls/create`;

export interface UrlData {
    shortUrl: string,
    code: string,
    originalUrl: string,
    createdAt: string,
    hasPassword: boolean,
    exp: string | null,
    meta: {
        title: string | null,
        description: string | null,
        image: string | null
    }
}

interface CreateUrlResponse {
    success: boolean;
    message: string;
    data?: UrlData;
}

export default async function createUrl(e: React.FormEvent): Promise<CreateUrlResponse> {
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const postData = {
        url: data.url,
        custom: data.customCode || null,
        exp: data.exp ? new Date(data.exp as string).toISOString() : null,
        password: data.password || null,
        meta: {
            title: data.metaTitle || null,
            description: data.metaDesc || null,
            image: data.metaImage || null,
        }
    }

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });

    return await res.json();
}