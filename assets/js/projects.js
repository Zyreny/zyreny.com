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
                <img src="/assets/img/projs/${proj.name}.webp" alt="${proj.title}">
                <h2>${proj.title}</h2>
                <p>${proj.desc}</p>
            </div>
        </a>`
    }
}

fetchProjs(`${API_URL}/projs/list`); 