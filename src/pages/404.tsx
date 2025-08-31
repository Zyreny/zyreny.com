import { useLocation } from 'react-router';
import useSEO from '@/hooks/useSEO';

function NotFound() {
    const location = useLocation();

    // SEO 設定
    useSEO({
        title: "Zyreny - 頁面不存在",
        description: "很抱歉，您訪問的頁面不存在。請返回首頁查看其他內容。",
        url: location.pathname,
        image: "/og_img.png"
    });

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
                <h1 style={{ fontSize: '72px', margin: '0', color: '#ccc' }}>404</h1>
                <h2>頁面不存在</h2>
                <p>很抱歉，您訪問的頁面不存在。</p>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    嘗試訪問的路徑：<code style={{ background: '#f5f5f5', padding: '2px 4px', borderRadius: '3px' }}>
                        {location.pathname}
                    </code>
                </p>
                <nav>
                    <a href="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                        回到首頁
                    </a>
                </nav>
            </div>
    );
}

export default NotFound;
