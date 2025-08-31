import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
}

function SEO({
    title = "Zyreny",
    description = "我是Zyreny，一個喜歡程式設計的國中生，這裡有一些奇怪有趣的網頁專案作品。",
    image = "/og_img.png",
    url = "",
    type = "website",
    siteName = "Zyreny",
    locale = "zh_TW"
}: SEOProps) {
    const baseUrl = "https://zyreny.com";
    const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

    return (
        <Helmet>
            {/* 基本 meta 標籤 */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={locale} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImageUrl} />
            <meta property="twitter:image:width" content="1200" />
            <meta property="twitter:image:height" content="630" />

            {/* JSON-LD 結構化數據 */}
            <script type="application/ld+json">
                {JSON.stringify({
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
                })}
            </script>
        </Helmet>
    );
}

export default SEO;
