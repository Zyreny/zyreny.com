const projs = [
    {
        name: "myai", 
        title: "做出自己的AI！", 
        desc: "「做出自己的AI」用了<i>簡單、直覺、好上手</i>的方法讓每個人都可以做出自己的AI，你可以訓練他變成一位朋友、家人等等..."
    }, 
    {
        name: "food", 
        title: "拌不拌測驗", 
        desc: "拌不拌測驗能讓你更清楚自己到底是「拌人」還是「不拌人」，也是目前在<i>網路上最詳細的拌不拌測驗</i>。"
    }, 
    {
        name: "dumb_calc", 
        title: "卡提諾計算機", 
        desc: "卡提諾計算機的靈感源自於960 + 110 = 960110 的卡提諾數學邏輯，此計算機為<i>世界上第一台卡提諾計算機</i>。"
    }, 
    {
        name: "todo", 
        title: "待辦事項", 
        desc: "就是待辦事項。"
    }, 
]

let projsDiv = document.querySelector(".projs-list"); 
projsDiv.innerHTML = ""; 

for (let i = 0; i < 4; i++) {
    let proj = projs[i]; 
    projsDiv.innerHTML += `
    <a href="${proj.name}" class="proj">
        <div>
            <img src="assets/img/projs/${proj.name}.png" alt="${proj.title}">
            <h2>${proj.title}</h2>
            <p>${proj.desc}</p>
        </div>
    </a>`
}

const news = [
    {
        title: "這裡是全新網站！", 
        desc: "這裡是全新的網站，更新了設計風格，並且優化了使用者體驗，讓網站變得更現代化！", 
        date: "2025/06/17", 
        category: "web-update",
    },  
]

const categoryCN = {
    "web-update": "網站更新",
    "proj-update": "專案更新",
};

const newsDiv = document.querySelector(".news-list");
const paginationDiv = document.querySelector(".news-pagination");
const newsPerPage = 3;
let currentPage = 1;

function isWithin30Days(dateStr) {
    const now = new Date();
    const newsDate = new Date(dateStr.replace(/-/g, '/').replace(/\./g, '/'));
    const diffTime = now - newsDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
}
const filteredNews = news.filter(n => isWithin30Days(n.date));
const totalPages = Math.ceil(filteredNews.length / newsPerPage);

function renderNews(page) {
    newsDiv.innerHTML = "";
    const start = (page - 1) * newsPerPage;
    const end = Math.min(start + newsPerPage, filteredNews.length);
    for (let i = start; i < end; i++) {
        const n = filteredNews[i];
        newsDiv.innerHTML += `
        <div class="new">
            <h2>${n.title}</h2>
            <div class="info">
                <span class="category ${n.category}">${categoryCN[n.category]}</span>
                <span class="date">${n.date}</span>
            </div>
            <p>${n.desc}</p>
        </div>`;
    }
    renderPagination();
}

function renderPagination() {
    if (totalPages <= 1) {
        paginationDiv.innerHTML = "";
        return;
    }
    let html = "";
    if (currentPage > 1) {
        html += `<button id="prevPage">上一頁</button>`;
    }
    if (currentPage < totalPages) {
        html += `<button id="nextPage">下一頁</button>`;
    }
    paginationDiv.innerHTML = html;

    if (currentPage > 1) {
        document.getElementById("prevPage").onclick = () => {
            currentPage--;
            renderNews(currentPage);
        };
    }
    if (currentPage < totalPages) {
        document.getElementById("nextPage").onclick = () => {
            currentPage++;
            renderNews(currentPage);
        };
    }
}

renderNews(currentPage);