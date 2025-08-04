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
    <link href="https://fonts.googleapis.com/css2?family=${fontslink}&display=swap" rel="stylesheet">`; 
}

function initPage(title, desc, theme = "#2885e2") {
    head.innerHTML += `
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicon/android-chrome-512x512.png">
    <link rel="icon" type="image/png"  href="/assets/favicon/favicon.ico">
    <link rel="manifest" href="/assets/favicon/site.webmanifest">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://zyreny.com/">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="https://zyreny.com/assets/img/logo/og_img.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:alt" content="Zyreny">
    <meta property="og:site_name" content="Zyreny">
    <meta property="og:locale" content="zh_TW">
    
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://zyreny.com/">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${desc}">
    <meta property="twitter:image" content="https://zyreny.com/assets/img/logo/og_img.png">
    <meta property="twitter:image:width" content="1200">
    <meta property="twitter:image:height" content="630">
    <meta property="twitter:image:type" content="image/png">

    <meta name="theme-color" content="${theme}">
    <meta name="msapplication-TileColor" content="${theme}">
    <meta name="application-name" content="Zyreny">
    <link rel="canonical" href="https://zyreny.com/">

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "website",
        "name": "Zyreny",
        "alternateName": "Zyreny",
        "url": "https://zyreny.com",
        "image": "https://zyreny.com/assets/img/logo/Zyreny_full.svg",
        "description": "${desc}",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "臺中",
            "addressCountry": "TW"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "hi@zyreny.com",
            "contactType": "customer service"
        }
    }
    </script>`; 
}

function loadNav(btns) {
    const nav = document.querySelector("[nav]"); 
    
    const navHTML = btns.map(btn => `<a href="${btn.href}"><li>${btn.name}</li></a>`).join("");
    const btmNavHTML = btns.map(btn => `<a href="${btn.href}"><li><img src="https://zyreny.com/assets/img/menu/${btn.id}.svg" alt="${btn.name}">${btn.name}</li></a>`).join("");

    nav.innerHTML = `
    <header>
        <h1>Zyreny</h1>
        <a href="#"><img src="https://zyreny.com/assets/img/logo/zyreny_full.svg" alt="Zyreny"></a>
        <nav><ul>${navHTML}</ul></nav>
    </header>
    <bottom-nav><ul>${btmNavHTML}</ul></bottom-nav>`; 
}

const footer = document.querySelector("footer");
const year = new Date().getFullYear();
footer.innerHTML = `<p>版權聲明 &copy; 2024 - ${year} Zyreny</p>`; 