import { Head } from "vite-react-ssg";
import { useEffect } from "react";

interface SEOProps {
    title?: string;
    desc?: string;
    image?: string;
    url?: string;
    theme?: string;
    bodyBg?: string; 
    navBg?: string;  
    footerBg?: string; 
}

const defaultSEO = {
    title: "Zyreny",
    desc:
        "我是 Zyreny，一名喜歡寫程式的國中生，專注在網頁開發與實驗性專案，這個網站會放我一些有趣的作品集。",
    image: "https://zyreny.com/og_img.png",
    url: "https://zyreny.com",
    theme: "#2885e2",
    bodyBg: "#f5f5f5", 
    navBg: "#2885e2b8", 
    footerBg: "#2885e2",
};

export default function SEO({
    title = defaultSEO.title,
    desc = defaultSEO.desc,
    image = defaultSEO.image,
    url = defaultSEO.url,
    theme = defaultSEO.theme,
    bodyBg = defaultSEO.bodyBg,
    navBg = defaultSEO.navBg,
    footerBg = defaultSEO.footerBg,
}: SEOProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Website",
        name: "Zyreny",
        alternateName: "Zyreny",
        url: "https://zyreny.com",
        image: image,
        description: desc,
    };

    // 設定背景顏色
    useEffect(() => {
        // 設定 body 背景顏色
        if (bodyBg) {
            document.documentElement.style.setProperty('--bg-color', bodyBg);
        }
        
        // 設定 Nav 背景顏色 CSS 變數
        if (navBg) {
            document.documentElement.style.setProperty('--nav-bg', navBg);
        }
        
        // 設定 Footer 背景顏色 CSS 變數
        if (footerBg) {
            document.documentElement.style.setProperty('--footer-bg', footerBg);
        }
        
        // 清理函數：組件卸載時恢復預設顏色
        return () => {
            if (bodyBg) {
                document.body.style.backgroundColor = 'var(--bg-color)';
            }
            if (navBg) {
                document.documentElement.style.removeProperty('--nav-bg');
            }
            if (footerBg) {
                document.documentElement.style.removeProperty('--footer-bg');
            }
        };
    }, [bodyBg, navBg, footerBg]);

    return (
        <Head>
            <title>{title}</title>
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:alt" content="Zyreny" />
            <meta property="og:site_name" content="Zyreny" />
            <meta property="og:locale" content="zh_TW" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={desc} />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:image:width" content="1200" />
            <meta property="twitter:image:height" content="630" />
            <meta property="twitter:image:type" content="image/png" />

            <meta name="theme-color" content={theme} />
            <meta name="msapplication-TileColor" content={theme} />
            <meta name="application-name" content="Zyreny" />
            <link rel="canonical" href="https://zyreny.com/" />

            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Head>
    );
}
