const head = document.querySelector("head");
const fonts = {
    "Huninn": "Huninn",
    "Noto Sans TC": "Noto+Sans+TC:wght@100..900",
    "Noto Serif TC": "Noto+Serif+TC:wght@200..900", 
    "Fira Code": "Fira+Code:wght@300..700"
}
function loadFonts(fontsList) {
    const fontslink = fontsList.map(font => `${fonts[font]}`).join("&family=");
    head.innerHTML += `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${fontslink}&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">`; 
}

function loadNav(btns) {
    const nav = document.querySelector("[nav]"); 
    
    const navHTML = btns.map(btn => `<a href="${btn.href}"><li>${btn.name}</li></a>`).join("");
    const btmNavHTML = btns.map(btn => `<a href="${btn.href}"><li><img src="https://react.zyreny.com/img/nav/${btn.id}.svg" alt="${btn.name}" loading="lazy">${btn.name}</li></a>`).join("");

    nav.innerHTML = `
    <header>
        <h1>Zyreny</h1>
        <a href="/"><img src="https://react.zyreny.com/img/logo/logo_full.svg" alt="Zyreny" loading="lazy"></a>
        <nav><ul>${navHTML}</ul></nav>
    </header>
    <bottom-nav><ul>${btmNavHTML}</ul></bottom-nav>`; 
}

const footer = document.querySelector("footer");
const year = new Date().getFullYear();
footer.innerHTML = `<p>版權聲明 &copy; 2024 - ${year} Zyreny</p>`; 