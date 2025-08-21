document.addEventListener("DOMContentLoaded", () => {
    initPage("作品集 - Zyreny", "這裡有我的完整作品集，裡面有一些奇怪或有趣的網頁作品");
    loadFonts(["Fira Code", "Huninn", "Noto Sans TC"]);
    loadNav([
        { id: "home", name: "首頁", href: "/" },
        { id: "contact", name: "聯絡", href: "/#Contact" }
    ]);
});

const API_URL = "https://api.zyreny.com/data"

async function fetchProjs(url) {
    const res = await fetch(url); 
    const data = await res.json(); 

    let projsList = document.querySelector(".projs-list"); 
    projsList.innerHTML = ""; 

    for (let i = 0; i < data.length; i++) {
        let proj = data[i]; 
        projsList.innerHTML += `
        <a href="/${proj.name}" class="proj">
            <div>
                <img src="/assets/img/projs/${proj.name}.webp" alt="${proj.title}" loading="lazy">
                <h2>${proj.title}</h2>
                <p>${proj.desc}</p>
            </div>
        </a>`
    }
}

fetchProjs(`${API_URL}/projs/list`); 