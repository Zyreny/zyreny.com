type NavBtn = {
    id: string; 
    name: string;
    path: string;
}

type PageComponent = React.ComponentType & { navBtns?: NavBtn[] }

function generateRoutes() {
    const modules: Record<string, { default: PageComponent }> = import.meta.glob("./*.tsx", { eager: true });
    const routes = [];

    for (const path in modules) {
        const module = modules[path];
        const Component = module.default;

        // 從文件路徑提取路由路徑
        let routePath = path
            .replace("./", "") // 移除 './'
            .replace(/\.tsx$/, ""); // 移除 '.tsx' 擴展名

        // 處理 index 路由
        if (routePath === "index") {
            routePath = "/";
        } else {
            routePath = `/${routePath}`;
        }

        routes.push({
            path: routePath,
            element: <Component />,
            navBtns: Component.navBtns || [
                { id: "home", name: "首頁", path: "/" },
                { id: "projects", name: "作品", path: "/projects" }
            ],
        });
    }

    // 添加 404 路由（通配符路由必須放在最後）
    const NotFoundModule = import.meta.glob("./404.tsx", { eager: true }) as Record<string, { default: PageComponent }>;
    const NotFoundComponent = NotFoundModule["./404.tsx"]?.default;

    if (NotFoundComponent) {
        routes.push({
            path: "*",
            element: <NotFoundComponent />,
        });
    }

    return routes;
}

const routes = generateRoutes();
export default routes;
