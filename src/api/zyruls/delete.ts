const apiUrl = `${import.meta.env.VITE_API_URL}/zyruls/del`;

export default async function deleteUrl(code: string): Promise<{ success: boolean; message: string; }> {
    const res = await fetch(`${apiUrl}/${code}`, {
        method: "DELETE",
    });

    return await res.json();
}