import type { RouteObject } from "react-router-dom";
import App from "@/App";

type NavBtn = {
    id: string;
    name: string;
    path: string;
};

type PageComponent = React.ComponentType & {
    navBtns?: NavBtn[];
};

function generateRoutes() {
    const modules: Record<string, { default: PageComponent }> =
        import.meta.glob("./*.tsx", { eager: true });
    const pageNavBtns: Record<string, NavBtn[]> = {};
    const childRoutes: RouteObject[] = [];

    for (const path in modules) {
        const module = modules[path];
        const Component = module.default;

        // 從文件路徑提取路由路徑
        let routePath = path.replace("./", "").replace(/\.tsx$/, "");

        // 處理 index 路由
        if (routePath === "index") {
            routePath = "/";
        } else if (routePath === "404") {
            routePath = "*";
        } else {
            routePath = `/${routePath}`;
        }

        if (Component.navBtns) {
            pageNavBtns[routePath] = Component.navBtns;
        }

        childRoutes.push({
            path: routePath,
            element: <Component />,
        });
    }

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <App />,
            children: childRoutes,
        },
    ];

    return { routes, pageNavBtns };
}

const { routes, pageNavBtns } = generateRoutes();

export { routes, pageNavBtns };
export type { NavBtn, PageComponent };
