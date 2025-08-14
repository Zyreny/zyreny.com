const API_URL = "https://api.zyreny.com/data";

// 翻頁相關變數
const newsPerPage = 3;
let currentPage = 1;
let allNews = [];
let totalPages = 0;

const categoryCN = {
    "web-update": "網站更新",
    "proj-update": "專案更新", 
    "new-proj": "新作品"
};

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

async function fetchNews(url) {
    const res = await fetch(url);
    const data = await res.json();

    allNews = data;
    totalPages = Math.ceil(allNews.length / newsPerPage);
    
    renderNews(1);
}

function renderNews(page) {
    currentPage = page;
    
    let newsList = document.querySelector(".news-list");
    newsList.innerHTML = "";

    const start = (page - 1) * newsPerPage;
    const end = Math.min(start + newsPerPage, allNews.length);

    for (let i = start; i < end; i++) {
        let news = allNews[i];
        let formattedDate = news.created_at.replace(/-/g, '/').split(' ')[0];

        newsList.innerHTML += `
        <div class="new">
            <h2>${news.title}</h2>
            <div class="info">
                <span class="category ${news.category}">${categoryCN[news.category]}</span>
                <span class="date">${formattedDate}</span>
            </div>
            <p>${news.content}</p>
        </div>`;
    }

    renderPagination();
}

function renderPagination() {
    const paginationDiv = document.querySelector(".news-pagination");
    
    if (totalPages <= 1) {
        paginationDiv.innerHTML = "";
        paginationDiv.style.display = "none";
        return;
    }
    
    paginationDiv.style.display = "flex";
    let html = "";
    
    if (currentPage > 1) {
        html += `<button id="prevPage" class="pagination-btn">上一頁</button>`;
    }
    
    if (currentPage < totalPages) {
        html += `<button id="nextPage" class="pagination-btn">下一頁</button>`;
    }
    
    paginationDiv.innerHTML = html;

    if (currentPage > 1) {
        document.getElementById("prevPage").onclick = () => {
            renderNews(currentPage - 1);
        };
    }
    if (currentPage < totalPages) {
        document.getElementById("nextPage").onclick = () => {
            renderNews(currentPage + 1);
        };
    }
}

fetchProjs(`${API_URL}/projs/4`);
fetchNews(`${API_URL}/news/list/30`);