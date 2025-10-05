export async function getNews() {
    const apiUrl = `${import.meta.env.VITE_API_URL}/data/news/list/days/30`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        return data;
    } catch (err) {
        console.error(err);
        return []; 
    }
}