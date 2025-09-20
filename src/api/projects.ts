export async function getProjects(endpoint: string) {
    const apiUrl = `${import.meta.env.VITE_API_URL}/data/projs/${endpoint}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}
