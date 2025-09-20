const apiUrl = `${import.meta.env.VITE_API_URL}/data/news/list/30`;

export async function getNews() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        return data;
    } catch (error) {
        console.error('Failed to fetch news:', error);
        return []; 
    }
}