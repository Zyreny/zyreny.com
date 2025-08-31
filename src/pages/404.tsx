function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '72px', margin: '0', color: '#ccc' }}>404</h1>
            <h2>頁面不存在</h2>
            <p>很抱歉，您訪問的頁面不存在。</p>
            <nav>
                <a href="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                    回到首頁
                </a>
            </nav>
        </div>
    );
}

export default NotFound;
