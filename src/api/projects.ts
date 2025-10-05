export async function getProjects(endpoint: string) {
    const apiUrl = `${import.meta.env.VITE_API_URL}/data/projs/list/${endpoint}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}
