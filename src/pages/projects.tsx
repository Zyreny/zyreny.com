import { SEO } from "@comp";

function Projects() {
    return (
        <>
            <SEO 
                title="Zyreny - 作品集"
                description="查看 Zyreny 的程式設計作品，包含網頁開發、應用程式和各種有趣的專案。"
                url="/projects"
                image="/og_img.png"
            />
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1>作品集</h1>
                <p>這裡將展示我的各種程式設計作品...</p>
                
                <div style={{ marginTop: '30px' }}>
                    <h2>主要專案</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ margin: '10px 0' }}>
                            <strong>計算機應用</strong> - 簡單的計算機工具
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <strong>美食應用</strong> - 美食相關的互動應用
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <strong>AI 工具</strong> - 人工智慧相關專案
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <strong>待辦事項</strong> - 任務管理應用
                        </li>
                    </ul>
                </div>
                
                <nav style={{ marginTop: '30px' }}>
                    <a href="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                        回到首頁
                    </a>
                </nav>
            </div>
        </>
    );
}

// 導出 navBtns 供路由使用
Projects.navBtns = [
    { id: "home", name: "首頁", path: "/" },
    { id: "projects", name: "作品", path: "/projects" }
];

export default Projects;
