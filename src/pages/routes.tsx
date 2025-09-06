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

function normalizeRoutePath(filePath: string): string {
    let routePath = filePath.replace("./", "").replace(/\.tsx$/, "");
    
    if (routePath === "index") {
        routePath = "/";
    } else if (routePath === "404") {
        routePath = "*";
    } else {
        routePath = `/${routePath}`;
    }
    
    return routePath;
}

function getPageModules() {
    return import.meta.glob("./*.tsx", { eager: true }) as Record<string, { default: PageComponent }>;
}

function generateRoutes() {
    const modules = getPageModules();
    const pageNavBtns: Record<string, NavBtn[]> = {};
    const childRoutes: RouteObject[] = [];

    for (const path in modules) {
        const module = modules[path];
        const Component = module.default;
        const routePath = normalizeRoutePath(path);

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

function getCurrentNavBtns(pathname: string): NavBtn[] {
    const modules = getPageModules();
    
    for (const path in modules) {
        const Component = modules[path].default;
        const routePath = normalizeRoutePath(path);
        
        if (routePath === pathname && Component.navBtns) {
            return Component.navBtns;
        }
    }
    
    return [
        { id: "home", name: "首頁", path: "/" },
        { id: "projects", name: "作品", path: "/projects" },
    ];
}

export { routes, pageNavBtns, getCurrentNavBtns };
export type { NavBtn, PageComponent };
