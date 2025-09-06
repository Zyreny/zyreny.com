import { Outlet, useLocation } from "react-router-dom";

import Nav from "./layout/Nav";
import Footer from "./layout/Footer";

import "@assets/css/main.css";

type NavBtn = {
    id: string;
    name: string;
    path: string;
};

function App() {
    const location = useLocation();
    
    const getCurrentNavBtns = (): NavBtn[] => {
        const modules: Record<string, { default: { navBtns?: NavBtn[] } }> = 
            import.meta.glob("./pages/*.tsx", { eager: true });
        
        for (const path in modules) {
            const Component = modules[path].default;
            let routePath = path.replace("./pages/", "").replace(/\.tsx$/, "");
            
            if (routePath === "index") {
                routePath = "/";
            } else if (routePath === "404") {
                routePath = "*";
            } else {
                routePath = `/${routePath}`;
            }
            
            if (routePath === location.pathname && Component.navBtns) {
                return Component.navBtns;
            }
        }
        
        return [
            { id: "home", name: "首頁", path: "/" },
            { id: "projects", name: "作品", path: "/projects" },
        ];
    };

    return (
        <>
            <Nav navBtns={getCurrentNavBtns()} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
