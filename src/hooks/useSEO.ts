import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
}

function useSEO({
    title = "Zyreny",
    description = "我是Zyreny，一個喜歡程式設計的國中生，這裡有一些奇怪有趣的網頁專案作品。",
    image = "/og_img.png",
    url = window.location.pathname,
    type = "website",
    siteName = "Zyreny",
    locale = "zh_TW"
}: SEOProps) {
    useEffect(() => {
        const baseUrl = "https://zyreny.com";
        const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
        const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

        // 更新 title
        document.title = title;

        // 更新或創建 meta 標籤的函數
        const updateMeta = (name: string, content: string, property = false) => {
            const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let meta = document.querySelector(selector) as HTMLMetaElement;
            
            if (!meta) {
                meta = document.createElement('meta');
                if (property) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // 更新 link 標籤
        const updateLink = (rel: string, href: string) => {
            let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', rel);
                document.head.appendChild(link);
            }
            link.setAttribute('href', href);
        };

        // 基本 meta 標籤
        updateMeta('description', description);
        updateLink('canonical', fullUrl);

        // Open Graph / Facebook
        updateMeta('og:type', type, true);
        updateMeta('og:url', fullUrl, true);
        updateMeta('og:title', title, true);
        updateMeta('og:description', description, true);
        updateMeta('og:image', fullImageUrl, true);
        updateMeta('og:image:width', '1200', true);
        updateMeta('og:image:height', '630', true);
        updateMeta('og:image:type', 'image/png', true);
        updateMeta('og:image:alt', title, true);
        updateMeta('og:site_name', siteName, true);
        updateMeta('og:locale', locale, true);

        // Twitter
        updateMeta('twitter:card', 'summary_large_image', true);
        updateMeta('twitter:url', fullUrl, true);
        updateMeta('twitter:title', title, true);
        updateMeta('twitter:description', description, true);
        updateMeta('twitter:image', fullImageUrl, true);
        updateMeta('twitter:image:width', '1200', true);
        updateMeta('twitter:image:height', '630', true);

        // 更新 JSON-LD
        let jsonLd = document.querySelector('script[type="application/ld+json"]');
        if (!jsonLd) {
            jsonLd = document.createElement('script');
            jsonLd.setAttribute('type', 'application/ld+json');
            document.head.appendChild(jsonLd);
        }
        jsonLd.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Website",
            "name": title,
            "alternateName": siteName,
            "url": fullUrl,
            "image": fullImageUrl,
            "description": description,
            "author": {
                "@type": "Person",
                "name": "Zyreny"
            }
        });

    }, [title, description, image, url, type, siteName, locale]);
}

export default useSEO;
